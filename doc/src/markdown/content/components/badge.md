---
title: Badge
description: A pure Tailwind CSS Badge component
author: Netoum
date: 2025-08-20
category: Components
tags:
  - User Interface
  - Accessibility
  - Tailwind
  - Corex
---

# Badge

> A pure Tailwind CSS component

---

## Anatomy

There are 4 different badge anatomies, each requiring specific classes and accessibility attributes.

```html
<!-- render:preview -->
<span class="badge"> Text </span>

<span class="badge">
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
      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
    />
  </svg>
  Text and SVG
</span>

<span
  class="badge badge--square"
  role="img"
  aria-label="Info about icon only badge"
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
      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
    />
  </svg>
</span>

<span
  class="badge badge--square"
  role="img"
  aria-label="Info about icon only badge"
>
  B
</span>
```

**Text badges**

- Text badges do not require additional attributes.

**Text and SVG**

- `svg` tag requires `aria-hidden="true"` to hide it from screen readers as the text already includes the necessary information
- `svg` tag requires `class="icon"`

**SVG**

- `span` tag requires `aria-label="Login to your account"` to indicate the content to the user
- `svg` tag requires `aria-hidden="true"` to hide it from screen readers as the text already includes the necessary information
- `svg` tag requires `class="icon"`

**One Character**

- `span` tag requires `aria-label="Login to your account"` to indicate the content to the user

---

## RTL

RTL support for badge

```html
<!-- render:preview -->
<div dir="rtl">
  <span class="badge"> نص </span>

  <span class="badge">
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
    نص وأيقونة
  </span>

  <span
    class="badge badge--square"
    role="img"
    aria-label="معلومات حول أيقونة فقط"
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
  </span>

  <span
    class="badge badge--square"
    role="img"
    aria-label="معلومات حول أيقونة فقط"
  >
    ب
  </span>
</div>
```

---

## Disabled

Disabled support for badge.

```html
<!-- render:preview -->
<span class="badge" disabled> Text </span>

<span class="badge" disabled>
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
      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
    />
  </svg>
  Text and SVG
</span>

<span
  class="badge badge--square"
  role="img"
  aria-label="Info about icon only badge"
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
      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
    />
  </svg>
</span>

<span
  class="badge badge--square"
  role="img"
  aria-label="Info about icon only badge"
  disabled
>
  B
</span>
```

---

## Modifiers

Badges support modifier classes that control their appearance.  
You can combine multiple modifiers on the same badge.

The default modifier is applied automatically, so you don’t need to include it explicitly.

| Modifier        | Description                            |
| --------------- | -------------------------------------- |
| [Color](#color) | Sets the color theme of the badge.     |
| [Size](#size)   | Adjusts the overall size of the badge. |
| [Shape](#shape) | Set the shape of the badge             |

> You may have noticed the double dash before the modifier name — this follows the BEM (Block Element Modifier) naming convention

### Color

Use `class="badge--{color}"` to set the color of a badge.

Available options:  
**default**, **accent**, **brand**, **alert**, **info**, **success**

```html
<!-- render:preview -->
<div>
  <span class="badge badge--accent"> Text </span>

  <span class="badge badge--accent">
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
    Text and SVG
  </span>

  <span
    class="badge badge--square badge--accent"
    role="img"
    aria-label="Info about icon only badge"
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
  </span>

  <span
    class="badge badge--square badge--accent"
    role="img"
    aria-label="Info about icon only badge"
  >
    B
  </span>
</div>
<div>
  <span class="badge badge--brand"> Text </span>

  <span class="badge badge--brand">
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
    Text and SVG
  </span>

  <span
    class="badge badge--square badge--brand"
    role="img"
    aria-label="Info about icon only badge"
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
  </span>

  <span
    class="badge badge--square badge--brand"
    role="img"
    aria-label="Info about icon only badge"
  >
    B
  </span>
</div>
<div>
  <span class="badge badge--alert"> Text </span>

  <span class="badge badge--alert">
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
    Text and SVG
  </span>

  <span
    class="badge badge--square badge--alert"
    role="img"
    aria-label="Info about icon only badge"
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
  </span>

  <span
    class="badge badge--square badge--alert"
    role="img"
    aria-label="Info about icon only badge"
  >
    B
  </span>
</div>
<div>
  <span class="badge badge--info"> Text </span>

  <span class="badge badge--info">
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
    Text and SVG
  </span>

  <span
    class="badge badge--square badge--info"
    role="img"
    aria-label="Info about icon only badge"
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
  </span>

  <span
    class="badge badge--square badge--info"
    role="img"
    aria-label="Info about icon only badge"
  >
    B
  </span>
</div>
<div>
  <span class="badge badge--success"> Text </span>

  <span class="badge badge--success">
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
    Text and SVG
  </span>

  <span
    class="badge badge--square badge--success"
    role="img"
    aria-label="Info about icon only badge"
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
  </span>

  <span
    class="badge badge--square badge--success"
    role="img"
    aria-label="Info about icon only badge"
  >
    B
  </span>
</div>
```

---

### Size

Use `class="badge--{size}"` to set the size of a badge.

Available options:  
**sm**, **md** (default), **lg**, **xl**

```html
<!-- render:preview -->
<div>
  <span class="badge badge--sm"> Text </span>

  <span class="badge badge--sm">
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
    Text and SVG
  </span>

  <span
    class="badge badge--square badge--sm"
    role="img"
    aria-label="Info about icon only badge"
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
  </span>

  <span
    class="badge badge--square badge--sm"
    role="img"
    aria-label="Info about icon only badge"
  >
    B
  </span>
</div>
<div>
  <span class="badge"> Text </span>

  <span class="badge">
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
    Text and SVG
  </span>

  <span
    class="badge badge--square"
    role="img"
    aria-label="Info about icon only badge"
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
  </span>

  <span
    class="badge badge--square"
    role="img"
    aria-label="Info about icon only badge"
  >
    B
  </span>
</div>
<div>
  <span class="badge badge--lg"> Text </span>

  <span class="badge badge--lg">
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
    Text and SVG
  </span>

  <span
    class="badge badge--square badge--lg"
    role="img"
    aria-label="Info about icon only badge"
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
  </span>

  <span
    class="badge badge--square badge--lg"
    role="img"
    aria-label="Info about icon only badge"
  >
    B
  </span>
</div>
<div>
  <span class="badge badge--xl"> Text </span>

  <span class="badge badge--xl">
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
    Text and SVG
  </span>

  <span
    class="badge badge--square badge--xl"
    role="img"
    aria-label="Info about icon only badge"
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
  </span>

  <span
    class="badge badge--square badge--xl"
    role="img"
    aria-label="Info about icon only badge"
  >
    B
  </span>
</div>
```

---

### Shape

Set the shape of each button. This modifier will only work on SVG only and one carater badge.

Options: **square(default)**, **circle**

```html
<!-- render:preview -->
<div>
  <span
    class="badge badge--square"
    role="img"
    aria-label="Info about icon only badge"
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
  </span>

  <span
    class="badge badge--square"
    role="img"
    aria-label="Info about icon only badge"
  >
    B
  </span>
</div>
<div>
  <span
    class="badge badge--circle"
    role="img"
    aria-label="Info about icon only badge"
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
  </span>

  <span
    class="badge badge--circlel"
    role="img"
    aria-label="Info about icon only badge"
  >
    B
  </span>
</div>
```

---

## Installation

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/badge.css";
```

Then apply the base class along with any desired modifiers:

```html
<span class="badge">...</span>
```
