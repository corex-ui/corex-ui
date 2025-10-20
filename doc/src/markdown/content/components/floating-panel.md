---
title: Floating Panel
description: A pure HTML and vanilla JS implementation of Zag JS Floating Panel
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

# Floating Panel

> A pure HTML and vanilla JS implementation of [Zag JS Floating Panel](https://zagjs.com/components/react/floating-panel)

A floating panel is a detachable window that floats above the main interface, typically used for displaying and editing properties. The panel can be dragged, resized, and positioned anywhere on the screen for optimal workflow.

---

## Anatomy

The Floating Panel component consists of the following data parts:

`trigger`, `positioner`, `content`, `drag-trigger`, `header`, `title`, `control`, `stage-trigger`, `close-trigger`, `resize-trigger`, `body`

```html
<!-- render:preview -->
<div class="floating-panel floating-panel-js">
  <button data-part="trigger">
    <span data-open>Open Panel</span>
    <span data-closed>Close Panel</span>
  </button>
  <div data-part="positioner">
    <div data-part="content">
      <div data-part="drag-trigger">
        <div data-part="header">
          <div data-part="title">Floating Panel</div>
          <div data-part="control">
            <button data-part="stage-trigger" data-stage="minimized">
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
                  d="M5 12h14"
                />
              </svg>
            </button>
            <button data-part="stage-trigger" data-stage="maximized">
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
                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                />
              </svg>
            </button>
            <button data-part="stage-trigger" data-stage="default">
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
                  d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
                />
              </svg>
            </button>
            <button data-part="close-trigger">
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
      <div data-part="body">
        <p>
          Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis
          non, pellentesque elit. Pellentesque sagittis fermentum.
        </p>
      </div>
      <div data-part="resize-trigger" data-axis="n"></div>
      <div data-part="resize-trigger" data-axis="e"></div>
      <div data-part="resize-trigger" data-axis="w"></div>
      <div data-part="resize-trigger" data-axis="s"></div>
      <div data-part="resize-trigger" data-axis="ne"></div>
      <div data-part="resize-trigger" data-axis="se"></div>
      <div data-part="resize-trigger" data-axis="sw"></div>
      <div data-part="resize-trigger" data-axis="nw"></div>
    </div>
  </div>
</div>
<div
  class="floating-panel floating-panel-js"
  data-default-position-x="200"
  data-default-position-y="200"
>
  <button data-part="trigger">
    <span data-open>Open Another Panel</span>
    <span data-closed>Close Another Panel</span>
  </button>
  <div data-part="positioner">
    <div data-part="content">
      <div data-part="drag-trigger">
        <div data-part="header">
          <div data-part="title">Floating Panel</div>
          <div data-part="control">
            <button data-part="stage-trigger" data-stage="minimized">
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
                  d="M5 12h14"
                />
              </svg>
            </button>
            <button data-part="stage-trigger" data-stage="maximized">
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
                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                />
              </svg>
            </button>
            <button data-part="stage-trigger" data-stage="default">
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
                  d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
                />
              </svg>
            </button>
            <button data-part="close-trigger">
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
      <div data-part="body">
        <p>
          Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis
          non, pellentesque elit. Pellentesque sagittis fermentum.
        </p>
      </div>
      <div data-part="resize-trigger" data-axis="n"></div>
      <div data-part="resize-trigger" data-axis="e"></div>
      <div data-part="resize-trigger" data-axis="w"></div>
      <div data-part="resize-trigger" data-axis="s"></div>
      <div data-part="resize-trigger" data-axis="ne"></div>
      <div data-part="resize-trigger" data-axis="se"></div>
      <div data-part="resize-trigger" data-axis="sw"></div>
      <div data-part="resize-trigger" data-axis="nw"></div>
    </div>
  </div>
</div>
```

---

## Data attributes

Each floating panel can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  class="floating-panel floating-panel-js"
  data-lock-aspect-ratio="true"
  data-close-on-escape="true"
  data-allow-overflow="false"
  data-default-position-x="200"
  data-default-position-y="200"
  data-min-size-width="300"
  data-min-size-height="300"
  data-grid-size="5"
>
  <button data-part="trigger">
    <span data-open>Open Panel</span>
    <span data-closed>Close Panel</span>
  </button>
  <div data-part="positioner">
    <div data-part="content">
      <div data-part="drag-trigger">
        <div data-part="header">
          <div data-part="title">Floating Panel</div>
          <div data-part="control">
            <button data-part="stage-trigger" data-stage="minimized">
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
                  d="M5 12h14"
                />
              </svg>
            </button>
            <button data-part="stage-trigger" data-stage="maximized">
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
                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                />
              </svg>
            </button>
            <button data-part="stage-trigger" data-stage="default">
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
                  d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
                />
              </svg>
            </button>
            <button data-part="close-trigger">
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
      <div data-part="body">
        <p>
          Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis
          non, pellentesque elit. Pellentesque sagittis fermentum.
        </p>
      </div>
      <div data-part="resize-trigger" data-axis="n"></div>
      <div data-part="resize-trigger" data-axis="e"></div>
      <div data-part="resize-trigger" data-axis="w"></div>
      <div data-part="resize-trigger" data-axis="s"></div>
      <div data-part="resize-trigger" data-axis="ne"></div>
      <div data-part="resize-trigger" data-axis="se"></div>
      <div data-part="resize-trigger" data-axis="sw"></div>
      <div data-part="resize-trigger" data-axis="nw"></div>
    </div>
  </div>
</div>
```

**data-id**  
Type: `string`  
Description: Unique id of the floating panel. Default is auto-generated if not provided.

**data-dir**  
Type: `"ltr" | "rtl"`  
Description: The text direction of the floating panel.

**data-strategy**  
Type: `"absolute" | "fixed"`  
Description: The positioning strategy of the floating panel. Default: `fixed`.

**data-allow-overflow**  
Type: `boolean`  
Description: Whether the panel is allowed to overflow its boundary. Default: `true`.

**data-open**  
Type: `boolean`  
Description: Controlled open state of the panel.

**data-default-open**  
Type: `boolean`  
Description: Initial open state of the panel when rendered. Default: `false`.

**data-draggable**  
Type: `boolean`  
Description: Whether the panel is draggable. Default: `true`.

**data-resizable**  
Type: `boolean`  
Description: Whether the panel is resizable. Default: `true`.

**data-default-size-width**  
Type: `number`  
Description: Default width of the panel.

**data-default-size-height**  
Type: `number`  
Description: Default height of the panel.

**data-size-width**  
Type: `number`  
Description: Current width of the panel.

**data-size-height**  
Type: `number`  
Description: Current height of the panel.

**data-min-size-width**  
Type: `number`  
Description: Minimum width of the panel.

**data-min-size-height**  
Type: `number`  
Description: Minimum height of the panel.

**data-max-size-width**  
Type: `number`  
Description: Maximum width of the panel.

**data-max-size-height**  
Type: `number`  
Description: Maximum height of the panel.

**data-position-x**  
Type: `number`  
Description: Controlled x-coordinate of the panel.

**data-position-y**  
Type: `number`  
Description: Controlled y-coordinate of the panel.

**data-default-position-x**  
Type: `number`  
Description: Default x-coordinate of the panel when rendered.

**data-default-position-y**  
Type: `number`  
Description: Default y-coordinate of the panel when rendered.

**data-lock-aspect-ratio**  
Type: `boolean`  
Description: Whether the panel is locked to its aspect ratio.

**data-close-on-escape**  
Type: `boolean`  
Description: Whether the panel closes when the Escape key is pressed.

**data-disabled**  
Type: `boolean`  
Description: Whether the panel is disabled.

**data-persist-rect**  
Type: `boolean`  
Description: Whether the panel’s size and position are preserved when closed.

**data-grid-size**  
Type: `number`  
Description: Snap grid size for dragging/resizing. Default: `1`.

---

## Event Callbacks

Each floating panel component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id for the floating panel and a event listener for your event name

```ts
document
  .getElementById("my-floating panel")
  ?.addEventListener("my-floating-panel-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

```html
<!-- render:preview -->
<div
  id="my-floating panel"
  class="floating-panel floating-panel-js"
  data-on-position-change-end="my-floating-panel-event"
>
  <button data-part="trigger">
    <span data-open>Open Panel</span>
    <span data-closed>Close Panel</span>
  </button>
  <div data-part="positioner">
    <div data-part="content">
      <div data-part="drag-trigger">
        <div data-part="header">
          <div data-part="title">Floating Panel</div>
          <div data-part="control">
            <button data-part="stage-trigger" data-stage="minimized">
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
                  d="M5 12h14"
                />
              </svg>
            </button>
            <button data-part="stage-trigger" data-stage="maximized">
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
                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                />
              </svg>
            </button>
            <button data-part="stage-trigger" data-stage="default">
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
                  d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
                />
              </svg>
            </button>
            <button data-part="close-trigger">
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
      <div data-part="body">
        <p>
          Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis
          non, pellentesque elit. Pellentesque sagittis fermentum.
        </p>
      </div>
      <div data-part="resize-trigger" data-axis="n"></div>
      <div data-part="resize-trigger" data-axis="e"></div>
      <div data-part="resize-trigger" data-axis="w"></div>
      <div data-part="resize-trigger" data-axis="s"></div>
      <div data-part="resize-trigger" data-axis="ne"></div>
      <div data-part="resize-trigger" data-axis="se"></div>
      <div data-part="resize-trigger" data-axis="sw"></div>
      <div data-part="resize-trigger" data-axis="nw"></div>
    </div>
  </div>
</div>
```

> Open your browser's console to see the events received when the floating panel value changes

**data-on-open-change**  
Type: `string`  
Description: Event name triggered when the panel opens or closes.

**data-on-position-change**  
Type: `string`  
Description: Event name triggered when the panel position changes during dragging.

**data-on-position-change-end**  
Type: `string`  
Description: Event name triggered when the panel position change (dragging) ends.

**data-on-size-change**  
Type: `string`  
Description: Event name triggered when the panel size changes during resizing.

**data-on-size-change-end**  
Type: `string`  
Description: Event name triggered when the panel size change (resizing) ends.

**data-on-stage-change**  
Type: `string`  
Description: Event name triggered when the panel stage changes (`minimized`, `maximized`, or `default`).

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

### Static

1. Import the Floating Panel component

```ts
import "@corex-ui/static/components/floating-panel";
```

This will automatically initialize all elements with `class="floating-panel-js"` and add the necessary interaction behavior.

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/floating-panel.css";
```

Then apply the base class along with any desired modifiers:

```html
<div class="floating-panel floating-panel-js">
  <button data-part="trigger"></button>
  <div data-part="positioner">
    <div data-part="content"></div>
  </div>
</div>
```

### Static React

> Experimental! Only works with React static export (eg. Next.js SSG.)

1. Import the Floating Panel component

```ts
import { FloatingPanel } from '@corex-ui/static/react';
export default function Home() {
  return (
    <FloatingPanel>
      <button data-part="trigger" />
      <div data-part="positioner">
        <div data-part="content" />
      </div>
    </FloatingPanel>
  );
}
```

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/floating-panel.css";
```

Then apply the base class along with any desired modifiers:

```html
<FloatingPanel className="floating-panel"> {/* content */} </FloatingPanel>
```
