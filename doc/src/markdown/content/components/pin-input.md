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

## Data attributes

Each Pin Input can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  class="pin-input pin-input-js"
  id="custom-pin-input"
  data-auto-focus
  data-blur-on-complete
  data-default-value="1,2,3,4,5"
  data-dir="ltr"
  data-disabled
  data-form="my-form"
  data-invalid
  data-mask
  data-name="pin"
  data-otp
  data-pattern="[0-9]"
  data-placeholder="0"
  data-read-only
  data-required
  data-select-on-focus
  data-type="numeric"
  data-value="1,2,3,4,5"
>
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

**id**
Type: `string`
Description: Unique id of the pin input. Default generated if none is provided.

**data-dir**
Type: `string`
Description: The text direction of the component. Can be `ltr` or `rtl`.

**data-auto-focus**
Type: `boolean`
Description: Whether to automatically focus the first input on mount.

**data-blur-on-complete**
Type: `boolean`
Description: Whether to blur the input when all fields are filled.

**data-default-value**
Type: `string[]`
Description: Initial default value of the pin input when rendered. Use when you don't need to control the value. Format: comma-separated values (e.g., `"1,2,3,4,5"`).

**data-disabled**
Type: `boolean`
Description: Whether the pin input is disabled.

**data-form**
Type: `string`
Description: The id of the associated `<form>` element (for form submission).

**data-invalid**
Type: `boolean`
Description: Marks the input as invalid (useful for validation styling/ARIA).

**data-mask**
Type: `boolean`
Description: Whether to mask the input values (useful for password-like pins).

**data-name**
Type: `string`
Description: Name attribute for form submissions.

**data-otp**
Type: `boolean`
Description: Whether this is an OTP (One-Time Password) input (affects autocomplete behavior).

**data-pattern**
Type: `string`
Description: Regex pattern to validate each input character.

**data-placeholder**
Type: `string`
Description: Placeholder text for empty inputs.

**data-read-only**
Type: `boolean`
Description: Makes the input read-only (cannot be edited but not disabled).

**data-required**
Type: `boolean`
Description: Marks the input as required for form validation.

**data-select-on-focus**
Type: `boolean`
Description: Whether to select the input value when focused.

**data-type**
Type: `"alphanumeric" | "numeric" | "alphabetic"`
Description: Type of characters allowed in the input.

**data-value**
Type: `string[]`
Description: Controlled value of the pin input (used in controlled components). Format: comma-separated values (e.g., `"1,2,3,4,5"`).

---

## Event Callbacks

Each Pin Input component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id for the pin input and an event listener for your event name

> Open your browser's console to see the events received when the pin input value changes

```html
<!-- render:preview -->
<div
  id="my-pin-input"
  class="pin-input pin-input-js"
  data-on-value-change="my-pin-input-change-event"
  data-on-value-complete="my-pin-input-complete-event"
  data-on-value-invalid="my-pin-input-invalid-event"
>
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

```ts
document
  .getElementById("my-pin-input")
  ?.addEventListener("my-pin-input-change-event", (event) => {
    console.log("Value changed:", (event as CustomEvent).detail);
  });

document
  .getElementById("my-pin-input")
  ?.addEventListener("my-pin-input-complete-event", (event) => {
    console.log("Value complete:", (event as CustomEvent).detail);
  });

document
  .getElementById("my-pin-input")
  ?.addEventListener("my-pin-input-invalid-event", (event) => {
    console.log("Value invalid:", (event as CustomEvent).detail);
  });
```

**data-on-value-change**
Type: `string`
Description: Event name to be sent when the pin input value changes.

**data-on-value-complete**
Type: `string`
Description: Event name to be sent when all pin input fields are filled.

**data-on-value-invalid**
Type: `string`
Description: Event name to be sent when the pin input value is invalid.

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

1. Import and initialize the component

```ts
import { initPinInput } from "@corex-ui/static";
initPinInput();
```

This will initialize all elements with `class="pin-input-js"` and add the necessary interaction behavior.

2. Add styling

The component is **unstyled by default** for maximum customization flexibility.

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/pin-input.css";
```

These styles will be applied to all elements with the `pin-input` class.
