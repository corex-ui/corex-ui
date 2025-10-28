import { defineConfig } from "vite";
import { dirname } from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import corex from "@corex-ui/vite";
import { handlebarsPlugin } from "./vite/handlebars.js";
import { pwaPlugin } from "./vite/pwa.js";
import { rollupInput } from "./vite/rollup.js";
import { sitemapPlugin } from "./vite/sitemap.js";
import { pagefindPlugin } from "./vite/pagefind.js";
import { llms } from "./vite/llms.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default defineConfig(() => ({
  base: "https://corex-ui.com",
  plugins: [
    tailwindcss(),
    llms(),
    handlebarsPlugin(__dirname),
    sitemapPlugin(),
    pagefindPlugin(),
    pwaPlugin(),
    corex(),
  ],
  build: {
    minify: true,
    cssMinify: true,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 550,
    rollupOptions: {
      input: rollupInput(__dirname),
      output: {
        dir: "dist",
        format: "esm",
        manualChunks(id) {
          const componentsPath = "corex-ui/static/components/";
          if (id.includes(componentsPath)) {
            const match = id.split(componentsPath)[1];
            if (match) {
              const componentName = match.split("/")[0];
              return componentName;
            }
          }
        },
      },
      treeshake: true,
    },
  },
}));
