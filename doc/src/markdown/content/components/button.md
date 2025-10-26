---
title: Button
description: A pure Tailwind CSS Button component
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

# Button

> A pure Tailwind CSS component

---

## Anatomy

There are 4 different button anatomies, each requiring specific classes and accessibility attributes.

```html
<!-- render:preview -->
<button class="button">Text</button>
<button class="button">
  Text and SVG
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
    ></path>
  </svg>
</button>
<button class="button button--square" aria-label="Button text">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
    ></path>
  </svg>
</button>
<button class="button button--square" aria-label="Button text">B</button>
```

**Text**

- Text buttons do not require additional attributes.

**Text and SVG**

- `svg` tag requires `aria-hidden="true"` to hide it from screen readers as the text already includes the necessary information

**SVG**

- `button` tag requires `aria-label="Login to your account"` to indicate the action to the user
- `svg` tag requires `aria-hidden="true"` to hide it from screen readers as the text already includes the necessary information
- `svg` tag requires `class="icon"`

**One Character**

- `button` tag requires `aria-label="Login to your account"` to indicate the action to the user

---

## RTL

RTL support for button with icon

```html
<!-- render:preview -->
<div dir="rtl">
  <button class="button">نص</button>
  <button class="button">
    نص ورمز
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button class="button button--square" aria-label="زر نص">
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button class="button button--square" aria-label="زر نص">ن</button>
</div>
```

---

## Disabled

Disable State for each button

```html
<!-- render:preview -->
<div>
  <button class="button" disabled>Text</button>
  <button class="button" disabled>
    Text and SVG
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button class="button button--square" aria-label="Button text" disabled>
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button class="button button--square" aria-label="Button text" disabled>
    B
  </button>
</div>
<div>
  <button class="button button--accent" disabled>Text</button>
  <button class="button button--accent" disabled>
    Text and SVG<svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button
    class="button button--accent button--square"
    aria-label="Button text"
    disabled
  >
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button
    class="button button--accent button--square"
    aria-label="Button text"
    disabled
  >
    B
  </button>
</div>
<div>
  <button class="button button--brand" disabled>Text</button>
  <button class="button button--brand" disabled>
    Text and SVG<svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button
    class="button button--brand button--square"
    aria-label="Button text"
    disabled
  >
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button
    class="button button--brand button--square"
    aria-label="Button text"
    disabled
  >
    B
  </button>
</div>
<div>
  <button class="button button--alert" disabled>Text</button>
  <button class="button button--alert" disabled>
    Text and SVG<svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button
    class="button button--alert button--square"
    aria-label="Button text"
    disabled
  >
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button
    class="button button--alert button--square"
    aria-label="Button text"
    disabled
  >
    B
  </button>
</div>
<div>
  <button class="button button--info" disabled>Text</button>
  <button class="button button--info" disabled>
    Text and SVG<svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button
    class="button button--info button--square"
    aria-label="Button text"
    disabled
  >
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button
    class="button button--info button--square"
    aria-label="Button text"
    disabled
  >
    B
  </button>
</div>
<div>
  <button class="button button--success" disabled>Text</button>
  <button class="button button--success" disabled>
    Text and SVG<svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button
    class="button button--success button--square"
    aria-label="Button text"
    disabled
  >
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button
    class="button button--success button--square"
    aria-label="Button text"
    disabled
  >
    B
  </button>
</div>
```

---

## Modifiers

Badges support modifier classes that control their appearance.  
You can combine multiple modifiers on the same button.

The default modifier is applied automatically, so you don’t need to include it explicitly.

| Modifier        | Description                             |
| --------------- | --------------------------------------- |
| [Color](#color) | Sets the color theme of the button.     |
| [Size](#size)   | Adjusts the overall size of the button. |
| [Shape](#shape) | Set the shape of the button             |

> You may have noticed the double dash before the modifier name — this follows the BEM (Block Element Modifier) naming convention

### Color

Use `class="button--{color}"` to set the color of a button.

Options: **accent**, **alert**, **info**,**success**

```html
<!-- render:preview -->
<div>
  <button class="button button--accent">Text</button>
  <button class="button button--accent">
    Text and SVG<svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button class="button button--accent button--square" aria-label="Button text">
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button class="button button--accent button--square" aria-label="Button text">
    B
  </button>
</div>
<div>
  <button class="button button--brand">Text</button>
  <button class="button button--brand">
    Text and SVG<svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button class="button button--brand button--square" aria-label="Button text">
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button class="button button--brand button--square" aria-label="Button text">
    B
  </button>
</div>
<div>
  <button class="button button--alert">Text</button>
  <button class="button button--alert">
    Text and SVG<svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button class="button button--alert button--square" aria-label="Button text">
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button class="button button--alert button--square" aria-label="Button text">
    B
  </button>
</div>
<div>
  <button class="button button--info">Text</button>
  <button class="button button--info">
    Text and SVG<svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button class="button button--info button--square" aria-label="Button text">
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button class="button button--info button--square" aria-label="Button text">
    B
  </button>
</div>
<div>
  <button class="button button--success">Text</button>
  <button class="button button--success">
    Text and SVG<svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button
    class="button button--success button--square"
    aria-label="Button text"
  >
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button
    class="button button--success button--square"
    aria-label="Button text"
  >
    B
  </button>
</div>
```

---

### Size

Use `class="button--{size}"` to set the size of a button.

Available options:  
**sm**, **md** (default), **lg**, **xl**

```html
<!-- render:preview -->
<div>
  <button class="button button--sm">Button SM</button>
  <button class="button button--sm">
    Button SM<svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button class="button button--sm button--square" aria-label="Button SM">
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button class="button button--sm button--square" aria-label="Button SM">
    B
  </button>
</div>
<div>
  <button class="button">Button MD</button>
  <button class="button">
    Button MD<svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button class="button button--square" aria-label="Button text">
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button class="button button--square" aria-label="Button MD">B</button>
</div>
<div>
  <button class="button button--lg">Button LG</button>
  <button class="button button--lg">
    Button LG<svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button class="button button--lg button--square" aria-label="Button LG">
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button class="button button--lg button--square" aria-label="Button LG">
    B
  </button>
</div>
<div>
  <button class="button button--xl">Button XL</button>
  <button class="button button--xl">
    Button XL<svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button class="button button--square button--xl" aria-label="Button XL">
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button class="button button--xl button--square" aria-label="Button XL">
    B
  </button>
</div>
```

---

### Shape

Set the shape of each button

Options: **default**, **square**, **circle**

```html
<!-- render:preview -->
<div>
  <button class="button button--square" aria-label="button button--square">
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button class="button button--square" aria-label="button button--square">
    B
  </button>
  <button class="button button--circle" aria-label="Button circle">
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button class="button button--circle" aria-label="Button circle">B</button>
</div>
<div>
  <button
    class="button button--square button--accent"
    aria-label="button button--square"
  >
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button
    class="button button--square button--accent"
    aria-label="button button--square"
  >
    B
  </button>
  <button
    class="button button--circle button--accent"
    aria-label="Button circle"
  >
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      ></path>
    </svg>
  </button>
  <button
    class="button button--circle button--accent"
    aria-label="Button circle"
  >
    B
  </button>
</div>
```

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/button.css";
```

These styles will be applied to all elements with the `button` class.
