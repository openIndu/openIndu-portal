import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "coverage/**",
      "node_modules/**",
      "test-results/**",
      "playwright-report/**",
      "eslint.config.js",
      "*.config.ts",
      // Ad-hoc audit/screenshot helpers — mixed Node + injected-browser code,
      // never imported, never in CI. Most are slated for removal.
      "scripts/**",
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Application source (browser).
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs["recommended-latest"].rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrors: "none" },
      ],
      // Bootstrap: keep visible but non-blocking; burn down in follow-ups.
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // Accessibility lint on JSX.
  {
    ...jsxA11y.flatConfigs.recommended,
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      // `role` is a common component prop name; only lint the real DOM attribute.
      "jsx-a11y/aria-role": ["error", { ignoreNonDOM: true }],
    },
  },

  // shadcn primitives forward children via {...props}; heading content is
  // the caller's responsibility, not the wrapper's.
  {
    files: ["src/app/components/ui/**/*.tsx"],
    rules: { "jsx-a11y/heading-has-content": "off" },
  },

  // Unit tests + setup.
  {
    files: ["src/**/*.{test,spec}.{ts,tsx}", "src/__tests__/**/*.{ts,tsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.vitest } },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },

  // Node-side: e2e specs, build scripts.
  {
    files: ["e2e/**/*.ts", "scripts/**/*.mjs"],
    languageOptions: { globals: { ...globals.node } },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // Must be last — disables stylistic rules that conflict with Prettier.
  prettier,
);
