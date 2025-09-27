import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "corexAstro",
      fileName: (format) => `render.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["vite", "astro", "jsdom", "fs", "path", "url"],
      output: {
        exports: "default",
      },
    },
    target: "esnext",
    sourcemap: true,
    minify: true,
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
});
