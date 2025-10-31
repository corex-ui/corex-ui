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

An optional `data-value` can be added to each `data-part="item"`, this is useful when using the API or setting default values.

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
        <li data-part="item">
          <span data-part="item-text">US Dollar</span>
        </li>
        <li data-part="item">
          <span data-part="item-text">Euro</span>
        </li>
        <li data-part="item">
          <span data-part="item-text">British Pound</span>
        </li>
        <li data-part="item">
          <span data-part="item-text">Japanese Yen</span>
        </li>
        <li data-part="item">
          <span data-part="item-text">Indian Rupee</span>
        </li>
        <li data-part="item">
          <span data-part="item-text">Canadian Dollar</span>
        </li>
        <li data-part="item">
          <span data-part="item-text">Australian Dollar</span>
        </li>
        <li data-part="item">
          <span data-part="item-text">Swiss Franc</span>
        </li>
      </ul>
    </div>
  </div>
</div>
```

---

## Group items

The Select items can be grouped with a label to identify each group

An optional `data-id` can be added to each `data-part="item-group"` and `data-part="item-group-label"`, this is useful when using the API or setting default values.

To use the `data-part="item-group-label"` outside of the group, useful for styling, you must provide the same `data-id` for the group and label.

```html
<!-- render:preview -->
<div
  class="select-js select"
  data-same-width="true"
  data-placeholder="Select currency"
>
  <div data-part="root">
    <div data-part="control">
      <label data-part="label">Your Currency</label>
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
      <ul data-part="content" class="scrollbar">
        <div data-part="item-group" data-id="currency">
          <div data-part="item-group-label">Currency</div>

          <li data-part="item" data-value="usd">
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
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              ></path>
            </svg>
            US Dollar
          </li>
          <li data-part="item" data-value="eur">
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
                d="M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              ></path>
            </svg>
            Euro
          </li>
          <li data-part="item" data-value="gbp">
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
                d="M14.121 7.629A3 3 0 0 0 9.017 9.43c-.023.212-.002.425.028.636l.506 3.541a4.5 4.5 0 0 1-.43 2.65L9 16.5l1.539-.513a2.25 2.25 0 0 1 1.422 0l.655.218a2.25 2.25 0 0 0 1.718-.122L15 15.75M8.25 12H12m9 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              ></path>
            </svg>
            British Pound
          </li>
          <li data-part="item" data-value="jpy">
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
                d="m9 7.5 3 4.5m0 0 3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              ></path>
            </svg>
            Japanese Yen
          </li>
          <li data-part="item" data-value="inr">
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
                d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              ></path>
            </svg>
            Indian Rupee
          </li>
        </div>

        <div data-part="item-group" data-id="crypto">
          <div data-part="item-group-label">Crypto</div>

          <li data-part="item" data-value="btc">
            <img src="/images/currency/btc.png" alt="BTC" />
            Bitcoin
          </li>
          <li data-part="item" data-value="eth">
            <img src="/images/currency/eth.png" alt="ETH" />
            Ether
          </li>
          <li data-part="item" data-value="usdt">
            <img src="/images/currency/usdt.png" alt="USDT" />
            USDT
          </li>
        </div>
      </ul>
    </div>
  </div>
</div>
```

---

## Custom Values

The Select items and groups can use custom values and ids, this is useful when using the API or setting default values.

`data-value` can be added to each `data-part="item"`
`data-id` can be added to each `data-part="item-group"` and `item-group-label`

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
  {
    "id": "countries",
    "name": "Countries",
    "children": [
      {
        "id": "western-europe",
        "name": "Western Europe",
        "children": [
          { "id": "FR", "name": "France" },
          { "id": "BE", "name": "Belgium" },
          { "id": "DE", "name": "Germany" },
          { "id": "NL", "name": "Netherlands" },
          { "id": "CH", "name": "Switzerland" },
          { "id": "AT", "name": "Austria", "disabled": true }
        ]
      },
      {
        "id": "southern-europe",
        "name": "Southern Europe",
        "children": [
          { "id": "IT", "name": "Italy" },
          { "id": "ES", "name": "Spain" },
          { "id": "PT", "name": "Portugal" },
          { "id": "GR", "name": "Greece" }
        ]
      },
      {
        "id": "central-europe",
        "name": "Central Europe",
        "children": [
          { "id": "PL", "name": "Poland" },
          { "id": "CZ", "name": "Czech Republic" },
          { "id": "HU", "name": "Hungary" }
        ]
      }
    ]
  }
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

---

## Data attributes

Each select can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  class="select-js select"
  data-same-width="true"
  data-close-on-select="false"
  data-default-value="EUR"
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

1. Import the component

```ts
import "@corex-ui/static/components/select";
```

This will automatically initialize all elements with `class="select-js"` and add the necessary interaction behavior.

2. Add styling

The component is **unstyled by default** for maximum customization flexibility.

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/select.css";
```

These styles will be applied to all elements with the `select` class.
