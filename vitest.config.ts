import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: "@blocz/react-responsive",
          root: "./packages/react-responsive",
          typecheck: {
            enabled: true,
            include: ["src/**/*.types.test.{ts,tsx}"],
          },
          include: [],
        },
      },
      {
        test: {
          name: "components",
          root: "./packages/tests",
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
          root: "./packages/tests",
          environment: "node",
          include: ["src/__tests__/resolver.ts"],
        },
      },
      {
        test: {
          name: "e2e",
          root: "./packages/tests",
          environment: "node",
          include: ["src/__tests__/browser.ts"],
          testTimeout: 30000,
        },
      },
    ],
  },
});
