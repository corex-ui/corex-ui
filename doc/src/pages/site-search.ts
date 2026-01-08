import "../main.ts";
import { initSiteSearch } from "@corex-ui/static";
import "@corex-ui/design/components/site-search.css";
import type { Pagefind } from "vite-plugin-pagefind/types";
// createInfoToast('Hello', 'This is a toast message');
// createInfoToast('Hello2', 'This is a toast message3');
(async () => {
  try {
    // @ts-expect-error Vanilla JS
    const pagefind: Pagefind = await import("/pagefind/pagefind.js");
    await pagefind.options({
      excerptLength: 5,
      highlightParam: "highlight",
    });
    initSiteSearch(pagefind, window.document);
  } catch (error) {
    console.error("Failed to init Pagefind:", error);
  }
})();
