import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import * as tsparser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactNativePlugin from "eslint-plugin-react-native";
import globals from "globals";
import { cwd } from "node:process";

const typescript = {
  files: ["**/*.ts", "**/*.tsx"],
  languageOptions: {
    parser: tsparser,
    parserOptions: {
      project: true,
      tsconfigRootDir: cwd(),
    },
  },
  rules: {
    ...tseslint.configs["recommended"].rules,
  },
};

const javascript = {
  files: ["**/*.js", "**/*.jsx"],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
};

export default [
  {
    ignores: [
      "node_modules/**",
      ".expo/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "*.config.js",
      "babel.config.js",
      "jest.config.js",
    ],
  },
  eslint.configs.recommended,
  typescript,
  javascript,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "react-native": reactNativePlugin,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        React: true,
        JSX: true,
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react-native/no-inline-styles": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-undef": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
