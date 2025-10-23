---
title: Toggle Group
description: A pure HTML and vanilla JS implementation of Zag JS Toggle Group
author: Netoum
date: 2025-08-20
category: Components
tags:
  - JavaScript
  - Accessibility
  - Toggle Group
  - UI Components
  - ZagJS
---

# Toggle Group

> A pure HTML and vanilla JS implementation of [Zag JS Toggle Group](https://zagjs.com/components/react/toggle-group)

A toggle group is used to toggle either one option or multiple options.

---

## Anatomy

The Toggle Group component consists of the following data parts:

`root`, `item`

```html
<!-- render:preview -->
<div class="toggle-group toggle-group-js">
  <div data-part="root">
    <button
      data-part="item"
      data-value="left"
      class="aspect-square"
      aria-label="align left"
    >
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
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
        />
      </svg>
    </button>
    <button
      data-part="item"
      data-value="center"
      class="aspect-square"
      aria-label="align center"
    >
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
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>
    <button
      data-part="item"
      data-value="right"
      class="aspect-square"
      aria-label="align right"
    >
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
          d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
        />
      </svg>
    </button>
  </div>
</div>
```

---

## Data attributes

Each toggle-group can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  class="toggle-group toggle-group-js"
  data-default-value="underline"
  data-orientation="vertical"
  data-deselectable="true"
  data-loop-focus="false"
  data-rowing-focus="false"
  data-multiple="true"
>
  <div data-part="root">
    <button data-part="item" data-value="bold" class="aspect-square">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linejoin="round"
          d="M6.75 3.744h-.753v8.25h7.125a4.125 4.125 0 0 0 0-8.25H6.75Zm0 0v.38m0 16.122h6.747a4.5 4.5 0 0 0 0-9.001h-7.5v9h.753Zm0 0v-.37m0-15.751h6a3.75 3.75 0 1 1 0 7.5h-6m0-7.5v7.5m0 0v8.25m0-8.25h6.375a4.125 4.125 0 0 1 0 8.25H6.75m.747-15.38h4.875a3.375 3.375 0 0 1 0 6.75H7.497v-6.75Zm0 7.5h5.25a3.75 3.75 0 0 1 0 7.5h-5.25v-7.5Z"
        />
      </svg>
    </button>
    <button data-part="item" data-value="italic" class="aspect-square">
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
          d="M5.248 20.246H9.05m0 0h3.696m-3.696 0 5.893-16.502m0 0h-3.697m3.697 0h3.803"
        />
      </svg>
    </button>
    <button data-part="item" data-value="underline" class="aspect-square">
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
          d="M17.995 3.744v7.5a6 6 0 1 1-12 0v-7.5m-2.25 16.502h16.5"
        />
      </svg>
    </button>
  </div>
</div>
```

**id**  
Type: `string`  
Description: The unique id of the component. Default generated if none is provided.

**data-default-value**  
Type: `string`  
Description: The initial selected toggle-group value/values. Separated by comma.

**data-value**  
Type: `string`
Description: The controlled toggle-group value/values. Separated by comma.

**data-orientation**  
Type: `horizontal` \| `vertical`  
Description: The orientation of the toggle-group.

- `horizontal`: only left and right arrow key navigation will work.
- `vertical`: only up and down arrow key navigation will work.

**data-dir**  
Type: `ltr` \| `rtl`  
Description: The orientation of the toggle-group. Can be `ltr` or `rtl`.

**data-loop-focus**  
Type: `boolean`  
Description: Whether the keyboard navigation will loop from last tab to first, and vice versa.

**data-roving-focus**  
Type: `boolean`  
Description: Whether to use roving tab index to manage focus.

**data-multiple**  
Type: `boolean`  
Description: Whether to allow multiple toggles to be selected.

**data-deselectable**  
Type: `boolean`  
Description: Whether the toggle-group allows empty selection. Note: This is ignored if multiple is true.

**data-disabled**  
Type: `boolean`  
Description: Whether the toggle is disabled.

---

## Event Callbacks

Each toggle-group component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id for the toggle-group and a event listener for your event name

```ts
document
  .getElementById("my-toggle-group")
  ?.addEventListener("my-toggle-group-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

```html
<!-- render:preview -->
<div
  id="my-toggle-group"
  data-on-value-change="my-toggle-group-event"
  class="toggle-group toggle-group-js"
  data-default-value="a"
>
  <div data-part="root">
    <button data-part="item" data-value="a" class="aspect-square">A</button>
    <button data-part="item" data-value="b" class="aspect-square">B</button>
    <button data-part="item" data-value="c" class="aspect-square">C</button>
  </div>
</div>
```

> Open your browser's console to see the events received when the value changes

**data-on-value-change**
Type: `string`
Description: Event name to send when the toggle-group's value changes

---

## API

You can interact with the Toggle Group API by dispatching custom events.

```html
<!-- render:preview -->
<button data-action="toggle-group-set-value" data-value="donec" class="button">
  Set Donec
</button>
<button
  data-action="toggle-group-set-value"
  data-value="donec,duis"
  class="button"
>
  Set Donec and Duis
</button>
<button data-action="toggle-group-value" class="button">
  Get current value
</button>
<div
  id="toggle-group-api"
  class="toggle-group toggle-group-js"
  data-multiple="true"
>
  <div data-part="root">
    <button data-part="item" data-value="lorem">Lorem</button>
    <button data-part="item" data-value="donec">Donec</button>
    <button data-part="item" data-value="duis">Duis</button>
  </div>
</div>
```

```ts
const toggleGroupState = document.getElementById("toggle-group-api");
if (toggleGroupState) {
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="toggle-group-set-value"]',
  );
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      if (value) {
        const values = value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
        toggleGroupState.dispatchEvent(
          new CustomEvent("toggle-group:set-value", {
            detail: { value: values },
          }),
        );
      }
    });
  });
  const getBtns = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="toggle-group-value"]',
  );
  getBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      toggleGroupState.dispatchEvent(
        new CustomEvent("toggle-group:value", {
          detail: {
            callback: (value: string[]) => {
              alert("Toggle Group value: " + JSON.stringify(value));
            },
          },
        }),
      );
    }),
  );
} else {
  console.warn("Element with ID 'toggle-group-api' not found");
}
```

**toggle-group:set-value**
Type: `string[]`
Description: Sets the value of the toggle-group

**toggle-group:value**
Type: `callback`
Description: Get the current value of the toggle-group

---

## RTL

RTL support for toggle-group

```html
<!-- render:preview -->
<div dir="rtl">
  <div
    class="toggle-group toggle-group-js"
    data-default-value="a"
    data-dir="rtl"
  >
    <div data-part="root">
      <button data-part="item" data-value="a">
        لوريم
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
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          ></path>
        </svg>
      </button>
      <button data-part="item" data-value="b">
        شكل
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
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          ></path>
        </svg>
      </button>
      <button data-part="item" data-value="c">
        يمكنك
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
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</div>
```

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

1. Import the Toggle Group component

```ts
import "@corex-ui/static/components/toggle-group";
```

This will automatically initialize all elements with `class="toggle-group-js"` and add the necessary interaction behavior.

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/toggle-group.css";
```

Then apply the base class along with any desired modifiers:

```html
<div class="toggle-group toggle-group-js">
  <div data-part="root"></div>
</div>
```
