import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/start/vite";

export default defineConfig({
  plugins: [tanstackStart()],
});
