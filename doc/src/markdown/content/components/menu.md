---
title: Menu
description: A pure HTML and vanilla JS implementation of Zag JS Menu
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

# Menu

> A pure HTML and vanilla JS implementation of [Zag JS Menu](https://zagjs.com/components/react/menu)

An accessible dropdown and context menu that is used to display a list of actions or options that a user can choose.

---

## Anatomy

The Menu component consists of the following data parts:

`trigger`, `context-trigger`, `indicator`, `positioner`, `content`, `separator`, `item`, `item-group`, `item-group-label`

An optional `data-value` and can be added to each `data-part="item"`, this is useful when using the API or setting default values.

```html
<!-- render:preview -->
<div class="menu menu-js">
  <button data-part="trigger">
    File
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
          d="m19.5 8.25-7.5 7.5-7.5-7.5"
        ></path>
      </svg>
    </span>
  </button>
  <div data-part="positioner">
    <ul data-part="content">
      <li data-part="item">New Document</li>
      <li data-part="item">Open</li>
      <li data-part="item">Save</li>
      <div data-part="separator"></div>
      <li data-part="item">Export</li>
      <li data-part="item">Exit</li>
    </ul>
  </div>
</div>
```

---

## Load from JSON

You can initialize the Menu component by embedding your JSON data directly in your HTML using a `<script>` tag with `type="application/json"` and a unique `data-menu` attribute. Then, reference this JSON in your Tree View container via the corresponding `data-json` attribute.

> **Did you know?**  
> You can use the same JSON format and data as the [Tree View Component](/components/tree-view#load-from-json).  
> This allows you for exapmle to render a navigation as a **Tree View** on mobile and as a **Menu** on desktop.

```html
<script type="application/json" data-menu="menu-data">
  {
    "id": "root",
    "name": "",
    "children": [
      {
        "id": "menu",
        "name": "Menu",
        "children": [
          { "id": "menu/item", "name": "Item" },
          {
            "id": "submenu",
            "name": "Sub Menu",
            "children": [
              { "id": "menu/submenu/item", "name": "Item" },
              { "id": "layouts/submenu/item-2", "name": "Item" },
              {
                "id": "nestedmenu",
                "name": "Nested  Menu",

                "children": [
                  { "id": "menu/submenu/nestedmenu/item", "name": "Item" },
                  { "id": "menu/submenu/nestedmenu/item-2", "name": "Item" },

                  {
                    "id": "subnested",
                    "name": "Sub Nested",
                    "children": [
                      {
                        "id": "menu/submenu/nestedmenu/subnested/nested-item",
                        "name": "Nested Item"
                      },
                      {
                        "id": "menu/submenu/nestedmenu/subnested/nested-item-2",
                        "name": "Nested Item"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
</script>
```

```html
<!-- render:preview -->
<div id="menu" class="menu menu-js justify-items-start" data-json="menu-data">
  <div data-part="positioner">
    <ul data-part="content"></ul>
  </div>
</div>
```

---

## Custom values

The Menu items and groups can use custom values and ids, this is useful when using the API or setting default values.

`data-value` can be added to each `data-part="item"`

```html
<!-- render:preview -->
<div id="file" class="menu menu-js">
  <button data-part="trigger">
    File
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
          d="m19.5 8.25-7.5 7.5-7.5-7.5"
        ></path>
      </svg>
    </span>
  </button>
  <div data-part="positioner">
    <ul data-part="content">
      <li data-part="item" data-value="new">New Document</li>
      <li data-part="item" data-value="open">Open</li>
      <li data-part="item" data-value="save">Save</li>
      <div data-part="separator"></div>
      <li data-part="item" data-value="export">Export</li>
      <li data-part="item" data-value="exit">Exit</li>
    </ul>
  </div>
</div>
```

---

## Group items

The Menu items can be grouped with a label to identify each group

Please note you must provide and `data-id` to `item-group` and `data-htmlFor` to `item-group-label`

```html
<!-- render:preview -->
<div class="menu menu-js">
  <button data-part="trigger">
    View
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
          d="m19.5 8.25-7.5 7.5-7.5-7.5"
        ></path>
      </svg>
    </span>
  </button>
  <div data-part="positioner">
    <div data-part="content">
      <div data-part="item-group">
        <div data-part="item-group-label">Layout</div>
        <li data-part="item">Grid View</li>
        <li data-part="item">List View</li>
      </div>

      <div data-part="item-group">
        <div data-part="item-group-label">Zoom</div>

        <li data-part="item">Zoom In</li>
        <li data-part="item">Zoom Out</li>
      </div>
    </div>
  </div>
</div>
```

---

## Nested Menu

The Menus can be nested with `data-children` on the parent menu and `data-child` on the `trigger-item` and `indicator`

```html
<!-- render:preview -->
<div class="menu menu-js" data-children="submenu-1" data-aria-label="Main Menu">
  <button data-part="trigger">
    Menu
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
          d="m19.5 8.25-7.5 7.5-7.5-7.5"
        ></path>
      </svg>
    </span>
  </button>
  <div data-part="positioner">
    <ul data-part="content">
      <li data-part="trigger-item" data-child="submenu-1">
        Sub Menu
        <span data-part="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </li>
    </ul>
  </div>
</div>

<div
  id="submenu-1"
  class="menu menu-js"
  data-aria-label="Submenu Menu"
  data-offset-main-axis="5"
  data-placement="right-start"
>
  <div data-part="positioner">
    <ul data-part="content">
      <li data-part="item" data-value="item-1">Item 1</li>
      <li data-part="item" data-value="item-2">Item 2</li>
    </ul>
  </div>
</div>
```

---

## Subnested Menu

You can nest as many menus, please note that you must provide unique ids for each menu

```html
<!-- render:preview -->
<div class="menu menu-js" data-children="submenu-2" data-aria-label="Main Menu">
  <button data-part="trigger">
    Menu
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
          d="m19.5 8.25-7.5 7.5-7.5-7.5"
        ></path>
      </svg>
    </span>
  </button>
  <div data-part="positioner">
    <ul data-part="content">
      <li data-part="trigger-item" data-child="submenu-2">
        Sub Menu
        <span data-part="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </li>
    </ul>
  </div>
</div>

<div
  id="submenu-2"
  class="menu menu-js"
  data-children="nestedmenu-1"
  data-aria-label="Sub Menu"
  data-offset-main-axis="5"
  data-placement="right-start"
>
  <div data-part="positioner">
    <ul data-part="content">
      <li data-part="item">Item 2</li>
      <li data-part="item">Item 2</li>
      <li data-part="trigger-item" data-child="nestedmenu-1">
        Sub Nested
        <span data-part="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </li>
    </ul>
  </div>
</div>

<div
  id="nestedmenu-1"
  class="menu menu-js"
  data-aria-label="Nested Menu"
  data-offset-main-axis="5"
  data-placement="right-start"
>
  <div data-part="positioner">
    <ul data-part="content">
      <li data-part="item">Item 3</li>
      <li data-part="item">Item 4</li>
    </ul>
  </div>
</div>
```

---

## Context Menu

An accessible dropdown and context menu that is used to display a list of actions or options that a user can choose when a trigger element is right-clicked or long pressed.

```html
<!-- render:preview -->
<div class="menu menu-js">
  <div data-part="context-trigger">Right Click/ Long Press</div>
  <div data-part="positioner">
    <ul data-part="content">
      <li data-part="item" data-value="copy">Copy</li>
      <li data-part="item" data-value="paste">Paste</li>
      <li data-part="item" data-value="duplicate">Duplicate</li>
      <div data-part="separator"></div>
      <li data-part="item" data-value="inspect">Inspect Element</li>
      <li data-part="item" data-value="bookmark">Bookmark Page</li>
    </ul>
  </div>
</div>
```

**With groups**

```html
<!-- render:preview -->
<div class="menu menu-js">
  <div data-part="context-trigger">
    <div>Right Click/ Long Press</div>
  </div>
  <div data-part="positioner">
    <div data-part="content">
      <div data-part="item-group" data-id="format">
        <div data-part="item-group-label" data-id="format">Format</div>

        <li data-part="item" data-value="bold">Bold</li>
        <li data-part="item" data-value="italic">Italic</li>
      </div>
      <div data-part="separator"></div>
      <div data-part="item-group" data-id="align">
        <div data-part="item-group-label" data-id="align">Align</div>

        <li data-part="item" data-value="align-left">Align Left</li>
        <li data-part="item" data-value="align-center">Align Center</li>
      </div>
    </div>
  </div>
</div>
```

---

## Data attributes

Each menu can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  class="menu menu-js"
  id="custom-menu"
  data-aria-label="Demo menu"
  data-close-on-select="false"
  data-composite="true"
  data-default-highlighted-value="profile"
  data-highlighted-value="profile"
  data-default-open="true"
  data-dir="ltr"
  data-loop-focus="false"
  data-typehead="true"
  data-placement="top-end"
  data-strategy="absolute"
  data-flip="true"
  data-hide-when-detached="true"
  data-gutter="1"
  data-arrow-padding="1"
  data-overflow-padding="1"
  data-slide="true"
  data-fit-viewport="true"
  data-overlap="true"
  data-same-width="true"
>
  <button data-part="trigger">
    Custom Menu
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
          d="m19.5 8.25-7.5 7.5-7.5-7.5"
        ></path>
      </svg>
    </span>
  </button>
  <div data-part="positioner">
    <ul data-part="content">
      <li data-part="item" data-value="new">New</li>
      <li data-part="item" data-value="open">Open</li>
      <li data-part="item" data-value="save">Save</li>
      <div data-part="separator"></div>
      <li data-part="item" data-value="export">Export</li>
      <li data-part="item" data-value="exit">Exit</li>
    </ul>
  </div>
</div>
```

**id**  
Type: `string`  
Description: Unique id of the component. Default generated if none is provided.

**data-aria-label**  
Type: `string`  
Description: The accessibility label for the menu.

**data-close-on-select**  
Type: `boolean`  
Default: `true`  
Description: Whether to close the menu when an option is selected.

**data-composite**  
Type: `boolean`  
Default: `true`  
Description: Whether the menu is composed with other composite widgets like a combobox or tabs.

**data-default-highlighted-value**  
Type: `string | null`  
Description: The initial highlighted value of the menu item when rendered. Use when you don't need to control the highlighted value.

**data-highlighted-value**  
Type: `string | null`  
Description: The controlled highlighted value of the menu item.

**data-default-open**  
Type: `boolean`  
Description: The initial open state of the menu when rendered. Use when you don't need to control the open state.

**data-dir**  
Type: `"ltr" | "rtl"`  
Default: `"ltr"`  
Description: The text direction of the menu.

**data-loop-focus**  
Type: `boolean`  
Default: `false`  
Description: Whether to loop the keyboard navigation.

**data-typehead**  
Type: `boolean`  
Default: `true`  
Description: Whether pressing printable characters should trigger typeahead navigation.

**data-placement**  
Type: `Placement`  
Default: `"bottom-start"`  
Description: The placement of the menu relative to its trigger.

**data-strategy**  
Type: `"absolute" | "fixed"`  
Default: `"absolute"`  
Description: The CSS positioning strategy for the menu.

**data-flip**  
Type: `boolean`  
Default: `true`  
Description: Whether to flip the placement of the menu when it overflows.

**data-hide-when-detached**  
Type: `boolean`  
Default: `false`  
Description: Whether to hide the menu when its trigger is no longer in the DOM or detached from layout.

**data-gutter**  
Type: `number`  
Default: `8`  
Description: The offset (in pixels) between the menu and its trigger.

**data-arrow-padding**  
Type: `number`  
Default: `0`  
Description: The minimum padding (in pixels) between the arrow and the edges of the menu.

**data-overflow-padding**  
Type: `number`  
Default: `8`  
Description: The minimum padding (in pixels) between the menu and the viewport.

**data-slide**  
Type: `boolean`  
Default: `false`  
Description: Whether to animate the menu with a slide effect.

**data-fit-viewport**  
Type: `boolean`  
Default: `false`  
Description: Whether to resize the menu to fit within the viewport.

**data-overlap**  
Type: `boolean`  
Default: `false`  
Description: Whether the menu can overlap its trigger.

**data-same-width**  
Type: `boolean`  
Default: `false`  
Description: Whether the menu should match the width of its trigger.

---

## Event Callbacks

Each Menu component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id for the menu and a event listener for your event name

```ts
document
  .getElementById("my-menu")
  ?.addEventListener("my-menu-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

```html
<!-- render:preview -->
<div id="my-menu" class="menu menu-js" data-on-select="my-menu-event">
  <button data-part="trigger">
    File
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
          d="m19.5 8.25-7.5 7.5-7.5-7.5"
        ></path>
      </svg>
    </span>
  </button>
  <div data-part="positioner">
    <ul data-part="content">
      <li data-part="item" data-value="new">New Document</li>
      <li data-part="item" data-value="open">Open</li>
      <li data-part="item" data-value="save">Save</li>
      <div data-part="separator"></div>
      <li data-part="item" data-value="export">Export</li>
      <li data-part="item" data-value="exit">Exit</li>
    </ul>
  </div>
</div>
```

> Open your browser's console to see the events received when an item is selected

**data-on-select**  
Type: `string`  
Description: Event name to be sent when a menu item is selected. The event detail contains the selected item's value.

**data-on-open-change**  
Type: `string`  
Description: Event name to be sent when the menu opens or closes. The event detail contains the menu's open state.

**data-on-escape-key-down**  
Type: `string`  
Description: Event name to be sent when the Escape key is pressed while the menu is focused.

**data-on-focus-outside**  
Type: `string`  
Description: Event name to be sent when focus moves outside the menu.

**data-on-highlight-change**  
Type: `string`  
Description: Event name to be sent when the highlighted menu item changes. The event detail contains the current highlighted value.

**data-on-interact-outside**  
Type: `string`  
Description: Event name to be sent when an interaction happens outside the menu.

**data-on-pointer-down-outside**  
Type: `string`  
Description: Event name to be sent when a pointer down event occurs outside the menu.

**data-on-navigate**  
Type: `string`  
Description: Event name to be sent to navigate to the selected item if it's an ancho

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

1. Import the component

```ts
import "@corex-ui/static/components/menu";
```

This will automatically initialize all elements with `class="menu-js"` and add the necessary interaction behavior.

2. Add styling

The component is **unstyled by default** for maximum customization flexibility.

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/menu.css";
```

These styles will be applied to all elements with the `menu` class.
