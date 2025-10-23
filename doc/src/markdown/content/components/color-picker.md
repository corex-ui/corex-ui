---
title: Color Picker
description: A pure HTML and vanilla JS implementation of Zag JS Color Picker
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

# Color Picker

> A pure HTML and vanilla JS implementation of [Zag JS Color Picker](https://zagjs.com/components/react/color-picker)

The color picker is an input widget used to select a color value from a predefined list or a color area.
This component builds on top of the native `<input type=color>` experience and provides a more customizable and consistent user experience.

---

## Anatomy

The Color Picker component consists of the following data parts:

`root`, `label`, `control`, `trigger`, `positioner`, `content`, `area`, `areaThumb`, `areaBackground`, `channelSlider`, `channelSliderLabel`, `channelSliderTrack`, `channelSliderThumb`, `channelSliderValueText`, `channelInput`, `transparencyGrid`, `swatchGroup`, `swatchTrigger`, `swatchIndicator`, `swatch`, `eyeDropperTrigger`, `formatTrigger`

> The Eye Dropper feature relies on the Eye Dropper API, which is currently not supported on touch-screen devices.

```html
<!-- render:preview -->
<div
  class="color-picker color-picker-js"
  data-default-value="rgb(25, 9, 192, 0.9)"
>
  <div data-part="root">
    <label data-part="label">Select Color (RGBA)</label>
    <input data-part="hidden-input" />
    <div data-part="control">
      <button data-part="trigger">
        <div data-part="transparency-grid" data-size="10px"></div>
        <div data-part="swatch"></div>
      </button>
      <input
        data-part="channel-input"
        data-channel="hex"
        name="channel-input-hex"
      />
      <input
        data-part="channel-input"
        data-channel="alpha"
        name="channel-input-alpha"
      />
      <button data-part="eye-dropper-trigger">
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
            d="m15 11.25 1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 1 0-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25 12.75 9"
          />
        </svg>
      </button>
    </div>
    <div data-part="positioner">
      <div data-part="content">
        <div data-part="area">
          <div data-part="area-background"></div>
          <div data-part="area-thumb"></div>
        </div>
        <div data-part="pickers">
          <div data-part="sliders">
            <div data-part="channel-slider" data-channel="hue">
              <div data-part="channel-slider-track" data-channel="hue"></div>
              <div data-part="channel-slider-thumb" data-channel="hue"></div>
            </div>
            <div data-part="channel-slider" data-channel="alpha">
              <div data-part="transparency-grid" data-size="12px"></div>
              <div data-part="channel-slider-track" data-channel="alpha"></div>
              <div data-part="channel-slider-thumb" data-channel="alpha"></div>
            </div>
          </div>
        </div>
        <div data-part="input-groups">
          <div data-part="input-group">
            <span>R</span>
            <input
              data-part="channel-input"
              data-channel="red"
              name="channel-red"
            />
          </div>
          <div data-part="input-group">
            <span>G</span>
            <input
              data-part="channel-input"
              data-channel="green"
              name="channel-green"
            />
          </div>
          <div data-part="input-group">
            <span>B</span>
            <input
              data-part="channel-input"
              data-channel="blue"
              name="channel-blue"
            />
          </div>
          <div data-part="input-group">
            <span>A</span>
            <input
              data-part="channel-input"
              data-channel="alpha"
              name="channel-alpha"
            />
          </div>
        </div>
        <div data-part="swatch-group">
          <button data-part="swatch-trigger" data-value="#ff0000">
            <div
              data-part="transparency-grid"
              data-size="var(--spacing-mini)"
            ></div>
            <div data-part="swatch" data-value="#ff0000"></div>
          </button>
          <button data-part="swatch-trigger" data-value="#00ff00">
            <div
              data-part="transparency-grid"
              data-size="var(--spacing-mini)"
            ></div>
            <div data-part="swatch" data-value="#00ff00"></div>
          </button>
          <button data-part="swatch-trigger" data-value="#0000ff">
            <div
              data-part="transparency-grid"
              data-size="var(--spacing-mini)"
            ></div>
            <div data-part="swatch" data-value="#0000ff"></div>
          </button>
          <button data-part="swatch-trigger" data-value="rgb(25, 9, 192, 0.9)">
            <div
              data-part="transparency-grid"
              data-size="var(--spacing-mini)"
            ></div>
            <div data-part="swatch" data-value="rgb(25, 9, 192, 0.9)"></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## Format

By default the channel-input format is "rgba"
You can also select "hsla" or "hsba"

```html
<!-- render:preview -->
<div
  class="color-picker color-picker-js"
  data-default-value="hsla(200, 60%, 50%, 0.9)"
  data-default-format="hsla"
>
  <div data-part="root">
    <label data-part="label">Select Color (HSLA)</label>
    <input data-part="hidden-input" />
    <div data-part="control">
      <button data-part="trigger">
        <div data-part="transparency-grid" data-size="10px"></div>
        <div data-part="swatch"></div>
      </button>
      <input
        data-part="channel-input"
        data-channel="hex"
        name="channel-input-hex"
      />
      <input
        data-part="channel-input"
        data-channel="alpha"
        name="channel-input-alpha"
      />
      <button data-part="eye-dropper-trigger">
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
            d="m15 11.25 1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 1 0-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25 12.75 9"
          />
        </svg>
      </button>
    </div>
    <div data-part="positioner">
      <div data-part="content">
        <div data-part="area">
          <div data-part="area-background"></div>
          <div data-part="area-thumb"></div>
        </div>
        <div data-part="pickers">
          <div data-part="sliders">
            <div data-part="channel-slider" data-channel="hue">
              <div data-part="channel-slider-track" data-channel="hue"></div>
              <div data-part="channel-slider-thumb" data-channel="hue"></div>
            </div>
            <div data-part="channel-slider" data-channel="alpha">
              <div data-part="transparency-grid" data-size="12px"></div>
              <div data-part="channel-slider-track" data-channel="alpha"></div>
              <div data-part="channel-slider-thumb" data-channel="alpha"></div>
            </div>
          </div>
        </div>
        <div data-part="input-groups">
          <div data-part="input-group">
            <span>H</span>
            <input data-part="channel-input" data-channel="hue" />
          </div>
          <div data-part="input-group">
            <span>S</span>
            <input data-part="channel-input" data-channel="saturation" />
          </div>
          <div data-part="input-group">
            <span>L</span>
            <input data-part="channel-input" data-channel="lightness" />
          </div>
          <div data-part="input-group">
            <span>A</span>
            <input
              data-part="channel-input"
              data-channel="alpha"
              name="channel-alpha"
            />
          </div>
        </div>
        <div data-part="swatch-group">
          <button data-part="swatch-trigger" data-value="#ff0000">
            <div
              data-part="transparency-grid"
              data-size="var(--spacing-mini)"
            ></div>
            <div data-part="swatch" data-value="#ff0000"></div>
          </button>
          <button data-part="swatch-trigger" data-value="#00ff00">
            <div
              data-part="transparency-grid"
              data-size="var(--spacing-mini)"
            ></div>
            <div data-part="swatch" data-value="#00ff00"></div>
          </button>
          <button data-part="swatch-trigger" data-value="#0000ff">
            <div
              data-part="transparency-grid"
              data-size="var(--spacing-mini)"
            ></div>
            <div data-part="swatch" data-value="#0000ff"></div>
          </button>
          <button
            data-part="swatch-trigger"
            data-value="hsla(200, 60%, 50%, 0.9)"
          >
            <div
              data-part="transparency-grid"
              data-size="var(--spacing-mini)"
            ></div>
            <div data-part="swatch" data-value="hsla(200, 60%, 50%, 0.9)"></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
<div
  class="color-picker color-picker-js"
  data-default-value="hsla(2, 60%, 50%, 0.9)"
  data-default-format="hsba"
>
  <div data-part="root">
    <label data-part="label">Select Color (HSBA)</label>
    <input data-part="hidden-input" />
    <div data-part="control">
      <button data-part="trigger">
        <div data-part="transparency-grid" data-size="10px"></div>
        <div data-part="swatch"></div>
      </button>
      <input
        data-part="channel-input"
        data-channel="hex"
        name="channel-input-hex"
      />
      <input
        data-part="channel-input"
        data-channel="alpha"
        name="channel-input-alpha"
      />
      <button data-part="eye-dropper-trigger">
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
            d="m15 11.25 1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 1 0-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25 12.75 9"
          />
        </svg>
      </button>
    </div>
    <div data-part="positioner">
      <div data-part="content">
        <div data-part="area">
          <div data-part="area-background"></div>
          <div data-part="area-thumb"></div>
        </div>
        <div data-part="pickers">
          <div data-part="sliders">
            <div data-part="channel-slider" data-channel="hue">
              <div data-part="channel-slider-track" data-channel="hue"></div>
              <div data-part="channel-slider-thumb" data-channel="hue"></div>
            </div>
            <div data-part="channel-slider" data-channel="alpha">
              <div data-part="transparency-grid" data-size="12px"></div>
              <div data-part="channel-slider-track" data-channel="alpha"></div>
              <div data-part="channel-slider-thumb" data-channel="alpha"></div>
            </div>
          </div>
        </div>
        <div data-part="input-groups">
          <div data-part="input-group">
            <span>H</span>
            <input data-part="channel-input" data-channel="hue" />
          </div>
          <div data-part="input-group">
            <span>S</span>
            <input data-part="channel-input" data-channel="saturation" />
          </div>
          <div data-part="input-group">
            <span>B</span>
            <input data-part="channel-input" data-channel="brightness" />
          </div>
          <div data-part="input-group">
            <span>A</span>
            <input
              data-part="channel-input"
              data-channel="alpha"
              name="channel-alpha"
            />
          </div>
        </div>
        <div data-part="swatch-group">
          <button data-part="swatch-trigger" data-value="#ff0000">
            <div
              data-part="transparency-grid"
              data-size="var(--spacing-mini)"
            ></div>
            <div data-part="swatch" data-value="#ff0000"></div>
          </button>
          <button data-part="swatch-trigger" data-value="#00ff00">
            <div
              data-part="transparency-grid"
              data-size="var(--spacing-mini)"
            ></div>
            <div data-part="swatch" data-value="#00ff00"></div>
          </button>
          <button data-part="swatch-trigger" data-value="#0000ff">
            <div
              data-part="transparency-grid"
              data-size="var(--spacing-mini)"
            ></div>
            <div data-part="swatch" data-value="#0000ff"></div>
          </button>
          <button
            data-part="swatch-trigger"
            data-value="hsla(2, 60%, 50%, 0.9)"
          >
            <div
              data-part="transparency-grid"
              data-size="var(--spacing-mini)"
            ></div>
            <div data-part="swatch" data-value="hsla(2, 60%, 50%, 0.9)"></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## Data attributes

Each color picker can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  class="color-picker color-picker-js"
  data-default-value="rgb(25, 9, 192, 0.9)"
  data-disabled="false"
  data-read-only="false"
  data-required="false"
  data-invalid="false"
  data-default-open="true"
  data-default-format="rgba"
  data-close-on-select="true"
  data-open-auto-focus="true"
  data-hide-when-detached="true"
  data-placement="bottom-start"
  data-strategy="absolute"
  data-flip="true"
  data-gutter="8"
  data-arrow-padding="4"
  data-overflow-padding="8"
  data-offset-main-axis="0"
  data-offset-cross-axis="0"
>
  <div data-part="root">
    <label data-part="label">Select Color</label>
    <input data-part="hidden-input" />
    <div data-part="control">
      <button data-part="trigger">
        <div data-part="transparency-grid" data-size="10px"></div>
        <div data-part="swatch"></div>
      </button>
      <input
        data-part="channel-input"
        data-channel="hex"
        name="channel-input-hex"
      />
      <input
        data-part="channel-input"
        data-channel="alpha"
        name="channel-input-alpha"
      />
      <button data-part="eye-dropper-trigger">
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
            d="m15 11.25 1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 1 0-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25 12.75 9"
          />
        </svg>
      </button>
    </div>
    <div data-part="positioner">
      <div data-part="content">
        <div data-part="area">
          <div data-part="area-background"></div>
          <div data-part="area-thumb"></div>
        </div>
        <div data-part="pickers">
          <div data-part="sliders">
            <div data-part="channel-slider" data-channel="hue">
              <div data-part="channel-slider-track" data-channel="hue"></div>
              <div data-part="channel-slider-thumb" data-channel="hue"></div>
            </div>
            <div data-part="channel-slider" data-channel="alpha">
              <div data-part="transparency-grid" data-size="12px"></div>
              <div data-part="channel-slider-track" data-channel="alpha"></div>
              <div data-part="channel-slider-thumb" data-channel="alpha"></div>
            </div>
          </div>
        </div>
        <div data-part="input-groups">
          <div data-part="input-group">
            <span>R</span>
            <input
              data-part="channel-input"
              data-channel="red"
              name="channel-red"
            />
          </div>
          <div data-part="input-group">
            <span>G</span>
            <input
              data-part="channel-input"
              data-channel="green"
              name="channel-green"
            />
          </div>
          <div data-part="input-group">
            <span>B</span>
            <input
              data-part="channel-input"
              data-channel="blue"
              name="channel-blue"
            />
          </div>
          <div data-part="input-group">
            <span>A</span>
            <input
              data-part="channel-input"
              data-channel="alpha"
              name="channel-alpha"
            />
          </div>
        </div>
        <div data-part="swatch-group">
          <button data-part="swatch-trigger" data-value="#ff0000">
            <div
              data-part="transparency-grid"
              data-size="var(--spacing-mini)"
            ></div>
            <div data-part="swatch" data-value="#ff0000"></div>
          </button>
          <button data-part="swatch-trigger" data-value="#00ff00">
            <div
              data-part="transparency-grid"
              data-size="var(--spacing-mini)"
            ></div>
            <div data-part="swatch" data-value="#00ff00"></div>
          </button>
          <button data-part="swatch-trigger" data-value="#0000ff">
            <div
              data-part="transparency-grid"
              data-size="var(--spacing-mini)"
            ></div>
            <div data-part="swatch" data-value="#0000ff"></div>
          </button>
          <button data-part="swatch-trigger" data-value="rgb(25, 9, 192, 0.9)">
            <div
              data-part="transparency-grid"
              data-size="var(--spacing-mini)"
            ></div>
            <div data-part="swatch" data-value="rgb(25, 9, 192, 0.9)"></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

**id**
Type: `string`
Description: Unique id of the color-picker. Default generated if none is provided.

**data-value**  
Type: `Color`  
Description: The controlled color value of the color picker.

**data-default-value**  
Type: `Color`  
Description: The initial color value when rendered. Use when you don't need to control the color value of the color picker. Default: `#000000`.

**data-disabled**  
Type: `boolean`  
Description: Whether the color picker is disabled.

**data-read-only**  
Type: `boolean`  
Description: Whether the color picker is read-only.

**data-required**  
Type: `boolean`  
Description: Whether the color picker is required.

**data-invalid**  
Type: `boolean`  
Description: Whether the color picker is invalid.

**data-name**  
Type: `string`  
Description: The name for the form input.

**data-open**  
Type: `boolean`  
Description: The controlled open state of the color picker.

**data-default-open**  
Type: `boolean`  
Description: The initial open state of the color picker when rendered. Use when you don't need to control the open state.

**data-format**  
Type: `"rgba"` || `"hsla"` || `"hsba"`
Description: The controlled color format to use.

**data-default-format**  
Type: `"rgba"` || `"hsla"` || `"hsba"`  
Description: The initial color format when rendered. Use when you don't need to control the color format. Default: `"rgba"`.

**data-close-on-select**  
Type: `boolean`  
Description: Whether to close the color picker when a swatch is selected. Default: `false`.

**data-open-auto-focus**  
Type: `boolean`  
Description: Whether to auto focus the color picker when it is opened. Default: `true`.

**data-inline**  
Type: `boolean`  
Description: Whether to render the color picker inline.

**data-hide-when-detached**  
Type: `boolean`  
Description: Whether the color picker should hide when detached from its reference element.

**data-placement**  
Type: `string`  
Description: The placement of the color picker relative to its reference element.  
Options:

- `top`
- `right`
- `bottom`
- `left`
- `top-start`
- `top-end`
- `right-start`
- `right-end`
- `bottom-start`
- `bottom-end`
- `left-start`
- `left-end`

**data-strategy**  
Type: `string`  
Description: The positioning strategy used for the color picker. Options: `absolute`, `fixed`.

**data-flip**  
Type: `boolean`  
Description: Whether the color picker should automatically flip to the opposite side if there is not enough space.

**data-gutter**  
Type: `number`  
Description: The spacing between the color picker and its reference element.

**data-arrow-padding**  
Type: `number`  
Description: The padding between the arrow element and the edges of the color picker.

**data-overflow-padding**  
Type: `number`  
Description: The padding to prevent overflow of the color picker within its boundaries.

**data-offset-main-axis**  
Type: `number`  
Description: The offset along the main axis of the color picker relative to its reference element.

**data-offset-cross-axis**  
Type: `number`  
Description: The offset along the cross axis of the color picker relative to its reference element.

---

## Event Callbacks

Each color-picker component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id for the color-picker and a event listener for your event name

> Open your browser's console to see the events received when the color-picker value changes

```html
<!-- render:preview -->
<div
  id="my-color-picker"
  class="color-picker color-picker-js"
  data-on-value-change="my-color-picker-event"
>
  <div data-part="root">
    <label data-part="label">Select Color (RGBA)</label>
    <input data-part="hidden-input" />
    <div data-part="control">
      <button data-part="trigger">
        <div data-part="transparency-grid" data-size="10px"></div>
        <div data-part="swatch"></div>
      </button>
      <input
        data-part="channel-input"
        data-channel="hex"
        name="channel-input-hex"
      />
      <input
        data-part="channel-input"
        data-channel="alpha"
        name="channel-input-alpha"
      />
      <button data-part="eye-dropper-trigger">
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
            d="m15 11.25 1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 1 0-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25 12.75 9"
          />
        </svg>
      </button>
    </div>
    <div data-part="positioner">
      <div data-part="content">
        <div data-part="area">
          <div data-part="area-background"></div>
          <div data-part="area-thumb"></div>
        </div>
        <div data-part="pickers">
          <div data-part="sliders">
            <div data-part="channel-slider" data-channel="hue">
              <div data-part="channel-slider-track" data-channel="hue"></div>
              <div data-part="channel-slider-thumb" data-channel="hue"></div>
            </div>
            <div data-part="channel-slider" data-channel="alpha">
              <div data-part="transparency-grid" data-size="12px"></div>
              <div data-part="channel-slider-track" data-channel="alpha"></div>
              <div data-part="channel-slider-thumb" data-channel="alpha"></div>
            </div>
          </div>
        </div>
        <div data-part="input-groups">
          <div data-part="input-group">
            <span>R</span>
            <input
              data-part="channel-input"
              data-channel="red"
              name="channel-red"
            />
          </div>
          <div data-part="input-group">
            <span>G</span>
            <input
              data-part="channel-input"
              data-channel="green"
              name="channel-green"
            />
          </div>
          <div data-part="input-group">
            <span>B</span>
            <input
              data-part="channel-input"
              data-channel="blue"
              name="channel-blue"
            />
          </div>
          <div data-part="input-group">
            <span>A</span>
            <input
              data-part="channel-input"
              data-channel="alpha"
              name="channel-alpha"
            />
          </div>
        </div>
        <div data-part="swatch-group">
          <button data-part="swatch-trigger" data-value="#ff0000">
            <div
              data-part="transparency-grid"
              data-size="var(--spacing-mini)"
            ></div>
            <div data-part="swatch" data-value="#ff0000"></div>
          </button>
          <button data-part="swatch-trigger" data-value="#00ff00">
            <div
              data-part="transparency-grid"
              data-size="var(--spacing-mini)"
            ></div>
            <div data-part="swatch" data-value="#00ff00"></div>
          </button>
          <button data-part="swatch-trigger" data-value="#0000ff">
            <div
              data-part="transparency-grid"
              data-size="var(--spacing-mini)"
            ></div>
            <div data-part="swatch" data-value="#0000ff"></div>
          </button>
          <button data-part="swatch-trigger" data-value="rgb(25, 9, 192, 0.9)">
            <div
              data-part="transparency-grid"
              data-size="var(--spacing-mini)"
            ></div>
            <div data-part="swatch" data-value="rgb(25, 9, 192, 0.9)"></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

```ts
document
  .getElementById("my-color-picker")
  ?.addEventListener("my-color-picker-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

**data-on-focus-outside**  
Type: `string`  
Description: Event name to send when focus moves outside the component.

**data-on-format-change**  
Type: `string`  
Description: Event name to send when the format changes.

**data-on-interact-outside**  
Type: `string`  
Description: Event name to send when an interaction occurs outside the component.

**data-on-open-change**  
Type: `string`  
Description: Event name to send when the open state changes.

**data-on-pointer-down-outside**  
Type: `string`  
Description: Event name to send when a pointer down event occurs outside the component.

**data-on-value-change**  
Type: `string`  
Description: Event name to send when the value changes.

**data-on-value-change-end**  
Type: `string`  
Description: Event name to send when the value change ends.

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

1. Import the Color Picker component

```ts
import "@corex-ui/static/components/color-picker";
```

This will automatically initialize all elements with `class="color-picker-js"` and add the necessary interaction behavior.

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/color-picker.css";
```

Then apply the base class along with any desired modifiers:

```html
<div class="color-picker color-picker-js">
  <div data-part="root">
    <label data-part="label">Select Color</label>
    <div data-part="control">
      <button data-part="trigger"></button>
    </div>
  </div>
</div>
```
