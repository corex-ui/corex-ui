---
title: Serve Installation Guide
description: Corex UI Serve Installation Guide
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

# Serve Installation Guide

Corex UI can be seamlessly integrated into your static HTML projects using Serve. This guide walks you through installing Corex UI packages, applying styles, using components, and configuring the Corex CLI for post-build hydration.

## 1. New Serve Project

```bash
mkdir corex-serve-demo && cd corex-serve-demo && pnpm init --init-type module && pnpm add -D serve cpx npm-run-all rimraf && mkdir src && touch src/index.html src/style.css
```

## 2. Install Corex UI

```bash
pnpm add @corex-ui/static @corex-ui/design @corex-ui/cli tailwindcss @tailwindcss/cli
```

**Package Overview:**

- `@corex-ui/static` – Vanilla JS web components.
- `@corex-ui/design` – Design tokens, CSS variables, and optional component styles.
- `@corex-ui/cli` – Post-build hydration for Corex components.
- `tailwindcss` + `@tailwindcss/cli` – Tailwind integration.

## 3. Tailwind Styles

Apply Corex and Tailwind styles in `src/style.css`:

```css
@import "tailwindcss";
@import "@corex-ui/design";
@import "@corex-ui/design/themes/neo/light.css";
@import "@corex-ui/design/components/accordion.css";
@import "@corex-ui/design/components/typo.css";
```

## 4. Build Scripts

Configure build scripts in `package.json`:

```json
"scripts": {
  "clean": "rimraf dist",
  "copy:accordion": "cpx 'node_modules/@corex-ui/static/dist/components/accordion.min.mjs*' dist/js/corex-ui",
  "copy": "cpx 'src/**/*.{html,js,png,jpg,svg,json}' dist && run-s copy:*",
  "tailwind": "npx @tailwindcss/cli -i ./src/style.css -o ./dist/style.css",
  "corex": "pnpm corex-ui render dist",
  "build": "pnpm run clean && pnpm run copy && pnpm run tailwind && pnpm run corex",
  "preview": "npx serve dist -l 3000"
}
```

**CLI Features:**

- Executes after the build process completes.
- Scans generated HTML to locate Corex components.
- Hydrates components in a JSDOM instance.
- Writes the hydrated HTML back to disk.

## 5. Component HTML

Create your main page in `src/index.html` with Corex theming:

```html
<!doctype html>
<html lang="en" data-theme="neo" data-mode="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/logo.svg" />
    <link rel="stylesheet" href="/style.css" />
    <title>Corex UI — Serve Demo</title>
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
    <script type="module" src="/js/corex-ui/accordion.min.mjs"></script>
  </body>
</html>
```

## 6. Build App

Now that Corex UI is integrated into your Serve project, you can build it for production and preview the results.

1. Build production:

```bash
pnpm build
```

During this process, the **Corex CLI runs after the build**:

- It scans your built HTML for Corex components.
- Hydrates them in a JSDOM instance.
- Writes the updated markup back to disk.

This ensures your Corex web components are **interactive out of the box**, even in the static output.

2. Preview production:

```bash
pnpm preview
```

Visit the printed URL (usually `http://localhost:3000`).
This serves the optimized files from the `dist/` folder.
Always preview your build before deployment.
