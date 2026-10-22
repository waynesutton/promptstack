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
  })
    .index("by_isPublic", ["isPublic"])
    .index("by_userId_and_isPublic", ["userId", "isPublic"])
    .index("by_slug", ["slug"]),
  starRatings: defineTable({
    promptId: v.id("prompts"),
    // Optional so ratings saved before sign in was required still validate
    userId: v.optional(v.string()),
    rating: v.number(),
    createdAt: v.number(),
  }).index("by_prompt_and_user", ["promptId", "userId"]),
  // One row per user per liked prompt, so likes cannot be inflated
  promptLikes: defineTable({
    promptId: v.id("prompts"),
    userId: v.string(),
  })
    .index("by_prompt_and_user", ["promptId", "userId"])
    .index("by_user", ["userId"]),
  comments: defineTable({
    promptId: v.id("prompts"),
    content: v.string(),
    userId: v.string(),
    userName: v.string(),
    createdAt: v.number(),
    parentId: v.optional(v.id("comments")),
  }).index("by_prompt", ["promptId"]),
  customCategories: defineTable({
    name: v.string(),
    userId: v.string(),
    createdAt: v.number(),
  }).index("by_user_and_name", ["userId", "name"]),
});
