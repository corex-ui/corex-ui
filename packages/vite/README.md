# @corex-ui/vite

Vite plugin for rendering [Corex UI](https://github.com/netoum/corex-ui) **static components post-build**.
Ensures your Corex UI components are hydrated and rendered into static HTML after Vite builds your project.

[![Version](https://img.shields.io/npm/v/@corex-ui/vite.svg)](https://npmjs.org/package/@corex-ui/vite)
[![Downloads/week](https://img.shields.io/npm/dw/@corex-ui/vite.svg)](https://npmjs.org/package/@corex-ui/vite)

> For the complete Corex UI ecosystem, documentation, and advanced guides, visit [Corex UI Official Docs](https://corex-ui.com).

---

## ✨ Features

- 🔌 Vite integration (`build` hook)
- 🏗️ Renders Corex UI components in generated HTML
- 🎯 Selective rendering: choose which components to render
- ⚡ Works seamlessly with [@corex-ui/static](https://github.com/netoum/corex-ui)

---

## 📦 Installation

```bash
npm install @corex-ui/vite
# or
pnpm add @corex-ui/vite
```

---

## 🚀 Usage

### Minimal usage

```ts
import { defineConfig } from "vite";
import corex from "@corex-ui/vite";

export default defineConfig({
  plugins: [corex()],
});
```

### Usage with options

```ts
import { defineConfig } from "vite";
import corex from "@corex-ui/vite";

export default defineConfig({
  plugins: [
    corex({
      components: ["accordion", "tabs"],
      uiDist: "./node_modules/@corex-ui/static/dist",
      buildDir: "dist",
    }),
  ],
});
```

- `components`: Array of component names to render (default: all)
- `uiDist`: Path to the Corex UI `dist` folder (default: auto-detected)
- `buildDir`: Path to your Vite build output folder (default: `dist`)

---

## ⚙️ Options Table

| Option       | Type       | Default                                              | Description                                                                           |
| ------------ | ---------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `components` | `string[]` | `undefined` (all components)                         | Restrict rendering to a specific set of components. Example: `['accordion', 'tabs']`. |
| `uiDist`     | `string`   | Auto-detected (`node_modules/@corex-ui/static/dist`) | Override the Corex UI distribution directory if located elsewhere.                    |
| `buildDir`   | `string`   | `dist`                                               | Vite output folder where HTML files are rendered.                                     |

---

## 🛠️ Example

```bash
# Render only accordion + tabs after Vite build
vite build
```

**Output logs:**

```
[Corex] Rendering components
[Corex] Components: 5 found
[Corex] HTML files: 12 found
[Corex] dist/index.html → 2 rendered
[Corex] dist/docs/components.html → 1 rendered
[Corex] Rendering complete
```

---

## 📚 How It Works

1. Runs after Vite finishes building (`closeBundle` hook)
2. Scans the output folder (`dist/`) for HTML files
3. Loads Corex UI component modules from `@corex-ui/static/dist/components`
4. Detects matching component placeholders in HTML
5. Calls each component's `initialize<ComponentName>` function inside a JSDOM instance
6. Writes the modified HTML back to disk

---

## 📝 License

[MIT](./LICENSE) © [Netoum.com](https://netoum.com)
