import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { canViewPrompt, requireIdentity } from "./lib/access";

const promptValidator = v.object({
  _id: v.id("prompts"),
  _creationTime: v.number(),
  title: v.string(),
  description: v.string(),
  prompt: v.string(),
  categories: v.array(v.string()),
  stars: v.number(),
  likes: v.optional(v.number()),
  githubProfile: v.optional(v.string()),
  isPublic: v.boolean(),
  slug: v.string(),
  createdAt: v.number(),
  userId: v.optional(v.string()),
});

// sec-check: public (anonymous visitors can submit public prompts by design)
// eslint-disable-next-line @convex-dev/require-access-control
export const createPrompt = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    prompt: v.string(),
    categories: v.array(v.string()),
    githubProfile: v.optional(v.string()),
    isPublic: v.boolean(),
    slug: v.string(),
  },
  returns: v.id("prompts"),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity && !args.isPublic) {
      throw new Error("Must be logged in to create private prompts");
    }

    const userId = identity?.subject;

    const promptId = await ctx.db.insert("prompts", {
      ...args,
      stars: 0,
      likes: 0,
      createdAt: Date.now(),
      isPublic: args.isPublic,
      userId: userId,
    });
    return promptId;
  },
});

// sec-check: public (returns public prompts plus the caller's own private prompts)
// eslint-disable-next-line @convex-dev/require-access-control
export const searchPrompts = query({
  args: {
    searchQuery: v.optional(v.string()),
    categories: v.optional(v.array(v.string())),
    starRating: v.optional(v.number()),
  },
  returns: v.array(promptValidator),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject;

    const publicPrompts = await ctx.db
      .query("prompts")
      .withIndex("by_isPublic", (q) => q.eq("isPublic", true))
      .collect();

    const ownPrivatePrompts = userId
      ? await ctx.db
          .query("prompts")
          .withIndex("by_userId_and_isPublic", (q) =>
            q.eq("userId", userId).eq("isPublic", false)
          )
          .collect()
      : [];

    // Keep the original oldest first order across both result sets
    let prompts = [...publicPrompts, ...ownPrivatePrompts].sort(
      (a, b) => a._creationTime - b._creationTime
    );

    if (args.searchQuery) {
      const searchText = args.searchQuery.toLowerCase();
      prompts = prompts.filter(
        (prompt) =>
          prompt.title.toLowerCase().includes(searchText) ||
          prompt.description.toLowerCase().includes(searchText) ||
          prompt.prompt.toLowerCase().includes(searchText)
      );
    }

    if (args.categories && args.categories.length > 0) {
      prompts = prompts.filter((prompt) =>
        prompt.categories.some((category) => args.categories?.includes(category))
      );
    }

    if (args.starRating !== undefined) {
      prompts = prompts.filter((prompt) => prompt.stars === args.starRating);
    }

    return prompts;
  },
});

