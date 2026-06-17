/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    exclude: ["e2e/**", "node_modules/**"],
    coverage: {
      provider: "v8",
      include: [
        "src/api/**",
        "src/store/**",
        "src/app/components/**",
      ],
      exclude: [
        "src/**/*.test.ts",
        "src/**/*.test.tsx",
        "src/__tests__/**",
        "src/main.tsx",
        "src/app/pages/**",
        "src/app/App.tsx",
        "src/app/routes.tsx",
        "src/styles/**",
        "src/assets/**",
        "src/app/components/Layout.tsx",
        "src/app/components/NotFound.tsx",
        "src/app/components/SEO.tsx",
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
      reporter: ["text", "json", "html"],
    },
    setupFiles: [],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
