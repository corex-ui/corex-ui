---
title: Switch
description: A pure HTML and vanilla JS implementation of Zag JS Switch
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

# Switch

> A pure HTML and vanilla JS implementation of [Zag JS Switch](https://zagjs.com/components/react/switch)

A switch allows users to turn an individual option on or off.

---

## Anatomy

The Switch component consists of the following data parts:

`root`, `label`, `hidden-input`, `control`, `thumb`

```html
<!-- render:preview -->
<div class="switch switch-js">
  <label data-part="root">
    <span data-part="label">Label</span>
    <input data-part="hidden-input" />
    <span data-part="control">
      <span data-part="thumb"></span>
    </span>
  </label>
</div>
```

---

## Data attributes

Each switch can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div class="switch switch-js" data-default-checked="true">
  <label data-part="root">
    <span data-part="label">Checked</span>
    <input data-part="hidden-input" />
    <span data-part="control">
      <span data-part="thumb"></span>
    </span>
  </label>
</div>
<div class="switch switch-js" data-disabled="true">
  <label data-part="root">
    <span data-part="label">Disabled</span>
    <input data-part="hidden-input" />
    <span data-part="control">
      <span data-part="thumb"></span>
    </span>
  </label>
</div>
<div class="switch switch-js" data-invalid="true">
  <label data-part="root">
    <span data-part="label">Invalid</span>
    <input data-part="hidden-input" />
    <span data-part="control">
      <span data-part="thumb"></span>
    </span>
  </label>
</div>
```

**id**  
Type: `string`  
Description: The unique id of the component. Default generated if none is provided.

**data-default-checked**  
Type: `boolean | "indeterminate"`  
Description: The initial checked state of the switch.

**data-checked**  
Type: `boolean | "indeterminate"`  
Description: The controlled checked state of the switch.

**data-dir**  
Type: `ltr | rtl`  
Description: The orientation of the switch. Can be `ltr` or `rtl`.

**data-disabled**  
Type: `string`  
Description: Whether the switch is disabled.

**data-invalid**  
Type: `boolean`  
Description: Whether the switch is invalid.

**data-required**  
Type: `boolean`  
Description: Whether the switch is required.

**data-read-only**  
Type: `boolean`  
Description: Whether the switch is read-only.

**data-form**  
Type: `string`  
Description: The id of the form that the switch belongs to.

**data-name**  
Type: `string`  
Description: The name of the input field in a switch. Useful for form submission.

**data-value**  
Type: `string`  
Description: The value of switch input. Useful for form submission. Default is `"on"`.

---

## Event Callbacks

Each switch component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id for the switch and a event listener for your event name

```ts
document
  .getElementById("my-switch")
  ?.addEventListener("my-switch-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

```html
<!-- render:preview -->
<div
  id="my-switch"
  class="switch switch-js"
  data-on-checked-change="my-switch-event"
>
  <label data-part="root">
    <span data-part="label">Label</span>
    <input data-part="hidden-input" />
    <span data-part="control">
      <span data-part="thumb"></span>
    </span>
  </label>
</div>
```

> Open your browser's console to see the events received when you check or uncheck the above switch

**data-on-open-change**
Type: `string`
Description: Event name to send when the switch's open state changes

---

## Form usage

Switch can be used inside a form

You must set the id of the form and the name of the Switch

`data-form="form-id"`
`data-name="switch-name"`

You can also add `data-value="yes"` of the switch. Default to : "on"

```html
<!-- render:preview -->
<form id="my-form" class="flex flex-col items-center gap-(--spacing-ui-gap)">
  <div
    class="switch switch-js"
    data-form="my-form"
    data-name="terms"
    data-value="yes"
  >
    <label data-part="root">
      <span data-part="label">Accept Terms</span>
      <input data-part="hidden-input" />
      <span data-part="control">
        <span data-part="thumb"></span>
      </span>
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
    const terms = (formData.get("terms") as string) || "no";
    resultCurrency.textContent = `Terms accepted: ${terms}`;
  });
}
```

---

## API

You can interact with the switch API by dispatching custom events.

```html
<!-- render:preview -->
<div>
  <button
    data-action="switch-set-checked"
    data-value="true"
    class="button button--sm"
  >
    Check Switch
  </button>
  <button
    data-action="switch-set-checked"
    data-value="false"
    class="button button--sm"
  >
    Uncheck Switch
  </button>
</div>
<div id="switch-api" class="switch switch-js">
  <label data-part="root">
    <span data-part="label">Label</span>
    <input data-part="hidden-input" />
    <span data-part="control">
      <span data-part="thumb"></span>
    </span>
  </label>
</div>
```

```ts
const switchState = document.getElementById("switch-api");
if (switchState) {
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="switch-set-checked"]',
  );
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      if (value !== undefined) {
        const boolValue = value === "true";

        switchState.dispatchEvent(
          new CustomEvent("switch:set-checked", {
            detail: { value: boolValue },
          }),
        );
      }
    });
  });
} else {
  console.warn("Element with ID 'switch-api' not found");
}
```

**switch:set-checked**
Type: `boolean`
Description: Sets the checked state of the switch.

**switch:toggle-checked**
Type: `null`
Description: Toggles the checked state of the switch.

**switch:checked**
Type: `callback`
Description: Whether the switch is checked.

---

## Modifiers

Each switch can be styled with modifiers.

You can mix as many modifiers on the same button, however you can choose only one choice per modifer

For convenience the default variant name is omited, meaning there is no need to add the default name class

> You may have noticed the double dash before the modifier name — this follows the BEM (Block Element Modifier) naming convention

| Modifier        | Option                                      |
| --------------- | ------------------------------------------- |
| [Color](#color) | base (default), brand, alert, info, success |
| [Size](#size)   | md (default), sm, lg, xl                    |
| [Shape](#shape) | rectangular (default), square, circle       |

---

### Color

Set the color of each switch

Options: **base(default)**, **brand**, **alert**, **info**,**success**

```html
<!-- render:preview -->
<div>
  <div class="switch switch-js">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <span data-part="control">
        <span data-part="thumb"></span>
      </span>
    </label>
  </div>
  <div class="switch switch-js switch--brand">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <span data-part="control">
        <span data-part="thumb"></span>
      </span>
    </label>
  </div>
  <div class="switch switch-js switch--alert">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <span data-part="control">
        <span data-part="thumb"></span>
      </span>
    </label>
  </div>
  <div class="switch switch-js switch--info">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <span data-part="control">
        <span data-part="thumb"></span>
      </span>
    </label>
  </div>
  <div class="switch switch-js switch--success">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <span data-part="control">
        <span data-part="thumb"></span>
      </span>
    </label>
  </div>
</div>
```

---

### Size

Set the size of each switch

Options: **md(default)**, **sm**, **lg**, **xl**

```html
<!-- render:preview -->
<div>
  <div class="switch switch-js switch--sm">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <span data-part="control">
        <span data-part="thumb"></span>
      </span>
    </label>
  </div>
  <div class="switch switch-js">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <span data-part="control">
        <span data-part="thumb"></span>
      </span>
    </label>
  </div>
  <div class="switch switch-js switch--lg">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <span data-part="control">
        <span data-part="thumb"></span>
      </span>
    </label>
  </div>
  <div class="switch switch-js switch--xl">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <span data-part="control">
        <span data-part="thumb"></span>
      </span>
    </label>
  </div>
</div>
```

---

### Shape

Set the shape of each switch

Options: **circle(default)**, **square**

```html
<!-- render:preview -->
<div>
  <div class="switch switch-js">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <span data-part="control">
        <span data-part="thumb"></span>
      </span>
    </label>
  </div>
  <div class="switch switch-js switch--square">
    <label data-part="root">
      <span data-part="label">Label</span>
      <input data-part="hidden-input" />
      <span data-part="control">
        <span data-part="thumb"></span>
      </span>
    </label>
  </div>
</div>
```

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

1. Import the Switch component

```ts
import "@corex-ui/static/components/switch";
```

This will automatically initialize all elements with `class="switch-js"` and add the necessary interaction behavior.

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/switch.css";
```

Then apply the base class along with any desired modifiers:

```html
<div class="switch switch-js">
  <label data-part="root">
    <span data-part="label">Label</span>
    <input data-part="hidden-input" />
    <span data-part="control"><span data-part="thumb"></span></span>
  </label>
</div>
```
