---
title: Next SSG Installation
description: Corex UI Next SSG Installation Guide
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

# Next SSG Installation Guide

Corex UI can be seamlessly integrated into your Next.js static site generation (SSG) projects. This guide walks you through installing Corex UI packages, applying styles, using components, and configuring the Corex CLI for post-build hydration.

## 1. New Next SSG Project

```bash
npx create-next-app@latest corex-next-ssg --yes
cd corex-next-ssg
pnpm install
```

Tailwind will be installed automatically by the Next.js CLI.

## 2. Install Corex UI

```bash
pnpm add @corex-ui/static @corex-ui/design @corex-ui/cli serve
```

**Package Overview:**

- `@corex-ui/static` – Vanilla JS web components.
- `@corex-ui/design` – Design tokens, CSS variables, and optional component styles.
- `@corex-ui/cli` – Post-build hydration for Corex components.
- `serve` – Preview server for the Next SSG build.

## 3. Next Configuration

Configure Next.js for static export in `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
};

export default nextConfig;
```

## 4. Tailwind Styles

Apply Corex and Tailwind styles in `src/app/globals.css`:

```css
@import "tailwindcss";
@import "@corex-ui/design";
@import "@corex-ui/design/themes/neo/light.css";
@import "@corex-ui/design/components/accordion.css";
@import "@corex-ui/design/components/typo.css";
```

## 5. Build Scripts

Configure build scripts in `package.json`:

```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build --turbopack && npm run corex",
  "corex": "pnpm corex-ui render dist",
  "preview": "serve dist -l 3000",
  "start": "next start",
  "lint": "eslint"
}
```

**CLI Features:**

- Executes after Next.js finishes building.
- Scans generated HTML to locate Corex components.
- Hydrates components in a JSDOM instance.
- Writes the hydrated HTML back to disk.

## 6. Layout Configuration

Set up your root layout with Corex theming in `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Corex UI — Next SSG Demo",
  description: "Next.js static site with Corex UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="neo" data-mode="light">
      <body className="typo">{children}</body>
    </html>
  );
}
```

## 7. Component Usage

Import and use Corex components in `src/app/page.tsx`:

```tsx
import { Accordion } from "@corex-ui/static/react";

export default function Home() {
  return (
    <main>
      <Accordion className="accordion">
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
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                <span data-part="item-text">
                  Duis dictum gravida odio ac pharetra?
                </span>
                <span data-part="item-indicator" data-value="duis">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
      </Accordion>
    </main>
  );
}
```

## 8. Build App

Now that Corex UI is integrated into your Next SSG project, you can run it locally, build it for production, and preview the results.

1. Start the dev server:

```bash
pnpm dev
```

Visit the printed URL (usually `http://localhost:3000`).

2. Build production:

```bash
pnpm build
```

During this process, the **Corex CLI runs after the build**:

- It scans your built HTML for Corex components.
- Hydrates them in a JSDOM instance.
- Writes the updated markup back to disk.

This ensures your Corex web components are **interactive out of the box**, even in the static output.

3. Preview production:

```bash
pnpm preview
```

Visit the printed URL (usually `http://localhost:3000`).
This serves the optimized files from the `dist/` folder.
Always preview your build before deployment.
