---
title: Pin Input
description: A pure HTML and vanilla JS implementation of Zag JS Pin Input
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

# Pin Input

> A pure HTML and vanilla JS implementation of [Zag JS Pin Input](https://zagjs.com/components/react/pin-input)

The pin input provides controls for editing, incrementing or decrementing numeric values using the keyboard or pointer.

---

## Anatomy

The Pin Input component consists of the following data parts:

`root`, `control`, `label`, `input`

```html
<!-- render:preview -->
<div class="pin-input pin-input-js">
  <div data-part="root">
    <label data-part="label">Enter Pin</label>
    <div data-part="control">
      <input data-part="input" />
      <input data-part="input" />
      <input data-part="input" />
      <input data-part="input" />
      <input data-part="input" />
    </div>
  </div>
</div>
```

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

1. Import the component

```ts
import "@corex-ui/static/components/pin-input";
```

This will automatically initialize all elements with `class="pin-input-js"` and add the necessary interaction behavior.

2. Add styling

The component is **unstyled by default** for maximum customization flexibility.

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/pin-input.css";
```

These styles will be applied to all elements with the `pin-input` class.
