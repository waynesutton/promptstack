import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  prompts: defineTable({
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
  }),
  starRatings: defineTable({
    promptId: v.id("prompts"),
    rating: v.number(),
    createdAt: v.number(),
  }),
  comments: defineTable({
    promptId: v.id("prompts"),
    content: v.string(),
    userId: v.string(),
    userName: v.string(),
    createdAt: v.number(),
  }).index("by_prompt", ["promptId"]),
});
