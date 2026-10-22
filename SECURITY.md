# Security policy

## Reporting

Open a private advisory on GitHub (Security tab, "Report a vulnerability"). Please do not open a public issue.

## System and scope

PromptStack is a React and Vite frontend with a Convex backend and Clerk sign in. The hosted version at promptstack.dev is retired. This repo is source code you can self host. In scope: everything in `convex/` and `src/`.

## Who can do what

| Actor | Starts with | Must never get |
| --- | --- | --- |
| Signed out visitor | Public prompts, comments on public prompts, anonymous public prompt submission | Comments, likes, ratings, edits, deletes, any private prompt |
| Signed in user | Their own prompts, private prompts, custom categories, and comments; one like and one rating per prompt | Other users' private prompts, edits or deletes on other users' prompts or comments, posting as another user |

## Public by design

- `prompts:createPrompt` accepts anonymous submissions when `isPublic` is true. It has no rate limit, so a public deployment can receive spam.
- `prompts:searchPrompts` returns all public prompts plus the caller's own private prompts. It reads the whole public set on each call.
- `prompts:getPromptBySlug` returns a private prompt only to its owner.
- `comments:getComments` returns comments only when the caller can view the prompt.

## Invariants

- Comment authors, likes, and ratings use the identity from `ctx.auth`, never ids or names from arguments.
- Every read of a prompt or its comments goes through `canViewPrompt` in `convex/lib/access.ts`.
- Comment content is TipTap JSON, at most 20000 characters, and is sanitized with DOMPurify before rendering.
- Deploy keys and server secrets live in the host dashboard and Convex env, never in this repo. Only `VITE_CONVEX_URL` and `VITE_CLERK_PUBLISHABLE_KEY` are exposed to the browser.

## Known gaps

- No rate limits on anonymous prompt submission or signed in writes.
- `searchPrompts` and `getPrivatePrompts` read full result sets instead of pages.
- Deleting a prompt does not delete its comments, likes, or ratings.
