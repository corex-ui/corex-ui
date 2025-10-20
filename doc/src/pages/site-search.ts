import "../main.ts";
import "@corex-ui/static/components/site-search";
import "@corex-ui/design/components/site-search.css";

import { initializeSiteSearch } from "@corex-ui/static/components/site-search";
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
    initializeSiteSearch(pagefind, window.document);
  } catch (error) {
    console.error("Failed to initialize Pagefind:", error);
  }
})();
