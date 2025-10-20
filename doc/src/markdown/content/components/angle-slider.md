---
title: Angle Slider
description: A pure HTML and vanilla JS implementation of Zag JS Angle Slider
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

# Angle Slider

> A pure HTML and vanilla JS implementation of [Zag JS Angle Slider](https://zagjs.com/components/react/angle-slider)

An angle slider is a circular dial that allows users to select an angle, typically in degrees, within a 360° range. It provides an intuitive way to control rotations or orientations, offering accessibility features.

---

## Anatomy

The Angle Slider component consists of the following data parts:

`root`, `label`, `control`, `thumb`, `marker-group`, `marker`, `marker-group`,`value-text`, `text`, `value`, `hidden-input`

```html
<!-- render:preview -->
<div class="angle-slider angle-slider-js">
  <div data-part="root">
    <div data-part="label">Label</div>
    <div data-part="control">
      <div data-part="thumb"></div>
    </div>
    <div data-part="value-text">
      <span data-part="value"></span>
      <span data-part="text">°</span>
    </div>
    <input data-part="hidden-input" />
  </div>
</div>
```

---

## Markers

To show marks along the angle slider track, use `marker-group` and `marker` data parts
You must add a `data-value` to each mark

```html
<!-- render:preview -->
<div class="angle-slider angle-slider-js">
  <div data-part="root">
    <div data-part="label">Label</div>
    <div data-part="control">
      <div data-part="thumb"></div>
      <div data-part="marker-group">
        <div data-part="marker" data-value="0"></div>
        <div data-part="marker" data-value="45"></div>
        <div data-part="marker" data-value="90"></div>
        <div data-part="marker" data-value="135"></div>
        <div data-part="marker" data-value="180"></div>
        <div data-part="marker" data-value="225"></div>
        <div data-part="marker" data-value="270"></div>
        <div data-part="marker" data-value="315"></div>
      </div>
    </div>
    <div data-part="value-text">
      <span data-part="value"></span>
      <span data-part="text">°</span>
    </div>
    <input data-part="hidden-input" />
  </div>
</div>
```

---

## Data attributes

Each angle slider can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  class="angle-slider angle-slider-js"
  id="custom-angle-slider"
  data-default-value="120"
  data-step="60"
>
  <div data-part="root">
    <div data-part="label">Label</div>
    <div data-part="control">
      <div data-part="thumb"></div>
      <div data-part="marker-group">
        <div data-part="marker" data-value="0"></div>
        <div data-part="marker" data-value="60"></div>
        <div data-part="marker" data-value="120"></div>
        <div data-part="marker" data-value="180"></div>
        <div data-part="marker" data-value="240"></div>
        <div data-part="marker" data-value="300"></div>
        <div data-part="marker" data-value="360"></div>
      </div>
    </div>
    <div data-part="value-text">
      <span data-part="value"></span>
      <span data-part="text">°</span>
    </div>
    <input data-part="hidden-input" />
  </div>
</div>
```

**id**
Type: `string`
Description: Unique id of the angle slider. Default generated if none is provided.

**data-numbering-system**
Type: `string`
Description: The numbering system to use for the value displayed.

**data-disabled**
Type: `boolean`
Description: Whether the angle slider is disabled.

**data-invalid**
Type: `boolean`
Description: Whether the angle slider is invalid.

**data-default-value**
Type: `number`
Description: Initial default value of the angle slider when rendered. Use when you don't need to control the value.

**data-value**
Type: `number`
Description: Initial default value of the angle slider when rendered. Use when you don't need to control the value.

**data-name**
Type: `string`
Description: The name of the slider. Useful for form submission.

**data-step**
Type: `number`
Description: The step value for the slider.

**data-read-only**
Type: `boolean`
Description: Whether the angle slider is read-only.

---

## Event Callbacks

Each angle slider component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id for the angle slider and a event listener for your event name

> Open your browser's console to see the events received when the angle slider value changes end

```html
<!-- render:preview -->
<div
  id="my-angle-slider"
  class="angle-slider angle-slider-js"
  data-on-value-change-end="my-angle-slider-event"
>
  <div data-part="root">
    <div data-part="label">Label</div>
    <div data-part="control">
      <div data-part="thumb"></div>
    </div>
    <div data-part="value-text">
      <span data-part="value"></span>
      <span data-part="text">°</span>
    </div>
    <input data-part="hidden-input" />
  </div>
</div>
```

```ts
document
  .getElementById("my-angle-slider")
  ?.addEventListener("my-angle-slider-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

**data-on-value-change**
Type: `string`
Description: Event name to be send when the value of angle slider changes.

**data-on-value-change-end**
Type: `string`
Description: Event name to be send when the state of expanded/collapsed angle slider items changes.

You can also use the value from the callback to rotate a cat.

```html
<!-- render:preview -->
<div>
  <div
    id="angle-slider-rotate"
    class="angle-slider angle-slider-js"
    data-on-value-change="rotate-image"
  >
    <div data-part="root">
      <div data-part="label">Rotate</div>
      <div data-part="control">
        <div data-part="thumb"></div>
      </div>
      <div data-part="value-text">
        <span data-part="value"></span>
        <span data-part="text">°</span>
      </div>
      <input data-part="hidden-input" />
    </div>
  </div>
  <img
    class="size-32 rounded-full"
    id="rotate"
    src="/images/avatar.png"
    alt="Avatar"
  />
</div>
```

```ts
document
  .getElementById("angle-slider-rotate")
  ?.addEventListener("rotate-image", (event) => {
    const { value } = (event as CustomEvent).detail;
    const el = document.getElementById("rotate");
    if (el) {
      el.style.transform = `rotate(${value}deg)`;
      el.style.transformOrigin = "center";
    }
  });
```

---

## API

You can interact with the Angle Slider API by dispatching custom events.

```html
<!-- render:preview -->
<button data-action="angle-slider-set-value" data-value="25" class="button">
  Set 25
</button>
<button data-action="angle-slider-set-value" data-value="55" class="button">
  Set 55
</button>
<button data-action="angle-slider-get-value" class="button">
  Get current value
</button>
<div id="angle-slider-api" class="angle-slider angle-slider-js">
  <div data-part="root">
    <div data-part="label">Label</div>
    <div data-part="control">
      <div data-part="thumb"></div>
    </div>
    <div data-part="value-text">
      <span data-part="value"></span>
      <span data-part="text">°</span>
    </div>
    <input data-part="hidden-input" />
  </div>
</div>
```

```ts
const angleSlider = document.getElementById("angle-slider-api");
console.log(angleSlider);

if (angleSlider) {
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="angle-slider-set-value"]',
  );
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      if (value) {
        const values = value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
        angleSlider.dispatchEvent(
          new CustomEvent("angle-slider:set-value", {
            detail: { value: values },
          }),
        );
      }
    });
  });
  const getBtns = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="angle-slider-get-value"]',
  );
  getBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      angleSlider.dispatchEvent(
        new CustomEvent("angle-slider:value", {
          detail: {
            callback: (value: number) => {
              console.log("Angle Slider current value:", value);
              alert("Angle Slider value: " + String(value));
            },
          },
        }),
      );
    }),
  );
} else {
  console.warn("Element with ID 'angle-slider-api' not found");
}
```

**angle slider:set-value**
Type: `number`
Description: Sets the value of the angle slider

**angle slider:get-value**
Type: `callback`
Description: Get the current value of the angle slider

**angle slider:get-value-degree**
Type: `callback`
Description: Get the current value of the angle slider as a degree string

---

## Numbering System

Numbering System support for angle slider value

```html
<!-- render:preview -->
<div
  class="angle-slider angle-slider-js"
  data-numbering-system="arab"
  data-default-value="123"
>
  <div data-part="root">
    <div data-part="label">Label</div>
    <div data-part="control">
      <div data-part="thumb"></div>
      <div data-part="marker-group">
        <div data-part="marker" data-value="0"></div>
        <div data-part="marker" data-value="45"></div>
        <div data-part="marker" data-value="90"></div>
        <div data-part="marker" data-value="135"></div>
        <div data-part="marker" data-value="180"></div>
        <div data-part="marker" data-value="225"></div>
        <div data-part="marker" data-value="270"></div>
        <div data-part="marker" data-value="315"></div>
      </div>
    </div>
    <div data-part="value-text">
      <span data-part="value"></span>
      <span data-part="text">°</span>
    </div>
    <input data-part="hidden-input" />
  </div>
</div>
```

---

## Modifiers

Angle Sliders support modifier classes that control their appearance.  
You can combine multiple modifiers on the same angle slider.

The default modifier is applied automatically, so you don’t need to include it explicitly.

| Modifier        | Description                                   |
| --------------- | --------------------------------------------- |
| [Color](#color) | Sets the color theme of the angle slider.     |
| [Size](#size)   | Adjusts the overall size of the angle slider. |

> You may have noticed the double dash before the modifier name — this follows the BEM (Block Element Modifier) naming convention

### Color

Use `class="angle-slider--{color}"` to set the color of an angle slider.

Available options:  
**accent**, **brand**, **alert**, **info**, **success**

```html
<!-- render:preview -->
<div>
  <div class="angle-slider angle-slider-js angle-slider--accent">
    <div data-part="root">
      <div data-part="label">Label</div>
      <div data-part="control">
        <div data-part="thumb"></div>
        <div data-part="marker-group">
          <div data-part="marker" data-value="0"></div>
          <div data-part="marker" data-value="45"></div>
          <div data-part="marker" data-value="90"></div>
          <div data-part="marker" data-value="135"></div>
          <div data-part="marker" data-value="180"></div>
          <div data-part="marker" data-value="225"></div>
          <div data-part="marker" data-value="270"></div>
          <div data-part="marker" data-value="315"></div>
        </div>
      </div>
      <div data-part="value-text">
        <span data-part="value"></span>
        <span data-part="text">°</span>
      </div>
      <input data-part="hidden-input" />
    </div>
  </div>
  <div class="angle-slider angle-slider-js angle-slider--brand">
    <div data-part="root">
      <div data-part="label">Label</div>
      <div data-part="control">
        <div data-part="thumb"></div>
        <div data-part="marker-group">
          <div data-part="marker" data-value="0"></div>
          <div data-part="marker" data-value="45"></div>
          <div data-part="marker" data-value="90"></div>
          <div data-part="marker" data-value="135"></div>
          <div data-part="marker" data-value="180"></div>
          <div data-part="marker" data-value="225"></div>
          <div data-part="marker" data-value="270"></div>
          <div data-part="marker" data-value="315"></div>
        </div>
      </div>
      <div data-part="value-text">
        <span data-part="value"></span>
        <span data-part="text">°</span>
      </div>
      <input data-part="hidden-input" />
    </div>
  </div>
  <div class="angle-slider angle-slider-js angle-slider--alert">
    <div data-part="root">
      <div data-part="label">Label</div>
      <div data-part="control">
        <div data-part="thumb"></div>
        <div data-part="marker-group">
          <div data-part="marker" data-value="0"></div>
          <div data-part="marker" data-value="45"></div>
          <div data-part="marker" data-value="90"></div>
          <div data-part="marker" data-value="135"></div>
          <div data-part="marker" data-value="180"></div>
          <div data-part="marker" data-value="225"></div>
          <div data-part="marker" data-value="270"></div>
          <div data-part="marker" data-value="315"></div>
        </div>
      </div>
      <div data-part="value-text">
        <span data-part="value"></span>
        <span data-part="text">°</span>
      </div>
      <input data-part="hidden-input" />
    </div>
  </div>
  <div class="angle-slider angle-slider-js angle-slider--info">
    <div data-part="root">
      <div data-part="label">Label</div>
      <div data-part="control">
        <div data-part="thumb"></div>
        <div data-part="marker-group">
          <div data-part="marker" data-value="0"></div>
          <div data-part="marker" data-value="45"></div>
          <div data-part="marker" data-value="90"></div>
          <div data-part="marker" data-value="135"></div>
          <div data-part="marker" data-value="180"></div>
          <div data-part="marker" data-value="225"></div>
          <div data-part="marker" data-value="270"></div>
          <div data-part="marker" data-value="315"></div>
        </div>
      </div>
      <div data-part="value-text">
        <span data-part="value"></span>
        <span data-part="text">°</span>
      </div>
      <input data-part="hidden-input" />
    </div>
  </div>
  <div class="angle-slider angle-slider-js angle-slider--success">
    <div data-part="root">
      <div data-part="label">Label</div>
      <div data-part="control">
        <div data-part="thumb"></div>
        <div data-part="marker-group">
          <div data-part="marker" data-value="0"></div>
          <div data-part="marker" data-value="45"></div>
          <div data-part="marker" data-value="90"></div>
          <div data-part="marker" data-value="135"></div>
          <div data-part="marker" data-value="180"></div>
          <div data-part="marker" data-value="225"></div>
          <div data-part="marker" data-value="270"></div>
          <div data-part="marker" data-value="315"></div>
        </div>
      </div>
      <div data-part="value-text">
        <span data-part="value"></span>
        <span data-part="text">°</span>
      </div>
      <input data-part="hidden-input" />
    </div>
  </div>
</div>
```

---

### Size

Use `class="angle-slider--{size}"` to set the size of an angle slider.

Available options:  
**sm**, **md** (default), **lg**, **xl**

```html
<!-- render:preview -->
<div>
  <div class="angle-slider angle-slider-js angle-slider--sm">
    <div data-part="root">
      <div data-part="label">Label</div>
      <div data-part="control">
        <div data-part="thumb"></div>
        <div data-part="marker-group">
          <div data-part="marker" data-value="0"></div>
          <div data-part="marker" data-value="45"></div>
          <div data-part="marker" data-value="90"></div>
          <div data-part="marker" data-value="135"></div>
          <div data-part="marker" data-value="180"></div>
          <div data-part="marker" data-value="225"></div>
          <div data-part="marker" data-value="270"></div>
          <div data-part="marker" data-value="315"></div>
        </div>
      </div>
      <div data-part="value-text">
        <span data-part="value"></span>
        <span data-part="text">°</span>
      </div>
      <input data-part="hidden-input" />
    </div>
  </div>
  <div class="angle-slider angle-slider-js">
    <div data-part="root">
      <div data-part="label">Label</div>
      <div data-part="control">
        <div data-part="thumb"></div>
        <div data-part="marker-group">
          <div data-part="marker" data-value="0"></div>
          <div data-part="marker" data-value="45"></div>
          <div data-part="marker" data-value="90"></div>
          <div data-part="marker" data-value="135"></div>
          <div data-part="marker" data-value="180"></div>
          <div data-part="marker" data-value="225"></div>
          <div data-part="marker" data-value="270"></div>
          <div data-part="marker" data-value="315"></div>
        </div>
      </div>
      <div data-part="value-text">
        <span data-part="value"></span>
        <span data-part="text">°</span>
      </div>
      <input data-part="hidden-input" />
    </div>
  </div>
  <div class="angle-slider angle-slider-js angle-slider--lg">
    <div data-part="root">
      <div data-part="label">Label</div>
      <div data-part="control">
        <div data-part="thumb"></div>
        <div data-part="marker-group">
          <div data-part="marker" data-value="0"></div>
          <div data-part="marker" data-value="45"></div>
          <div data-part="marker" data-value="90"></div>
          <div data-part="marker" data-value="135"></div>
          <div data-part="marker" data-value="180"></div>
          <div data-part="marker" data-value="225"></div>
          <div data-part="marker" data-value="270"></div>
          <div data-part="marker" data-value="315"></div>
        </div>
      </div>
      <div data-part="value-text">
        <span data-part="value"></span>
        <span data-part="text">°</span>
      </div>
      <input data-part="hidden-input" />
    </div>
  </div>
  <div class="angle-slider angle-slider-js angle-slider--xl">
    <div data-part="root">
      <div data-part="label">Label</div>
      <div data-part="control">
        <div data-part="thumb"></div>
        <div data-part="marker-group">
          <div data-part="marker" data-value="0"></div>
          <div data-part="marker" data-value="45"></div>
          <div data-part="marker" data-value="90"></div>
          <div data-part="marker" data-value="135"></div>
          <div data-part="marker" data-value="180"></div>
          <div data-part="marker" data-value="225"></div>
          <div data-part="marker" data-value="270"></div>
          <div data-part="marker" data-value="315"></div>
        </div>
      </div>
      <div data-part="value-text">
        <span data-part="value"></span>
        <span data-part="text">°</span>
      </div>
      <input data-part="hidden-input" />
    </div>
  </div>
</div>
```

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

### Static

1. Import the Angle Slider component

```ts
import "@corex-ui/static/components/angle-slider";
```

This will automatically initialize all elements with `class="angle-slider-js"` and add the necessary interaction behavior.

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/angle-slider.css";
```

Then apply the base class along with any desired modifiers:

```html
<div class="angle-slider angle-slider-js">
  <div data-part="root">
    <div data-part="label">Label</div>
    <div data-part="control">
      <div data-part="thumb"></div>
    </div>
  </div>
</div>
```

### Static React

> Experimental! Only works with React static export (eg. Next.js SSG.)

1. Import the Angle Slider component

```ts
import { AngleSlider } from '@corex-ui/static/react';
export default function Home() {
  return (
    <AngleSlider>
      <div data-part="root">
        <div data-part="label">Label</div>
        <div data-part="control">
          <div data-part="thumb"></div>
        </div>
      </div>
    </AngleSlider>
  );
}
```

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/angle-slider.css";
```

Then apply the base class along with any desired modifiers:

```html
<AngleSlider className="angle-slider"> {/* content */} </AngleSlider>
```
