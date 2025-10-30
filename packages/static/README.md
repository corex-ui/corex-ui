# @corex-ui/static

Accessible, unstyled UI components for static websites. HTML and JavaScript powered by TypeScript and ZagJS.

[![Version](https://img.shields.io/npm/v/@corex-ui/static.svg)](https://npmjs.org/package/@corex-ui/static)
[![Downloads/week](https://img.shields.io/npm/dw/@corex-ui/static.svg)](https://npmjs.org/package/@corex-ui/static)

> For the complete Corex UI ecosystem, documentation, and advanced guides, visit [Corex UI Official Docs](https://corex-ui.com).

---

## ✨ Features

- 🔹 Fully accessible and unstyled components
- 🏗️ Prebuilt HTML & JavaScript for static websites
- ⚡ Works in vanilla HTML/JS environments
- 🎯 Powered by [ZagJS](https://zag-js.com) for robust UI behavior
- 📦 Modular: import only the components you need

---

## 📦 Installation

```bash
npm install @corex-ui/static
# or
pnpm add @corex-ui/static
```

---

## 🚀 Usage

### Vanilla Static (HTML + JS)

#### Import a single component (Recommended for production)

```ts
import "@corex-ui/static/components/accordion";
// Initializes Accordion automatically
```

#### Import all components (for development / preview)

```ts
import "@corex-ui/static";
// Initializes all components automatically
```

#### Add the component HTML

```html
<div class="accordion accordion-js">
  <div data-part="root">
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Lorem ipsum dolor sit amet</span>
          <span data-part="item-indicator">
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
      <div data-part="item-content">
        <p>
          Consectetur adipiscing elit. Sed sodales ullamcorper tristique. Proin
          quis risus feugiat tellus iaculis fringilla.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text"
            >Duis dictum gravida odio ac pharetra?</span
          >
          <span data-part="item-indicator">
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
      <div data-part="item-content">
        <p>
          Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat,
          dui ut fermentum sodales, lectus metus dignissim ex.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Donec condimentum ex mi</span>
          <span data-part="item-indicator">
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
      <div data-part="item-content">
        <p>
          Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis
          non, pellentesque elit. Pellentesque sagittis fermentum.
        </p>
      </div>
    </div>
  </div>
</div>
```

---

## 📝 License

[MIT](./LICENSE) © [Netoum.com](https://netoum.com)
