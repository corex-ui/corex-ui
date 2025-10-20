---
title: Astro Installation Guide
description: Corex UI Astro Installation Guide
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

# Astro Installation Guide

Corex UI can be seamlessly integrated into your Astro projects. This guide walks you through installing Corex UI packages, applying styles, using components, and configuring the Corex Astro plugin for post-build hydration.

## 1. New Astro Project

```bash
pnpm create astro@latest corex-astro-demo --yes
cd corex-astro-demo
```

## 2. Install Corex UI

```bash
pnpm add @corex-ui/static @corex-ui/design @corex-ui/astro tailwindcss @tailwindcss/vite
```

**Package Overview:**

- `@corex-ui/static` – Vanilla JS web components.
- `@corex-ui/design` – Design tokens, CSS variables, and optional component styles.
- `@corex-ui/astro` – Post-build hydration for Corex components.
- `tailwindcss` + `@tailwindcss/vite` – Tailwind integration.

## 3. Corex Components

Import Corex components in your `src/pages/index.astro` file:

```astro
---
import Welcome from '../components/Welcome.astro';
import Layout from '../layouts/Layout.astro';
import '../style.css';
---

<Layout>
  <Welcome />
</Layout>

<script>
  import "@corex-ui/static/components/accordion";
</script>
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

## 5. Astro Plugin

Configure the Astro plugin in `astro.config.mjs` to hydrate Corex components:

```ts
// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import corex from "@corex-ui/astro";

export default defineConfig({
  vite: {
    // @ts-expect-error Vanilla JS https://github.com/withastro/roadmap/discussions/1174
    plugins: [tailwindcss()],
  },
  integrations: [corex()],
});
```

**Plugin Features:**

- Executes after Astro finishes building (`closeBundle` hook).
- Scans generated HTML to locate Corex components.
- Hydrates components in a JSDOM instance.
- Writes the hydrated HTML back to disk.

## 6. Component HTML

Ensure your `<html>` tag includes `data-theme="neo"` and `data-mode="light"` in your component file:

```astro
<main>
  <div class="accordion accordion-js">
    <div data-part="root">
      <div data-part="item" data-value="lorem">
        <h3>
          <button data-part="item-trigger" data-value="lorem">
            <span data-part="item-text">Lorem ipsum dolor sit amet</span>
            <span data-part="item-indicator" data-value="lorem">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
              </svg>
            </span>
          </button>
        </h3>
        <div data-part="item-content" data-value="lorem">
          <p>
            Consectetur adipiscing elit. Sed sodales ullamcorper tristique. Proin quis risus feugiat tellus iaculis fringilla.
          </p>
        </div>
      </div>

      <div data-part="item" data-value="duis">
        <h3>
          <button data-part="item-trigger" data-value="duis">
            <span data-part="item-text">Duis dictum gravida odio ac pharetra?</span>
            <span data-part="item-indicator" data-value="duis">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
              </svg>
            </span>
          </button>
        </h3>
        <div data-part="item-content" data-value="duis">
          <p>
            Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat, dui ut fermentum sodales, lectus metus dignissim ex.
          </p>
        </div>
      </div>

      <div data-part="item" data-value="donec">
        <h3>
          <button data-part="item-trigger" data-value="donec">
            <span data-part="item-text">Donec condimentum ex mi</span>
            <span data-part="item-indicator" data-value="donec">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
              </svg>
            </span>
          </button>
        </h3>
        <div data-part="item-content" data-value="donec">
          <p>
            Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis non, pellentesque elit. Pellentesque sagittis fermentum.
          </p>
        </div>
      </div>
    </div>
  </div>
</main>
```

## 7. Layout HTML

Set up your main layout with Corex theming:

```astro
<!doctype html>
<html lang="en" data-theme="neo" data-mode="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <title>Astro Basics</title>
  </head>
  <body class="typo">
    <slot />
  </body>
</html>
```

## 8. Build App

Now that Corex UI is integrated into your Astro project, you can run it locally, build it for production, and preview the results.

1. Start the dev server:

```bash
pnpm dev
```

2. Build production:

```bash
pnpm build
```

During this process, the **Corex Astro plugin runs in the `closeBundle` step**:

- It scans your built HTML for Corex components.
- Hydrates them in a JSDOM instance.
- Writes the updated markup back to disk.

This ensures your Corex web components are **interactive out of the box**, even in the static output.

3. Preview production

To test your production build locally:

```bash
pnpm preview
```

Visit the printed URL (usually `http://localhost:4321`).

This serves the optimized files from the `dist/` folder.  
Always preview your build before deployment
