/// <reference types="vite/client" />
import { convexTest } from "convex-test";
import { describe, expect, test } from "vitest";
import schema from "./schema";
import { api } from "./_generated/api";

const modules = import.meta.glob("./**/*.ts");

const COMMENT = JSON.stringify({
  type: "doc",
  content: [{ type: "paragraph", content: [{ type: "text", text: "hello" }] }],
});

// Alice owns one public and one private prompt; Bob is a second signed in user
async function setup() {
  const t = convexTest(schema, modules);
  const alice = t.withIdentity({ subject: "alice", name: "Alice" });
  const bob = t.withIdentity({ subject: "bob", name: "Bob" });

  const { publicId, privateId } = await t.run(async (ctx) => {
    const base = {
      description: "d",
      prompt: "p",
      categories: [],
      stars: 0,
      likes: 0,
      createdAt: Date.now(),
      userId: "alice",
    };
    const publicId = await ctx.db.insert("prompts", {
      ...base,
      title: "Public",
      slug: "public",
      isPublic: true,
    });
    const privateId = await ctx.db.insert("prompts", {
      ...base,
      title: "Private",
      slug: "private",
      isPublic: false,
    });
    return { publicId, privateId };
  });

  return { t, alice, bob, publicId, privateId };
}

describe("comments", () => {
  test("author identity comes from auth, not from args", async () => {
    const { t, alice, publicId } = await setup();
    const commentId = await alice.mutation(api.comments.addComment, {
      promptId: publicId,
      content: COMMENT,
    });
    const comment = await t.run((ctx) => ctx.db.get("comments", commentId));
    expect(comment?.userId).toBe("alice");
    expect(comment?.userName).toBe("Alice");

    await expect(
      alice.mutation(api.comments.addComment, {
        promptId: publicId,
        content: COMMENT,
        // @ts-expect-error userId is no longer an accepted argument
        userId: "bob",
      })
    ).rejects.toThrow();
  });

  test("signed out callers cannot comment", async () => {
    const { t, publicId } = await setup();
    await expect(
      t.mutation(api.comments.addComment, { promptId: publicId, content: COMMENT })
    ).rejects.toThrow(/Not authenticated/);
  });

  test("raw HTML is rejected as comment content", async () => {
    const { alice, publicId } = await setup();
    await expect(
      alice.mutation(api.comments.addComment, {
        promptId: publicId,
        content: "<img src=x onerror=alert(1)>",
      })
    ).rejects.toThrow(/Invalid comment content/);
    await expect(
      alice.mutation(api.comments.addComment, {
        promptId: publicId,
        content: JSON.stringify({ type: "doc", text: "x".repeat(20001) }),
      })
    ).rejects.toThrow(/Invalid comment content/);
  });

  test("another user cannot comment on or read a private prompt", async () => {
    const { t, alice, bob, privateId } = await setup();
    await alice.mutation(api.comments.addComment, { promptId: privateId, content: COMMENT });

    await expect(
      bob.mutation(api.comments.addComment, { promptId: privateId, content: COMMENT })
    ).rejects.toThrow(/Prompt not found/);
    expect(await bob.query(api.comments.getComments, { promptId: privateId })).toEqual([]);
    expect(await t.query(api.comments.getComments, { promptId: privateId })).toEqual([]);
    expect(await alice.query(api.comments.getComments, { promptId: privateId })).toHaveLength(1);
  });

  test("a reply must belong to the same prompt", async () => {
    const { alice, publicId, privateId } = await setup();
    const parentId = await alice.mutation(api.comments.addComment, {
      promptId: privateId,
      content: COMMENT,
    });
    await expect(
      alice.mutation(api.comments.addComment, { promptId: publicId, content: COMMENT, parentId })
    ).rejects.toThrow(/Parent comment not found/);
  });

  test("only the author can delete a comment", async () => {
    const { t, alice, bob, publicId } = await setup();
    const commentId = await alice.mutation(api.comments.addComment, {
      promptId: publicId,
      content: COMMENT,
    });
    await expect(bob.mutation(api.comments.deleteComment, { commentId })).rejects.toThrow();
    await expect(t.mutation(api.comments.deleteComment, { commentId })).rejects.toThrow();
    await alice.mutation(api.comments.deleteComment, { commentId });
  });
});

