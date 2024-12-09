// @ts-check

import tseslint from "typescript-eslint";
import react from "@eslint-react/eslint-plugin";
import * as tsParser from "@typescript-eslint/parser";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  ...tseslint.configs.recommended,
  {
    files: ["**/*.tsx"],
    ...react.configs.recommended,
    languageOptions: {
      parser: tsParser,
    },
  },
  eslintPluginPrettierRecommended,
  {
    ignores: [
      // Yarn
      "**/node_modules/**",
      ".yarn/**",

      // Misc
      ".vscode/**",
      "**/*.log",
      "**/*.DS_Store",

      // Build
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
  },
];
