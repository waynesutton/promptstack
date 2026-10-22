import type { QueryCtx, MutationCtx } from "../_generated/server";
import type { Doc } from "../_generated/dataModel";

// Returns the signed in caller's identity, or throws for signed out callers
export async function requireIdentity(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Not authenticated");
  return identity;
}

// Single visibility rule for prompts: public to everyone, private only to the owner
export function canViewPrompt(prompt: Doc<"prompts">, subject: string | undefined): boolean {
  if (prompt.isPublic) return true;
  return prompt.userId !== undefined && prompt.userId === subject;
}
