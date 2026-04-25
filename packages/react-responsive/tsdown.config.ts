import { defineConfig } from "tsdown";

export default defineConfig({
  entry: { "react-responsive": "./src/index.ts" },
  outDir: "lib",
  format: ["esm", "cjs", "umd"],
  platform: "neutral",
  globalName: "@blocz/react-responsive",
  fixedExtension: true,
  dts: true,
  sourcemap: true,
  minify: true,
  clean: true,
  outputOptions: (options, format) => {
    if (format === "umd" || format === "iife") {
      options.globals = { ...options.globals, react: "React" };
    }
    return options;
  },
});
