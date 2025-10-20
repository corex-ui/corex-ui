import { JSDOM } from "jsdom";
import fs from "fs";
import { join } from "path";
import { pathToFileURL } from "url";
import ResizeObserver from "resize-observer-polyfill";
import "intersection-observer";
export function applyBrowserPolyfills(win: any) {
  const g = globalThis as any;
  g.window = win;
  g.document = win.document;
  g.HTMLElement = win.HTMLElement;
  g.Element = win.Element;
  g.Node = win.Node;
  g.CustomEvent = win.CustomEvent;
  g.Navigator = win.Navigator;
  g.getComputedStyle =
    win.getComputedStyle ||
    (() => ({
      getPropertyValue: () => "",
    }));
  g.ResizeObserver = ResizeObserver;
  g.window.ResizeObserver = ResizeObserver;
  const raf = (cb: FrameRequestCallback) =>
    setTimeout(() => cb(Date.now()), 16);
  g.requestAnimationFrame = win.requestAnimationFrame || raf;
  g.cancelAnimationFrame = win.cancelAnimationFrame || clearTimeout;
  g.window.requestAnimationFrame = g.requestAnimationFrame;
  g.window.cancelAnimationFrame = g.cancelAnimationFrame;
}
export async function processHtmlFile(
  htmlFilePath: string,
  targetFiles: string[],
  componentsDir: string,
) {
  const htmlContent = fs.readFileSync(htmlFilePath, "utf-8");
  const dom = new JSDOM(htmlContent, {
    runScripts: "outside-only",
    url: "http://localhost",
  });
  applyBrowserPolyfills(dom.window);
  let renderedCount = 0;
  for (const file of targetFiles) {
    const baseName = file.replace(/(\.min)?\.mjs$/, "");
    const hasComponent = dom.window.document.querySelector(`.${baseName}-js`);
    if (!hasComponent) continue;
    try {
      const filePath = join(componentsDir, file);
      const fileUrl = pathToFileURL(filePath).href;
      const uiModule: any = await import(`${fileUrl}?cache_bust=${Date.now()}`);
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
      await initFn(dom.window.document);
      renderedCount++;
    } catch (err: any) {
      const msg = err.message || "";
      if (
        msg.includes("IntersectionObserver is not a constructor") ||
        msg.includes("i.IntersectionObserver is not a constructor") ||
        msg.includes("win.IntersectionObserver is not a constructor") ||
        msg.includes("node is `null` or `undefined`")
      ) {
        renderedCount++;
      } else {
        console.warn(`[Corex] Fail ${baseName}: ${msg}`);
      }
    }
  }
  fs.writeFileSync(htmlFilePath, dom.serialize(), "utf-8");
  console.log(`[Corex] ${htmlFilePath} → ${renderedCount} rendered`);
  dom.window.close();
}
/**
 * Recursively finds all HTML files in a directory.
 * @param dirPath Directory to search
 * @returns Array of file paths
 */
export function findHtmlFiles(dirPath: string): string[] {
  const htmlFiles: string[] = [];
  if (!fs.existsSync(dirPath)) return htmlFiles;
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      htmlFiles.push(...findHtmlFiles(fullPath));
    } else if (entry.name.endsWith(".html")) {
      htmlFiles.push(fullPath);
    }
  }
  return htmlFiles;
}
