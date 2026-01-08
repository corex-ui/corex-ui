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
<div class="qr-code qr-code-js" data-default-value="https://corex-ui.com/">
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

## Data attributes

Each QR Code can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  class="qr-code qr-code-js"
  id="custom-qr-code"
  data-dir="ltr"
  data-pixel-size="8"
  data-default-value="https://corex-ui.com/"
  data-boost-ecc
  data-ecc="M"
  data-invert
  data-mask-pattern="0"
  data-max-version="40"
  data-min-version="1"
>
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

**id**
Type: `string`
Description: Unique id of the QR code. Default generated if none is provided.

**data-dir**
Type: `string`
Description: The text direction of the component. Can be `ltr` or `rtl`.

**data-default-value**
Type: `string`
Description: Initial default value of the QR code when rendered. Use when you don't need to control the value.

**data-pixel-size**
Type: `number`
Description: Size of each QR code pixel/module in pixels.

**data-boost-ecc**
Type: `boolean`
Description: Whether to boost error correction level automatically if needed.

**data-border**
Type: `number`
Description: Size of the quiet zone (border) around the QR code in modules.

**data-ecc**
Type: `"L" | "M" | "Q" | "H"`
Description: Error correction level. Higher levels allow more damage before the code becomes unreadable.

- `L`: ~7% error correction
- `M`: ~15% error correction (default)
- `Q`: ~25% error correction
- `H`: ~30% error correction

**data-invert**
Type: `boolean`
Description: Whether to invert the colors (white becomes black, black becomes white).

**data-mask-pattern**
Type: `number`
Description: Mask pattern to use (0-7). If not specified, the best pattern is automatically selected.

**data-max-version**
Type: `number`
Description: Maximum QR code version (1-40). Higher versions support more data.

**data-min-version**
Type: `number`
Description: Minimum QR code version (1-40).

---

## Event Callbacks

Each QR Code component can receive callbacks that can be used to respond to value changes.

You must add a custom id for the QR code and an event listener for your event name

> Open your browser's console to see the events received when the QR code value changes

```html
<!-- render:preview -->
<div
  id="my-qr-code"
  class="qr-code qr-code-js"
  data-default-value="https://corex-ui.com/"
  data-on-encoded="my-qr-code-event"
>
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

```ts
document
  .getElementById("my-qr-code")
  ?.addEventListener("my-qr-code-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

**data-on-encoded**
Type: `string`
Description: Event name to be sent when the generated QR Code.

---

## Download Trigger

The QR Code component supports a download trigger that allows users to download the QR code as an image.

```html
<!-- render:preview -->
<div class="qr-code qr-code-js" data-default-value="https://corex-ui.com/">
  <div data-part="root">
    <svg data-part="frame">
      <path data-part="pattern" />
    </svg>
    <div data-part="overlay">
      <img src="/logo.svg" alt="" />
    </div>
    <button data-part="downloadTrigger" class="button">Download QR Code</button>
  </div>
</div>
```

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

1. Import and initialize the component

```ts
import { initQrCode } from "@corex-ui/static";
initQrCode();
```

This will initialize all elements with `class="qr-code-js"` and add the necessary interaction behavior.

2. Add styling

The component is **unstyled by default** for maximum customization flexibility.

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/qr-code.css";
```

These styles will be applied to all elements with the `qr-code` class.