// sec-check: public (private prompts resolve only for their owner)
export const getPromptBySlug = query({
  args: { slug: v.string() },
  returns: v.union(promptValidator, v.null()),
  handler: async (ctx, { slug }) => {
    const identity = await ctx.auth.getUserIdentity();

    // Oldest prompt wins when two share a slug, matching the original behavior
    const prompt = await ctx.db
      .query("prompts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    if (!prompt) return null;
    if (!canViewPrompt(prompt, identity?.subject)) return null;

    return prompt;
  },
});

export const ratePrompt = mutation({
  args: {
    promptId: v.id("prompts"),
    rating: v.number(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await requireIdentity(ctx);

    if (!Number.isInteger(args.rating) || args.rating < 1 || args.rating > 5) {
      throw new Error("Rating must be a whole number between 1 and 5");
    }

    const prompt = await ctx.db.get("prompts", args.promptId);
    if (!prompt || !canViewPrompt(prompt, identity.subject)) {
      throw new Error("Prompt not found");
    }

    // One rating per user per prompt; rating again replaces the old value
    const existing = await ctx.db
      .query("starRatings")
      .withIndex("by_prompt_and_user", (q) =>
        q.eq("promptId", args.promptId).eq("userId", identity.subject)
      )
      .unique();
    if (existing) {
      await ctx.db.patch("starRatings", existing._id, { rating: args.rating });
    } else {
      await ctx.db.insert("starRatings", {
        promptId: args.promptId,
        userId: identity.subject,
        rating: args.rating,
        createdAt: Date.now(),
      });
    }

    const ratings = await ctx.db
      .query("starRatings")
      .withIndex("by_prompt_and_user", (q) => q.eq("promptId", args.promptId))
      .collect();
    const averageRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

    await ctx.db.patch("prompts", args.promptId, {
      stars: Math.round(averageRating),
    });
    return null;
  },
});

export const likePrompt = mutation({
  args: {
    promptId: v.id("prompts"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await requireIdentity(ctx);

    const prompt = await ctx.db.get("prompts", args.promptId);
    if (!prompt || !canViewPrompt(prompt, identity.subject)) {
      throw new Error("Prompt not found");
    }

    const existing = await ctx.db
      .query("promptLikes")
      .withIndex("by_prompt_and_user", (q) =>
        q.eq("promptId", args.promptId).eq("userId", identity.subject)
      )
      .unique();
    if (existing) return null;

    await ctx.db.insert("promptLikes", { promptId: args.promptId, userId: identity.subject });
    await ctx.db.patch("prompts", args.promptId, {
      likes: (prompt.likes || 0) + 1,
    });
    return null;
  },
});

export const unlikePrompt = mutation({
  args: {
    promptId: v.id("prompts"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await requireIdentity(ctx);

    const existing = await ctx.db
      .query("promptLikes")
      .withIndex("by_prompt_and_user", (q) =>
        q.eq("promptId", args.promptId).eq("userId", identity.subject)
      )
      .unique();
    if (!existing) return null;

    await ctx.db.delete("promptLikes", existing._id);
    const prompt = await ctx.db.get("prompts", args.promptId);
    if (prompt) {
      await ctx.db.patch("prompts", args.promptId, {
        likes: Math.max(0, (prompt.likes || 0) - 1),
      });
    }
    return null;
  },
});

// Prompt ids the signed in user has liked, so the UI can show liked state.
// Scoped to the ctx.auth identity; signed out callers get an empty list.
// eslint-disable-next-line @convex-dev/require-access-control
export const getMyLikedPromptIds = query({
  args: {},
  returns: v.array(v.id("prompts")),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const likes = await ctx.db
      .query("promptLikes")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .take(1000);
    return likes.map((like) => like.promptId);
  },
});

// Scoped to the ctx.auth identity; signed out callers get an empty list
// eslint-disable-next-line @convex-dev/require-access-control
export const getPrivatePrompts = query({
  args: {},
  returns: v.array(promptValidator),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("prompts")
      .withIndex("by_userId_and_isPublic", (q) =>
        q.eq("userId", identity.subject).eq("isPublic", false)
      )
      .collect();
  },
});

export const deletePrompt = mutation({
  args: { id: v.id("prompts") },
  returns: v.null(),
  handler: async (ctx, { id }) => {
    const identity = await requireIdentity(ctx);

    const prompt = await ctx.db.get("prompts", id);
    if (!prompt) throw new Error("Prompt not found");
    if (prompt.userId !== identity.subject) throw new Error("Not authorized");

    await ctx.db.delete("prompts", id);
    return null;
  },
});

export const updatePrompt = mutation({
  args: {
    id: v.id("prompts"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    prompt: v.optional(v.string()),
    categories: v.optional(v.array(v.string())),
    githubProfile: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await requireIdentity(ctx);

    const existingPrompt = await ctx.db.get("prompts", args.id);
    if (!existingPrompt) throw new Error("Prompt not found");
    if (existingPrompt.userId !== identity.subject) throw new Error("Not authorized");

    const { id, ...updateData } = args;
    await ctx.db.patch("prompts", id, updateData);
    return null;
  },
});

export const togglePromptVisibility = mutation({
  args: {
    id: v.id("prompts"),
    isPublic: v.boolean(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await requireIdentity(ctx);

    const prompt = await ctx.db.get("prompts", args.id);
    if (!prompt) throw new Error("Prompt not found");
    if (prompt.userId !== identity.subject) throw new Error("Not authorized");

    await ctx.db.patch("prompts", args.id, {
      isPublic: args.isPublic,
    });
    return null;
  },
});

// Custom Categories Functions
export const createCustomCategory = mutation({
  args: {
    name: v.string(),
  },
  returns: v.id("customCategories"),
  handler: async (ctx, args) => {
    const identity = await requireIdentity(ctx);

    // Check if category already exists for this user
    const existingCategory = await ctx.db
      .query("customCategories")
      .withIndex("by_user_and_name", (q) =>
        q.eq("userId", identity.subject).eq("name", args.name)
      )
      .first();

    if (existingCategory) {
      throw new Error("Category already exists");
    }

    const categoryId = await ctx.db.insert("customCategories", {
      name: args.name,
      userId: identity.subject,
      createdAt: Date.now(),
    });

    return categoryId;
  },
});

// Scoped to the ctx.auth identity; signed out callers get an empty list
// eslint-disable-next-line @convex-dev/require-access-control
export const getUserCustomCategories = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("customCategories"),
      _creationTime: v.number(),
      name: v.string(),
      userId: v.string(),
      createdAt: v.number(),
    })
  ),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const categories = await ctx.db
      .query("customCategories")
      .withIndex("by_user_and_name", (q) => q.eq("userId", identity.subject))
      .collect();

    return categories;
  },
});

export const deleteCustomCategory = mutation({
  args: {
    id: v.id("customCategories"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await requireIdentity(ctx);

    const category = await ctx.db.get("customCategories", args.id);
    if (!category) throw new Error("Category not found");

    if (category.userId !== identity.subject) {
      throw new Error("You can only delete your own custom categories");
    }

    // Find all of this user's prompts and remove the category from them
    const promptsWithCategory = await ctx.db
      .query("prompts")
      .withIndex("by_userId_and_isPublic", (q) => q.eq("userId", identity.subject))
      .collect();

    for (const prompt of promptsWithCategory) {
      if (prompt.categories.includes(category.name)) {
        const updatedCategories = prompt.categories.filter((cat) => cat !== category.name);
        await ctx.db.patch("prompts", prompt._id, {
          categories: updatedCategories,
        });
      }
    }

    await ctx.db.delete("customCategories", args.id);
    return null;
  },
});
