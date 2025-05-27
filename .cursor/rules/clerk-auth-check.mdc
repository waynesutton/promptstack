---
description: 
globs: 
alwaysApply: false
---
This rule helps ensure that React components using Convex queries with Clerk authentication correctly handle loading and authentication states before attempting to fetch data, especially for admin-protected queries.

````
name: convex-clerk-admin-auth-guard
description: Ensures React components correctly handle auth state before calling admin-protected Convex queries.
globs: src/**/*.{ts,tsx}
condition: |
  // Heuristic: Component uses useQuery/usePaginatedQuery for an "admin" query
  // AND does NOT seem to have robust useConvexAuth handling for skipping.
  // This is a simplified check; real implementation might need more sophisticated AST parsing.
  const fileContent = ctx.currentFile.content;
  const usesAdminQuery = /use(Query|PaginatedQuery)\\s*\\(\\s*api\\.\\w+\\.\\w+Admin/.test(fileContent);
  const usesConvexAuth = /useConvexAuth\\s*\\(\s*\\)/.test(fileContent);
  const hasSkipLogic = /authIsLoading\\s*\\|\\|\\s*!isAuthenticated\\s*\\?\\s*\"skip\"/.test(fileContent);

  if (usesAdminQuery && (!usesConvexAuth || !hasSkipLogic)) {
    return true; // Condition met to offer advice
  }
  return false;
advice: |
  When using Convex queries that require admin authentication (often named like `...Admin`) with Clerk, ensure your React component correctly handles authentication states to prevent errors:

  1.  **Use `useConvexAuth`**: Get `authIsLoading` and `isAuthenticated`.
      ```tsx
      import { useConvexAuth } from "convex/react";
      // ...
      const { isLoading: authIsLoading, isAuthenticated } = useConvexAuth();
      ```

  2.  **Handle Auth Loading**: Display a loading message if `authIsLoading` is true.
      ```tsx
      if (authIsLoading) {
        return <div>Loading authentication...</div>;
      }
      ```

  3.  **Handle Not Authenticated**: (Optional, but good for UX if routing doesn't cover it)
      If not `authIsLoading` and not `isAuthenticated`, prompt for login.
      ```tsx
      if (!isAuthenticated) {
        return <div>Please log in to access this section.</div>;
      }
      ```

  4.  **Conditionally Skip Queries**: Pass `"skip"` to `useQuery` or `usePaginatedQuery` if `authIsLoading` or `!isAuthenticated`.
      ```tsx
      const adminData = useQuery(
        api.yourModule.yourAdminQuery,
        (authIsLoading || !isAuthenticated) ? "skip" : { /* your_args */ }
      );
      ```
  This prevents queries from running before authentication is resolved, avoiding "No identity found" errors from `requireAdminRole` in your Convex functions.

````

