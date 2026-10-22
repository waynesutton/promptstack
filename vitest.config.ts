import { defineConfig } from "vitest/config";

// Convex function tests run in memory with convex-test, no deployment needed
export default defineConfig({
  test: {
    environment: "edge-runtime",
    include: ["convex/**/*.test.ts"],
    server: { deps: { inline: ["convex-test"] } },
  },
});
