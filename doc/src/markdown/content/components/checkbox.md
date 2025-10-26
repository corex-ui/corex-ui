---
title: Checkbox
description: A pure HTML and vanilla JS implementation of Zag JS Checkbox
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

# Checkbox

> A pure HTML and vanilla JS implementation of [Zag JS Checkbox](https://zagjs.com/components/react/checkbox)

A checkbox allows users to make a binary choice, i.e. a choice between one of two possible mutually exclusive options.

---

## Anatomy

The Checkbox component consists of the following data parts:

`root`, `label`, `hidden-input`, `control`

```html
<!-- render:preview -->
<div class="checkbox checkbox-js">
  <label data-part="root">
    <span data-part="label">Label</span>
    <input data-part="hidden-input" />
    <div data-part="control">
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
        ></path>
      </svg>
      <svg
        data-indeterminate
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5 12h14"
        ></path>
      </svg>
    </div>
  </label>
</div>
```

---

## Data attributes

Each checkbox can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div>
  <div class="checkbox checkbox-js" data-default-checked="true">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <div data-part="control">
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
          ></path>
        </svg>
        <svg
          data-indeterminate
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 12h14"
          ></path>
        </svg>
      </div>
    </label>
  </div>
  <div class="checkbox checkbox-js" data-invalid="true">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <div data-part="control">
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
          ></path>
        </svg>
        <svg
          data-indeterminate
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 12h14"
          ></path>
        </svg>
      </div>
    </label>
  </div>
  <div class="checkbox checkbox-js" data-required="true">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <div data-part="control">
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
          ></path>
        </svg>
        <svg
          data-indeterminate
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 12h14"
          ></path>
        </svg>
      </div>
    </label>
  </div>
  <div class="checkbox checkbox-js" data-checked="indeterminate">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <div data-part="control">
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
          ></path>
        </svg>
        <svg
          data-indeterminate
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 12h14"
          ></path>
        </svg>
      </div>
    </label>
  </div>
</div>
```

**id**
Type: `string`
Description: Unique id of the checkbox. Default generated if none is provided.

**data-dir**
Type: `string`
Description: The orientation of the checkbox. Can be `ltr` or `rtl`.

**data-disabled**
Type: `boolean`
Description: Whether the checkbox is disabled.

**data-invalid**
Type: `boolean`
Description: Whether the checkbox is invalid.

**data-required**
Type: `boolean`
Description: Whether the checkbox is required

**data-read-only**
Type: `boolean`
Description: Whether the checkbox is read only

**data-form**
Type: `string`
Description: The id of the form that the checkbox belongs to.

**data-name**
Type: `string`
Description: The name of the input field in a checkbox. Useful for form submission.

**data-value**
Type: `string`
Description: The value of checkbox input. Useful for form submission. Default to "on"

**data-default-checked**
Type: `boolean || "indeterminate`
Description: The initial checked state of the checkbox

**data-checked**
Type: `boolean || "indeterminate`
Description: The controlled checked state of the checkbox

---

## Event Callbacks

Each checkbox component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id for the checkbox and a event listener for your event name

```ts
document
  .getElementById("my-checkbox")
  ?.addEventListener("my-checkbox-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

```html
<!-- render:preview -->
<div
  id="my-checkbox"
  class="checkbox checkbox-js"
  data-on-checked-change="my-checkbox-event"
>
  <label data-part="root">
    <span data-part="label">Label</span>
    <input data-part="hidden-input" />
    <div data-part="control">
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
        ></path>
      </svg>
      <svg
        data-indeterminate
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5 12h14"
        ></path>
      </svg>
    </div>
  </label>
</div>
```

> Open your browser's console to see the events received when the checked status changes

**data-on-checked-change**
Type: `string`
Description: Event name to be send when the checked state changes.

---

## Form usage

Checkbox can be used inside a form

You must set the id of the form and the name of the Checkbox

`data-form="form-id"`
`data-name="checkbox-name"`

```html
<!-- render:preview -->
<form id="my-form" class="flex flex-col items-center gap-(--spacing-ui-gap)">
  <div
    class="checkbox checkbox-js"
    data-form="my-form"
    data-name="terms"
    data-value="yes"
  >
    <label data-part="root">
      <span data-part="label">Accepts Terms</span>
      <input data-part="hidden-input" />
      <div data-part="control">
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
          ></path>
        </svg>
        <svg
          data-indeterminate
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 12h14"
          ></path>
        </svg>
      </div>
    </label>
  </div>
  <button class="button button--accent" type="submit">Submit</button>
</form>
<div id="result"></div>
```

You can use the results from the form as you wish

```ts
const form = document.getElementById("my-form") as HTMLFormElement | null;
const resultCurrency = document.getElementById(
  "result",
) as HTMLDivElement | null;
if (form && resultCurrency) {
  form.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const formData = new FormData(form);
    const terms = (formData.get("terms") as string) || "none";
    resultCurrency.textContent = `Terms accepted: ${terms}`;
  });
}
```

---

## Modifiers

Checkbox support modifier classes that control their appearance.  
You can combine multiple modifiers on the same checkbox.

The default modifier is applied automatically, so you don’t need to include it explicitly.

| Modifier        | Description                               |
| --------------- | ----------------------------------------- |
| [Color](#color) | Sets the color theme of the checkbox.     |
| [Size](#size)   | Adjusts the overall size of the checkbox. |

> You may have noticed the double dash before the modifier name — this follows the BEM (Block Element Modifier) naming convention

### Color

Use `class="checkbox--{color}"` to set the color of an checkbox.

Available options:  
**accent**, **brand**, **alert**, **info**, **success**

```html
<!-- render:preview -->
<div>
  <div class="checkbox checkbox-js checkbox--accent">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <div data-part="control">
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
          ></path>
        </svg>
        <svg
          data-indeterminate
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 12h14"
          ></path>
        </svg>
      </div>
    </label>
  </div>
  <div class="checkbox checkbox-js checkbox--brand">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <div data-part="control">
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
          ></path>
        </svg>
        <svg
          data-indeterminate
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 12h14"
          ></path>
        </svg>
      </div>
    </label>
  </div>
  <div class="checkbox checkbox-js checkbox--alert">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <div data-part="control">
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
          ></path>
        </svg>
        <svg
          data-indeterminate
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 12h14"
          ></path>
        </svg>
      </div>
    </label>
  </div>
  <div class="checkbox checkbox-js checkbox--info">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <div data-part="control">
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
          ></path>
        </svg>
        <svg
          data-indeterminate
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 12h14"
          ></path>
        </svg>
      </div>
    </label>
  </div>
  <div class="checkbox checkbox-js checkbox--success">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <div data-part="control">
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
          ></path>
        </svg>
        <svg
          data-indeterminate
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 12h14"
          ></path>
        </svg>
      </div>
    </label>
  </div>
