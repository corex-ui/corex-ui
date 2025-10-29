# Corex UI

A modern, accessible UI component system built with TypeScript and Zag.js. Framework-agnostic, unstyled by default, and flexible for building web interfaces.

Official documentation at [corex-ui.com](https://corex-ui.com).

---

## Packages

Corex UI is a monorepo with multiple packages:

- **[@corex-ui/static](./packages/static)** – Vanilla JS/HTML components. Works on any static website
  [![Version](https://img.shields.io/npm/v/@corex-ui/static.svg)](https://npmjs.org/package/@corex-ui/static)
  [![Downloads/week](https://img.shields.io/npm/dw/@corex-ui/static.svg)](https://npmjs.org/package/@corex-ui/static)

- **[@corex-ui/design](./packages/design)** – Design tokens, Tailwind v4 configuration and components styling
  [![Version](https://img.shields.io/npm/v/@corex-ui/design.svg)](https://npmjs.org/package/@corex-ui/design)
  [![Downloads/week](https://img.shields.io/npm/dw/@corex-ui/design.svg)](https://npmjs.org/package/@corex-ui/design)

- **[@corex-ui/cli](./packages/cli)** – CLI tools for rendering components post-build
  [![Version](https://img.shields.io/npm/v/@corex-ui/cli.svg)](https://npmjs.org/package/@corex-ui/cli)
  [![Downloads/week](https://img.shields.io/npm/dw/@corex-ui/cli.svg)](https://npmjs.org/package/@corex-ui/cli)

- **[@corex-ui/vite](./packages/vite)** – Vite integration for rendering components post-build
  [![Version](https://img.shields.io/npm/v/@corex-ui/vite.svg)](https://npmjs.org/package/@corex-ui/vite)
  [![Downloads/week](https://img.shields.io/npm/dw/@corex-ui/vite.svg)](https://npmjs.org/package/@corex-ui/vite)

- **[@corex-ui/astro](./packages/astro)** – Astro integration for rendering components post-build
  [![Version](https://img.shields.io/npm/v/@corex-ui/astro.svg)](https://npmjs.org/package/@corex-ui/astro)
  [![Downloads/week](https://img.shields.io/npm/dw/@corex-ui/astro.svg)](https://npmjs.org/package/@corex-ui/astro)

---

## Coming Soon

We are actively working on official integrations for more frameworks and libraries:

- **React**
- **Svelte**
- **Solid**
- **Vue**
- **Phoenix**

Stay tuned! All new integrations will follow the same accessibility-first, unstyled, and framework-agnostic principles.

---

## Development & Contributing

We welcome contributions! All development happens in a monorepo structure using Node.js >=18 and pnpm.

### Getting Started

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development
pnpm dev


# Lint and format
pnpm lint
pnpm format

# Test all packages
pnpm test

# Test e2e
pnpm test:e2e
```

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Commit and push your branch
5. Open a Pull Request

---

## 📝 License

[MIT](./LICENSE) © [Netoum.com](https://netoum.com)
