import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: "components",
          browser: {
            enabled: true,
            provider: "playwright",
            headless: true,
            instances: [{ browser: "chromium" }],
          },
          include: ["src/__tests__/**/*.{ts,tsx}"],
          exclude: [
            "**/node_modules/**",
            "**/*.util.*",
            "**/browser.ts",
            "**/resolver.ts",
          ],
          setupFiles: ["src/vitest-setup.ts"],
        },
      },
      {
        test: {
          name: "node",
          environment: "node",
          include: ["src/__tests__/resolver.ts"],
        },
      },
      {
        test: {
          name: "e2e",
          environment: "node",
          include: ["src/__tests__/browser.ts"],
          testTimeout: 30000,
        },
      },
    ],
  },
});
