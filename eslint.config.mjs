import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    rules: {
      "semi": ["error", "always"], // Require semicolons
      "prefer-const": "error" // Prefer const when variables are not reassigned
    },
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.node,
      }
    }
  },
]);
