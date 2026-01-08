---
title: Upgrade Guide
description: Corex UI Upgrade Guide from v0 to v1
author: Netoum
date: 2025-01-20
category: Components
tags:
  - User Interface
  - Accessibility
  - Vanilla JS
  - Corex
  - ZagJS
  - Migration
  - Upgrade
---

# Upgrade Guide

This guide will help you upgrade your Corex UI project from version 0 to version 1. The main change is that components now require manual initialization instead of auto-initializing when imported.

## From v0 to v1

In **v0**, Corex UI components were automatically initialized when you imported them. This made getting started easier, but limited flexibility and control over when and how components were initialized.

In **v1**, you now have full control over component initialization. You import the `initComponentName` functions and call them manually when you're ready. This gives you:

- Better control over initialization timing
- Ability to initialize components in specific DOM contexts
- Custom selector support for finding components
- More predictable behavior and easier debugging

## Breaking Changes

**Before (v0):**

```ts
// Components auto-initialized on import
import "@corex-ui/static/components/accordion";
// Accordion is already initialized
```

**After (v1):**

```ts
// Import the init function
import { initAccordion } from "@corex-ui/static";

// Manually initialize when ready
initAccordion();
```

## Manual Initialization

In v1, each component has a corresponding `initComponentName` function that you import and call. Available init functions include:

- `initAccordion`
- `initTabs`
- `initDialog`
- `initMenu`
- `initSelect`
- `initCheckbox`
- `initSwitch`
- `initRadioGroup`
- ... and many more

You can import individual init functions or use `initAll` to initialize all components at once (useful for development):

```ts
import { initAccordion, initTabs, initDialog } from "@corex-ui/static";

// Initialize specific components
initAccordion();
initTabs();
initDialog();

// Or initialize all components (development only)
import { initAll } from "@corex-ui/static";
initAll();
```

## Init Function Options

All `initComponentName` functions accept two optional parameters:

### 1. `doc` Parameter

The first parameter is the document or element to search within. This allows you to initialize components within a specific DOM context.

- **Type:** `HTMLElement | Document`
- **Default:** `document` (searches the entire document)

```ts
import { initAccordion } from "@corex-ui/static";

// Initialize in the entire document (default)
initAccordion();

// Initialize only within a specific container
const container = document.querySelector("#my-container");
if (container) {
  initAccordion(container);
}

// Initialize within an iframe document
const iframe = document.querySelector("iframe");
if (iframe && iframe.contentDocument) {
  initAccordion(iframe.contentDocument);
}
```

### 2. `selector` Parameter

The second parameter is the CSS selector used to find component root elements. Each component has a default selector, but you can customize it.

- **Type:** `string`
- **Default:** Component-specific (e.g., `".accordion-js"` for accordion, `".tabs-js"` for tabs)

```ts
import { initAccordion } from "@corex-ui/static";

// Use default selector (.accordion-js)
initAccordion();

// Use custom selector
initAccordion(document, ".my-custom-accordion");

// Combine both: custom container + custom selector
const container = document.querySelector("#app");
if (container) {
  initAccordion(container, ".accordion");
}
```

### Function Signature

The complete function signature for all init functions is:

```ts
function initComponentName(
  doc: HTMLElement | Document = document,
  selector: string = ".component-js",
): void;
```

## Migration Examples

### Example 1: Basic Migration

**v0 Code:**

```ts
// main.ts (v0)
import "@corex-ui/static/components/accordion";
import "@corex-ui/static/components/tabs";
```

**v1 Code:**

```ts
// main.ts (v1)
import { initAccordion, initTabs } from "@corex-ui/static";

initAccordion();
initTabs();
```

### Example 2: Dynamic Content

When loading content dynamically (e.g., via AJAX or a router), you can initialize components after the new content is added to the DOM:

```ts
import { initAccordion, initTabs } from "@corex-ui/static";

// Initialize on page load
initAccordion();
initTabs();

// After loading new content dynamically
async function loadPageContent(url: string) {
  const response = await fetch(url);
  const html = await response.text();
  const container = document.querySelector("#content");

  if (container) {
    container.innerHTML = html;
    // Re-initialize components in the new content
    initAccordion(container);
    initTabs(container);
  }
}
```

### Example 3: Custom Selectors

If you're using custom class names instead of the default selectors, you can specify them:

```ts
import { initAccordion } from "@corex-ui/static";

// Your HTML uses .faq-accordion instead of .accordion-js
initAccordion(document, ".faq-accordion");
```

That's it! You've successfully upgraded from v0 to v1. The manual initialization approach gives you more control and flexibility over when and how your components are initialized.
