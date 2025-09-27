# ⚡ Corex UI Design Tokens

> Transform and generate design tokens into a Tailwind CSS v4 configuration.
> For full Corex UI guidelines, design system documentation, and advanced usage, visit [Corex UI Official Docs](https://corex-ui.com).

[![Version](https://img.shields.io/npm/v/@corex-ui/design.svg)](https://www.npmjs.com/package/@corex-ui/design)
[![Downloads/week](https://img.shields.io/npm/dw/@corex-ui/design.svg)](https://www.npmjs.com/package/@corex-ui/design)

---

## ✨ Features

- 🎨 Convert design tokens to Tailwind CSS-ready styles
- 🖌️ Supports semantic tokens, component tokens, themes, and utilities
- ⚡ Automate palette generation and token exports
- 📦 Modular: import only the files you need
- 🔧 Built with Style Dictionary & SD Transforms

---

## 📦 Installation

```bash
npm install @corex-ui/design
# or
pnpm add @corex-ui/design
```

---

## 🚀 Usage

### Build All Tokens and Assets

```bash
npm run build
# generates palette, tokens, and copies necessary files to dist/
```

### Build Single Token File

```bash
npm run build:single
# build from single token JSON + copies assets
```

### Generate Only Palettes or Tokens

```bash
npm run palette
npm run tokens
npm run tokens:single
```

---

## 📁 Available Files

| File / Folder                | Description                               |
| ---------------------------- | ----------------------------------------- |
| `dist/main.css`              | Full compiled Tailwind CSS file           |
| `dist/tokens.css`            | All design tokens                         |
| `dist/utilities.css`         | Tailwind utilities for your design tokens |
| `dist/components.css`        | Component-level token styles              |
| `dist/tokens/semantic/*.css` | Semantic token styles                     |
| `dist/tokens/themes/*.css`   | Theme-specific token styles               |
| `dist/components/*.css`      | Individual component token styles         |

> You can import only the specific files you need for better tree-shaking and smaller bundle sizes.

---

## 🔧 Scripts

| Script                  | Description                                        |
| ----------------------- | -------------------------------------------------- |
| `npm run palette`       | Generate color palette files                       |
| `npm run tokens`        | Generate token files from sources                  |
| `npm run tokens:single` | Generate a single token JSON file                  |
| `npm run copy`          | Copy compiled assets to `dist/`                    |
| `npm run build`         | Run palette, tokens, and copy scripts sequentially |
| `npm run build:single`  | Run single token generation and copy assets        |
| `npm run lint`          | Lint scripts for correctness                       |

---

## ⚠️ Notes

- Designed for Tailwind CSS v4 projects
- Fully modular: import only the files you need
- Built for static, frontend-ready projects

---

## 📝 License

[MIT](./LICENSE) © [Netoum.com](https://netoum.com)
