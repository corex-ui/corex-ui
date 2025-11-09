---
title: Scrollbar
description: A pure CSS Scrollbar Tailwind component
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

# Scrollbar

> A pure Tailwind CSS component

---

## Anatomy

The Scrollbar component can be configured to scroll vertically, horizontally, or in both directions.

```html
<!-- render:preview -->
<div>
  <div
    class="scrollbar flex h-[150px] w-[150px] justify-start overflow-y-auto p-1"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi risus,
    aliquam vitae suscipit non, mattis vel enim. Aliquam in leo luctus, accumsan
    neque varius, fringilla lorem. Duis eros ipsum, efficitur non faucibus vel,
    eleifend nec urna. Nunc varius, nisl sed blandit rhoncus, urna neque posuere
    nisi, eu lacinia odio felis sed nibh.
  </div>

  <div class="scrollbar flex w-[150px] justify-start overflow-x-auto p-1">
    <div class="inline-block min-w-[300px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi
      risus.
    </div>
  </div>

  <div
    class="scrollbar flex h-[150px] w-[150px] justify-start overflow-auto p-1"
  >
    <div class="block min-h-[300px] min-w-[300px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi
      risus, aliquam vitae suscipit non, mattis vel enim. Aliquam in leo luctus,
      accumsan neque varius, fringilla lorem. Duis eros ipsum, efficitur non
      faucibus vel, eleifend nec urna. Nunc varius, nisl sed blandit rhoncus,
      urna neque posuere nisi, eu lacinia odio felis sed nibh.
    </div>
  </div>
</div>
```

---

## Modifiers

Each scrollbar can be styled with modifiers.

You can mix as many modifiers on the same scrollbar, however you can choose only one choice per modifer

For convenience the default variant name is omited, meaning there is no need to add the default name class

> You may have noticed the double dash before the modifier name — this follows the BEM (Block Element Modifier) naming convention

