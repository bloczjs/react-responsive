import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: {
    umd: {
      globalName: process.env.npm_package_name,
      outputOptions: { file: "dist/react-responsive.umd.js", globals: { react: "React" } },
    },
    esm: {
      // outputOptions: { dir: "dist", file: "dist/index.cjs", codeSplitting: false },
    },
    cjs: {
      // outputOptions: { dir: "dist", file: "dist/index.cjs", codeSplitting: false },
    },
  },
  dts: true,
  sourcemap: true,
  clean: true,
});
