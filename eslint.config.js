import globals from "globals";

import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  {
    extends: [
      "eslint:recommended",
      "plugin:typescript/@typescript-eslint",
      "prettier",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    rules: {
      "ts/indent": "error",
    },
    languageOptions: { globals: globals.browser },
  },
  ...compat.extends("standard-with-typescript"),
  someConfig,
  {
    files: ["src/**/*.js"],
    ignores: [
      "build/**/*",
      "!build/**/*/",
      "!build/**/test.js",
      "!node_modules/",
      "node_modules/*",
      "**/*.config.js",
      "!**/eslint.config.js",
    ],
    rules: {
      // General ESLint rules
      indent: "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "no-unused-vars": "error",
      "no-undef": "error",
      camelcase: ["error", { ignoreDestructuring: true }],
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-console": "warn",
      "no-var": "error",
      "arrow-body-style": ["error", "always"],
      "comma-dangle": ["error", "never"],
      "quote-props": ["error", "consistent"],
      "max-lines": ["error", { max: 3, skipBlankLines: true }],
      "max-lines-per-function": [
        "error",
        { max: 10, skipBlankLines: true, skipComments: true },
      ],
      "no-inline-comments": [
        "error",
        { ignorePattern: "webpackChunkName:\\s.+" },
      ],
      // TypeScript-specific rules
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/prefer-interface": "warn",
      "@typescript-eslint/explicit-function-returns": "warn",
      "@typescript-eslint/no-parameter-reassignment": "warn",
      "@typescript-eslint/no-misused-new": "error",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/no-use-before-define": "error",
      // Prettier integration
      "prettier/prettier": "error",
    },
  },
  eslintConfigPrettier,
];
