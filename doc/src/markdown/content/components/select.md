---
title: Select
description: A pure HTML and vanilla JS implementation of Zag JS Select
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

# Select

> A pure HTML and vanilla JS implementation of [ZagJS Select](https://zagjs.com/components/react/select)

A Select component allows users pick a value from predefined options.

---

## Anatomy

The select component consists of the following data parts:

`root`, `control`, `label`, `trigger`, `positioner`, `content`, `item`

```html
<!-- render:preview -->
<div class="select-js select" data-same-width="true">
  <div data-part="root">
    <div data-part="control">
      <div data-part="label">Your Currency</div>
      <button data-part="trigger">
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
      </button>
    </div>
    <div data-part="positioner">
      <ul data-part="content">
        <li data-part="item" data-value="USD">
          <span data-part="item-text" data-value="USD">US Dollar</span>
        </li>
        <li data-part="item" data-value="EUR">
          <span data-part="item-text" data-value="EUR">Euro</span>
        </li>
        <li data-part="item" data-value="GBP">
          <span data-part="item-text" data-value="GBP">British Pound</span>
        </li>
        <li data-part="item" data-value="JPY">
          <span data-part="item-text" data-value="JPY">Japanese Yen</span>
        </li>
        <li data-part="item" data-value="INR">
          <span data-part="item-text" data-value="INR">Indian Rupee</span>
        </li>
        <li data-part="item" data-value="CAD">
          <span data-part="item-text" data-value="CAD">Canadian Dollar</span>
        </li>
        <li data-part="item" data-value="AUD">
          <span data-part="item-text" data-value="AUD">Australian Dollar</span>
        </li>
        <li data-part="item" data-value="CHF">
          <span data-part="item-text" data-value="CHF">Swiss Franc</span>
        </li>
      </ul>
    </div>
  </div>
</div>
```

---

## Load from JSON

You can initialize the Select component by embedding your JSON data directly in your HTML using a `<script>` tag with `type="application/json"` and a unique `data-select` attribute. Then, reference this JSON in your Select container via the corresponding `data-json` attribute.

```html
<script type="application/json" data-select="countries">
  [
    { "label": "France", "value": "FR" },
    { "label": "Belgium", "value": "BE" },
    { "label": "Germany", "value": "DE" },
    { "label": "Italy", "value": "IT" },
    { "label": "Spain", "value": "ES" },
    { "label": "Portugal", "value": "PT" },
    { "label": "Netherlands", "value": "NL" },
    { "label": "Switzerland", "value": "CH" },
    { "label": "Austria", "value": "AT" },
    { "label": "Poland", "value": "PL" },
    { "label": "Czech Republic", "value": "CZ" },
    { "label": "Hungary", "value": "HU" },
    { "label": "Greece", "value": "GR" }
  ]
</script>
```

```html
<!-- render:preview -->
<div class="select-js select" data-json="countries" data-same-width="true">
  <div data-part="root">
    <div data-part="control">
      <div data-part="label">Your Country</div>
      <button data-part="trigger">
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
      </button>
    </div>
    <div data-part="positioner">
      <ul data-part="content"></ul>
    </div>
  </div>
</div>
```

## Data attributes

Each select can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  class="select-js select"
  data-same-width="true"
  data-close-on-select="false"
>
  <div data-part="root">
    <div data-part="control">
      <div data-part="label">Your Currency</div>
      <button data-part="trigger">
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
      </button>
    </div>
    <div data-part="positioner">
      <ul data-part="content">
        <li data-part="item" data-value="USD">
          <span data-part="item-text" data-value="USD">US Dollar</span>
        </li>
        <li data-part="item" data-value="EUR">
          <span data-part="item-text" data-value="EUR">Euro</span>
        </li>
        <li data-part="item" data-value="GBP">
          <span data-part="item-text" data-value="GBP">British Pound</span>
        </li>
        <li data-part="item" data-value="JPY">
          <span data-part="item-text" data-value="JPY">Japanese Yen</span>
        </li>
        <li data-part="item" data-value="INR">
          <span data-part="item-text" data-value="INR">Indian Rupee</span>
        </li>
        <li data-part="item" data-value="CAD">
          <span data-part="item-text" data-value="CAD">Canadian Dollar</span>
        </li>
        <li data-part="item" data-value="AUD">
          <span data-part="item-text" data-value="AUD">Australian Dollar</span>
        </li>
        <li data-part="item" data-value="CHF">
          <span data-part="item-text" data-value="CHF">Swiss Franc</span>
        </li>
      </ul>
    </div>
  </div>
</div>
```

**id**  
Type: `string`  
Description: The unique id of the component. Default generated if none is provided.

**data-close-on-select**  
Type: `boolean`  
Description: Whether the select should close after an item is selected. Default: `true`.

**data-composite**  
Type: `boolean`  
Description: Whether the select is composed with other composite widgets like tabs or combobox. Default: `true`.

**data-default-highlighted-value**  
Type: `string | null`  
Description: The initial value of the highlighted item when opened. Use when you don't need to control the highlighted value.

**data-default-open**  
Type: `boolean`  
Description: Whether the select menu is open by default.

**data-default-value**  
Type: `string[]`  
Description: The initial value of the select when rendered. Use when you don't need to control the value.

**data-dir**  
Type: `ltr | rtl`  
Description: Text direction for the select component.

**data-disabled**  
Type: `boolean`  
Description: Whether the select is disabled.

**data-form**  
Type: `string`  
Description: The associated form of the underlying select.

**data-highlighted-value**  
Type: `string | null`  
Description: The controlled key of the highlighted item.

**data-invalid**  
Type: `boolean`  
Description: Whether the select is invalid.

**data-loop-focus**  
Type: `boolean`  
Description: Whether to loop the keyboard navigation through options. Default: `false`.

**data-multiple**  
Type: `boolean`  
Description: Whether to allow multiple selection.

**data-name**  
Type: `string`  
Description: The `name` attribute of the underlying select.

**data-read-only**  
Type: `boolean`  
Description: Whether the select is read-only.

**data-required**  
Type: `boolean`  
Description: Whether the select is required.

**data-open**  
Type: `boolean`  
Description: Whether the select menu is open.

**data-value**  
Type: `string[]`  
Description: The controlled keys of the selected items.

## RTL

RTL support for select

```html
<!-- render:preview -->
<div class="select-js select" data-same-width="true" data-dir="rtl">
  <div data-part="root">
    <div data-part="control">
      <div data-part="label">عملتك</div>
      <button data-part="trigger">
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
      </button>
    </div>
    <div data-part="positioner">
      <ul data-part="content">
        <li data-part="item" data-value="USD">
          <span data-part="item-text" data-value="USD">US Dollar</span>
        </li>
        <li data-part="item" data-value="EUR">
          <span data-part="item-text" data-value="EUR">Euro</span>
        </li>
        <li data-part="item" data-value="GBP">
          <span data-part="item-text" data-value="GBP">British Pound</span>
        </li>
        <li data-part="item" data-value="JPY">
          <span data-part="item-text" data-value="JPY">Japanese Yen</span>
        </li>
        <li data-part="item" data-value="INR">
          <span data-part="item-text" data-value="INR">Indian Rupee</span>
        </li>
        <li data-part="item" data-value="CAD">
          <span data-part="item-text" data-value="CAD">Canadian Dollar</span>
        </li>
        <li data-part="item" data-value="AUD">
          <span data-part="item-text" data-value="AUD">Australian Dollar</span>
        </li>
        <li data-part="item" data-value="CHF">
          <span data-part="item-text" data-value="CHF">Swiss Franc</span>
        </li>
      </ul>
    </div>
  </div>
</div>
```

---

## Form usage

Select can be used inside a form

You must set the id of the form and the name of the Select

`data-form="form-id"`
`data-name="select-name"`

```html
<!-- render:preview -->
<form id="my-form" class="flex flex-col items-center gap-(--spacing-ui-gap)">
  <div class="select select-js" data-form="my-form" data-name="currency">
    <div data-part="root">
      <div data-part="control">
        <div data-part="label">Your Currency</div>
        <button data-part="trigger">
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
        </button>
      </div>
      <div data-part="positioner">
        <ul data-part="content">
          <li data-part="item" data-value="USD">
            <span data-part="item-text" data-value="USD">US Dollar</span>
          </li>
          <li data-part="item" data-value="EUR">
            <span data-part="item-text" data-value="EUR">Euro</span>
          </li>
          <li data-part="item" data-value="GBP">
            <span data-part="item-text" data-value="GBP">British Pound</span>
          </li>
          <li data-part="item" data-value="JPY">
            <span data-part="item-text" data-value="JPY">Japanese Yen</span>
          </li>
          <li data-part="item" data-value="INR">
            <span data-part="item-text" data-value="INR">Indian Rupee</span>
          </li>
          <li data-part="item" data-value="CAD">
            <span data-part="item-text" data-value="CAD">Canadian Dollar</span>
          </li>
          <li data-part="item" data-value="AUD">
            <span data-part="item-text" data-value="AUD"
              >Australian Dollar</span
            >
          </li>
          <li data-part="item" data-value="CHF">
            <span data-part="item-text" data-value="CHF">Swiss Franc</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <button class="button button--accent" type="submit">Submit</button>
</form>
<div id="result"></div>
```

You can use the results from the form as you wish

```ts
const selectForm = document.getElementById("my-form") as HTMLFormElement | null;
const seectResult = document.getElementById("result") as HTMLDivElement | null;

if (selectForm && seectResult) {
  selectForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const formData = new FormData(selectForm);
    console.log(formData.getAll("currency"));
    const currency = (formData.get("currency") as string) || "none";
    seectResult.textContent = `Submitted: currency: ${currency}`;
  });
}
```

---

## Modifiers

Each select can be styled with modifiers.

You can mix as many modifiers on the same button, however you can choose only one choice per modifer

For convenience the default variant name is omited, meaning there is no need to add the default name class

> You may have noticed the double dash before the modifier name — this follows the BEM (Block Element Modifier) naming convention

| Modifier        | Option                                      |
| --------------- | ------------------------------------------- |
| [Color](#color) | base (default), brand, alert, info, success |
| [Size](#size)   | md (default), sm, lg, xl                    |

---

### Color

Set the color of each select

Options: **accent(default)**, **brand**, **alert**, **info**,**success**

```html
<!-- render:preview -->
<div class="select-js select select--accent" data-same-width="true">
  <div data-part="root">
    <div data-part="control">
      <div data-part="label">Your Currency</div>
      <button data-part="trigger">
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
      </button>
    </div>
    <div data-part="positioner">
      <ul data-part="content">
        <li data-part="item" data-value="USD">
          <span data-part="item-text" data-value="USD">US Dollar</span>
        </li>
        <li data-part="item" data-value="EUR">
          <span data-part="item-text" data-value="EUR">Euro</span>
        </li>
        <li data-part="item" data-value="GBP">
          <span data-part="item-text" data-value="GBP">British Pound</span>
        </li>
        <li data-part="item" data-value="JPY">
          <span data-part="item-text" data-value="JPY">Japanese Yen</span>
        </li>
        <li data-part="item" data-value="INR">
          <span data-part="item-text" data-value="INR">Indian Rupee</span>
        </li>
        <li data-part="item" data-value="CAD">
          <span data-part="item-text" data-value="CAD">Canadian Dollar</span>
        </li>
        <li data-part="item" data-value="AUD">
          <span data-part="item-text" data-value="AUD">Australian Dollar</span>
        </li>
        <li data-part="item" data-value="CHF">
          <span data-part="item-text" data-value="CHF">Swiss Franc</span>
        </li>
      </ul>
    </div>
  </div>
