---
title: Dialog
description: A pure HTML and vanilla JS implementation of Zag JS Dialog
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

# Dialog

> A pure HTML and vanilla JS implementation of [Zag JS Dialog](https://zagjs.com/components/react/dialog)

A dialog is a window overlaid on either the primary window or another dialog window. Content behind a modal dialog is inert, meaning that users cannot interact with it.

---

## Anatomy

The Dialog component consists of the following data parts:

`trigger`, `backdrop`, `positioner`, `content`, `title`, `description`, `close-trigger`

```html
<!-- render:preview -->
<div class="dialog dialog-js">
  <button data-part="trigger" aria-label="Open dialog">Open Dialog</button>
  <div data-part="backdrop"></div>
  <div data-part="positioner">
    <div data-part="content">
      <div data-part="row">
        <h3 data-part="title">Title</h3>
        <button data-part="close-trigger" aria-label="Close dialog">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <p data-part="description">Description</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
        adipiscing elit. Sed sodales ullamcorper tristique. Proin quis risus
        feugiat tellus iaculis fringilla.
      </p>
    </div>
  </div>
</div>
```

---

## Data attributes

Each dialog can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  class="dialog dialog-js"
  id="custom-dialog"
  data-aria-label="My dialog title"
  data-default-open="false"
  data-dir="ltr"
  data-modal="true"
  data-prevent-scroll="false"
  data-restore-focus="false"
  data-trap-focus="true"
  data-close-on-interact-outside="false"
  data-close-on-escape="true"
  data-role="dialog"
>
  <button data-part="trigger" aria-label="Open dialog">Open Dialog</button>
  <div data-part="backdrop"></div>
  <div data-part="positioner">
    <div data-part="content">
      <div data-part="row">
        <h3 data-part="title">Title</h3>
        <button data-part="close-trigger" aria-label="Close dialog">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <p data-part="description">Description</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
        adipiscing elit. Sed sodales ullamcorper tristique. Proin quis risus
        feugiat tellus iaculis fringilla.
      </p>
    </div>
  </div>
</div>
```

**id**  
Type: `string`  
Description: The unique id of the component. Default generated if none is provided.

**data-default-open**  
Type: `string`  
Description: The initial open state of the dialog.

**data-value**  
Type: `string`  
Description: The controlled open state of the dialog.

**data-dir**  
Type: `ltr | rtl`  
Description: The orientation of the dialog. Can be `ltr` or `rtl`.

**data-aria-label**  
Type: `string`  
Description: Human readable label for the dialog, in event the dialog title is not rendered.

**data-modal**  
Type: `boolean`  
Description: Whether to prevent pointer interaction outside the element and hide all content below it.

**data-open**  
Type: `boolean`  
Description: The controlled open state of the dialog.

**data-prevent-scroll**  
Type: `boolean`  
Description: Whether to prevent scrolling behind the dialog when it's opened.

**data-restore-focus**  
Type: `boolean`  
Description: Whether to restore focus to the element that had focus before the dialog was opened.

**data-trap-focus**  
Type: `boolean`  
Description: Whether to trap focus inside the dialog when it's opened.

**data-close-on-interact-outside**  
Type: `boolean`  
Description: Whether to close the dialog when interacting outside it.

**data-close-on-escape**  
Type: `boolean`  
Description: Whether to close the dialog when the escape key is pressed.

**data-role**  
Type: `"dialog" | "alertdialog"`  
Description: The dialog's role.

---

## Event Callbacks

Each dialog component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id and an event listener for your event name

```ts
document
  .getElementById("my-dialog")
  ?.addEventListener("my-dialog-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

```html
<!-- render:preview -->
<div
  id="my-dialog"
  class="dialog dialog-js"
  data-on-open-change="my-dialog-event"
>
  <button data-part="trigger" aria-label="Open dialog">Open Dialog</button>
  <div data-part="backdrop"></div>
  <div data-part="positioner">
    <div data-part="content">
      <div data-part="row">
        <h3 data-part="title">Title</h3>
        <button data-part="close-trigger" aria-label="Close dialog">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <p data-part="description">Description</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
        adipiscing elit. Sed sodales ullamcorper tristique. Proin quis risus
        feugiat tellus iaculis fringilla.
      </p>
    </div>
  </div>
</div>
```

> Open your browser's console to see the events received when you open or close the above dialog

**data-on-open-change**  
Type: `string`  
Description: Event name to send when the dialog's open state changes.

---

## API

You can interact with the dialog API by dispatching custom events.

```html
<!-- render:preview -->
<button data-action="dialog-set-open" data-value="true" class="button">
  Open Dialog
</button>
<div id="dialog-api" class="dialog dialog-js">
  <div data-part="backdrop"></div>
  <div data-part="positioner">
    <div data-part="content">
      <div data-part="row">
        <h3 data-part="title">Title</h3>
        <button data-part="close-trigger" aria-label="Close dialog">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <p data-part="description">Description</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
        adipiscing elit. Sed sodales ullamcorper tristique. Proin quis risus
        feugiat tellus iaculis fringilla.
      </p>
      <div class="flex justify-between">
        <button data-action="dialog-set-open" data-value="false" class="button">
          Cancel
        </button>
        <button
          data-action="dialog-set-open"
          data-value="false"
          class="button button--accent"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</div>
```

```ts
const dialogState = document.getElementById("dialog-api");
if (dialogState) {
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="dialog-set-open"]',
  );
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      if (value !== undefined) {
        const boolValue = value === "true";
        dialogState.dispatchEvent(
          new CustomEvent("dialog:set-open", {
            detail: { value: boolValue },
          }),
        );
      }
    });
  });
} else {
  console.warn("Element with ID 'dialog-api' not found");
}
```

**dialog:set-open**
Type: `boolean`
Description: Sets the open state of the dialog

**dialog:open**
Type: `callback`
Description: Get the current open state of the dialog

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

1. Import the component

```ts
import "@corex-ui/static/components/dialog";
```

This will automatically initialize all elements with `class="dialog-js"` and add the necessary interaction behavior.

2. Add styling

The component is **unstyled by default** for maximum customization flexibility.

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/dialog.css";
```

These styles will be applied to all elements with the `dialog` class.
