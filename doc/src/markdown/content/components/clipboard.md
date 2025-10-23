---
title: Clipboard
description: A pure HTML and vanilla JS implementation of Zag JS Clipboard
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

# Clipboard

> A pure HTML and vanilla JS implementation of [Zag JS Clipboard](https://zagjs.com/components/react/clipboard)

The clipboard machine allows users to quickly copy content to clipboard.

---

## Anatomy

The Clipboard component consists of the following data parts:

`root`, `control`, `trigger`, `label`, `input`,`indicator`

To hide and show the icons on copy state you must add `data-copy` and `data-copied` to the respective icons and text

```html
<!-- render:preview -->
<div class="clipboard clipboard-js" data-default-value="info@netoum.com">
  <div data-part="root">
    <label data-part="label">Contact Netoum</label>
    <div data-part="control">
      <input data-part="input" />
      <button data-part="trigger">
        <svg
          data-copy
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          ></path>
        </svg>
        <svg
          data-copied
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 20 20"
          aria-hidden="true"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</div>
<div class="clipboard clipboard-js" data-default-value="info@netoum.com">
  <div data-part="root">
    <label data-part="label">Contact Netoum</label>
    <div data-part="control">
      <input data-part="input" />
      <button data-part="trigger">
        <span data-copy>Copy</span>
        <span data-copied>Copied</span>

        <svg
          data-copy
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          ></path>
        </svg>
        <svg
          data-copied
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 20 20"
          aria-hidden="true"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</div>
```

---

## Data attributes

Each clipboard can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  class="clipboard clipboard-js"
  data-default-value="info@netoum.com"
  data-timeout="500"
>
  <div data-part="root">
    <label data-part="label">Contact Netoum</label>
    <div data-part="control">
      <input data-part="input" />
      <button data-part="trigger">
        <svg
          data-copy
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          ></path>
        </svg>
        <svg
          data-copied
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 20 20"
          aria-hidden="true"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</div>
```

**id**
Type: `string`
Description: Unique id of the clipboard. Default generated if none is provided.

**data-value**
Type: `string`
Description: The controlled value of the clipboard

**data-default-value**
Type: `string`
Description: The initial value to be copied to the clipboard when rendered. Use when you don't need to control the value of the clipboard.

**data-timeout**
Type: `number`
Description: The timeout for the copy operation .

---

## Event Callbacks

Each clipboard component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id for the clipboard and a event listener for your event name

```ts
document
  .getElementById("my-clipboard")
  ?.addEventListener("my-clipboard-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

```html
<!-- render:preview -->
<div
  id="my-clipboard"
  class="clipboard clipboard-js"
  data-default-value="info@netoum.com"
  data-on-status-change="my-clipboard-event"
>
  <div data-part="root">
    <label data-part="label">Contact Netoum</label>
    <div data-part="control">
      <input data-part="input" />
      <button data-part="trigger">
        <svg
          data-copy
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          ></path>
        </svg>
        <svg
          data-copied
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 20 20"
          aria-hidden="true"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</div>
```

> Open your browser's console to see the events received when the clipboard is copied

**data-on-status-change**
Type: `string`
Description: Event name to send when the value is copied to the clipboard

**data-on-value-change**
Type: `string`
Description: Event name to send when the value changes

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

1. Import the Clipboard component

```ts
import "@corex-ui/static/components/clipboard";
```

This will automatically initialize all elements with `class="clipboard-js"` and add the necessary interaction behavior.

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/clipboard.css";
```

Then apply the base class along with any desired modifiers:

```html
<div class="clipboard clipboard-js" data-default-value="info@netoum.com">
  <div data-part="root">
    <label data-part="label">Contact</label>
    <div data-part="control">
      <input data-part="input" />
      <button data-part="trigger"></button>
    </div>
  </div>
</div>
```