</div>
<div class="select-js select select--brand" data-same-width="true">
  <div data-part="root">
    <div data-part="control">
      <div data-part="label">Your Currency</div>
      <button data-part="trigger">
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
      </button>
    </div>
    <div data-part="positioner">
      <ul data-part="content">
        <li data-part="item" data-value="USD">
          <span data-part="item-text" data-value="USD">US Dollar</span>
        </li>
        <li data-part="item" data-value="EUR">
          <span data-part="item-text" data-value="EUR">Euro</span>
        </li>
        <li data-part="item" data-value="GBP">
          <span data-part="item-text" data-value="GBP">British Pound</span>
        </li>
        <li data-part="item" data-value="JPY">
          <span data-part="item-text" data-value="JPY">Japanese Yen</span>
        </li>
        <li data-part="item" data-value="INR">
          <span data-part="item-text" data-value="INR">Indian Rupee</span>
        </li>
        <li data-part="item" data-value="CAD">
          <span data-part="item-text" data-value="CAD">Canadian Dollar</span>
        </li>
        <li data-part="item" data-value="AUD">
          <span data-part="item-text" data-value="AUD">Australian Dollar</span>
        </li>
        <li data-part="item" data-value="CHF">
          <span data-part="item-text" data-value="CHF">Swiss Franc</span>
        </li>
      </ul>
    </div>
  </div>
