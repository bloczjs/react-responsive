import { defineConfig } from "oxlint";

export default defineConfig({
  categories: {
    correctness: "error",
    nursery: "error",
    pedantic: "error",
    perf: "error",
    restriction: "error",
    style: "error",
    suspicious: "error",
  },
  env: {
    builtin: true,
  },
  settings: {
    "jsx-a11y": {
      polymorphicPropName: "as",
      components: {},
      attributes: {},
    },
    react: {
      version: "18.2.0",
    },
  },
  ignorePatterns: [
    "**/node_modules/**",
    ".yarn/**",
    ".vscode/**",
    "**/*.log",
    "**/*.DS_Store",
    "**/lib/**",
    "**/dist/**",
    "**/tmp/**",
    "**/babel/**",
    "**/pkg/**",
    ".parcel-cache/**",
    ".cache/**",
    "cache/**",
    "*_cache_*/",
  ],
  rules: {
    "arrow-body-style": "off",
    "capitalized-comments": "off",
    "func-style": "off",
    "id-length": "off",
    "max-lines-per-function": "off",
    "max-statements": "off",
    "no-console": "off",
    "no-duplicate-imports": "off",
    "no-inline-comments": "off",
    "no-magic-numbers": "off",
    "no-ternary": "off",
    "no-undef": "off",
    "no-undefined": "off",
    "sort-imports": "off",
    "sort-keys": "off",
    "consistent-indexed-object-style": [
      "error",
      "index-signature",
    ],
  },
  overrides: [
    {
      files: ["**/tests/**", "**/*.test.*"],
      rules: {
        "explicit-function-return-type": "off",
        "explicit-module-boundary-types": "off",
        "init-declarations": "off",
        "no-await-in-loop": "off",
        "no-non-null-assertion": "off",
        "no-promise-executor-return": "off",
        "no-var-requires": "off",
        "require-unicode-regexp": "off",
      },
    },
  ],
});
