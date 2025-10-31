---
title: QR Code
description: A pure HTML and vanilla JS implementation of Zag JS QR Code
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

# QR Code

> A pure HTML and vanilla JS implementation of [Zag JS QR Code](https://zagjs.com/components/react/qr-code)

QR (Quick Response) Code is used to provide information or link which can be accessed by scanning the code with an app or a smartphone.

---

## Anatomy

The QR Code component consists of the following data parts:

`root`, `frame`, `pattern`, `overlay`, `download-trigger`

```html
<!-- render:preview -->
<div class="qr-code qr-code-js" data-value="https://corex-ui.com/">
  <div data-part="root">
    <svg data-part="frame">
      <path data-part="pattern" />
    </svg>
    <div data-part="overlay">
      <img src="/logo.svg" alt="" />
    </div>
  </div>
</div>
```

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

1. Import the component

```ts
import "@corex-ui/static/components/qr-code";
```

This will automatically initialize all elements with `class="qr-code-js"` and add the necessary interaction behavior.

2. Add styling

The component is **unstyled by default** for maximum customization flexibility.

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/qr-code.css";
```

These styles will be applied to all elements with the `qr-code` class.
