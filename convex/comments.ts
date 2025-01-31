import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const getComments = query({
  args: { promptId: v.id("prompts") },
  handler: async (ctx, { promptId }) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_prompt", (q) => q.eq("promptId", promptId))
      .order("desc")
      .collect();

    return comments;
  },
});

export const addComment = mutation({
  args: {
    promptId: v.id("prompts"),
    userId: v.string(),
    userName: v.string(),
    content: v.string(),
  },
  handler: async (ctx, { promptId, userId, userName, content }) => {
    await ctx.db.insert("comments", {
      promptId,
      userId,
      userName,
      content,
      createdAt: Date.now(),
    });
  },
});
