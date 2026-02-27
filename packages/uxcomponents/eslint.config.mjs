import { config } from "@repo/eslint-config/react-internal";
import { defineConfig, globalIgnores } from "eslint/config";

/** @type {import("eslint").Linter.Config} */
export default defineConfig([
  ...config,
  globalIgnores(["dist/**", "storybook-static/**", "node_modules/**", "stories/**"]),
]);
