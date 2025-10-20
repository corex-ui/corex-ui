---
title: Theming
description: Corex UI Theming Guide
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

# Theming

Corex UI design system is built to be fully themeable.  
We offer over 10 different themes, each available in **light** and **dark** modes.

## Available Themes

To apply a theme globally, add the following attributes to your `<html>` tag:

```html
<html data-theme="{theme}" data-mode="{mode}"></html>
```

Then, import the desired theme CSS:

```css
@import "@corex-ui/design/themes/neo/light.css";
@import "@corex-ui/design/themes/neo/dark.css";
@import "@corex-ui/design/themes/uno/light.css";
@import "@corex-ui/design/themes/uno/dark.css";
```

## Theme & Mode Switching

Corex UI supports dynamic theme and mode switching using:

- **Select** component for themes
- **Toggle Group** component for modes

We also synchronize all components through the **Machine API** when a value changes.

Finally, an inline script is required to prevent **Flash of Unstyled Content (FOUC)**.

### 1. Add HTML

```html
<div
  id="selecter-theming"
  class="select-js select select--sm"
  data-on-value-change="update-selecter"
  data-close-on-select="false"
>
  <div data-part="root">
    <div data-part="control">
      <div data-part="label">Select theme</div>
      <button data-part="trigger">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          ></path>
        </svg>
      </button>
    </div>
    <div data-part="positioner">
      <ul data-part="content" class="scrollbar">
        <li data-part="item" data-value="neo" class="flex items-center gap-2">
          <span data-part="item-text" data-value="neo">Neo</span>
        </li>
        <li data-part="item" data-value="uno" class="group">
          <span data-part="item-text" data-value="uno">Uno</span>
        </li>
      </ul>
    </div>
  </div>
</div>

<script>
  // Populate current theme from localStorage
  try {
    const theme = localStorage.getItem("data-theme");
    const switcher = document.querySelector("#selecter-theming");
    if (switcher) {
      switcher.setAttribute("data-default-value", theme);
    }
  } catch (_) {}
</script>
```

> Inline script immediately after HTML ensures current values are populated from `localStorage`.

### 2. Add TypeScript

```ts
const ids = ["switcher-theming", "switcher-other"];
const elements = ids
  .map((id) => document.getElementById(id))
  .filter(Boolean) as HTMLElement[];

elements.forEach((el) => {
  el.addEventListener("update-switcher", (event) => {
    const { value } = (event as CustomEvent<{ value: string[] }>).detail;
    const mode = value?.[0] ?? "light";

    document.documentElement.setAttribute("data-mode", mode);
    localStorage.setItem("data-mode", mode);

    const source = event.currentTarget as HTMLElement;
    elements.forEach((other) => {
      if (other !== source) {
        other.dispatchEvent(
          new CustomEvent("toggle-group:set-value", { detail: { value } }),
        );
      }
    });
  });
});

const selecterIds = ["selecter-theming", "selecter-other"];
const selecterElements = selecterIds
  .map((id) => document.getElementById(id))
  .filter(Boolean) as HTMLElement[];

selecterElements.forEach((el) => {
  el.addEventListener("update-selecter", (event) => {
    const { value } = (event as CustomEvent<{ value: string[] }>).detail;
    const theme = value?.[0] ?? "neo";

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("data-theme", theme);

    const source = event.currentTarget as HTMLElement;
    selecterElements.forEach((other) => {
      if (other !== source) {
        other.dispatchEvent(
          new CustomEvent("select:set-value", { detail: { value } }),
        );
      }
    });
  });
});
```

### 3. Add Inline Script to Prevent FOUC

Add this script at the very top of your `<head>`:

```html
<script>
  try {
    const themeStored = localStorage.getItem("data-theme");
    let contrastSuffix = "";

    if (window.matchMedia("(prefers-contrast: more)").matches) {
      contrastSuffix = "-more";
    } else if (window.matchMedia("(prefers-contrast: less)").matches) {
      contrastSuffix = "-less";
    }

    const baseTheme = themeStored ? themeStored.split("-")[0] : "neo";
    const theme = `${baseTheme}${contrastSuffix}`;
    document.documentElement.setAttribute("data-theme", theme);

    if (!themeStored) {
      localStorage.setItem("data-theme", theme);
    }

    const modeStored = localStorage.getItem("data-mode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const mode = modeStored || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-mode", mode);

    if (!modeStored) {
      localStorage.setItem("data-mode", mode);
    }
  } catch (_) {}
</script>
```

### 4. Automatic Mode Switching

If you want to automatically switch modes based on the user’s system preference:

```html
<script>
  try {
    const stored = localStorage.getItem("data-mode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const mode = stored || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-mode", mode);

    if (!stored) {
      localStorage.setItem("data-mode", mode);
    }
  } catch (_) {}
</script>
```

---

This setup ensures that:

- Themes and modes are synchronized across all components.
- User preferences are stored in `localStorage`.
- The page prevents FOUC on load.
- Automatic mode switching respects system preferences.
