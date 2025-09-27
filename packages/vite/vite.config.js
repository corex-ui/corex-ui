import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import path from "path"

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "vitePluginCorex",
      fileName: (format) => `vite-corex-render.${format}.js`,
      formats: ["es", "cjs"], // plugin = Node only
    },
    rollupOptions: {
      external: ["vite", "jsdom", "fs", "path", "url"], // keep Node deps external
    },
    target: "esnext",
    sourcemap: true,
    minify: false,
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ["@types/chalk"]
    }),
  ],
})