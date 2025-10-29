---
title: Listbox
description: A pure HTML and vanilla JS implementation of Zag JS Listbox
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

# Listbox

> A pure HTML and vanilla JS implementation of [Zag JS Listbox](https://zagjs.com/components/react/listbox)

A listbox component that displays a list of selectable options, supporting both single and multiple selection modes.

---

## Anatomy

The Listbox component consists of the following data parts:

`root`, `label`, `content`, `item-group`, `item-group-label`, `item`, `item-text`, `item-indicator`

An optional `data-value` and `data-label` can be added to each `data-part="item"`, this is useful when using the API or setting default values.

```html
<!-- render:preview -->
<div class="listbox listbox-js">
  <div data-part="root">
    <div data-part="label">Listbox Label</div>
    <div data-part="content">
      <div data-part="item">
        <span data-part="item-text"> Item A </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item B </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item C </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item D </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
    </div>
  </div>
</div>
```

Another example without `item-indicator` and additional image

```html
<!-- render:preview -->
<div class="listbox listbox-js">
  <div data-part="root">
    <div data-part="label">Your favorite</div>
    <div data-part="content">
      <div data-part="item">
        <img src="/images/tech/vite.svg" alt="Vite" />
        <span data-part="item-text"> Vite </span>
      </div>
      <div data-part="item">
        <img src="/images/tech/html5.svg" alt="HTML" />
        <span data-part="item-text"> HTML </span>
      </div>
      <div data-part="item">
        <img src="/images/tech/typescript.svg" alt="Typescript" />
        <span data-part="item-text"> Typescript </span>
      </div>
      <div data-part="item">
        <img src="/images/tech/css.svg" alt="CSS" />
        <span data-part="item-text"> CSS </span>
      </div>
      <div data-part="item">
        <img src="/images/tech/tailwind.svg" alt="Tailwind" />
        <span data-part="item-text"> Tailwind </span>
      </div>
    </div>
  </div>
</div>
```

---

## Load from JSON

You can initialize the Listbox component by embedding your JSON data directly in your HTML using a `<script>` tag with `type="application/json"` and a unique `data-listbox` attribute. Then, reference this JSON in your Listbox container via the corresponding `data-json` attribute.

```html
<script type="application/json" data-listbox="my-listbox">
  {
    "id": "my-listobox",
    "name": "My Listbox",
    "children": [
      {
        "id": "group-1",
        "name": "Group 1",
        "children": [
          {
            "id": "item-1",
            "name": "Item 1"
          },
          {
            "id": "item-2",
            "name": "Item 2"
          },
          {
            "id": "item-3",
            "name": "Item 3",
            "disabled": true
          }
        ]
      },
      {
        "id": "group-2",
        "name": "Group 2",
        "children": [
          {
            "id": "item-4",
            "name": "Item 4"
          },
          {
            "id": "item-5",
            "name": "Item 5"
          }
        ]
      }
    ]
  }
</script>
```

```html
<!-- render:preview -->
<div class="listbox listbox-js" data-json="my-listbox">
  <div data-part="root">
    <div data-part="label">Listbox Label</div>
    <div data-part="content"></div>
  </div>
</div>
```

---

## Custom values

The Listbox items and groups can use custom values and ids, this is useful when using the API or setting default values.

`data-value` and `data-label` can be added to each `data-part="item"`
`data-id` can be added to each `data-part="item-group"` and `item-group-label`

```html
<!-- render:preview -->
<div class="listbox listbox-js">
  <div data-part="root">
    <div data-part="label">Listbox Label</div>
    <div data-part="content">
      <div data-part="item-group-label" data-id="group-1">Group Label</div>

      <div data-part="item-group" data-id="group-1">
        <div data-part="item" data-value="item-a" data-label="Item A">
          <span data-part="item-text"> Item A </span>
          <span data-part="item-indicator">
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
              ></path>
            </svg>
          </span>
        </div>
        <div data-part="item" data-value="item-b" data-label="Item B">
          <span data-part="item-text"> Item B </span>
          <span data-part="item-indicator">
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
              ></path>
            </svg>
          </span>
        </div>
      </div>

      <div data-part="item-group-label" data-id="group-2">Group Label</div>

      <div data-part="item-group" data-id="group-2">
        <div data-part="item" data-value="item-c" data-label="Item C">
          <span data-part="item-text"> Item C </span>
          <span data-part="item-indicator">
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
              ></path>
            </svg>
          </span>
        </div>
        <div data-part="item" data-value="item-d" data-label="Item D">
          <span data-part="item-text"> Item D </span>
          <span data-part="item-indicator">
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
              ></path>
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## Group items

The Listbox items can be grouped with a label to identify each group

An optional `data-id` can be added to each `data-part="item-group"` and `data-part="item-group-label"`, this is useful when using the API or setting default values.

To use the `data-part="item-group-label"` outside of the group, useful for styling, you must provide the same `data-id` for the group and label.

```html
<!-- render:preview -->
<div class="listbox listbox-js">
  <div data-part="root">
    <div data-part="label">Listbox Label</div>
    <div data-part="content">
      <div data-part="item-group-label" data-id="group-1">Group Label</div>
      <div data-part="item-group" data-id="group-1">
        <div data-part="item">
          <span data-part="item-text"> Item A </span>
          <span data-part="item-indicator">
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
              ></path>
            </svg>
          </span>
        </div>
        <div data-part="item">
          <span data-part="item-text"> Item B </span>
          <span data-part="item-indicator">
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
              ></path>
            </svg>
          </span>
        </div>
      </div>

      <div data-part="item-group-label" data-id="group-2">Group Label</div>
      <div data-part="item-group" data-id="group-2">
        <div data-part="item">
          <span data-part="item-text"> Item C </span>
          <span data-part="item-indicator">
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
              ></path>
            </svg>
          </span>
        </div>
        <div data-part="item">
          <span data-part="item-text"> Item D </span>
          <span data-part="item-indicator">
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
              ></path>
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## Column Layout

The Listbox can use the grid layout by adding `data-column-count`
The column count will also be available as a CSS variable `--column-count` which is used in the component css

> The column layout not only modify the visual onthe listbox but also the keyboard navigation with the addition or right and left keypad

You can use without or without `item-group`

### Column Layout without group items

```html
<!-- render:preview -->
<div class="listbox listbox-js" data-column-count="2">
  <div data-part="root">
    <div data-part="label">Listbox Label</div>
    <div data-part="content">
      <div data-part="item">
        <span data-part="item-text"> Item A </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item B </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item C </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item D </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
    </div>
  </div>
</div>
```

### Column Layout with group items

```html
<!-- render:preview -->
<div class="listbox listbox-js" data-column-count="2">
  <div data-part="root">
    <div data-part="label">Listbox Label</div>
    <div data-part="content">
      <div data-part="item-group-label">Group Label</div>

      <div data-part="item-group">
        <div data-part="item">
          <span data-part="item-text"> Item A </span>
          <span data-part="item-indicator">
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
              ></path>
            </svg>
          </span>
        </div>
        <div data-part="item">
          <span data-part="item-text"> Item B </span>
          <span data-part="item-indicator">
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
              ></path>
            </svg>
          </span>
        </div>
      </div>
      <div data-part="item-group-label">Group Label</div>

      <div data-part="item-group">
        <div data-part="item">
          <span data-part="item-text"> Item C </span>
          <span data-part="item-indicator">
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
              ></path>
            </svg>
          </span>
        </div>
        <div data-part="item">
          <span data-part="item-text"> Item D </span>
          <span data-part="item-indicator">
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
              ></path>
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## Data attributes

Each listbox can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  class="listbox listbox-js"
  id="custom-listbox"
  data-default-highlighted-value="a"
  data-default-value="b,d"
  data-dir="ltr"
  data-orientation="vertical"
  data-select-on-highlight="true"
  data-loop-focus="false"
  data-typeahead="true"
  data-deselectable="true"
  data-disabled="false"
  data-disallow-select-all="false"
  data-selection-mode="multiple"
>
  <div data-part="root">
    <div data-part="label">Listbox Label</div>
    <div data-part="content">
      <div data-part="item" data-value="a">
        <span data-part="item-text"> Item A </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item" data-value="b">
        <span data-part="item-text"> Item B </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item" data-value="c">
        <span data-part="item-text"> Item C </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item" data-value="d">
        <span data-part="item-text"> Item D </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
    </div>
  </div>
</div>
```

**id**
Type: `string`
Description: Unique id of the component. Default generated if none is provided.

**data-dir**
Type: `string`
Description: The orientation of the listbox. Can be `ltr` or `rtl`.

**data-disabled**
Type: `boolean`
Description: Whether the listbox is disabled.

**data-disallow-select-all**
Type: `boolean`
Description: Whether to disallow selecting all items when <kbd>meta+a</kbd> is pressed.

**data-value**
Type: `string[]`
Description: Controlled keys of the selected items.

**data-default-value**
Type: `string[]`
Description: Initial default value of the listbox when rendered. Use when you don't need to control the value.

**data-highlighted-value**
Type: `string`
Description: Controlled key of the highlighted item.

**data-default-highlighted-value**
Type: `string`
Description: Initial value of the highlighted item when opened. Use when you don't need to control it.

**data-loop-focus**
Type: `boolean`
Description: Whether to loop keyboard navigation through the options.

**data-selection-mode**
Type: `string`
Description: How multiple selection should behave: `"single"`, `"multiple"`, or `"extended"`.

**data-select-on-highlight**
Type: `boolean`
Description: Whether to select the item when it is highlighted.

**data-deselectable**
Type: `boolean`
Description: Whether to disallow empty selection.

**data-typeahead**
Type: `boolean`
Description: Whether to enable typeahead on the listbox.

---

## Event Callbacks

Each Listbox component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id for the listbox and a event listener for your event name

```ts
document
  .getElementById("my-listbox")
  ?.addEventListener("my-listbox-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

```html
<!-- render:preview -->
<div
  id="my-listbox"
  class="listbox listbox-js"
  data-on-select="my-listbox-event"
>
  <div data-part="root">
    <div data-part="label">Listbox Label</div>
    <div data-part="content">
      <div data-part="item" data-value="a">
        <span data-part="item-text"> Item A </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item" data-value="b">
        <span data-part="item-text"> Item B </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item" data-value="c">
        <span data-part="item-text"> Item C </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item" data-value="d">
        <span data-part="item-text"> Item D </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
    </div>
  </div>
</div>
```

> Open your browser's console to see the events received when a listbox item is selected

**data-on-select**
Type: `string`
Description: Event name to be send when an item is selected.

**data-on-value-change**
Type: `string`
Description: Event name to be send when the selected item changes.

**data-on-highlight-change**
Type: `string`
Description: Event name to be send when the highlighted item changes.

---

## RTL

RTL support for listbox

```html
<!-- render:preview -->
<div class="listbox listbox-js" data-dir="rtl">
  <div data-part="root">
    <div data-part="label">Listbox Label</div>
    <div data-part="content">
      <div data-part="item-group-label" data-id="group-1">Group Label</div>
      <div data-part="item-group" data-id="group-1">
        <div data-part="item" data-value="a">
          <span data-part="item-text"> Item A </span>
          <span data-part="item-indicator">
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
              ></path>
            </svg>
          </span>
        </div>
        <div data-part="item" data-value="b">
          <span data-part="item-text"> Item B </span>
          <span data-part="item-indicator">
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
              ></path>
            </svg>
          </span>
        </div>
      </div>
      <div data-part="item-group-label" data-id="group-2">Group Label</div>
      <div data-part="item-group" data-id="group-2">
        <div data-part="item" data-value="c">
          <span data-part="item-text"> Item C </span>
          <span data-part="item-indicator">
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
              ></path>
            </svg>
          </span>
        </div>
        <div data-part="item" data-value="d" data-label="item-d">
          <span data-part="item-text" data-label="item-d"> Item D </span>
          <span data-part="item-indicator" data-label="item-d">
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
              ></path>
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## Disabled

Each listbox can be disabled either globally or per item.

- To disable the entire listbox, add `data-disabled="true"` to the listbox element.
- To disable a specific item, add `data-disabled="true"` to that item’s element.

```html
<!-- render:preview -->
<div class="listbox listbox-js" data-disabled>
  <div data-part="root">
    <div data-part="label">Listbox Label</div>
    <div data-part="content">
      <div data-part="item" data-value="a">
        <span data-part="item-text"> Item A </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item" data-value="b">
        <span data-part="item-text"> Item B </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item" data-value="c">
        <span data-part="item-text"> Item C </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item" data-value="d">
        <span data-part="item-text"> Item D </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
    </div>
  </div>
</div>

<div class="listbox listbox-js">
  <div data-part="root">
    <div data-part="label">Listbox Label</div>
    <div data-part="content">
      <div data-part="item" data-value="a" data-disabled>
        <span data-part="item-text"> Item A </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item" data-value="b">
        <span data-part="item-text"> Item B </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item" data-value="c" data-disabled>
        <span data-part="item-text"> Item C </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item" data-value="d">
        <span data-part="item-text"> Item D </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
    </div>
  </div>
</div>
```

---

## Modifiers

Listbox support modifier classes that control their appearance.  
You can combine multiple modifiers on the same listbox.

The default modifier is applied automatically, so you don’t need to include it explicitly.

| Modifier        | Description                              |
| --------------- | ---------------------------------------- |
| [Color](#color) | Sets the color theme of the listbox.     |
| [Size](#size)   | Adjusts the overall size of the listbox. |

> You may have noticed the double dash before the modifier name — this follows the BEM (Block Element Modifier) naming convention

### Color

Use `class="listbox--{color}"` to set the color of an listbox.

Available options:  
**accent(default)**, **brand**, **alert**, **info**, **success**

```html
<!-- render:preview -->
<div class="listbox listbox-js listbox--accent" data-default-value="item-a">
  <div data-part="root">
    <div data-part="label">Listbox Label</div>
    <div data-part="content">
      <div data-part="item" data-value="item-a">
        <span data-part="item-text"> Item A </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item B </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item C </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item D </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
    </div>
  </div>
</div>
<div class="listbox listbox-js listbox--brand" data-default-value="item-a">
  <div data-part="root">
    <div data-part="label">Listbox Label</div>
    <div data-part="content">
      <div data-part="item" data-value="item-a">
        <span data-part="item-text"> Item A </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item B </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item C </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item D </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
    </div>
  </div>
</div>
<div class="listbox listbox-js listbox--alert" data-default-value="item-a">
  <div data-part="root">
    <div data-part="label">Listbox Label</div>
    <div data-part="content">
      <div data-part="item" data-value="item-a">
        <span data-part="item-text"> Item A </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item B </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item C </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item D </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
    </div>
  </div>
</div>
<div class="listbox listbox-js listbox--info" data-default-value="item-a">
  <div data-part="root">
    <div data-part="label">Listbox Label</div>
    <div data-part="content">
      <div data-part="item" data-value="item-a">
        <span data-part="item-text"> Item A </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item B </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item C </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item D </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
    </div>
  </div>
</div>
<div class="listbox listbox-js listbox--success" data-default-value="item-a">
  <div data-part="root">
    <div data-part="label">Listbox Label</div>
    <div data-part="content">
      <div data-part="item" data-value="item-a">
        <span data-part="item-text"> Item A </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item B </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item C </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item D </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
    </div>
  </div>
</div>
```

---

### Size

Use `class="listbox--{size}"` to set the size of an listbox.

Available options:  
**md** (default), **sm**, **lg**, **xl**

```html
<!-- render:preview -->
<div class="listbox listbox-js listbox--sm">
  <div data-part="root">
    <div data-part="label">Listbox Label</div>
    <div data-part="content">
      <div data-part="item">
        <span data-part="item-text"> Item A </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item B </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
    </div>
  </div>
</div>
<div class="listbox listbox-js">
  <div data-part="root">
    <div data-part="label">Listbox Label</div>
    <div data-part="content">
      <div data-part="item">
        <span data-part="item-text"> Item A </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item B </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
    </div>
  </div>
</div>
<div class="listbox listbox-js listbox--lg">
  <div data-part="root">
    <div data-part="label">Listbox Label</div>
    <div data-part="content">
      <div data-part="item">
        <span data-part="item-text"> Item A </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item B </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
    </div>
  </div>
</div>
<div class="listbox listbox-js listbox--xl">
  <div data-part="root">
    <div data-part="label">Listbox Label</div>
    <div data-part="content">
      <div data-part="item">
        <span data-part="item-text"> Item A </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
      <div data-part="item">
        <span data-part="item-text"> Item B </span>
        <span data-part="item-indicator">
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
        </span>
      </div>
    </div>
  </div>
</div>
```

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

1. Import the component

```ts
import "@corex-ui/static/components/listbox";
```

This will automatically initialize all elements with `class="listbox-js"` and add the necessary interaction behavior.

2. Add styling

The component is **unstyled by default** for maximum customization flexibility.

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/listbox.css";
```

These styles will be applied to all elements with the `listbox` class.
