import typescriptEslint from "@typescript-eslint/eslint-plugin";
import libram from "eslint-plugin-libram";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["KoLmafia/scripts/", "node_modules/"],
  },
  ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      libram,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
    },

    rules: {
      "block-scoped-var": "error",
      "eol-last": "error",
      eqeqeq: ["error", "smart"],
      "no-trailing-spaces": "error",
      "no-useless-rename": "error",
      "no-var": "error",
      "prefer-arrow-callback": "error",
      "prefer-const": "error",
      "prefer-template": "error",

      "sort-imports": [
        "error",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "libram/verify-constants": "error",
    },
  },
];
