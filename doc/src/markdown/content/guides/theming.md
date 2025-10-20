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
We offer over different themes, each available in **light** and **dark** modes.

`neo`, `uno`, `duo`, `leo`

## Apply Theme

To apply a theme globally, add the following attributes to your `<html>` tag replacing `neo` and `light` by the theme name and mode:

```html
<html data-theme="neo" data-mode="light"></html>
```

Then, import the desired theme CSS:

```css
@import "@corex-ui/design/themes/neo/light.css";
@import "@corex-ui/design/themes/neo/dark.css";
@import "@corex-ui/design/themes/uno/light.css";
@import "@corex-ui/design/themes/uno/dark.css";
@import "@corex-ui/design/themes/duo/light.css";
@import "@corex-ui/design/themes/duo/dark.css";
@import "@corex-ui/design/themes/leo/light.css";
@import "@corex-ui/design/themes/leo/dark.css";
```

## Theme Switching

Corex UI supports dynamic theme and mode switching using:

- **Select** component for themes
- **Toggle Group** component for modes

We also synchronize all components through the **Machine API** when a value changes.

Finally, an inline script is required to prevent **Flash of Unstyled Content (FOUC)**.

1. Add HTML

```html
<div
  id="selecter-theming"
  class="select-js select select--sm hidden lg:flex"
  data-on-value-change="update-selecter"
  data-close-on-select="false"
  data-no-trigger-update="true"
>
  <div data-part="root" class="max-w-(--container-micro-sm)">
    <div data-part="control" class="max-w-(--container-micro-sm)">
      <div data-part="label" class="sr-only">Select theme</div>
      <button data-part="trigger" class="gap-ui-gap-sm">
        Theme
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
        <li data-part="item" data-value="duo">
          <span data-part="item-text" data-value="duo">Duo</span>
        </li>
        <li data-part="item" data-value="leo">
          <span data-part="item-text" data-value="leo">Leo</span>
        </li>
      </ul>
    </div>
  </div>
</div>
<script>
  try {
    const theme = localStorage.getItem("data-theme");
    console.log;
    const switcher = document.querySelector("#selecter-theming");
    if (switcher && theme) {
      switcher.setAttribute("data-default-value", theme);
    }
  } catch (_) {}
</script>

<div
  id="switcher-theming"
  class="toggle-group toggle-group-js toggle-group--sm hidden lg:flex"
  data-on-value-change="update-switcher"
>
  <div data-part="root" class="rounded-full">
    <button
      data-part="item"
      data-value="dark"
      aria-label="Toggle light mode"
      class="group aspect-square rounded-full data-[state=on]:bg-ui data-[state=on]:text-ui--text p-0"
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="256"
        height="256"
        viewBox="0 0 256 256"
        xml:space="preserve"
      >
        <g
          style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"
          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
        >
          <rect
            x="42"
            y="0"
            rx="0"
            ry="0"
            width="6"
            height="15.79"
            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;"
            transform=" matrix(1 0 0 1 0 0) "
          />
          <rect
            x="42"
            y="74.21"
            rx="0"
            ry="0"
            width="6"
            height="15.79"
            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;"
            transform=" matrix(1 0 0 1 0 0) "
          />
          <rect
            x="0"
            y="42"
            rx="0"
            ry="0"
            width="15.79"
            height="6"
            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;"
            transform=" matrix(1 0 0 1 0 0) "
          />
          <rect
            x="74.21"
            y="42"
            rx="0"
            ry="0"
            width="15.79"
            height="6"
            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;"
            transform=" matrix(1 0 0 1 0 0) "
          />
          <path
            d="M 74.698 11.059 l -15.71 15.71 C 54.99 23.689 50.129 22 45 22 c -12.682 0 -23 10.318 -23 23 c 0 5.13 1.689 9.991 4.769 13.989 L 11.059 74.698 l 4.242 4.242 L 78.94 15.301 L 74.698 11.059 z"
            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;"
            transform=" matrix(1 0 0 1 0 0) "
            stroke-linecap="round"
          />
          <rect
            x="15.76"
            y="10.87"
            rx="0"
            ry="0"
            width="6"
            height="15.79"
            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;"
            transform=" matrix(0.7071 -0.7071 0.7071 0.7071 -7.7721 18.7634) "
          />
          <rect
            x="68.24"
            y="63.34"
            rx="0"
            ry="0"
            width="6"
            height="15.79"
            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;"
            transform=" matrix(0.7071 -0.7071 0.7071 0.7071 -29.5071 71.2363) "
          />
        </g>
      </svg>
    </button>
  </div>
</div>
<script>
  try {
    const mode = localStorage.getItem("data-mode");
    const switcher = document.querySelector("#switcher-theming");
    if (switcher) {
      switcher.setAttribute("data-default-value", mode);
    }
  } catch (_) {}
</script>
```

> Inline script immediately after HTML ensures current values are populated from `localStorage`.

2. Add TypeScript

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

3. Add Inline Script to Prevent FOUC

Add this script at the very top of your `<head>`:

```html
<script>
  try {
    const themeStored = localStorage.getItem("data-theme");
    const theme = themeStored || "neo";
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

## Custom Dark Variant

If you wish to use the Tailwind custom variant such as `dark:` you must add the following to your main css

```css
@custom-variant dark (&:where([data-mode=dark], [data-mode=dark] *));
```

## Automatic Mode Switching

If you want to automatically switch modes based on the user’s system preference you can use the following script

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

This setup ensures that:

- Themes and modes are synchronized across all components.
- User preferences are stored in `localStorage`.
- The page prevents FOUC on load.
- Automatic mode switching respects system preferences.

---
