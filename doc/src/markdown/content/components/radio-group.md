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

## Data attributes

Each Radio Group can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  class="radio-group radio-group-js"
  id="custom-radio-group"
  data-default-value="item-1"
  data-dir="ltr"
  data-disabled
  data-form="my-form"
  data-name="radio-group"
  data-orientation="vertical"
  data-read-only
  data-value="item-2"
>
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

**id**
Type: `string`
Description: Unique id of the radio group. Default generated if none is provided.

**data-dir**
Type: `string`
Description: The text direction of the component. Can be `ltr` or `rtl`.

**data-orientation**
Type: `string`
Description: The orientation of the radio group. Can be `horizontal` or `vertical` - `horizontal`: only left and right arrow key navigation will work. - `vertical`: only up and down arrow key navigation will work.

**data-default-value**
Type: `string`
Description: Initial default value of the radio group when rendered. Use when you don't need to control the value.

**data-disabled**
Type: `boolean`
Description: Whether the radio group is disabled.

**data-form**
Type: `string`
Description: The id of the associated `<form>` element (for form submission).

**data-name**
Type: `string`
Description: Name attribute for form submissions (all radio items share the same name).

**data-read-only**
Type: `boolean`
Description: Makes the radio group read-only (cannot be changed but not disabled).

**data-value**
Type: `string`
Description: Controlled value of the radio group (used in controlled components).

---

## Event Callbacks

Each Radio Group component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id for the radio group and an event listener for your event name

> Open your browser's console to see the events received when the radio group value changes

```html
<!-- render:preview -->
<div
  id="my-radio-group"
  class="radio-group radio-group-js"
  data-on-value-change="my-radio-group-event"
>
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

```ts
document
  .getElementById("my-radio-group")
  ?.addEventListener("my-radio-group-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

**data-on-value-change**
Type: `string`
Description: Event name to be sent when the radio group value changes.

---

## API

You can interact with the Radio Group API by dispatching custom events.

```html
<!-- render:preview -->
<button data-action="radio-group-set-value" data-value="item-2" class="button">
  Set to Item 2
</button>
<button data-action="radio-group-value" class="button">
  Get current value
</button>
<div
  id="radio-group-api"
  class="radio-group radio-group-js"
  data-default-value="item-1"
>
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

```ts
const radioGroupState = document.getElementById("radio-group-api");
if (radioGroupState) {
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="radio-group-set-value"]',
  );
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      if (value) {
        radioGroupState.dispatchEvent(
          new CustomEvent("radio-group:set-value", {
            detail: { value },
          }),
        );
      }
    });
  });
  const getBtns = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="radio-group-value"]',
  );
  getBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      radioGroupState.dispatchEvent(
        new CustomEvent("radio-group:value", {
          detail: {
            callback: (value: string | null) => {
              alert("Radio Group value: " + (value ?? "none"));
            },
          },
        }),
      );
    }),
  );
} else {
  console.warn("Element with ID 'radio-group-api' not found");
}
```

**radio-group:set-value**
Type: `string`
Description: Sets the value of the radio group

**radio-group:value**
Type: `callback`
Description: Get the current value of the radio group. The callback receives `string | null` (null when no item is selected).

---

## Orientation

By default, the radio group is displayed **vertically**.  
You can also switch it to a **horizontal** layout.

When using the horizontal layout, keyboard navigation changes accordingly:

- **Vertical:** use <kbd>↑</kbd> / <kbd>↓</kbd> to move between items
- **Horizontal:** use <kbd>←</kbd> / <kbd>→</kbd> to move between items

```html
<!-- render:preview -->
<div
  class="radio-group radio-group-js"
  data-orientation="horizontal"
  data-default-value="item-1"
>
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

## RTL

RTL support for radio group

```html
<!-- render:preview -->
<div class="radio-group radio-group-js" data-dir="rtl">
  <div data-part="root">
    <div data-part="label">الخيارات</div>
    <label data-part="item" data-value="item-1">
      <span data-part="item-text">الخيار 1</span>
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
      <span data-part="item-text">الخيار 2</span>
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
      <span data-part="item-text">الخيار 3</span>
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

## Disabled

Each radio group can be disabled either globally or per item.

- To disable the entire radio group, add `data-disabled` to the radio group element.
- To disable a specific item, add `data-disabled` to that item's element.

```html
<!-- render:preview -->
<div class="radio-group radio-group-js" data-disabled>
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
<div class="radio-group radio-group-js">
  <div data-part="root">
    <div data-part="label">Label</div>
    <label data-part="item" data-value="item-1" data-disabled>
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

1. Import and initialize the component

```ts
import { initRadioGroup } from "@corex-ui/static";
initRadioGroup();
```

This will initialize all elements with `class="radio-group-js"` and add the necessary interaction behavior.

2. Add styling

The component is **unstyled by default** for maximum customization flexibility.

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/radio-group.css";
```

These styles will be applied to all elements with the `radio-group` class.