</div>
<div class="select-js select select--alert" data-same-width="true">
  <div data-part="root">
    <div data-part="control">
      <div data-part="label">Your Currency</div>
      <button data-part="trigger">
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
      </button>
    </div>
    <div data-part="positioner">
      <ul data-part="content">
        <li data-part="item" data-value="USD">
          <span data-part="item-text" data-value="USD">US Dollar</span>
        </li>
        <li data-part="item" data-value="EUR">
          <span data-part="item-text" data-value="EUR">Euro</span>
        </li>
        <li data-part="item" data-value="GBP">
          <span data-part="item-text" data-value="GBP">British Pound</span>
        </li>
        <li data-part="item" data-value="JPY">
          <span data-part="item-text" data-value="JPY">Japanese Yen</span>
        </li>
        <li data-part="item" data-value="INR">
          <span data-part="item-text" data-value="INR">Indian Rupee</span>
        </li>
        <li data-part="item" data-value="CAD">
          <span data-part="item-text" data-value="CAD">Canadian Dollar</span>
        </li>
        <li data-part="item" data-value="AUD">
          <span data-part="item-text" data-value="AUD">Australian Dollar</span>
        </li>
        <li data-part="item" data-value="CHF">
          <span data-part="item-text" data-value="CHF">Swiss Franc</span>
        </li>
      </ul>
    </div>
  </div>
