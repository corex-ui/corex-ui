---
title: Vite Installation Guide
description: Corex UI Vite Installation Guide
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

# Vite Installation Guide

Corex UI can be seamlessly integrated into your Vite projects. This guide walks you through installing Corex UI packages, applying styles, using components, and configuring the Corex Vite plugin for post-build hydration.

## 1. New Vite Project

```bash
pnpm create vite@latest corex-vite-demo --template vanilla-ts --no-interactive
cd corex-vite-demo
pnpm install
```

## 2. Install Corex UI

```bash
pnpm add @corex-ui/static @corex-ui/design @corex-ui/vite tailwindcss @tailwindcss/vite
```

**Package Overview:**

- `@corex-ui/static` – Vanilla JS web components.
- `@corex-ui/design` – Design tokens, CSS variables, and optional component styles.
- `@corex-ui/vite` – Post-build hydration for Corex components.
- `tailwindcss` + `@tailwindcss/vite` – Tailwind integration.

## 3. Corex Components

Import Corex components in your `src/main.ts` file:

```ts
import "./style.css";
// Import only the components you need
import "@corex-ui/static/components/accordion";

// Or import all components ONLY during development
// import "@corex-ui/static"
```

## 4. Tailwind Styles

Apply Corex and Tailwind styles in `src/style.css`:

```css
@import "tailwindcss";
@import "@corex-ui/design";
@import "@corex-ui/design/themes/neo/light.css";
@import "@corex-ui/design/components/accordion.css";
@import "@corex-ui/design/components/typo.css";
```

## 5. Vite Plugin

Configure the Vite plugin in `vite.config.js` to hydrate Corex components:

```ts
import { defineConfig } from "vite";
import corex from "@corex-ui/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), corex()],
});
```

**Plugin Features:**

- Executes after Vite finishes building (`closeBundle` hook).
- Scans generated HTML to locate Corex components.
- Hydrates components in a JSDOM instance.
- Writes the hydrated HTML back to disk.

## 6. Component HTML

Ensure your `<html>` tag includes `data-theme="neo"` and `data-mode="light"` in your `index.html` file:

```html
<!doctype html>
<html lang="en" data-theme="neo" data-mode="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Corex UI — Vite Demo</title>
  </head>
  <body class="typo">
    <main>
      <div class="accordion accordion-js">
        <div data-part="root">
          <div data-part="item" data-value="lorem">
            <h3>
              <button data-part="item-trigger" data-value="lorem">
                <span data-part="item-text">Lorem ipsum dolor sit amet</span>
                <span data-part="item-indicator" data-value="lorem">
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
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    ></path>
                  </svg>
                </span>
              </button>
            </h3>
            <div data-part="item-content" data-value="lorem">
              <p>
                Consectetur adipiscing elit. Sed sodales ullamcorper tristique.
                Proin quis risus feugiat tellus iaculis fringilla.
              </p>
            </div>
          </div>
          <div data-part="item" data-value="duis">
            <h3>
              <button data-part="item-trigger" data-value="duis">
                <span data-part="item-text"
                  >Duis dictum gravida odio ac pharetra?</span
                >
                <span data-part="item-indicator" data-value="duis">
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
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    ></path>
                  </svg>
                </span>
              </button>
            </h3>
            <div data-part="item-content" data-value="duis">
              <p>
                Nullam eget vestibulum ligula, at interdum tellus. Quisque
                feugiat, dui ut fermentum sodales, lectus metus dignissim ex.
              </p>
            </div>
          </div>
          <div data-part="item" data-value="donec">
            <h3>
              <button data-part="item-trigger" data-value="donec">
                <span data-part="item-text">Donec condimentum ex mi</span>
                <span data-part="item-indicator" data-value="donec">
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
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    ></path>
                  </svg>
                </span>
              </button>
            </h3>
            <div data-part="item-content" data-value="donec">
              <p>
                Congue molestie ipsum gravida a. Sed ac eros luctus, cursus
                turpis non, pellentesque elit. Pellentesque sagittis fermentum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

## 7. Build App

Now that Corex UI is integrated into your Vite project, you can run it locally, build it for production, and preview the results.

1. Start the dev server:

```bash
pnpm dev
```

Visit the printed URL (usually `http://localhost:5173`).

2. Build production:

```bash
pnpm build
```

During this process, the **Corex Vite plugin runs in the `closeBundle` step**:

- It scans your built HTML for Corex components.
- Hydrates them in a JSDOM instance.
- Writes the updated markup back to disk.

This ensures your Corex web components are **interactive out of the box**, even in the static output.

3. Preview production:

```bash
pnpm preview
```

Visit the printed URL (usually `http://localhost:4173`).  
This serves the optimized files from the `dist/` folder.  
Always preview your build before deployment.
