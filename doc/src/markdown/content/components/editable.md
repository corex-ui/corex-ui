---
title: Editable
description: A pure HTML and vanilla JS implementation of Zag JS Editable
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

# Editable

> A pure HTML and vanilla JS implementation of [Zag JS Editable](https://zagjs.com/components/react/editable)

Editable is an input field used for editing a single line of text. It renders as static text and transforms into a text input field when then edit interaction is triggered (click, focus, or double-click).

---

## Anatomy

The Editable component consists of the following data parts:

`root`, `area`, `input`, `preview`, `edit-trigger`, `submit-trigger`, `cancel-trigger`

```html
<!-- render:preview -->
<div class="editable editable-js" data-placeholder="Enter Value">
  <div data-part="root">
    <div data-part="area">
      <input data-part="input" />
      <span data-part="preview"></span>
    </div>
    <div data-part="triggers">
      <button data-part="edit-trigger" aria-label="edit">
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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </button>
      <button data-part="submit-trigger" aria-label="Save">
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
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </button>
      <button data-part="cancel-trigger" aria-label="Cancel">
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
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</div>
```

---

## Data attributes

Each editable can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  class="editable editable-js"
  data-placeholder="Enter Value"
  data-default-value="My custom value"
  data-activation-mode="dblclick"
  data-select-on-focus="true"
>
  <div data-part="root">
    <div data-part="area">
      <input data-part="input" />
      <span data-part="preview"></span>
    </div>
    <div data-part="triggers">
      <button data-part="edit-trigger" aria-label="edit">
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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </button>
      <button data-part="submit-trigger" aria-label="Save">
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
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </button>
      <button data-part="cancel-trigger" aria-label="Cancel">
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
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</div>
```

**data-id**  
Type: `string`  
Description: Unique id of the editable. Default is auto-generated if not provided.

**data-dir**  
Type: `"ltr" | "rtl"`  
Description: The text direction of the editable.

**data-default-value**  
Type: `string`  
Description: The initial value of the editable when rendered (uncontrolled mode).

**data-activation-mode**  
Type: `"focus" | "dblclick" | "click" | "none"`  
Description: Determines how the editable enters edit mode. Default: `focus`.

**data-auto-resize**  
Type: `boolean`  
Description: Whether the editable should auto-resize to fit the content. Default: `false`.

**data-default-edit**  
Type: `boolean`  
Description: Whether the editable starts in edit mode.

**data-disabled**  
Type: `boolean`  
Description: Whether the editable is disabled.

**data-edit**  
Type: `boolean`  
Description: Whether the editable is currently in edit mode (controlled).

**data-form**  
Type: `string`  
Description: The associated form id for the underlying input.

**data-submit-mode**  
Type: `"enter" | "blur" | "both" | "none"`  
Description: Determines what action triggers submit. Default: `both`.

**data-invalid**  
Type: `boolean`  
Description: Marks the editable value as invalid.

**data-max-length**  
Type: `number`  
Description: Maximum number of characters allowed.

**data-name**  
Type: `string`  
Description: The name of the editable, used for form submission.

**data-placeholder**  
Type: `string` or `{ edit: string, preview: string }`  
Description: Placeholder text for input and preview.

**data-read-only**  
Type: `boolean`  
Description: Marks the editable as read-only.

**data-required**  
Type: `boolean`  
Description: Marks the editable as required for form submission.

**data-select-on-focus**  
Type: `boolean`  
Description: Whether to select the text automatically when focused. Default: `true`.

**data-value**  
Type: `string`  
Description: The controlled value of the editable.

---

## Event Callbacks

Each editable component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id for the editable and a event listener for your event name

```ts
document
  .getElementById("my-editable")
  ?.addEventListener("my-editable-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

```html
<!-- render:preview -->
<div
  id="my-editable"
  class="editable editable-js"
  data-placeholder="Enter Value"
  data-on-edit-change="my-editable-event"
>
  <div data-part="root">
    <div data-part="area">
      <input data-part="input" />
      <span data-part="preview"></span>
    </div>
    <div data-part="triggers">
      <button data-part="edit-trigger" aria-label="edit">
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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </button>
      <button data-part="submit-trigger" aria-label="Save">
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
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </button>
      <button data-part="cancel-trigger" aria-label="Cancel">
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
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</div>
```

> Open your browser's console to see the events received when the editable enters or exists edit mode

**data-on-edit-change**  
Type: `string`  
Description: Event name to be sent when the editable enters or exits edit mode.

**data-on-focus-outside**  
Type: `string`  
Description: Event name to be sent when focus moves outside of the editable.

**data-on-interact-outside**  
Type: `string`  
Description: Event name to be sent when an interaction occurs outside of the editable.

**data-on-pointer-down-outside**  
Type: `string`  
Description: Event name to be sent when a pointer is pressed outside of the editable.

**data-on-value-change**  
Type: `string`  
Description: Event name to be sent when the value of the editable changes.

**data-on-value-commit**  
Type: `string`  
Description: Event name to be sent when the value of the editable is committed (submitted).

**data-on-value-revert**  
Type: `string`  
Description: Event name to be sent when the value of the editable is reverted to its previous state.

---

## RTL

RTL support for editable

```html
<!-- render:preview -->
<div class="editable editable-js" data-placeholder="أدخل القيمة" data-dir="rtl">
  <div data-part="root">
    <div data-part="area">
      <input data-part="input" />
      <span data-part="preview"></span>
    </div>
    <div data-part="triggers">
      <button data-part="edit-trigger" aria-label="edit">
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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </button>
      <button data-part="submit-trigger" aria-label="Save">
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
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </button>
      <button data-part="cancel-trigger" aria-label="Cancel">
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
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</div>
```

---

## Modifiers

editables support modifier classes that control their appearance.  
You can combine multiple modifiers on the same editable.

The default modifier is applied automatically, so you don’t need to include it explicitly.

| Modifier      | Description                               |
| ------------- | ----------------------------------------- |
| [Size](#size) | Adjusts the overall size of the editable. |

> You may have noticed the double dash before the modifier name — this follows the BEM (Block Element Modifier) naming convention

### Size

Use `class="editable--{size}"` to set the size of an editable.

Available options:  
**sm**, **md** (default), **lg**, **xl**

```html
<!-- render:preview -->
<div class="editable editable-js editable--sm" data-placeholder="Enter Value">
  <div data-part="root">
    <div data-part="area">
      <input data-part="input" />
      <span data-part="preview"></span>
    </div>
    <div data-part="triggers">
      <button data-part="edit-trigger" aria-label="edit">
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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </button>
      <button data-part="submit-trigger" aria-label="Save">
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
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </button>
      <button data-part="cancel-trigger" aria-label="Cancel">
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
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</div>
<div class="editable editable-js editable--md" data-placeholder="Enter Value">
  <div data-part="root">
    <div data-part="area">
      <input data-part="input" />
      <span data-part="preview"></span>
    </div>
    <div data-part="triggers">
      <button data-part="edit-trigger" aria-label="edit">
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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </button>
      <button data-part="submit-trigger" aria-label="Save">
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
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </button>
      <button data-part="cancel-trigger" aria-label="Cancel">
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
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</div>
<div class="editable editable-js editable--lg" data-placeholder="Enter Value">
  <div data-part="root">
    <div data-part="area">
      <input data-part="input" />
      <span data-part="preview"></span>
    </div>
    <div data-part="triggers">
      <button data-part="edit-trigger" aria-label="edit">
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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </button>
      <button data-part="submit-trigger" aria-label="Save">
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
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </button>
      <button data-part="cancel-trigger" aria-label="Cancel">
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
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</div>
<div class="editable editable-js editable--xl" data-placeholder="Enter Value">
  <div data-part="root">
    <div data-part="area">
      <input data-part="input" />
      <span data-part="preview"></span>
    </div>
    <div data-part="triggers">
      <button data-part="edit-trigger" aria-label="edit">
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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </button>
      <button data-part="submit-trigger" aria-label="Save">
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
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </button>
      <button data-part="cancel-trigger" aria-label="Cancel">
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
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</div>
```

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

1. Import the component

```ts
import "@corex-ui/static/components/editable";
```

This will automatically initialize all elements with `class="editable-js"` and add the necessary interaction behavior.

2. Add styling

The component is **unstyled by default** for maximum customization flexibility.

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/editable.css";
```

These styles will be applied to all elements with the `editable` class.
