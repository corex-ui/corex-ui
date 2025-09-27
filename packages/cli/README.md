# @corex-ui/cli

CLI tool for rendering [Corex UI](https://github.com/netoum/corex-ui) **static components post-build**.  
Allows prerendering components in any `dist` folder to static HTML.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)  
[![Version](https://img.shields.io/npm/v/@corex-ui/cli.svg)](https://npmjs.org/package/@corex-ui/cli)  
[![Downloads/week](https://img.shields.io/npm/dw/@corex-ui/cli.svg)](https://npmjs.org/package/@corex-ui/cli)

> For the complete Corex UI ecosystem, documentation, and advanced guides, visit [Corex UI Official Docs](https://corex-ui.com).

---

## ✨ Features

- 🏗️ Renders Corex UI components in generated HTML
- 🎯 Selective rendering: choose which components to render
- ⚡ Works seamlessly with [@corex-ui/static](https://github.com/netoum/corex-ui)

---

## 📦 Installation

Globally:

```bash
npm install -g @corex-ui/cli
```

Or locally:

```bash
npm install --save-dev @corex-ui/cli
```

---

## 🚀 Usage

```bash
corex-ui render <dist> [components...]
```

- `<dist>`: Path to the output folder containing HTML files (**required**)
- `[components...]`: List of components to render. Default: all components

### Examples

```bash
# Render all components in dist/
corex-ui render dist

# Render only "button" and "accordion"
corex-ui render dist button accordion
```

---

## ⚙️ How It Works

1. Scans the specified output folder (`dist/`) for HTML files
2. Loads Corex UI component modules from `node_modules/@corex-ui/static/dist/components`
3. Detects matching component placeholders in HTML
4. Calls each component's `initialize<ComponentName>` function inside a JSDOM instance
5. Writes the modified HTML back to disk

Logs show how many components were rendered per file.

---

## 📝 License

[MIT](./LICENSE) © [Netoum.com](https://netoum.com)
