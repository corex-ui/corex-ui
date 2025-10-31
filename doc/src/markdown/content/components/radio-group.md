---
title: Radio Group
description: A pure HTML and vanilla JS implementation of Zag JS Radio Group
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

# Radio Group

> A pure HTML and vanilla JS implementation of [Zag JS Radio Group](https://zagjs.com/components/react/radio-group)

A radio group allows users to make a single choice from a select number of option

---

## Anatomy

The Radio Group component consists of the following data parts:

`root`, `label`, `item`, `item-text`, `item-control`, `item-hidden-input`

```html
<!-- render:preview -->
<div class="radio-group radio-group-js">
  <div data-part="root">
    <div data-part="label">Label</div>
    <label data-part="item">
      <span data-part="item-text">Item 1</span>
      <input data-part="item-hidden-input" />
      <div data-part="item-control">
        <svg
          data-checked
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </div>
    </label>
    <label data-part="item">
      <span data-part="item-text">Item 2</span>
      <input data-part="item-hidden-input" />
      <div data-part="item-control">
        <svg
          data-checked
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </div>
    </label>
    <label data-part="item">
      <span data-part="item-text">Item 3</span>
      <input data-part="item-hidden-input" />
      <div data-part="item-control">
        <svg
          data-checked
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </div>
    </label>
  </div>
</div>
```

---

## Custom values

The Radio Group items can use custom values and ids, this is useful when using the API or setting default values.

`data-value` can be added to each `data-part="item"`

```html
<!-- render:preview -->
<div class="radio-group radio-group-js">
  <div data-part="root">
    <div data-part="label">Label</div>
    <label data-part="item" data-value="item-1">
      <span data-part="item-text">Item 1</span>
      <input data-part="item-hidden-input" />
      <div data-part="item-control">
        <svg
          data-checked
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </div>
    </label>
    <label data-part="item" data-value="item-2">
      <span data-part="item-text">Item 2</span>
      <input data-part="item-hidden-input" />
      <div data-part="item-control">
        <svg
          data-checked
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </div>
    </label>
    <label data-part="item" data-value="item-3">
      <span data-part="item-text">Item 3</span>
      <input data-part="item-hidden-input" />
      <div data-part="item-control">
        <svg
          data-checked
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </div>
    </label>
  </div>
</div>
```

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

1. Import the component

```ts
import "@corex-ui/static/components/radio-group";
```

This will automatically initialize all elements with `class="radio-group-js"` and add the necessary interaction behavior.

2. Add styling

The component is **unstyled by default** for maximum customization flexibility.

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/radio-group.css";
```

These styles will be applied to all elements with the `radio-group` class.
