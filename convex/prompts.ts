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
    const promptId = await ctx.db.insert("prompts", {
      ...args,
      stars: 0,
      likes: 0,
      createdAt: Date.now(),
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
    let prompts = await ctx.db
      .query("prompts")
      .filter((q) => q.eq(q.field("isPublic"), true))
      .collect();

    // Map the prompts to include their IDs
    prompts = prompts.map(prompt => ({
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
    const prompts = await ctx.db
      .query("prompts")
      .filter((q) => q.eq(q.field("slug"), slug))
      .collect();
    
    if (!prompts.length) return null;
    
    return {
      ...prompts[0],
      _id: prompts[0]._id,
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

    const averageRating =
      ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

    // Update prompt with new rating
    await ctx.db.patch(args.promptId, { 
      stars: Math.round(averageRating) 
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
      likes: (prompt.likes || 0) + 1 
    });
  },
}); 