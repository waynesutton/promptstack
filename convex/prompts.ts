import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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

export const searchPrompts = query({
  args: {
    searchQuery: v.optional(v.string()),
    categories: v.optional(v.array(v.string())),
    starRating: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject;

    let query = ctx.db.query("prompts");

    if (userId) {
      query = query.filter((q) =>
        q.or(
          q.eq(q.field("isPublic"), true),
          q.and(q.eq(q.field("userId"), userId), q.eq(q.field("isPublic"), false))
        )
      );
    } else {
      query = query.filter((q) => q.eq(q.field("isPublic"), true));
    }

    let prompts = await query.collect();

    // Map the prompts to include their IDs
    prompts = prompts.map((prompt) => ({
      ...prompt,
      _id: prompt._id,
    }));

    if (args.searchQuery) {
      const query = args.searchQuery.toLowerCase();
      prompts = prompts.filter(
        (prompt) =>
          prompt.title.toLowerCase().includes(query) ||
          prompt.description.toLowerCase().includes(query) ||
          prompt.prompt.toLowerCase().includes(query)
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

export const getPromptBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject;

    const prompts = await ctx.db
      .query("prompts")
      .filter((q) => q.eq(q.field("slug"), slug))
      .collect();

    if (!prompts.length) return null;

    const prompt = prompts[0];

    // Check if user can access this prompt
    if (!prompt.isPublic && prompt.userId !== userId) {
      return null; // Private prompt that doesn't belong to current user
    }

    return {
      ...prompt,
      _id: prompt._id,
    };
  },
});

export const ratePrompt = mutation({
  args: {
    promptId: v.id("prompts"),
    rating: v.number(),
  },
  handler: async (ctx, args) => {
    // Validate rating
    if (args.rating < 1 || args.rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    // Add the rating
    await ctx.db.insert("starRatings", {
      promptId: args.promptId,
      rating: args.rating,
      createdAt: Date.now(),
    });

    // Calculate new average rating
    const ratings = await ctx.db
      .query("starRatings")
      .filter((q) => q.eq(q.field("promptId"), args.promptId))
      .collect();

    const averageRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

    // Update prompt with new rating
    await ctx.db.patch(args.promptId, {
      stars: Math.round(averageRating),
    });
  },
});

export const likePrompt = mutation({
  args: {
    promptId: v.id("prompts"),
  },
  handler: async (ctx, args) => {
    const prompt = await ctx.db.get(args.promptId);
    if (!prompt) throw new Error("Prompt not found");

    await ctx.db.patch(args.promptId, {
      likes: (prompt.likes || 0) + 1,
    });
  },
});

export const unlikePrompt = mutation({
  args: {
    promptId: v.id("prompts"),
  },
  handler: async (ctx, args) => {
    const prompt = await ctx.db.get(args.promptId);
    if (!prompt) throw new Error("Prompt not found");

    await ctx.db.patch(args.promptId, {
      likes: (prompt.likes || 0) - 1,
    });
  },
});

export const getPrivatePrompts = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const prompts = await ctx.db
      .query("prompts")
      .filter((q) =>
        q.and(q.eq(q.field("userId"), identity.subject), q.eq(q.field("isPublic"), false))
      )
      .collect();

    return prompts.map((prompt) => ({
      ...prompt,
      _id: prompt._id,
    }));
  },
});

export const deletePrompt = mutation({
  args: { id: v.id("prompts") },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const prompt = await ctx.db.get(id);
    if (!prompt) throw new Error("Prompt not found");
    if (prompt.userId !== identity.subject) throw new Error("Not authorized");

    await ctx.db.delete(id);
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
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const existingPrompt = await ctx.db.get(args.id);
    if (!existingPrompt) throw new Error("Prompt not found");
    if (existingPrompt.userId !== identity.subject) throw new Error("Not authorized");

    const { id, ...updateData } = args;
    await ctx.db.patch(args.id, updateData);
  },
});

export const togglePromptVisibility = mutation({
  args: {
    id: v.id("prompts"),
    isPublic: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const prompt = await ctx.db.get(args.id);
    if (!prompt) throw new Error("Prompt not found");
    if (prompt.userId !== identity.subject) throw new Error("Not authorized");

    await ctx.db.patch(args.id, {
      isPublic: args.isPublic,
    });
  },
});

// Custom Categories Functions
export const createCustomCategory = mutation({
  args: {
    name: v.string(),
  },
  returns: v.id("customCategories"),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Must be logged in to create custom categories");

    // Check if category already exists for this user
    const existingCategory = await ctx.db
      .query("customCategories")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .filter((q) => q.eq(q.field("name"), args.name))
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

export const getUserCustomCategories = query({
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
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
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
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Must be logged in to delete custom categories");

    const category = await ctx.db.get(args.id);
    if (!category) throw new Error("Category not found");

    if (category.userId !== identity.subject) {
      throw new Error("You can only delete your own custom categories");
    }

    // Find all prompts that contain this category and remove it from their categories array
    const promptsWithCategory = await ctx.db
      .query("prompts")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();

    // Update each prompt to remove the deleted category
    for (const prompt of promptsWithCategory) {
      if (prompt.categories.includes(category.name)) {
        const updatedCategories = prompt.categories.filter((cat) => cat !== category.name);
        await ctx.db.patch(prompt._id, {
          categories: updatedCategories,
        });
      }
    }

    // Delete the custom category
    await ctx.db.delete(args.id);
    return null;
  },
});
