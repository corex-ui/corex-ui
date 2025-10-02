import { resolve } from "path";
import fs from "fs";
import { processHtmlFile, findHtmlFiles } from "./utils";
import type { AstroIntegration } from "astro";

interface CorexOptions {
  components?: string[];
  uiDist?: string;
}
export default function corexVitePlugin({
  components,
  uiDist = "dist",
}: CorexOptions = {}): AstroIntegration {
  return {
    name: "corex-astro",
    hooks: {
      "astro:build:done": async () => {
        const outputDir = resolve(uiDist);
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
    },
  };
}
