import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";

export default [
  // Global ignores - must be first
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/coverage/**",
      "**/.turbo/**",
      "**/public/**",
    ],
  },

  // JavaScript/TypeScript base config
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    ...js.configs.recommended,
  },

  // TypeScript specific config
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["**/*.ts", "**/*.mts", "**/*.cts"],
  })),

  // TypeScript rule overrides
  {
    files: ["**/*.ts", "**/*.mts", "**/*.cts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-this-alias": "off",
    },
  },

  // JSON config
  {
    files: ["**/*.json"],
    ignores: ["**/package-lock.json", "**/pnpm-lock.json"],
    language: "json/json",
    ...json.configs.recommended,
  },
];
