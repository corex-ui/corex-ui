---
title: Password Input
description: A pure HTML and vanilla JS implementation of Zag JS Password Input
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

# Password Input

> A pure HTML and vanilla JS implementation of [Zag JS Password Input](https://zagjs.com/components/react/password-input)

The password input provides controls for editing, incrementing or decrementing numeric values using the keyboard or pointer.

---

## Anatomy

The Password Input component consists of the following data parts:

`root`, `control`, `label`, `input`, `indicator`, `visibility-trigger`

```html
<!-- render:preview -->
<div
  class="password-input password-input-js"
  data-auto-complete="new-password"
  data-ignore-password-managers
>
  <div data-part="root">
    <label data-part="label">Enter Password</label>
    <div data-part="control">
      <input data-part="input" />
      <button data-part="visibility-trigger">
        <span data-part="indicator">
          <svg
            data-visible
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          <svg
            data-hidden
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        </span>
      </button>
    </div>
  </div>
</div>
```

---

## Data attributes

Each Password Input can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  class="password-input password-input-js"
  id="custom-password-input"
  data-auto-complete="new-password"
  data-default-visible
  data-dir="ltr"
  data-disabled
  data-ignore-password-managers
  data-invalid
  data-name="password"
  data-read-only
  data-required
  data-visible
>
  <div data-part="root">
    <label data-part="label">Enter Password</label>
    <div data-part="control">
      <input data-part="input" />
      <button data-part="visibility-trigger">
        <span data-part="indicator">
          <svg
            data-visible
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          <svg
            data-hidden
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        </span>
      </button>
    </div>
  </div>
</div>
```

**id**
Type: `string`
Description: Unique id of the password input. Default generated if none is provided.

**data-dir**
Type: `string`
Description: The text direction of the component. Can be `ltr` or `rtl`.

**data-auto-complete**
Type: `"current-password" | "new-password"`
Description: Autocomplete attribute value for the input element.

**data-default-visible**
Type: `boolean`
Description: Whether the password is visible by default.

**data-disabled**
Type: `boolean`
Description: Whether the password input is disabled.

**data-ignore-password-managers**
Type: `boolean`
Description: Whether to ignore password managers (prevents autofill).

**data-invalid**
Type: `boolean`
Description: Marks the input as invalid (useful for validation styling/ARIA).

**data-name**
Type: `string`
Description: Name attribute for form submissions.

**data-read-only**
Type: `boolean`
Description: Makes the input read-only (cannot be edited but not disabled).

**data-required**
Type: `boolean`
Description: Marks the input as required for form validation.

**data-visible**
Type: `boolean`
Description: Controlled visibility state of the password (used in controlled components).

---

## Event Callbacks

Each Password Input component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id for the password input and an event listener for your event name

> Open your browser's console to see the events received when the password visibility changes

```html
<!-- render:preview -->
<div
  id="my-password-input"
  class="password-input password-input-js"
  data-on-visibility-change="my-password-input-event"
>
  <div data-part="root">
    <label data-part="label">Enter Password</label>
    <div data-part="control">
      <input data-part="input" />
      <button data-part="visibility-trigger">
        <span data-part="indicator">
          <svg
            data-visible
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          <svg
            data-hidden
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        </span>
      </button>
    </div>
  </div>
</div>
```

```ts
document
  .getElementById("my-password-input")
  ?.addEventListener("my-password-input-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

**data-on-visibility-change**
Type: `string`
Description: Event name to be sent when the password visibility changes.

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

1. Import and initialize the component

```ts
import { initPasswordInput } from "@corex-ui/static";
initPasswordInput();
```

This will initialize all elements with `class="password-input-js"` and add the necessary interaction behavior.

2. Add styling

The component is **unstyled by default** for maximum customization flexibility.

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/password-input.css";
```

These styles will be applied to all elements with the `password-input` class.
