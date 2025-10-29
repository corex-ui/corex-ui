import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";

export default [
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/coverage/**",
      "**/.turbo/**",
      "**/public/**",
    ],
  },

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    ...js.configs.recommended,
  },

  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["**/*.ts", "**/*.mts", "**/*.cts"],
  })),

  {
    files: ["**/*.ts", "**/*.mts", "**/*.cts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-unsupported-features/node-builtins": "off",
    },
  },

  {
    files: ["**/*.json"],
    ignores: ["**/package-lock.json", "**/pnpm-lock.json"],
    language: "json/json",
    ...json.configs.recommended,
  },
];
