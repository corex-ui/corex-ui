import { defineConfig } from "vite";
import { resolve } from "path";
import corex from "@corex-ui/vite"

export default defineConfig({
  plugins: [corex()],
  build: {
    outDir: "./dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        accordion: resolve(__dirname, "pages/accordion.html")
      },
    },
  },
});