</div>
<div class="select-js select select--info" data-same-width="true">
  <div data-part="root">
    <div data-part="control">
      <div data-part="label">Your Currency</div>
      <button data-part="trigger">
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
      </button>
    </div>
    <div data-part="positioner">
      <ul data-part="content">
        <li data-part="item" data-value="USD">
          <span data-part="item-text" data-value="USD">US Dollar</span>
        </li>
        <li data-part="item" data-value="EUR">
          <span data-part="item-text" data-value="EUR">Euro</span>
        </li>
        <li data-part="item" data-value="GBP">
          <span data-part="item-text" data-value="GBP">British Pound</span>
        </li>
        <li data-part="item" data-value="JPY">
          <span data-part="item-text" data-value="JPY">Japanese Yen</span>
        </li>
        <li data-part="item" data-value="INR">
          <span data-part="item-text" data-value="INR">Indian Rupee</span>
        </li>
        <li data-part="item" data-value="CAD">
          <span data-part="item-text" data-value="CAD">Canadian Dollar</span>
        </li>
        <li data-part="item" data-value="AUD">
          <span data-part="item-text" data-value="AUD">Australian Dollar</span>
        </li>
        <li data-part="item" data-value="CHF">
          <span data-part="item-text" data-value="CHF">Swiss Franc</span>
        </li>
      </ul>
    </div>
  </div>