</div>
```

---

### Size

Use `class="checkbox--{size}"` to set the size of a checkbox.

Available options:  
**sm**, **md** (default), **lg**, **xl**

```html
<!-- render:preview -->
<div>
  <div class="checkbox checkbox-js checkbox--sm">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <div data-part="control">
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
          ></path>
        </svg>
        <svg
          data-indeterminate
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 12h14"
          ></path>
        </svg>
      </div>
    </label>
  </div>
  <div class="checkbox checkbox-js">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <div data-part="control">
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
          ></path>
        </svg>
        <svg
          data-indeterminate
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 12h14"
          ></path>
        </svg>
      </div>
    </label>
  </div>
  <div class="checkbox checkbox-js checkbox--lg">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <div data-part="control">
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
          ></path>
        </svg>
        <svg
          data-indeterminate
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 12h14"
          ></path>
        </svg>
      </div>
    </label>
  </div>
  <div class="checkbox checkbox-js checkbox--xl">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <div data-part="control">
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
          ></path>
        </svg>
        <svg
          data-indeterminate
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 12h14"
          ></path>
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
import "@corex-ui/static/components/checkbox";
```

This will automatically initialize all elements with `class="checkbox-js"` and add the necessary interaction behavior.

2. Add styling

The component is **unstyled by default** for maximum customization flexibility.

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/checkbox.css";
```

These styles will be applied to all elements with the `checkbox` class.
