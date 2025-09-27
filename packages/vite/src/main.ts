import { resolve, join } from "path";
import { pathToFileURL } from "url";
import fs from "fs";
import { JSDOM } from "jsdom";
import type { Plugin } from "vite";

interface CorexOptions {
  components?: string[];
  uiDist?: string;
  buildDir?: string;
}

function logHeader(msg: string) {
  console.log(`[Corex] ${msg}`);
}
function logInfo(msg: string) {
  console.info(`  • ${msg}`);
}
function logWarn(msg: string) {
  console.warn(`  ⚠ ${msg}`);
}
function logSuccess(msg: string) {
  console.log(`  ✓ ${msg}`);
}

export default function corex({
  components,
  uiDist,
  buildDir = "dist",
}: CorexOptions = {}): Plugin | false {
  if (process.env.NODE_ENV !== "production") return false;

  return {
    name: "vite-plugin-prerender-ui",
    apply: "build",

    async closeBundle() {
      logHeader("Rendering components");

      const distPath = uiDist
        ? resolve(uiDist)
        : (() => {
            try {
              const pkgPath = require.resolve("@corex-ui/static/package.json", {
                paths: [process.cwd()],
              });
              return join(pkgPath, "../dist");
            } catch {
              const fallback = resolve(
                process.cwd(),
                "node_modules/@corex-ui/static/dist",
              );
              if (!fs.existsSync(fallback))
                logWarn("Corex not found. Use custom uiDist option.");
              return fallback;
            }
          })();

      const outputDir = resolve(buildDir);
      const componentsDir = join(distPath, "components");
      if (!fs.existsSync(componentsDir))
        return logWarn(`Components dir not found: ${componentsDir}`);
      if (!fs.existsSync(outputDir))
        return logWarn(`Build output dir not found: ${outputDir}`);

      const files = fs
        .readdirSync(componentsDir)
        .filter(
          (f) =>
            f.endsWith(".mjs") &&
            !f.includes(".map") &&
            !f.endsWith(".min.mjs"),
        );
      const targetFiles = components
        ? files.filter((f) =>
            components.includes(f.replace(/(\.min)?\.mjs$/, "")),
          )
        : files;

      logInfo(`Components: ${targetFiles.length} found`);

      const findHtmlFiles = (dir: string): string[] => {
        const htmlFiles: string[] = [];
        if (!fs.existsSync(dir)) return htmlFiles;
        for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
          const fullPath = join(dir, item.name);
          if (item.isDirectory()) htmlFiles.push(...findHtmlFiles(fullPath));
          else if (item.name.endsWith(".html")) htmlFiles.push(fullPath);
        }
        return htmlFiles;
      };

      const htmlFiles = findHtmlFiles(outputDir);
      logInfo(`HTML files: ${htmlFiles.length} found`);

      for (const htmlFilePath of htmlFiles) {
        await processHtmlFile(
          htmlFilePath,
          targetFiles,
          componentsDir,
          outputDir,
        );
      }

      logHeader("Rendering complete");
    },
  };
}

export async function processHtmlFile(
  htmlFilePath: string,
  targetFiles: string[],
  componentsDir: string,
  outputDir: string,
) {
  const fileName =
    htmlFilePath.replace(outputDir, "").replace(/^\//, "") || "index.html";
  let dom: JSDOM | undefined;

  try {
    const htmlContent = fs.readFileSync(htmlFilePath, "utf8");
    dom = new JSDOM(htmlContent, {
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

    if (!global.window.requestAnimationFrame) {
      global.window.requestAnimationFrame = (
        cb: FrameRequestCallback,
      ): number => Number(setTimeout(() => cb(Date.now()), 16)); // ~60fps
      global.window.cancelAnimationFrame = (id: number) => clearTimeout(id);
    }

    if (!globalThis.requestAnimationFrame) {
      globalThis.requestAnimationFrame = global.window.requestAnimationFrame;
      globalThis.cancelAnimationFrame = global.window.cancelAnimationFrame;
    }

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
          uiModule.default?.init ||
          uiModule.default;
        if (typeof initFn !== "function") continue;
        await initFn(document);
        processedCount++;
      } catch (err: any) {
        logWarn(`Fail ${baseName}: ${err.message}`);
      }
    }

    if (processedCount > 0) {
      fs.writeFileSync(htmlFilePath, dom.serialize(), "utf8");
      logSuccess(`${fileName} → ${processedCount} rendered`);
    }
  } catch (error: any) {
    logWarn(`Error ${fileName}: ${error.message}`);
  } finally {
    dom?.window.close();
  }
}
