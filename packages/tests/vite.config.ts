import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
  server: {
    port: 3000,
    open: false,
  },
});
