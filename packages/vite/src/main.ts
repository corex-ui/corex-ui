import type { Plugin } from "vite";
import { resolve } from "path";
import fs from "fs";
import { processHtmlFile, findHtmlFiles } from "./utils";

export default function corexVitePlugin({
  components,
  buildDir = "dist",
}: { components?: string[]; buildDir?: string } = {}): Plugin {
  return {
    name: "vite-plugin-corex",
    apply: "build",
    enforce: "post",
    async closeBundle() {
      const outputDir = resolve(buildDir);
      const componentsDir = resolve(
        "node_modules/@corex-ui/static/dist/components",
      );

      if (!fs.existsSync(componentsDir)) {
        console.warn(
          `[Corex] Components directory not found: ${componentsDir}`,
        );
        return;
      }

      const files = fs
        .readdirSync(componentsDir)
        .filter((f) => f.endsWith(".mjs") && !f.includes(".map"));

      const targetFiles = components
        ? files.filter((f) =>
            components.includes(f.replace(/(\.min)?\.mjs$/, "")),
          )
        : files;

      const htmlFiles = findHtmlFiles(outputDir);
      for (const file of htmlFiles) {
        await processHtmlFile(file, targetFiles, componentsDir);
      }
    },
  };
}
