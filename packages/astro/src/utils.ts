import { JSDOM } from "jsdom";
import fs from "fs";
import { join } from "path";
import { pathToFileURL } from "url";

const createRaf = (cb: (time: number) => void) =>
  setTimeout(() => cb(Date.now()), 16) as unknown as number;

/* eslint-disable no-undef, n/no-unsupported-features/node-builtins */
interface PolyfillWindow extends Record<string, unknown> {
  CustomEvent: typeof CustomEvent;
  document: Document;
  Element: typeof Element;
  HTMLElement: typeof HTMLElement;
  Node: typeof Node;
}

interface GlobalWithWindow extends Record<string, unknown> {
  CustomEvent: typeof CustomEvent;
  document: Document;
  Element: typeof Element;
  HTMLElement: typeof HTMLElement;
  Node: typeof Node;
  window: PolyfillWindow;
}
/* eslint-enable no-undef, n/no-unsupported-features/node-builtins */

export function applyBrowserPolyfills(win: PolyfillWindow) {
  const g = globalThis as unknown as GlobalWithWindow;

  g.window = win;
  g.document = win.document;
  g.HTMLElement = win.HTMLElement;
  g.Element = win.Element;
  g.Node = win.Node;
  // eslint-disable-next-line n/no-unsupported-features/node-builtins
  g.CustomEvent = win.CustomEvent;

  // eslint-disable-next-line n/no-unsupported-features/node-builtins
  if (!("navigator" in g) || !g.navigator) {
    Object.defineProperty(g, "navigator", {
      configurable: true,
      value: win.navigator || {
        clipboard: {
          async readText() {
            return "";
          },
          async writeText() {},
        },
        userAgent: "node.js",
      },
      writable: true,
    });
  }

  if (!("navigator" in win)) {
    // eslint-disable-next-line n/no-unsupported-features/node-builtins
    (win as Record<string, unknown>).navigator = g.navigator;
  }

  /* eslint-disable no-undef */
  g.getComputedStyle =
    win.getComputedStyle ||
    ((() => ({
      getPropertyValue: () => "",
    })) as unknown as typeof getComputedStyle);
  /* eslint-enable no-undef */

  if (!("IntersectionObserver" in g)) {
    class NoopIntersectionObserver {
      disconnect() {}

      observe() {}

      takeRecords() {
        return [];
      }

      unobserve() {}
    }
    /* eslint-disable no-undef */
    g.IntersectionObserver =
      NoopIntersectionObserver as unknown as typeof IntersectionObserver;
    /* eslint-enable no-undef */
    (win as Record<string, unknown>).IntersectionObserver =
      NoopIntersectionObserver;
  }

  if (!("ResizeObserver" in g)) {
    class NoopResizeObserver {
      disconnect() {}

      observe() {}

      unobserve() {}
    }
    /* eslint-disable no-undef */
    g.ResizeObserver = NoopResizeObserver as unknown as typeof ResizeObserver;
    /* eslint-enable no-undef */
    (win as Record<string, unknown>).ResizeObserver = NoopResizeObserver;
  }

  /* eslint-disable no-undef */
  g.requestAnimationFrame = (win.requestAnimationFrame ||
    createRaf) as typeof requestAnimationFrame;
  g.cancelAnimationFrame = (win.cancelAnimationFrame ||
    clearTimeout) as typeof cancelAnimationFrame;
  /* eslint-enable no-undef */
  (win as Record<string, unknown>).requestAnimationFrame =
    g.requestAnimationFrame;
  (win as Record<string, unknown>).cancelAnimationFrame =
    g.cancelAnimationFrame;
}

export async function processHtmlFile(
  htmlFilePath: string,
  targetFiles: string[],
  componentsDir: string,
) {
  const htmlContent = fs.readFileSync(htmlFilePath, "utf8");
  const dom = new JSDOM(htmlContent, {
    runScripts: "outside-only",
    url: "http://localhost",
  });

  applyBrowserPolyfills(dom.window as unknown as PolyfillWindow);

  let renderedCount = 0;

  for (const file of targetFiles) {
    const baseName = file.replace(/(\.min)?\.mjs$/, "");
    const hasComponent = dom.window.document.querySelector(`.${baseName}-js`);

    if (!hasComponent) continue;

    try {
      const filePath = join(componentsDir, file);
      const fileUrl = pathToFileURL(filePath).href;
      // eslint-disable-next-line no-await-in-loop
      const uiModule: Record<string, unknown> = await import(
        `${fileUrl}?cache_bust=${Date.now()}`
      );
      const initName =
        "initialize" +
        baseName
          .split("-")
          .map((s) => s[0].toUpperCase() + s.slice(1))
          .join("");
      const initFn =
        uiModule[initName] ||
        (uiModule.default as Record<string, unknown>)?.[initName] ||
        uiModule.init ||
        uiModule.default;

      if (typeof initFn !== "function") continue;

      // eslint-disable-next-line no-await-in-loop
      await initFn(dom.window.document);
      renderedCount++;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "";
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

  fs.writeFileSync(htmlFilePath, dom.serialize(), "utf8");
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
