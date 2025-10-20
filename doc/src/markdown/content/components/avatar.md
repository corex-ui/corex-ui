---
title: Avatar
description: A pure HTML and vanilla JS implementation of Zag JS Avatar
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

# Avatar

> A pure HTML and vanilla JS implementation of [Zag JS Avatar](https://zagjs.com/components/react/avatar)

The Avatar component represents a user avatar or profile picture. It displays an image or initials within container.

Avatar provides support for fallback text or elements when the image fails to load, or when the image is not provided.

---

## Anatomy

The Avatar component consists of the following data parts:

`root`, `fallback`, `image`

```html
<!-- render:preview -->
<div>
  <div class="avatar avatar-js">
    <div data-part="root">
      <span data-part="fallback">C</span>
      <img data-part="image" alt="Corex HTML" src="/favicon.ico" />
    </div>
  </div>
  <div class="avatar avatar-js">
    <div data-part="root">
      <img data-part="image" alt="A cat" src="/images/avatar.png" />
      <span data-part="fallback">N</span>
    </div>
  </div>
  <div class="avatar avatar-js">
    <div data-part="root">
      <span data-part="fallback">CX</span>
      <img data-part="image" alt="Corex HTML" src="/corex_not_found.svg" />
    </div>
  </div>
</div>
```

---

## Data attributes

Each avatar can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div>
  <div class="avatar avatar-js" id="custom-1" data-dir="rtl">
    <div data-part="root">
      <span data-part="fallback">C</span>
      <img data-part="image" alt="Corex HTML" src="/favicon.ico" />
    </div>
  </div>
  <div class="avatar avatar-js" id="custom-2" data-dir="rtl">
    <div data-part="root">
      <img data-part="image" alt="A cat" src="/images/avatar.png" />
      <span data-part="fallback">N</span>
    </div>
  </div>
  <div class="avatar avatar-js" id="custom-3" data-dir="rtl">
    <div data-part="root">
      <span data-part="fallback">CX</span>
      <img data-part="image" alt="Corex HTML" src="/corex_not_found.svg" />
    </div>
  </div>
</div>
```

**id**
Type: `string`
Description: Unique id of the avatar. Default generated if none is provided.

**data-dir**
Type: `string`
Description: The orientation of the accordion. Can be `ltr` or `rtl`.

---

## Event Callbacks

Each avatar component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id for the avatar and a event listener for your event name

> Open your browser's console to see the events received when the avatar status changes

```html
<!-- render:preview -->
<div>
  <div
    id="my-avatar"
    class="avatar avatar-js"
    data-on-status-change="my-avatar-event"
  >
    <div data-part="root">
      <img data-part="image" alt="A cat" src="/images/avatar.png" />
      <span data-part="fallback">N</span>
    </div>
  </div>
</div>
```

```ts
document
  .getElementById("my-avatar")
  ?.addEventListener("my-avatar-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

**data-on-status-change**
Type: `string`
Description: Event name to be send when the image loading status changes.

---

## RTL

RTL support for avatar

```html
<!-- render:preview -->
<div>
  <div class="avatar avatar-js" data-dir="rtl">
    <div data-part="root">
      <span data-part="fallback">ع</span>
      <img data-part="image" alt="كوركس HTML" src="/favicon.ico" />
    </div>
  </div>
  <div class="avatar avatar-js" data-dir="rtl">
    <div data-part="root">
      <img data-part="image" alt="قطة" src="/images/avatar.png" />
      <span data-part="fallback">ن</span>
    </div>
  </div>
  <div class="avatar avatar-js" data-dir="rtl">
    <div data-part="root">
      <span data-part="fallback">ك س</span>
      <img data-part="image" alt="كوركس HTML" src="/corex_not_found.svg" />
    </div>
  </div>
</div>
```

---

## Modifiers

Avatars support modifier classes that control their appearance.  
You can combine multiple modifiers on the same avatar.

The default modifier is applied automatically, so you don’t need to include it explicitly.

| Modifier        | Description                             |
| --------------- | --------------------------------------- |
| [Color](#color) | Sets the color theme of the avatar.     |
| [Size](#size)   | Adjusts the overall size of the avatar. |

> You may have noticed the double dash before the modifier name — this follows the BEM (Block Element Modifier) naming convention

### Color

Use `class="avatar--{color}"` to set the color of an avatar.

Available options:  
**accent**, **brand**, **alert**, **info**, **success**

```html
<!-- render:preview -->
<div>
  <div class="avatar avatar-js avatar--accent">
    <div data-part="root">
      <span data-part="fallback">CX</span>
      <img data-part="image" alt="Corex HTML" src="/corex_not_found.svg" />
    </div>
  </div>
  <div class="avatar avatar-js avatar--brand">
    <div data-part="root">
      <span data-part="fallback">CX</span>
      <img data-part="image" alt="Corex HTML" src="/corex_not_found.svg" />
    </div>
  </div>
  <div class="avatar avatar-js avatar--alert">
    <div data-part="root">
      <span data-part="fallback">CX</span>
      <img data-part="image" alt="Corex HTML" src="/corex_not_found.svg" />
    </div>
  </div>
  <div class="avatar avatar-js avatar--info">
    <div data-part="root">
      <span data-part="fallback">CX</span>
      <img data-part="image" alt="Corex HTML" src="/corex_not_found.svg" />
    </div>
  </div>
  <div class="avatar avatar-js avatar--success">
    <div data-part="root">
      <span data-part="fallback">CX</span>
      <img data-part="image" alt="Corex HTML" src="/corex_not_found.svg" />
    </div>
  </div>
</div>
```

---

### Size

Use `class="avatar--{size}"` to set the size of an avatar.

Available options:  
**sm**, **md** (default), **lg**, **xl**

```html
<!-- render:preview -->
<div>
  <div class="avatar avatar-js avatar--sm">
    <div data-part="root">
      <span data-part="fallback">C</span>
      <img data-part="image" alt="Corex HTML" src="/favicon.ico" />
    </div>
  </div>
  <div class="avatar avatar-js avatar--sm">
    <div data-part="root">
      <img data-part="image" alt="A cat" src="/images/avatar.png" />
      <span data-part="fallback">N</span>
    </div>
  </div>
  <div class="avatar avatar-js avatar--sm">
    <div data-part="root">
      <span data-part="fallback">CX</span>
      <img data-part="image" alt="Corex HTML" src="/corex_not_found.svg" />
    </div>
  </div>
</div>
<div>
  <div class="avatar avatar-js">
    <div data-part="root">
      <span data-part="fallback">C</span>
      <img data-part="image" alt="Corex HTML" src="/favicon.ico" />
    </div>
  </div>
  <div class="avatar avatar-js">
    <div data-part="root">
      <img data-part="image" alt="A cat" src="/images/avatar.png" />
      <span data-part="fallback">N</span>
    </div>
  </div>
  <div class="avatar avatar-js">
    <div data-part="root">
      <span data-part="fallback">CX</span>
      <img data-part="image" alt="Corex HTML" src="/corex_not_found.svg" />
    </div>
  </div>
</div>
<div>
  <div class="avatar avatar-js avatar--lg">
    <div data-part="root">
      <span data-part="fallback">C</span>
      <img data-part="image" alt="Corex HTML" src="/favicon.ico" />
    </div>
  </div>
  <div class="avatar avatar-js avatar--lg">
    <div data-part="root">
      <img data-part="image" alt="A cat" src="/images/avatar.png" />
      <span data-part="fallback">N</span>
    </div>
  </div>
  <div class="avatar avatar-js avatar--lg">
    <div data-part="root">
      <span data-part="fallback">CX</span>
      <img data-part="image" alt="Corex HTML" src="/corex_not_found.svg" />
    </div>
  </div>
</div>
<div>
  <div class="avatar avatar-js avatar--xl">
    <div data-part="root">
      <span data-part="fallback">C</span>
      <img data-part="image" alt="Corex HTML" src="/favicon.ico" />
    </div>
  </div>
  <div class="avatar avatar-js avatar--xl">
    <div data-part="root">
      <img data-part="image" alt="A cat" src="/images/avatar.png" />
      <span data-part="fallback">N</span>
    </div>
  </div>
  <div class="avatar avatar-js avatar--xl">
    <div data-part="root">
      <span data-part="fallback">CX</span>
      <img data-part="image" alt="Corex HTML" src="/corex_not_found.svg" />
    </div>
  </div>
</div>
```

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

### Static

1. Import the Avatar component

```ts
import "@corex-ui/static/components/avatar";
```

This will automatically initialize all elements with `class="avatar-js"` and add the necessary interaction behavior.

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/avatar.css";
```

Then apply the base class along with any desired modifiers:

```html
<div class="avatar avatar-js">
  <div data-part="root">
    <span data-part="fallback">C</span>
    <img data-part="image" alt="Corex HTML" src="/images/avatar.png" />
  </div>
</div>
```

### Static React

> Experimental! Only works with React static export (eg. Next.js SSG.)

1. Import the Avatar component

```ts
import { Avatar } from '@corex-ui/static/react';
export default function Home() {
  return (
    <Avatar>
      <div data-part="root">
        <span data-part="fallback">C</span>
        <img data-part="image" alt="Corex HTML" src="/images/avatar.png" />
      </div>
    </Avatar>
  );
}
```

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/avatar.css";
```

Then apply the base class along with any desired modifiers:

```html
<Avatar className="avatar"> {/* content */} </Avatar>
```