</div>
<div class="select-js select select--success" data-same-width="true">
  <div data-part="root">
    <div data-part="control">
      <div data-part="label">Your Currency</div>
      <button data-part="trigger">
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
      </button>
    </div>
    <div data-part="positioner">
      <ul data-part="content">
        <li data-part="item" data-value="USD">
          <span data-part="item-text" data-value="USD">US Dollar</span>
        </li>
        <li data-part="item" data-value="EUR">
          <span data-part="item-text" data-value="EUR">Euro</span>
        </li>
        <li data-part="item" data-value="GBP">
          <span data-part="item-text" data-value="GBP">British Pound</span>
        </li>
        <li data-part="item" data-value="JPY">
          <span data-part="item-text" data-value="JPY">Japanese Yen</span>
        </li>
        <li data-part="item" data-value="INR">
          <span data-part="item-text" data-value="INR">Indian Rupee</span>
        </li>
        <li data-part="item" data-value="CAD">
          <span data-part="item-text" data-value="CAD">Canadian Dollar</span>
        </li>
        <li data-part="item" data-value="AUD">
          <span data-part="item-text" data-value="AUD">Australian Dollar</span>
        </li>
        <li data-part="item" data-value="CHF">
          <span data-part="item-text" data-value="CHF">Swiss Franc</span>
        </li>
      </ul>
    </div>
  </div>
</div>
```

---

### Size

Set the size of each select

Options: **md(default)**, **sm**, **lg**, **xl**

```html
<!-- render:preview -->
<div class="select-js select select--sm" data-same-width="true">
  <div data-part="root">
    <div data-part="control">
      <div data-part="label">Your Currency</div>
      <button data-part="trigger">
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
      </button>
    </div>
    <div data-part="positioner">
      <ul data-part="content">
        <li data-part="item" data-value="USD">
          <span data-part="item-text" data-value="USD">US Dollar</span>
        </li>
        <li data-part="item" data-value="EUR">
          <span data-part="item-text" data-value="EUR">Euro</span>
        </li>
        <li data-part="item" data-value="GBP">
          <span data-part="item-text" data-value="GBP">British Pound</span>
        </li>
        <li data-part="item" data-value="JPY">
          <span data-part="item-text" data-value="JPY">Japanese Yen</span>
        </li>
        <li data-part="item" data-value="INR">
          <span data-part="item-text" data-value="INR">Indian Rupee</span>
        </li>
        <li data-part="item" data-value="CAD">
          <span data-part="item-text" data-value="CAD">Canadian Dollar</span>
        </li>
        <li data-part="item" data-value="AUD">
          <span data-part="item-text" data-value="AUD">Australian Dollar</span>
        </li>
        <li data-part="item" data-value="CHF">
          <span data-part="item-text" data-value="CHF">Swiss Franc</span>
        </li>
      </ul>
    </div>
  </div>
</div>
<div class="select-js select select--md" data-same-width="true">
  <div data-part="root">
    <div data-part="control">
      <div data-part="label">Your Currency</div>
      <button data-part="trigger">
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
      </button>
    </div>
    <div data-part="positioner">
      <ul data-part="content">
        <li data-part="item" data-value="USD">
          <span data-part="item-text" data-value="USD">US Dollar</span>
        </li>
        <li data-part="item" data-value="EUR">
          <span data-part="item-text" data-value="EUR">Euro</span>
        </li>
        <li data-part="item" data-value="GBP">
          <span data-part="item-text" data-value="GBP">British Pound</span>
        </li>
        <li data-part="item" data-value="JPY">
          <span data-part="item-text" data-value="JPY">Japanese Yen</span>
        </li>
        <li data-part="item" data-value="INR">
          <span data-part="item-text" data-value="INR">Indian Rupee</span>
        </li>
        <li data-part="item" data-value="CAD">
          <span data-part="item-text" data-value="CAD">Canadian Dollar</span>
        </li>
        <li data-part="item" data-value="AUD">
          <span data-part="item-text" data-value="AUD">Australian Dollar</span>
        </li>
        <li data-part="item" data-value="CHF">
          <span data-part="item-text" data-value="CHF">Swiss Franc</span>
        </li>
      </ul>
    </div>
  </div>
