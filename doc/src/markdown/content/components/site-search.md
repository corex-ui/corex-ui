---
title: Site Search
description: A pure HTML and vanilla JS implementation of Pagefind API and Zag JS Combobox
author: Netoum
date: 2025-08-20
category: Components
tags:
  - User Interface
  - Accessibility
  - Vanilla JS
  - Corex
  - ZagJS
---

# Site Search

> A pure HTML and vanilla JS implementation of [Pagefind API](https://pagefind.app/) and [Zag JS Combobox](https://zagjs.com/components/react/combobox)

It allows indexing and searching static sites without third parties and no database.

---

## Anatomy

The Menu component consists of the following data parts:

`root`, `label`, `control`, `title`, `input`, `trigger`, `positioner`, `content`

```html
<!-- render:preview -->
<div class="site-search-js site-search" data-placeholder="Search documentation">
  <div data-part="root">
    <div data-part="control">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="site-search__icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        ></path>
      </svg>
      <input data-part="input" />
    </div>
    <div data-part="positioner">
      <ul data-part="content" class="scrollbar"></ul>
    </div>
  </div>
</div>
```

---

## Data attributes

Each site-search can be set with different settings with the following data-attribute.

In addition to the [Combobox data attributes](/components/combobox), you can also set:

**data-max-results**  
Type: `number`  
Default: `20`  
Description: The maximum number of results to be displayed.

---

## Usage

Before using Site fearch you will need setup Pagefind

`pnpm i -D pagefind vite-plugin-pagefind`

You can then add vite-plugin-pagefind to your vite config

```js
pagefind({
  outputDirectory: "dist",
  assetsDirectory: "public",
  bundleDirectory: "pagefind",
  buildScript: "build",
  developStrategy: "eager",
});
```

You then need initialize Pagefind

```ts
import { initializeSiteSearch } from "@corex-ui/static/components/site-search";
import type { Pagefind } from "vite-plugin-pagefind/types";

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
```

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

1. Import the component

```ts
import "@corex-ui/static/components/site-search";
```

This will automatically initialize all elements with `class="site-search-js"` and add the necessary interaction behavior.

2. Add styling

The component is **unstyled by default** for maximum customization flexibility.

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/site-search.css";
```

These styles will be applied to all elements with the `site-search` class.
