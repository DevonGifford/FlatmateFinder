import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactRefresh from "eslint-plugin-react-refresh";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tailwindcss from "eslint-plugin-tailwindcss";
import globals from "globals";

export default [
  {
    ignores: ["dist", "html", "src/components/ui"],
  },
  eslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.browser, ...globals.vitest },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
      "simple-import-sort": simpleImportSort,
      tailwindcss,
    },
    settings: {
      tailwindcss: {
        cssConfigPath: "./src/index.css",
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "tailwindcss/no-contradicting-classname": "error",
    },
  },
];
