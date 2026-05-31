import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  oxc: {
    jsx: {
      runtime: "automatic",
      importSource: "react",
    },
  },
  server: {
    port: 3000,
    open: false,
  },
});
