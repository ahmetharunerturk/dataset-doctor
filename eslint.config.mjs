import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Harness output + scratch dirs:
    "shots/**",
    ".agents/**",
    ".clinerules/**",
    "memory-bank/**",
    "scripts/_sheet-probe.mjs",
    "scripts/screenshots.mjs",
    "node_modules/**",
  ]),
]);

export default eslintConfig;