describe("likes", () => {
  test("signed out callers cannot like or unlike", async () => {
    const { t, publicId } = await setup();
    await expect(t.mutation(api.prompts.likePrompt, { promptId: publicId })).rejects.toThrow();
    await expect(t.mutation(api.prompts.unlikePrompt, { promptId: publicId })).rejects.toThrow();
  });

  test("one like per user, and unlike never goes below zero", async () => {
    const { t, alice, bob, publicId } = await setup();
    const likes = async () => (await t.run((ctx) => ctx.db.get("prompts", publicId)))?.likes;

    await bob.mutation(api.prompts.likePrompt, { promptId: publicId });
    await bob.mutation(api.prompts.likePrompt, { promptId: publicId });
    expect(await likes()).toBe(1);
    expect(await bob.query(api.prompts.getMyLikedPromptIds, {})).toEqual([publicId]);

    // Alice never liked it, so her unlike cannot remove Bob's like
    await alice.mutation(api.prompts.unlikePrompt, { promptId: publicId });
    expect(await likes()).toBe(1);

    await bob.mutation(api.prompts.unlikePrompt, { promptId: publicId });
    await bob.mutation(api.prompts.unlikePrompt, { promptId: publicId });
    expect(await likes()).toBe(0);
  });

  test("another user cannot like a private prompt", async () => {
    const { bob, privateId } = await setup();
    await expect(bob.mutation(api.prompts.likePrompt, { promptId: privateId })).rejects.toThrow(
      /Prompt not found/
    );
  });
});

describe("ratings", () => {
  test("signed out callers cannot rate", async () => {
    const { t, publicId } = await setup();
    await expect(
      t.mutation(api.prompts.ratePrompt, { promptId: publicId, rating: 5 })
    ).rejects.toThrow();
  });

  test("ratings are whole numbers from 1 to 5, one per user", async () => {
    const { t, bob, publicId } = await setup();
    for (const rating of [0, 6, 2.5, Infinity]) {
      await expect(
        bob.mutation(api.prompts.ratePrompt, { promptId: publicId, rating })
      ).rejects.toThrow();
    }

    await bob.mutation(api.prompts.ratePrompt, { promptId: publicId, rating: 5 });
    await bob.mutation(api.prompts.ratePrompt, { promptId: publicId, rating: 1 });
    const { rows, stars } = await t.run(async (ctx) => ({
      rows: await ctx.db.query("starRatings").take(10),
      stars: (await ctx.db.get("prompts", publicId))?.stars,
    }));
    expect(rows).toHaveLength(1);
    expect(stars).toBe(1);
  });
});

describe("prompt ownership", () => {
  test("another user or a signed out caller cannot edit, hide, or delete a prompt", async () => {
    const { t, alice, bob, publicId } = await setup();
    for (const caller of [bob, t]) {
      await expect(
        caller.mutation(api.prompts.updatePrompt, { id: publicId, title: "pwned" })
      ).rejects.toThrow();
      await expect(
        caller.mutation(api.prompts.togglePromptVisibility, { id: publicId, isPublic: false })
      ).rejects.toThrow();
      await expect(caller.mutation(api.prompts.deletePrompt, { id: publicId })).rejects.toThrow();
    }
    await alice.mutation(api.prompts.updatePrompt, { id: publicId, title: "Renamed" });
  });

  test("private prompts resolve only for their owner", async () => {
    const { t, alice, bob } = await setup();
    expect(await t.query(api.prompts.getPromptBySlug, { slug: "private" })).toBeNull();
    expect(await bob.query(api.prompts.getPromptBySlug, { slug: "private" })).toBeNull();
    expect((await alice.query(api.prompts.getPromptBySlug, { slug: "private" }))?.title).toBe(
      "Private"
    );

    const bobSees = await bob.query(api.prompts.searchPrompts, {});
    expect(bobSees.map((p) => p.title)).toEqual(["Public"]);
    const aliceSees = await alice.query(api.prompts.searchPrompts, {});
    expect(aliceSees.map((p) => p.title)).toEqual(["Public", "Private"]);
  });
});
