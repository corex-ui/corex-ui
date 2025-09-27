import { resolve, join } from "path";
import { pathToFileURL } from "url";
import fs from "fs";
import { JSDOM } from "jsdom";
import type { AstroIntegration } from "astro";

interface CorexOptions {
  components?: string[];
  uiDist?: string;
}

export default function corex({
  components,
  uiDist,
}: CorexOptions = {}): AstroIntegration {
  return {
    name: "corex-astro",
    hooks: {
      "astro:build:done": async ({ dir }: { dir: URL }) => {
        const outputDir = dir.pathname;
        console.log("[Corex] Build output dir:", outputDir);
        const distPath = uiDist
          ? resolve(uiDist)
          : (() => {
              try {
                const pkgPath = require.resolve(
                  "@corex-ui/static/package.json",
                  { paths: [process.cwd()] },
                );
                return join(pkgPath, "../dist");
              } catch {
                return resolve(
                  process.cwd(),
                  "node_modules/@corex-ui/static/dist",
                );
              }
            })();

        const componentsDir = join(distPath, "components");
        if (!fs.existsSync(componentsDir)) {
          console.warn(`[Corex] Components dir not found: ${componentsDir}`);
          return;
        }

        // Recursively find HTML files in the build output
        const findHtmlFiles = (dirPath: string): string[] => {
          const htmlFiles: string[] = [];
          for (const item of fs.readdirSync(dirPath, { withFileTypes: true })) {
            const fullPath = join(dirPath, item.name);
            if (item.isDirectory()) htmlFiles.push(...findHtmlFiles(fullPath));
            else if (item.name.endsWith(".html")) htmlFiles.push(fullPath);
          }
          return htmlFiles;
        };

        const htmlFiles = findHtmlFiles(outputDir);
        console.log(`[Corex] HTML files: ${htmlFiles.length}`);

        const files = fs
          .readdirSync(componentsDir)
          .filter((f) => f.endsWith(".mjs") && !f.includes(".map"));

        const targetFiles = components
          ? files.filter((f) =>
              components.includes(f.replace(/(\.min)?\.mjs$/, "")),
            )
          : files;

        for (const htmlFilePath of htmlFiles) {
          await processHtmlFile(htmlFilePath, targetFiles, componentsDir);
        }

        console.log("[Corex] Rendering complete");
      },
    },
  };
}

async function processHtmlFile(
  htmlFilePath: string,
  targetFiles: string[],
  componentsDir: string,
) {
  const htmlContent = fs.readFileSync(htmlFilePath, "utf8");
  const dom = new JSDOM(htmlContent, {
    url: "http://localhost",
    runScripts: "outside-only",
  });
  const document = dom.window.document;

  global.window = dom.window as any;
  global.document = document as any;
  global.HTMLElement = dom.window.HTMLElement as any;
  global.Node = dom.window.Node as any;
  global.CustomEvent = dom.window.CustomEvent as any;
  global.Element = dom.window.Element as any;
  global.getComputedStyle =
    dom.window.getComputedStyle || (() => ({ getPropertyValue: () => "" }));

  let processedCount = 0;

  for (const file of targetFiles) {
    const baseName = file.replace(/(\.min)?\.mjs$/, "");
    const hasComponent =
      document.querySelector(`[data-component="${baseName}"]`) ||
      document.querySelector(`.${baseName}`) ||
      document.querySelector(baseName);
    if (!hasComponent) continue;

    try {
      const moduleUrl =
        pathToFileURL(join(componentsDir, file)).href +
        "?cache_bust=" +
        Date.now();
      const uiModule: any = await import(moduleUrl);

      const initName =
        "initialize" +
        baseName
          .split("-")
          .map((s) => s[0].toUpperCase() + s.slice(1))
          .join("");
      const initFn =
        uiModule[initName] ||
        uiModule.default?.[initName] ||
        uiModule.init ||
        uiModule.default;

      if (typeof initFn !== "function") continue;
      await initFn(document);
      processedCount++;
    } catch (err: any) {
      console.warn(`[Corex] Fail ${baseName}: ${err.message}`);
    }
  }

  if (processedCount > 0) {
    fs.writeFileSync(htmlFilePath, dom.serialize(), "utf8");
    console.log(`[Corex] ${htmlFilePath} → ${processedCount} rendered`);
  }

  dom.window.close();
}
