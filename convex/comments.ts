import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { canViewPrompt, requireIdentity } from "./lib/access";

const MAX_COMMENT_CHARS = 20000;
const MAX_COMMENTS_PER_PROMPT = 500;

const commentValidator = v.object({
  _id: v.id("comments"),
  _creationTime: v.number(),
  promptId: v.id("prompts"),
  content: v.string(),
  userId: v.string(),
  userName: v.string(),
  createdAt: v.number(),
  parentId: v.optional(v.id("comments")),
});

// Comments are stored as TipTap JSON documents; anything else is rejected
function isTiptapDoc(content: string): boolean {
  try {
    const parsed: unknown = JSON.parse(content);
    return (
      typeof parsed === "object" &&
      parsed !== null &&
      (parsed as { type?: unknown }).type === "doc"
    );
  } catch {
    return false;
  }
}

// sec-check: public (comments on public prompts are readable by anyone)
export const getComments = query({
  args: { promptId: v.id("prompts") },
  returns: v.array(commentValidator),
  handler: async (ctx, { promptId }) => {
    const identity = await ctx.auth.getUserIdentity();
    const prompt = await ctx.db.get("prompts", promptId);
    if (!prompt) return [];
    if (!canViewPrompt(prompt, identity?.subject)) return [];

    return await ctx.db
      .query("comments")
      .withIndex("by_prompt", (q) => q.eq("promptId", promptId))
      .order("desc")
      .take(MAX_COMMENTS_PER_PROMPT);
  },
});

export const addComment = mutation({
  args: {
    promptId: v.id("prompts"),
    content: v.string(),
    parentId: v.optional(v.id("comments")),
  },
  returns: v.id("comments"),
  handler: async (ctx, args) => {
    // Author identity comes from the auth token, never from the client
    const identity = await requireIdentity(ctx);

    if (args.content.length > MAX_COMMENT_CHARS || !isTiptapDoc(args.content)) {
      throw new Error("Invalid comment content");
    }

    const prompt = await ctx.db.get("prompts", args.promptId);
    if (!prompt || !canViewPrompt(prompt, identity.subject)) {
      throw new Error("Prompt not found");
    }

    if (args.parentId) {
      const parent = await ctx.db.get("comments", args.parentId);
      if (!parent || parent.promptId !== args.promptId) {
        throw new Error("Parent comment not found");
      }
    }

    return await ctx.db.insert("comments", {
      promptId: args.promptId,
      content: args.content,
      userId: identity.subject,
      userName: identity.name || identity.nickname || "Anonymous",
      parentId: args.parentId,
      createdAt: Date.now(),
    });
  },
});

export const deleteComment = mutation({
  args: {
    commentId: v.id("comments"),
  },
  returns: v.null(),
  handler: async (ctx, { commentId }) => {
    const identity = await requireIdentity(ctx);

    const comment = await ctx.db.get("comments", commentId);
    if (!comment) throw new Error("Comment not found");

    if (comment.userId !== identity.subject) {
      throw new Error("Not authorized to delete this comment");
    }

    await ctx.db.delete("comments", commentId);
    return null;
  },
});
