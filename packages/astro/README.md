# @corex-ui/astro

Astro integration for rendering [Corex UI](https://github.com/netoum/corex-ui) **static components post-build**.  
Ensures your Corex UI components are hydrated and rendered into static HTML before deployment.

[![Version](https://img.shields.io/npm/v/@corex-ui/astro.svg)](https://npmjs.org/package/@corex-ui/astro)  
[![Downloads/week](https://img.shields.io/npm/dw/@corex-ui/astro.svg)](https://npmjs.org/package/@corex-ui/astro)

> For the complete Corex UI ecosystem, documentation, and advanced guides, visit [Corex UI Official Docs](https://corex-ui.com).

---

## ✨ Features

- 🔌 Astro integration (`astro:build:done` hook)
- 🏗️ Renders Corex UI components in generated HTML
- 🎯 Selective rendering: choose which components to render
- ⚡ Works seamlessly with [@corex-ui/static](https://github.com/netoum/corex-ui)

---

## 📦 Installation

```bash
npm install @corex-ui/astro
# or
pnpm add @corex-ui/astro
```

---

## 🚀 Usage

### Minimal usage

```ts
import { defineConfig } from "astro/config";
import corex from "@corex-ui/astro";

export default defineConfig({
  integrations: [corex()],
});
```

### Usage with options

```ts
import { defineConfig } from "astro/config";
import corex from "@corex-ui/astro";

export default defineConfig({
  integrations: [
    corex({
      components: ["accordion", "tabs"],
      uiDist: "./node_modules/@corex-ui/static/dist",
    }),
  ],
});
```

- `components`: Array of component names to render (default: all)
- `uiDist`: Path to the Corex UI `dist` folder (default: auto-detected)

---

## ⚙️ Options Table

| Option       | Type       | Default                                              | Description                                                                           |
| ------------ | ---------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `components` | `string[]` | `undefined` (all components)                         | Restrict rendering to a specific set of components. Example: `['accordion', 'tabs']`. |
| `uiDist`     | `string`   | Auto-detected (`node_modules/@corex-ui/static/dist`) | Override the Corex UI distribution directory if located elsewhere.                    |

---

## 🛠️ Example

```bash
# Render only accordion + tabs after Astro build
npm run build
```

**Output logs:**

```bash
[Corex] Build output dir: dist/
[Corex] HTML files: 12
[Corex] dist/index.html → 2 rendered
[Corex] dist/docs/components.html → 1 rendered
[Corex] Rendering complete
```

---

## 📚 How It Works

1. Runs after the build finishes (`astro:build:done`)
2. Scans the output folder (`dist/`) for HTML files
3. Loads Corex UI component modules from `@corex-ui/static/dist/components`
4. Detects matching component placeholders in HTML
5. Calls each component's `init<ComponentName>` function inside a JSDOM instance
6. Writes the modified HTML back to disk

---

## 📝 License

[MIT](./LICENSE) © [Netoum.com](https://netoum.com)
