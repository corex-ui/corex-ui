---
title: Collapsible
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

# Collapsible

> A pure HTML and vanilla JS implementation of [Zag JS Collapsible](https://zagjs.com/components/react/collapsible)

A collapsible is a component which expands and collapses a panel.

---

## Anatomy

The Collapsible component consists of the following data parts:

`root`, `trigger`, `content`, `indicator`

You can choose to switch the trigger content when the collapsible state changes.
You must add `data-open` and `data-closed` to the respective content

```html
<!-- render:preview -->
<div class="collapsible collapsible-js">
  <div data-part="root">
    <button data-part="trigger">
      <span data-open>Open</span>
      <span data-closed>Close</span>
      <span data-part="indicator">
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
      </span>
    </button>
    <div data-part="content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius,
        augue a pulvinar facilisis, eros urna accumsan risus, ut laoreet est
        sapien eu ipsum. Fusce nec quam turpis. Maecenas congue ornare
        vestibulum. Pellentesque vel risus nulla. Suspendisse feugiat est
        tortor, nec efficitur ligula ultricies sed
      </p>
    </div>
  </div>
</div>
```

---

## Data attributes

Each collapsible can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  class="collapsible collapsible-js"
  id="custom-collapsible"
  data-disabled="false"
  data-default-open="true"
>
  <div data-part="root">
    <button data-part="trigger">
      <span data-open>Open</span>
      <span data-closed>Close</span>
      <span data-part="indicator">
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
      </span>
    </button>
    <div data-part="content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius,
        augue a pulvinar facilisis, eros urna accumsan risus, ut laoreet est
        sapien eu ipsum. Fusce nec quam turpis. Maecenas congue ornare
        vestibulum. Pellentesque vel risus nulla. Suspendisse feugiat est
        tortor, nec efficitur ligula ultricies sed
      </p>
    </div>
  </div>
</div>
```

**id**
Type: `string`
Description: Unique id of the collapsible. Default generated if none is provided.

**data-default-open**
Type: `boolean`
Description: The initial open state of the collapsible when rendered. Use when you don't need to control the open state of the collapsible.

**data-open**
Type: `boolean`
Description: The controlled open state of the collapsible.

**data-disabled**
Type: `boolean`
Whether the collapsible is disabled.

---

## Event Callbacks

Each collapsible component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id for the collapsible and a event listener for your event name

> Open your browser's console to see the events received when the collapsible state changes

```html
<!-- render:preview -->
<div
  id="my-collapsible"
  class="collapsible collapsible-js"
  data-on-value-change="my-collapsible-event"
>
  <div data-part="root">
    <button data-part="trigger">
      <span data-open>Open</span>
      <span data-closed>Close</span>
      <span data-part="indicator">
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
      </span>
    </button>
    <div data-part="content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius,
        augue a pulvinar facilisis, eros urna accumsan risus, ut laoreet est
        sapien eu ipsum. Fusce nec quam turpis. Maecenas congue ornare
        vestibulum. Pellentesque vel risus nulla. Suspendisse feugiat est
        tortor, nec efficitur ligula ultricies sed
      </p>
    </div>
  </div>
</div>
```

```ts
document
  .getElementById("my-collapsible")
  ?.addEventListener("my-collapsible-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

**data-on-open-change**  
Type: `string`  
Description: Event name to send when the open state changes

**data-on-exit-complete**  
Type: `string`  
Description: Event name to send when the exit animation completes.

---

## API

You can interact with the Collapsible API by dispatching custom events.

```html
<!-- render:preview -->
<button data-action="collapsible-set-open" data-value="true">
  Open Collapsible
</button>
<button data-action="collapsible-set-open" data-value="false">
  Close Collapsible
</button>
<button data-action="collapsible-get-open">Get open status</button>
<div id="collapsible-api" class="collapsible collapsible-js">
  <div data-part="root">
    <button data-part="trigger">
      <span data-open>Open</span>
      <span data-closed>Close</span>
      <span data-part="indicator">
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
      </span>
    </button>
    <div data-part="content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius,
        augue a pulvinar facilisis, eros urna accumsan risus, ut laoreet est
        sapien eu ipsum. Fusce nec quam turpis. Maecenas congue ornare
        vestibulum. Pellentesque vel risus nulla. Suspendisse feugiat est
        tortor, nec efficitur ligula ultricies sed
      </p>
    </div>
  </div>
</div>
```

```ts
const collapsibleState = document.getElementById("collapsible-api");
if (collapsibleState) {
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="collapsible-set-open"]',
  );
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      if (value) {
        collapsibleState.dispatchEvent(
          new CustomEvent("collapsible:set-open", {
            detail: { value: value },
          }),
        );
      }
    });
  });
  const getBtns = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="collapsible-get-open"]',
  );
  getBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      collapsibleState.dispatchEvent(
        new CustomEvent("collapsible:get-open", {
          detail: {
            callback: (value: string[]) => {
              alert("Collapsible value: " + JSON.stringify(value));
            },
          },
        }),
      );
    }),
  );
} else {
  console.warn("Element with ID 'collapsible-api' not found");
}
```

**collapsible:set-open**
Type: `boolean`
Description: Sets the open state of the collapsible

**collapsible:get-open**
Type: `callback`
Description: Get the current open state of the collapsible

---

## Disabled

Each collapsible can be disabled.

```html
<!-- render:preview -->
<div class="collapsible collapsible-js" data-disabled="true">
  <div data-part="root">
    <button data-part="trigger">
      <span data-open>Open</span>
      <span data-closed>Close</span>
      <span data-part="indicator">
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
      </span>
    </button>
    <div data-part="content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius,
        augue a pulvinar facilisis, eros urna accumsan risus, ut laoreet est
        sapien eu ipsum. Fusce nec quam turpis. Maecenas congue ornare
        vestibulum. Pellentesque vel risus nulla. Suspendisse feugiat est
        tortor, nec efficitur ligula ultricies sed
      </p>
    </div>
  </div>
</div>
```

---

## Modifiers

Collapsibles support modifier classes that control their appearance.  
You can combine multiple modifiers on the same collapsible.

The default modifier is applied automatically, so you don’t need to include it explicitly.

| Modifier        | Description                                  |
| --------------- | -------------------------------------------- |
| [Color](#color) | Sets the color theme of the collapsible.     |
| [Size](#size)   | Adjusts the overall size of the collapsible. |

> You may have noticed the double dash before the modifier name — this follows the BEM (Block Element Modifier) naming convention

### Color

Use `class="collapsible--{color}"` to set the color of an collapsible.

Available options:  
**accent**, **brand**, **alert**, **info**, **success**

```html
<!-- render:preview -->
<div class="collapsible collapsible-js collapsible--accent">
  <div data-part="root">
    <button data-part="trigger">
      <span data-open>Open</span>
      <span data-closed>Close</span>
      <span data-part="indicator">
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
      </span>
    </button>
    <div data-part="content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius,
        augue a pulvinar facilisis, eros urna accumsan risus, ut laoreet est
        sapien eu ipsum. Fusce nec quam turpis. Maecenas congue ornare
        vestibulum. Pellentesque vel risus nulla. Suspendisse feugiat est
        tortor, nec efficitur ligula ultricies sed
      </p>
    </div>
  </div>
</div>
<div class="collapsible collapsible-js collapsible--brand">
  <div data-part="root">
    <button data-part="trigger">
      <span data-open>Open</span>
      <span data-closed>Close</span>
      <span data-part="indicator">
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
      </span>
    </button>
    <div data-part="content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius,
        augue a pulvinar facilisis, eros urna accumsan risus, ut laoreet est
        sapien eu ipsum. Fusce nec quam turpis. Maecenas congue ornare
        vestibulum. Pellentesque vel risus nulla. Suspendisse feugiat est
        tortor, nec efficitur ligula ultricies sed
      </p>
    </div>
  </div>
</div>
<div class="collapsible collapsible-js collapsible--alert">
  <div data-part="root">
    <button data-part="trigger">
      <span data-open>Open</span>
      <span data-closed>Close</span>
      <span data-part="indicator">
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
      </span>
    </button>
    <div data-part="content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius,
        augue a pulvinar facilisis, eros urna accumsan risus, ut laoreet est
        sapien eu ipsum. Fusce nec quam turpis. Maecenas congue ornare
        vestibulum. Pellentesque vel risus nulla. Suspendisse feugiat est
        tortor, nec efficitur ligula ultricies sed
      </p>
    </div>
  </div>
</div>
<div class="collapsible collapsible-js collapsible--info">
  <div data-part="root">
    <button data-part="trigger">
      <span data-open>Open</span>
      <span data-closed>Close</span>
      <span data-part="indicator">
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
      </span>
    </button>
    <div data-part="content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius,
        augue a pulvinar facilisis, eros urna accumsan risus, ut laoreet est
        sapien eu ipsum. Fusce nec quam turpis. Maecenas congue ornare
        vestibulum. Pellentesque vel risus nulla. Suspendisse feugiat est
        tortor, nec efficitur ligula ultricies sed
      </p>
    </div>
  </div>
</div>
<div class="collapsible collapsible-js collapsible--success">
  <div data-part="root">
    <button data-part="trigger">
      <span data-open>Open</span>
      <span data-closed>Close</span>
      <span data-part="indicator">
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
      </span>
    </button>
    <div data-part="content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius,
        augue a pulvinar facilisis, eros urna accumsan risus, ut laoreet est
        sapien eu ipsum. Fusce nec quam turpis. Maecenas congue ornare
        vestibulum. Pellentesque vel risus nulla. Suspendisse feugiat est
        tortor, nec efficitur ligula ultricies sed
      </p>
    </div>
  </div>
</div>
```

---

### Size

Use `class="collapsible--{size}"` to set the size of an collapsible.

Available options:  
**sm**, **md** (default), **lg**, **xl**

```html
<!-- render:preview -->
<div class="collapsible collapsible-js collapsible--sm">
  <div data-part="root">
    <button data-part="trigger">
      <span data-open>Open</span>
      <span data-closed>Close</span>
      <span data-part="indicator">
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
      </span>
    </button>
    <div data-part="content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius,
        augue a pulvinar facilisis, eros urna accumsan risus, ut laoreet est
        sapien eu ipsum. Fusce nec quam turpis. Maecenas congue ornare
        vestibulum. Pellentesque vel risus nulla. Suspendisse feugiat est
        tortor, nec efficitur ligula ultricies sed
      </p>
    </div>
  </div>
</div>
<div class="collapsible collapsible-js">
  <div data-part="root">
    <button data-part="trigger">
      <span data-open>Open</span>
      <span data-closed>Close</span>
      <span data-part="indicator">
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
      </span>
    </button>
    <div data-part="content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius,
        augue a pulvinar facilisis, eros urna accumsan risus, ut laoreet est
        sapien eu ipsum. Fusce nec quam turpis. Maecenas congue ornare
        vestibulum. Pellentesque vel risus nulla. Suspendisse feugiat est
        tortor, nec efficitur ligula ultricies sed
      </p>
    </div>
  </div>
</div>
<div class="collapsible collapsible-js collapsible--lg">
  <div data-part="root">
    <button data-part="trigger">
      <span data-open>Open</span>
      <span data-closed>Close</span>
      <span data-part="indicator">
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
      </span>
    </button>
    <div data-part="content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius,
        augue a pulvinar facilisis, eros urna accumsan risus, ut laoreet est
        sapien eu ipsum. Fusce nec quam turpis. Maecenas congue ornare
        vestibulum. Pellentesque vel risus nulla. Suspendisse feugiat est
        tortor, nec efficitur ligula ultricies sed
      </p>
    </div>
  </div>
</div>
<div class="collapsible collapsible-js collapsible--xl">
  <div data-part="root">
    <button data-part="trigger">
      <span data-open>Open</span>
      <span data-closed>Close</span>
      <span data-part="indicator">
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
      </span>
    </button>
    <div data-part="content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius,
        augue a pulvinar facilisis, eros urna accumsan risus, ut laoreet est
        sapien eu ipsum. Fusce nec quam turpis. Maecenas congue ornare
        vestibulum. Pellentesque vel risus nulla. Suspendisse feugiat est
        tortor, nec efficitur ligula ultricies sed
      </p>
    </div>
  </div>
</div>
```

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

### Static

1. Import the Collapsible component

```ts
import "@corex-ui/static/components/collapsible";
```

This will automatically initialize all elements with `class="collapsible-js"` and add the necessary interaction behavior.

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/collapsible.css";
```

Then apply the base class along with any desired modifiers:

```html
<div class="collapsible collapsible-js">
  <div data-part="root">
    <button data-part="trigger"></button>
    <div data-part="content"></div>
  </div>
</div>
```

### Static React

> Experimental! Only works with React static export (eg. Next.js SSG.)

1. Import the Collapsible component

```ts
import { Collapsible } from '@corex-ui/static/react';
export default function Home() {
  return (
    <Collapsible>
      <div data-part="root">
        <button data-part="trigger" />
        <div data-part="content" />
      </div>
    </Collapsible>
  );
}
```

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/collapsible.css";
```

Then apply the base class along with any desired modifiers:

```html
<Collapsible className="collapsible"> {/* content */} </Collapsible>
```
