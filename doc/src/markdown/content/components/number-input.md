---
title: Number Input
description: A pure HTML and vanilla JS implementation of Zag JS Number Input
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

# Number Input (Beta)

> A pure HTML and vanilla JS implementation of [Zag JS Number Input](https://zagjs.com/components/react/number-input)

The number input provides controls for editing, incrementing or decrementing numeric values using the keyboard or pointer.

---

## Anatomy

The Number Input component consists of the following data parts:

`root`, `control`, `increment-trigger`, `secrement-trigger`, `label`, `input`,`value-text`

```html
<!-- render:preview -->
<div class="number-input number-input-js">
  <div data-part="root">
    <label data-part="label">Enter Number</label>
    <div data-part="control">
      <input data-part="input" />
      <div data-part="trigger-group">
        <button data-part="increment-trigger">
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
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
        <button data-part="decrement-trigger">
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
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
```

---

## Scrubber

The Number Input can use the scrubber feature:

```html
<!-- render:preview -->
<div class="number-input number-input-js">
  <div data-part="root">
    <label data-part="label">Enter Number</label>
    <div data-part="control">
      <input data-part="input" />
      <div data-part="trigger-group">
        <button data-part="scrubber">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
```

---

## Data attributes

Each Number Input can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  class="number-input number-input-js"
  data-style="currency"
  data-currency="EUR"
  data-default-value="12"
>
  <div data-part="root">
    <label data-part="label">Enter Number</label>
    <div data-part="control">
      <input data-part="input" />
      <div data-part="trigger-group">
        <button data-part="increment-trigger">
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
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
        <button data-part="decrement-trigger">
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
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
```

```html
<!-- render:preview -->
<div
  class="number-input number-input-js"
  data-style="decimal"
  data-step="0.1"
  data-default-value="12"
>
  <div data-part="root">
    <label data-part="label">Enter Number</label>
    <div data-part="control">
      <input data-part="input" />
      <div data-part="trigger-group">
        <button data-part="increment-trigger">
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
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
        <button data-part="decrement-trigger">
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
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
```

```html
<!-- render:preview -->
<div
  class="number-input number-input-js"
  data-style="percent"
  data-default-value="53"
>
  <div data-part="root">
    <label data-part="label">Enter Amount</label>
    <div data-part="control">
      <input data-part="input" />
      <div data-part="trigger-group">
        <button data-part="increment-trigger">
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
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
        <button data-part="decrement-trigger">
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
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
```

```html
<!-- render:preview -->
<div
  class="number-input number-input-js"
  data-style="currency"
  data-currency="USD"
  data-default-value="3"
  data-currency-display="code"
>
  <div data-part="root">
    <label data-part="label">Enter Amount</label>
    <div data-part="control">
      <input data-part="input" />
      <div data-part="trigger-group">
        <button data-part="increment-trigger">
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
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
        <button data-part="decrement-trigger">
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
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
```

**id**  
Type: `string`  
Default: `-`  
Description: Unique id of the component. Automatically generated if none is provided.

**dir**  
Type: `"ltr" | "rtl"`  
Default: `ltr`  
Description: Text direction of the component (left-to-right or right-to-left). Defaults to the document direction.

**allow-mouse-wheel**  
Type: `boolean`  
Default: `false`  
Description: Whether changing the mouse wheel (when input focused) increments/decrements the value.

**allow-overflow**  
Type: `boolean`  
Default: `true`  
Description: Whether the value may temporarily exceed the configured `min`/`max` bounds.

**clamp-value-on-blur**  
Type: `boolean`  
Default: `true`  
Description: If `true`, the value is clamped to `min`/`max` when the input loses focus.

**disabled**  
Type: `boolean`  
Default: `false`  
Description: Whether the number input is disabled (prevents user interaction).

**focus-input-on-change**  
Type: `boolean`  
Default: `true`  
Description: If `true`, the input element is focused when the value changes programmatically.

**invalid**  
Type: `boolean`  
Default: `false`  
Description: Marks the input as invalid (useful for validation styling/ARIA).

**default-value**  
Type: `string`  
Default: `-`  
Description: The initial, uncontrolled value of the input when rendered.

**form**  
Type: `string`  
Default: `-`  
Description: The id of the associated `<form>` element (for form submission).

**currency**  
Type: `string`  
Default: `-`  
Description: ISO currency code (used when `style` is `"currency"`).

**style**  
Type: `"decimal" | "currency" | "percent"`  
Default: `decimal`  
Description: Number formatting style.

**maximum-fraction-digits**  
Type: `number`  
Default: `-`  
Description: Maximum fraction digits to display.

**minimum-fraction-digits**  
Type: `number`  
Default: `-`  
Description: Minimum fraction digits to display.

**maximum-significant-digits**  
Type: `number`  
Default: `-`  
Description: Maximum significant digits.

**minimum-significant-digits**  
Type: `number`  
Default: `-`  
Description: Minimum significant digits.

**minimum-integer-digits**  
Type: `number`  
Default: `-`  
Description: Minimum integer digits.

**numbering-system**  
Type: `string`  
Default: `-`  
Description: Numbering system identifier (e.g. `"latn"`).

**currency-display**  
Type: `"code" | "symbol" | "name"`  
Default: `-`  
Description: How currency is displayed.

**compact-display**  
Type: `"short" | "long"`  
Default: `-`  
Description: Compact display style for compact notation.

**notation**  
Type: `"standard" | "scientific" | "engineering" | "compact"`  
Default: `standard`  
Description: Notation style used for formatting.

**unit**  
Type: `string`  
Default: `-`  
Description: Measurement unit (e.g. `"kilogram"`).

**unit-display**  
Type: `"short" | "long" | "narrow"`  
Default: `-`  
Description: How units are displayed.

**currency-sign**  
Type: `"standard" | "accounting"`  
Default: `standard`  
Description: Currency sign style.

**input-mode**  
Type: `"text" | "tel" | "numeric" | "decimal"`  
Default: `decimal`  
Description: Hint for the expected input type (affects virtual keyboard on mobile).

**locale**  
Type: `string`  
Default: `-`  
Description: Locale string used for number formatting (e.g. `"en-US"`).

**max**  
Type: `number`  
Default: `Number.MAX_SAFE_INTEGER`  
Description: Maximum allowed value.

**min**  
Type: `number`  
Default: `Number.MIN_SAFE_INTEGER`  
Description: Minimum allowed value.

**name**  
Type: `string`  
Default: `-`  
Description: Name attribute for form submissions.

**pattern**  
Type: `string`  
Default: `-?[0-9]*(.[0-9]+)?`  
Description: Regex pattern to validate the input string.

**read-only**  
Type: `boolean`  
Default: `false`  
Description: Makes the input read-only (cannot be edited but not disabled).

**required**  
Type: `boolean`  
Default: `false`  
Description: Marks the input as required for form validation.

**spin-on-press**  
Type: `boolean`  
Default: `true`  
Description: Whether holding increment/decrement triggers continuous value changes.

**step**  
Type: `number`  
Default: `1`  
Description: Amount to increment/decrement on each step.

**value**  
Type: `string`  
Default: `-`  
Description: Controlled value of the input (used in controlled components).

---

## Event Callbacks

Each Menu component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id for the menu and a event listener for your event name

```ts
document
  .getElementById("my-number-input")
  ?.addEventListener("my-number-input-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

```html
<!-- render:preview -->
<div
  class="number-input number-input-js"
  id="my-number-input"
  data-on-value-change="my-number-input-event"
>
  <div data-part="root">
    <label data-part="label">Enter Amount</label>
    <div data-part="control">
      <input data-part="input" />
      <div data-part="trigger-group">
        <button data-part="increment-trigger">
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
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
        <button data-part="decrement-trigger">
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
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
```

> Open your browser's console to see the events received when the input value changes

**data-on-value-change**  
Type: `string`  
Description: Event name to be sent when the number input changes.

**data-on-focus-change**  
Type: `string`  
Description: Event name to be sent when the number input is focused.

**data-on-value-invalid**  
Type: `string`  
Description: Event name to be sent when the number input is invalid.

---

## Form usage

Number Input can be used inside a form

You must set the id of the form and the name of the Checkbox

`data-form="form-id"`
`data-name="number-input-name"`

```html
<!-- render:preview -->
<form id="my-form" class="flex flex-col items-center gap-(--spacing-ui-gap)">
  <div
    class="number-input number-input-js"
    data-form="my-form"
    data-name="number-input-name"
  >
    <div data-part="root">
      <label data-part="label">Enter Amount</label>
      <div data-part="control">
        <input data-part="input" />
        <div data-part="trigger-group">
          <button data-part="increment-trigger">
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
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          </button>
          <button data-part="decrement-trigger">
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
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
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
    const number = (formData.get("number-input-name") as string) || "none";
    resultCurrency.textContent = `Number entered: ${number}`;
  });
}
```

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

1. Import the component

```ts
import "@corex-ui/static/components/number-input";
```

This will automatically initialize all elements with `class="number-input-js"` and add the necessary interaction behavior.

2. Add styling

The component is **unstyled by default** for maximum customization flexibility.

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/number-input.css";
```

These styles will be applied to all elements with the `number-input` class.
