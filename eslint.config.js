import globals from "globals";

import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  {
    plugins: {
      // You’d typically use one of the following two:
      // typescriptEslint: typescriptEslint,
      // typescriptEslint,
      // But in this example we give it another name.
      // It might be tempting to use something shorter like “ts”:
      ts: typescriptEslint, // 🚨 Don’t do this!
    },
    rules: {
      // With eslintrc, this is _always_ called:
      // @typescript-eslint/indent
      // But in eslint.config.js (flat config), the name chosen above in `plugins` is used.
      "ts/indent": "error", // 🚨 Don’t do this!
    },
    languageOptions: { globals: globals.browser },
  },
  ...compat.extends("standard-with-typescript"),
  someConfig,
  {
    files: ["src/**/*.js"],
    ignores: ["**/*.config.js", "!**/eslint.config.js"],
    rules: {
      indent: "error",
      semi: "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "no-unused-vars": "error",
      "no-undef": "error",
      camelcase: ["error", { ignoreDestructuring: true }],
      "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },
  eslintConfigPrettier,
];