</div>
<div class="select-js select select--lg" data-same-width="true">
  <div data-part="root">
    <div data-part="control">
      <div data-part="label">Your Currency</div>
      <button data-part="trigger">
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
      </button>
    </div>
    <div data-part="positioner">
      <ul data-part="content">
        <li data-part="item" data-value="USD">
          <span data-part="item-text" data-value="USD">US Dollar</span>
        </li>
        <li data-part="item" data-value="EUR">
          <span data-part="item-text" data-value="EUR">Euro</span>
        </li>
        <li data-part="item" data-value="GBP">
          <span data-part="item-text" data-value="GBP">British Pound</span>
        </li>
        <li data-part="item" data-value="JPY">
          <span data-part="item-text" data-value="JPY">Japanese Yen</span>
        </li>
        <li data-part="item" data-value="INR">
          <span data-part="item-text" data-value="INR">Indian Rupee</span>
        </li>
        <li data-part="item" data-value="CAD">
          <span data-part="item-text" data-value="CAD">Canadian Dollar</span>
        </li>
        <li data-part="item" data-value="AUD">
          <span data-part="item-text" data-value="AUD">Australian Dollar</span>
        </li>
        <li data-part="item" data-value="CHF">
          <span data-part="item-text" data-value="CHF">Swiss Franc</span>
        </li>
      </ul>
    </div>
  </div>
</div>
<div class="select-js select select--xl" data-same-width="true">
  <div data-part="root">
    <div data-part="control">
      <div data-part="label">Your Currency</div>
      <button data-part="trigger">
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
      </button>
    </div>
    <div data-part="positioner">
      <ul data-part="content">
        <li data-part="item" data-value="USD">
          <span data-part="item-text" data-value="USD">US Dollar</span>
        </li>
        <li data-part="item" data-value="EUR">
          <span data-part="item-text" data-value="EUR">Euro</span>
        </li>
        <li data-part="item" data-value="GBP">
          <span data-part="item-text" data-value="GBP">British Pound</span>
        </li>
        <li data-part="item" data-value="JPY">
          <span data-part="item-text" data-value="JPY">Japanese Yen</span>
        </li>
        <li data-part="item" data-value="INR">
          <span data-part="item-text" data-value="INR">Indian Rupee</span>
        </li>
        <li data-part="item" data-value="CAD">
          <span data-part="item-text" data-value="CAD">Canadian Dollar</span>
        </li>
        <li data-part="item" data-value="AUD">
          <span data-part="item-text" data-value="AUD">Australian Dollar</span>
        </li>
        <li data-part="item" data-value="CHF">
          <span data-part="item-text" data-value="CHF">Swiss Franc</span>
        </li>
      </ul>
    </div>
  </div>
</div>
```

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

### Static

1. Import the Select component

```ts
import "@corex-ui/static/components/select";
```

This will automatically initialize all elements with `class="select-js"` and add the necessary interaction behavior.

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/select.css";
```

Then apply the base class along with any desired modifiers:

```html
<div class="select select-js">
  <div data-part="root">
    <div data-part="control">
      <div data-part="label">Your Currency</div>
      <button data-part="trigger"></button>
    </div>
  </div>
</div>
```

### Static React

> Experimental! Only works with React static export (eg. Next.js SSG.)

1. Import the Select component

```ts
import { Select } from '@corex-ui/static/react';
export default function Home() {
  return (
    <Select>
      <div data-part="root">
        <div data-part="control">
          <div data-part="label">Your Currency</div>
          <button data-part="trigger" />
        </div>
      </div>
    </Select>
  );
}
```

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/select.css";
```

Then apply the base class along with any desired modifiers:

```html
<select className="select">
  {/* content */}
</select>
```