| Modifier        | Option                                |
| --------------- | ------------------------------------- |
| [Color](#color) | default, accent, alert, info, success |
| [Size](#size)   | md (default), sm, lg, xl              |

---

### Color

Set the color of each scrollbar

Options: **base(default)**, **accent**, **alert**, **info**,**success**

```html
<!-- render:preview -->
<div>
  <div
    class="scrollbar scrollbar--accent flex h-[150px] w-[150px] justify-start overflow-y-auto p-1"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi risus,
    aliquam vitae suscipit non, mattis vel enim. Aliquam in leo luctus, accumsan
    neque varius, fringilla lorem. Duis eros ipsum, efficitur non faucibus vel,
    eleifend nec urna. Nunc varius, nisl sed blandit rhoncus, urna neque posuere
    nisi, eu lacinia odio felis sed nibh.
  </div>

  <div
    class="scrollbar scrollbar--accent flex w-[150px] justify-start overflow-x-auto p-1"
  >
    <div class="inline-block min-w-[300px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi
      risus.
    </div>
  </div>

  <div
    class="scrollbar scrollbar--accent flex h-[150px] w-[150px] justify-start overflow-auto p-1"
  >
    <div class="block min-h-[300px] min-w-[300px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi
      risus, aliquam vitae suscipit non, mattis vel enim. Aliquam in leo luctus,
      accumsan neque varius, fringilla lorem. Duis eros ipsum, efficitur non
      faucibus vel, eleifend nec urna. Nunc varius, nisl sed blandit rhoncus,
      urna neque posuere nisi, eu lacinia odio felis sed nibh.
    </div>
  </div>
</div>
<div>
  <div
    class="scrollbar scrollbar--alert flex h-[150px] w-[150px] justify-start overflow-y-auto p-1"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi risus,
    aliquam vitae suscipit non, mattis vel enim. Aliquam in leo luctus, accumsan
    neque varius, fringilla lorem. Duis eros ipsum, efficitur non faucibus vel,
    eleifend nec urna. Nunc varius, nisl sed blandit rhoncus, urna neque posuere
    nisi, eu lacinia odio felis sed nibh.
  </div>

  <div
    class="scrollbar scrollbar--alert flex w-[150px] justify-start overflow-x-auto p-1"
  >
    <div class="inline-block min-w-[300px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi
      risus.
    </div>
  </div>

  <div
    class="scrollbar scrollbar--alert flex h-[150px] w-[150px] justify-start overflow-auto p-1"
  >
    <div class="block min-h-[300px] min-w-[300px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi
      risus, aliquam vitae suscipit non, mattis vel enim. Aliquam in leo luctus,
      accumsan neque varius, fringilla lorem. Duis eros ipsum, efficitur non
      faucibus vel, eleifend nec urna. Nunc varius, nisl sed blandit rhoncus,
      urna neque posuere nisi, eu lacinia odio felis sed nibh.
    </div>
  </div>
</div>
<div>
  <div
    class="scrollbar scrollbar--info flex h-[150px] w-[150px] justify-start overflow-y-auto p-1"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi risus,
    aliquam vitae suscipit non, mattis vel enim. Aliquam in leo luctus, accumsan
    neque varius, fringilla lorem. Duis eros ipsum, efficitur non faucibus vel,
    eleifend nec urna. Nunc varius, nisl sed blandit rhoncus, urna neque posuere
    nisi, eu lacinia odio felis sed nibh.
  </div>

  <div
    class="scrollbar scrollbar--info flex w-[150px] justify-start overflow-x-auto p-1"
  >
    <div class="inline-block min-w-[300px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi
      risus.
    </div>
  </div>

  <div
    class="scrollbar scrollbar--info flex h-[150px] w-[150px] justify-start overflow-auto p-1"
  >
    <div class="block min-h-[300px] min-w-[300px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi
      risus, aliquam vitae suscipit non, mattis vel enim. Aliquam in leo luctus,
      accumsan neque varius, fringilla lorem. Duis eros ipsum, efficitur non
      faucibus vel, eleifend nec urna. Nunc varius, nisl sed blandit rhoncus,
      urna neque posuere nisi, eu lacinia odio felis sed nibh.
    </div>
  </div>
</div>
<div>
  <div
    class="scrollbar scrollbar--success flex h-[150px] w-[150px] justify-start overflow-y-auto p-1"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi risus,
    aliquam vitae suscipit non, mattis vel enim. Aliquam in leo luctus, accumsan
    neque varius, fringilla lorem. Duis eros ipsum, efficitur non faucibus vel,
    eleifend nec urna. Nunc varius, nisl sed blandit rhoncus, urna neque posuere
    nisi, eu lacinia odio felis sed nibh.
  </div>

  <div
    class="scrollbar scrollbar--success flex w-[150px] justify-start overflow-x-auto p-1"
  >
    <div class="inline-block min-w-[300px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi
      risus.
    </div>
  </div>

  <div
    class="scrollbar scrollbar--success flex h-[150px] w-[150px] justify-start overflow-auto p-1"
  >
    <div class="block min-h-[300px] min-w-[300px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi
      risus, aliquam vitae suscipit non, mattis vel enim. Aliquam in leo luctus,
      accumsan neque varius, fringilla lorem. Duis eros ipsum, efficitur non
      faucibus vel, eleifend nec urna. Nunc varius, nisl sed blandit rhoncus,
      urna neque posuere nisi, eu lacinia odio felis sed nibh.
    </div>
  </div>
</div>
```

---

### Size

Set the size of each scrollbar

Options: **md(default)**, **sm**, **lg**, **xl**

```html
<!-- render:preview -->
<div>
  <div
    class="scrollbar scrollbar--sm flex h-[150px] w-[150px] justify-start overflow-y-auto p-1"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi risus,
    aliquam vitae suscipit non, mattis vel enim. Aliquam in leo luctus, accumsan
    neque varius, fringilla lorem. Duis eros ipsum, efficitur non faucibus vel,
    eleifend nec urna. Nunc varius, nisl sed blandit rhoncus, urna neque posuere
    nisi, eu lacinia odio felis sed nibh.
  </div>

  <div
    class="scrollbar scrollbar--sm flex w-[150px] justify-start overflow-x-auto p-1"
  >
    <div class="inline-block min-w-[300px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi
      risus.
    </div>
  </div>

  <div
    class="scrollbar scrollbar--sm flex h-[150px] w-[150px] justify-start overflow-auto p-1"
  >
    <div class="block min-h-[300px] min-w-[300px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi
      risus, aliquam vitae suscipit non, mattis vel enim. Aliquam in leo luctus,
      accumsan neque varius, fringilla lorem. Duis eros ipsum, efficitur non
      faucibus vel, eleifend nec urna. Nunc varius, nisl sed blandit rhoncus,
      urna neque posuere nisi, eu lacinia odio felis sed nibh.
    </div>
  </div>
</div>
<div>
  <div
    class="scrollbar flex h-[150px] w-[150px] justify-start overflow-y-auto p-1"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi risus,
    aliquam vitae suscipit non, mattis vel enim. Aliquam in leo luctus, accumsan
    neque varius, fringilla lorem. Duis eros ipsum, efficitur non faucibus vel,
    eleifend nec urna. Nunc varius, nisl sed blandit rhoncus, urna neque posuere
    nisi, eu lacinia odio felis sed nibh.
  </div>

  <div class="scrollbar flex w-[150px] justify-start overflow-x-auto p-1">
    <div class="inline-block min-w-[300px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi
      risus.
    </div>
  </div>

  <div
    class="scrollbar flex h-[150px] w-[150px] justify-start overflow-auto p-1"
  >
    <div class="block min-h-[300px] min-w-[300px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi
      risus, aliquam vitae suscipit non, mattis vel enim. Aliquam in leo luctus,
      accumsan neque varius, fringilla lorem. Duis eros ipsum, efficitur non
      faucibus vel, eleifend nec urna. Nunc varius, nisl sed blandit rhoncus,
      urna neque posuere nisi, eu lacinia odio felis sed nibh.
    </div>
  </div>
</div>
<div>
  <div
    class="scrollbar scrollbar--lg flex h-[150px] w-[150px] justify-start overflow-y-auto p-1"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi risus,
    aliquam vitae suscipit non, mattis vel enim. Aliquam in leo luctus, accumsan
    neque varius, fringilla lorem. Duis eros ipsum, efficitur non faucibus vel,
    eleifend nec urna. Nunc varius, nisl sed blandit rhoncus, urna neque posuere
    nisi, eu lacinia odio felis sed nibh.
  </div>

  <div
    class="scrollbar scrollbar--lg flex w-[150px] justify-start overflow-x-auto p-1"
  >
    <div class="inline-block min-w-[300px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi
      risus.
    </div>
  </div>

  <div
    class="scrollbar scrollbar--lg flex h-[150px] w-[150px] justify-start overflow-auto p-1"
  >
    <div class="block min-h-[300px] min-w-[300px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi
      risus, aliquam vitae suscipit non, mattis vel enim. Aliquam in leo luctus,
      accumsan neque varius, fringilla lorem. Duis eros ipsum, efficitur non
      faucibus vel, eleifend nec urna. Nunc varius, nisl sed blandit rhoncus,
      urna neque posuere nisi, eu lacinia odio felis sed nibh.
    </div>
  </div>
</div>
<div>
  <div
    class="scrollbar scrollbar--xl flex h-[150px] w-[150px] justify-start overflow-y-auto p-1"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi risus,
    aliquam vitae suscipit non, mattis vel enim. Aliquam in leo luctus, accumsan
    neque varius, fringilla lorem. Duis eros ipsum, efficitur non faucibus vel,
    eleifend nec urna. Nunc varius, nisl sed blandit rhoncus, urna neque posuere
    nisi, eu lacinia odio felis sed nibh.
  </div>

  <div
    class="scrollbar scrollbar--xl flex w-[150px] justify-start overflow-x-auto p-1"
  >
    <div class="inline-block min-w-[300px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi
      risus.
    </div>
  </div>

  <div
    class="scrollbar scrollbar--xl flex h-[150px] w-[150px] justify-start overflow-auto p-1"
  >
    <div class="block min-h-[300px] min-w-[300px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi
      risus, aliquam vitae suscipit non, mattis vel enim. Aliquam in leo luctus,
      accumsan neque varius, fringilla lorem. Duis eros ipsum, efficitur non
      faucibus vel, eleifend nec urna. Nunc varius, nisl sed blandit rhoncus,
      urna neque posuere nisi, eu lacinia odio felis sed nibh.
    </div>
  </div>
</div>
```

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/scrollbar.css";
```

These styles will be applied to all elements with the `scrollbar` class.
