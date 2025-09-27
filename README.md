# Corex UI

A modern, accessible UI component system built with TypeScript and Zag.js. Framework-agnostic, unstyled by default, and flexible for building web interfaces.

Official documentation at [corex-ui.com](https://corex-ui.com).

---

## 📦 Packages

Corex UI is a monorepo with multiple packages:

- **[@corex-ui/static](./packages/static)** – Vanilla JS/HTML components. Works on any static website
- **[@corex-ui/static/react](./packages/static)** – (Experimental) React wrapper for static site exports (e.g., Next.js SSG)
- **[@corex-ui/design](./packages/design)** – Design tokens, Tailwind v4 configuration and components styling
- **[@corex-ui/cli](./packages/cli)** – CLI tools for rendering components post-build
- **[@corex-ui/vite](./packages/vite)** – Vite integration for rendering components post-build
- **[@corex-ui/astro](./packages/astro)** – Astro integration for rendering components post-build

---

## 🚧 Coming Soon

We are actively working on official integrations for more frameworks and libraries:

- **React (full support beyond static exports)**
- **Svelte**
- **Solid**
- **Vue**
- **Phoenix**

Stay tuned! All new integrations will follow the same accessibility-first, unstyled, and framework-agnostic principles.

---

## 🛠️ Development & Contributing

We welcome contributions! All development happens in a monorepo structure using Node.js >=18 and pnpm.

### Getting Started

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm run build

# Start development playground
pnpm run dev


# Lint and type check
pnpm run lint
pnpm run format
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

