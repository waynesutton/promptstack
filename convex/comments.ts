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
    content: v.string(),
    userId: v.string(),
    userName: v.string(),
    parentId: v.optional(v.id("comments")),
  },
  handler: async (ctx, args) => {
    const commentId = await ctx.db.insert("comments", {
      promptId: args.promptId,
      content: args.content,
      userId: args.userId,
      userName: args.userName,
      parentId: args.parentId,
      createdAt: Date.now(),
    });
    return commentId;
  },
});

export const deleteComment = mutation({
  args: {
    commentId: v.id("comments"),
  },
  handler: async (ctx, { commentId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const comment = await ctx.db.get(commentId);
    if (!comment) throw new Error("Comment not found");
    
    if (comment.userId !== identity.subject) {
      throw new Error("Not authorized to delete this comment");
    }

    await ctx.db.delete(commentId);
  },
});
