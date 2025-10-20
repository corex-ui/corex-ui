---
title: Tabs
description: A pure HTML and vanilla JS implementation of Zag JS Tabs
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

# Tabs

> A pure HTML and vanilla JS implementation of [Zag JS Tabs](https://zagjs.com/components/react/tabs)

An accessible tabs component that follows the WAI-ARIA Tabs Design Pattern. Each tab in the tab list has associated content, with only the selected tab's content being displayed.

---

## Anatomy

The Tabs component consists of the following data parts:

`root`, `list`, `trigger`, `content`

```html
<!-- render:preview -->
<div class="tabs tabs-js" data-default-value="lorem">
  <div data-part="root">
    <div data-part="list">
      <button data-part="trigger" data-value="lorem">Lorem</button>
      <button data-part="trigger" data-value="duis">Duis</button>
      <button data-part="trigger" data-value="donec">Donec</button>
    </div>
    <div data-part="content" data-value="lorem">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
        adipiscing elit. Sed sodales ullamcorper tristique. Proin quis risus
        feugiat tellus iaculis fringilla.
      </p>
    </div>
    <div data-part="content" data-value="duis">
      <p>
        Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat, dui
        ut fermentum sodales, lectus metus dignissim ex.
      </p>
    </div>
    <div data-part="content" data-value="donec">
      <p>
        Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis non,
        pellentesque elit. Pellentesque sagittis fermentum.
      </p>
    </div>
  </div>
</div>
```

---

## Data attributes

Each tabs can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  class="tabs tabs-js"
  data-default-value="duis"
  data-loop-focus="true"
  data-orientation="horizontal"
  data-dir="ltr"
  data-activation-mode="manual"
>
  <div data-part="root">
    <div data-part="list">
      <button data-part="trigger" data-value="lorem">Lorem</button>
      <button data-part="trigger" data-value="duis">Duis</button>
      <button data-part="trigger" data-value="donec">Donec</button>
    </div>
    <div data-part="content" data-value="lorem">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
        adipiscing elit. Sed sodales ullamcorper tristique. Proin quis risus
        feugiat tellus iaculis fringilla.
      </p>
    </div>
    <div data-part="content" data-value="duis">
      <p>
        Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat, dui
        ut fermentum sodales, lectus metus dignissim ex.
      </p>
    </div>
    <div data-part="content" data-value="donec">
      <p>
        Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis non,
        pellentesque elit. Pellentesque sagittis fermentum.
      </p>
    </div>
  </div>
</div>
```

**id**  
Type: `string`  
Description: Unique id of the component. Default generated if none is provided.

**data-default-value**  
Type: `string`  
Description: The initial selected tab value.

**data-value**  
Type: `string`  
Description: The controlled selected tab value.

**data-orientation**  
Type: `horizontal | vertical`  
Description: The orientation of the tabs.

- `horizontal`: Only left and right arrow key navigation will work.
- `vertical`: Only up and down arrow key navigation will work.

**data-dir**  
Type: `ltr | rtl`  
Description: The orientation of the tabs. Can be `ltr` or `rtl`.

**data-loop-focus**  
Type: `boolean`  
Description: Whether the keyboard navigation will loop from last tab to first, and vice versa.

**data-activation-mode**  
Type: `"manual" | "automatic"`  
Description: The activation mode of the tabs.

- `manual`: Tabs are activated when clicked or when pressing the `Enter` key.
- `automatic`: Tabs are activated when receiving focus.

---

## Event Callbacks

Each tabs component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id for the tabs and a event listener for your event name

```ts
document
  .getElementById("my-tabs")
  ?.addEventListener("my-tabs-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

```html
<!-- render:preview -->
<div
  id="my-tabs"
  class="tabs tabs-js"
  data-default-value="lorem"
  data-on-value-change="my-tabs-event"
>
  <div data-part="root">
    <div data-part="list">
      <button data-part="trigger" data-value="lorem">Lorem</button>
      <button data-part="trigger" data-value="duis">Duis</button>
      <button data-part="trigger" data-value="donec">Donec</button>
    </div>
    <div data-part="content" data-value="lorem">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
        adipiscing elit. Sed sodales ullamcorper tristique. Proin quis risus
        feugiat tellus iaculis fringilla.
      </p>
    </div>
    <div data-part="content" data-value="duis">
      <p>
        Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat, dui
        ut fermentum sodales, lectus metus dignissim ex.
      </p>
    </div>
    <div data-part="content" data-value="donec">
      <p>
        Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis non,
        pellentesque elit. Pellentesque sagittis fermentum.
      </p>
    </div>
  </div>
</div>
```

> Open your browser's console to see the events received when select a tab

**data-on-value-change**  
Type: `string`  
Description: Event name to be sent when the selected/active tab changes.

**data-on-focus-change**  
Type: `string`  
Description: Event name to be sent when the focused tab changes.

**data-navigate**  
Type: `string`  
Description: Event name to be sent to navigate to the selected tab when clicking on it. Useful if tab triggers are anchor elements.

---

## Orientation

By default, the tabs is displayed on a **horizontal** layout.  
You can also switch it to a **vertical** layout.

When using changing layout, keyboard navigation changes accordingly:

- **Vertical:** use <kbd>↑</kbd> / <kbd>↓</kbd> to move between items
- **Horizontal:** use <kbd>←</kbd> / <kbd>→</kbd> to move between items

```html
<!-- render:preview -->
<div
  class="tabs tabs-js"
  data-orientation="vertical"
  data-default-value="lorem"
>
  <div data-part="root">
    <div data-part="list">
      <button data-part="trigger" data-value="lorem">Lorem</button>
      <button data-part="trigger" data-value="duis">Duis</button>
      <button data-part="trigger" data-value="donec">Donec</button>
    </div>
    <div data-part="content" data-value="lorem">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
        adipiscing elit. Sed sodales ullamcorper tristique. Proin quis risus
        feugiat tellus iaculis fringilla.
      </p>
    </div>
    <div data-part="content" data-value="duis">
      <p>
        Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat, dui
        ut fermentum sodales, lectus metus dignissim ex.
      </p>
    </div>
    <div data-part="content" data-value="donec">
      <p>
        Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis non,
        pellentesque elit. Pellentesque sagittis fermentum.
      </p>
    </div>
  </div>
</div>
```

---

## RTL

RTL support for tabs

```html
<!-- render:preview -->
<div>
  <div class="tabs tabs-js" data-dir="rtl" data-default-value="lorem">
    <div data-part="root">
      <div data-part="list">
        <button data-part="trigger" data-value="lorem">سقط</button>
        <button data-part="trigger" data-value="duis">بين</button>
        <button data-part="trigger" data-value="donec">دونيك</button>
      </div>
      <div data-part="content" data-value="lorem">
        <p>سقط وبلجيكا، أن ولم, يتم غضون الأوروبية عل, أن بين وقرى مكثّفة</p>
      </div>
      <div data-part="content" data-value="duis">
        <p>ي وبدون الخاسرة الأعمال بعض, عن دول القوى القادة</p>
      </div>
      <div data-part="content" data-value="donec">
        <p>حتى سعر الجري الرائع قبل بوابة المطورين.</p>
      </div>
    </div>
  </div>
  <div
    class="tabs tabs-js"
    data-dir="rtl"
    data-orientation="vertical"
    data-default-value="lorem"
  >
    <div data-part="root">
      <div data-part="list">
        <button data-part="trigger" data-value="lorem">سقط</button>
        <button data-part="trigger" data-value="duis">بين</button>
        <button data-part="trigger" data-value="donec">دونيك</button>
      </div>
      <div data-part="content" data-value="lorem">
        <p>سقط وبلجيكا، أن ولم, يتم غضون الأوروبية عل, أن بين وقرى مكثّفة</p>
      </div>
      <div data-part="content" data-value="duis">
        <p>ي وبدون الخاسرة الأعمال بعض, عن دول القوى القادة</p>
      </div>
      <div data-part="content" data-value="donec">
        <p>حتى سعر الجري الرائع قبل بوابة المطورين.</p>
      </div>
    </div>
  </div>
</div>
```

---

## Modifiers

Each tabs can be styled with modifiers.

You can mix as many modifiers on the same button, however you can choose only one choice per modifer

For convenience the default variant name is omited, meaning there is no need to add the default name class

> You may have noticed the double dash before the modifier name — this follows the BEM (Block Element Modifier) naming convention

| Modifier        | Option                                        |
| --------------- | --------------------------------------------- |
| [Color](#color) | accent (default), brand, alert, info, success |
| [Size](#size)   | md (default), sm, lg, xl                      |

---

### Color

Set the color of each tabs

Options: **accent(default)**, **brand**, **alert**, **info**,**success**

```html
<!-- render:preview -->
<div class="tabs tabs-js tabs--accent" data-default-value="lorem">
  <div data-part="root">
    <div data-part="list">
      <button data-part="trigger" data-value="lorem">Lorem</button>
      <button data-part="trigger" data-value="duis">Duis</button>
      <button data-part="trigger" data-value="donec">Donec</button>
    </div>
    <div data-part="content" data-value="lorem">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
        adipiscing elit. Sed sodales ullamcorper tristique. Proin quis risus
        feugiat tellus iaculis fringilla.
      </p>
    </div>
    <div data-part="content" data-value="duis">
      <p>
        Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat, dui
        ut fermentum sodales, lectus metus dignissim ex.
      </p>
    </div>
    <div data-part="content" data-value="donec">
      <p>
        Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis non,
        pellentesque elit. Pellentesque sagittis fermentum.
      </p>
    </div>
  </div>
</div>
<div class="tabs tabs-js tabs--brand" data-default-value="lorem">
  <div data-part="root">
    <div data-part="list">
      <button data-part="trigger" data-value="lorem">Lorem</button>
      <button data-part="trigger" data-value="duis">Duis</button>
      <button data-part="trigger" data-value="donec">Donec</button>
    </div>
    <div data-part="content" data-value="lorem">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
        adipiscing elit. Sed sodales ullamcorper tristique. Proin quis risus
        feugiat tellus iaculis fringilla.
      </p>
    </div>
    <div data-part="content" data-value="duis">
      <p>
        Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat, dui
        ut fermentum sodales, lectus metus dignissim ex.
      </p>
    </div>
    <div data-part="content" data-value="donec">
      <p>
        Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis non,
        pellentesque elit. Pellentesque sagittis fermentum.
      </p>
    </div>
  </div>
</div>
<div class="tabs tabs-js tabs--alert" data-default-value="lorem">
  <div data-part="root">
    <div data-part="list">
      <button data-part="trigger" data-value="lorem">Lorem</button>
      <button data-part="trigger" data-value="duis">Duis</button>
      <button data-part="trigger" data-value="donec">Donec</button>
    </div>
    <div data-part="content" data-value="lorem">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
        adipiscing elit. Sed sodales ullamcorper tristique. Proin quis risus
        feugiat tellus iaculis fringilla.
      </p>
    </div>
    <div data-part="content" data-value="duis">
      <p>
        Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat, dui
        ut fermentum sodales, lectus metus dignissim ex.
      </p>
    </div>
    <div data-part="content" data-value="donec">
      <p>
        Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis non,
        pellentesque elit. Pellentesque sagittis fermentum.
      </p>
    </div>
  </div>
</div>
<div class="tabs tabs-js tabs--info" data-default-value="lorem">
  <div data-part="root">
    <div data-part="list">
      <button data-part="trigger" data-value="lorem">Lorem</button>
      <button data-part="trigger" data-value="duis">Duis</button>
      <button data-part="trigger" data-value="donec">Donec</button>
    </div>
    <div data-part="content" data-value="lorem">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
        adipiscing elit. Sed sodales ullamcorper tristique. Proin quis risus
        feugiat tellus iaculis fringilla.
      </p>
    </div>
    <div data-part="content" data-value="duis">
      <p>
        Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat, dui
        ut fermentum sodales, lectus metus dignissim ex.
      </p>
    </div>
    <div data-part="content" data-value="donec">
      <p>
        Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis non,
        pellentesque elit. Pellentesque sagittis fermentum.
      </p>
    </div>
  </div>
</div>
<div class="tabs tabs-js tabs--success" data-default-value="lorem">
  <div data-part="root">
    <div data-part="list">
      <button data-part="trigger" data-value="lorem">Lorem</button>
      <button data-part="trigger" data-value="duis">Duis</button>
      <button data-part="trigger" data-value="donec">Donec</button>
    </div>
    <div data-part="content" data-value="lorem">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
        adipiscing elit. Sed sodales ullamcorper tristique. Proin quis risus
        feugiat tellus iaculis fringilla.
      </p>
    </div>
    <div data-part="content" data-value="duis">
      <p>
        Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat, dui
        ut fermentum sodales, lectus metus dignissim ex.
      </p>
    </div>
    <div data-part="content" data-value="donec">
      <p>
        Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis non,
        pellentesque elit. Pellentesque sagittis fermentum.
      </p>
    </div>
  </div>
</div>
```

---

### Size

Set the size of each tabs

Options: **md(default)**, **sm**, **lg**, **xl**

```html
<!-- render:preview -->
<div class="tabs tabs-js tabs--sm" data-default-value="lorem">
  <div data-part="root">
    <div data-part="list">
      <button data-part="trigger" data-value="lorem">Lorem</button>
      <button data-part="trigger" data-value="duis">Duis</button>
      <button data-part="trigger" data-value="donec">Donec</button>
    </div>
    <div data-part="content" data-value="lorem">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
        adipiscing elit. Sed sodales ullamcorper tristique. Proin quis risus
        feugiat tellus iaculis fringilla.
      </p>
    </div>
    <div data-part="content" data-value="duis">
      <p>
        Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat, dui
        ut fermentum sodales, lectus metus dignissim ex.
      </p>
    </div>
    <div data-part="content" data-value="donec">
      <p>
        Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis non,
        pellentesque elit. Pellentesque sagittis fermentum.
      </p>
    </div>
  </div>
</div>

<div class="tabs tabs-js" data-default-value="lorem">
  <div data-part="root">
    <div data-part="list">
      <button data-part="trigger" data-value="lorem">Lorem</button>
      <button data-part="trigger" data-value="duis">Duis</button>
      <button data-part="trigger" data-value="donec">Donec</button>
    </div>
    <div data-part="content" data-value="lorem">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
        adipiscing elit. Sed sodales ullamcorper tristique. Proin quis risus
        feugiat tellus iaculis fringilla.
      </p>
    </div>
    <div data-part="content" data-value="duis">
      <p>
        Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat, dui
        ut fermentum sodales, lectus metus dignissim ex.
      </p>
    </div>
    <div data-part="content" data-value="donec">
      <p>
        Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis non,
        pellentesque elit. Pellentesque sagittis fermentum.
      </p>
    </div>
  </div>
</div>

<div class="tabs tabs-js tabs--lg" data-default-value="lorem">
  <div data-part="root">
    <div data-part="list">
      <button data-part="trigger" data-value="lorem">Lorem</button>
      <button data-part="trigger" data-value="duis">Duis</button>
      <button data-part="trigger" data-value="donec">Donec</button>
    </div>
    <div data-part="content" data-value="lorem">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
        adipiscing elit. Sed sodales ullamcorper tristique. Proin quis risus
        feugiat tellus iaculis fringilla.
      </p>
    </div>
    <div data-part="content" data-value="duis">
      <p>
        Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat, dui
        ut fermentum sodales, lectus metus dignissim ex.
      </p>
    </div>
    <div data-part="content" data-value="donec">
      <p>
        Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis non,
        pellentesque elit. Pellentesque sagittis fermentum.
      </p>
    </div>
  </div>
</div>

<div class="tabs tabs-js tabs--xl" data-default-value="lorem">
  <div data-part="root">
    <div data-part="list">
      <button data-part="trigger" data-value="lorem">Lorem</button>
      <button data-part="trigger" data-value="duis">Duis</button>
      <button data-part="trigger" data-value="donec">Donec</button>
    </div>
    <div data-part="content" data-value="lorem">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
        adipiscing elit. Sed sodales ullamcorper tristique. Proin quis risus
        feugiat tellus iaculis fringilla.
      </p>
    </div>
    <div data-part="content" data-value="duis">
      <p>
        Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat, dui
        ut fermentum sodales, lectus metus dignissim ex.
      </p>
    </div>
    <div data-part="content" data-value="donec">
      <p>
        Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis non,
        pellentesque elit. Pellentesque sagittis fermentum.
      </p>
    </div>
  </div>
</div>
```

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

### Static

1. Import the Tabs component

```ts
import "@corex-ui/static/components/tabs";
```

This will automatically initialize all elements with `class="tabs-js"` and add the necessary interaction behavior.

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/tabs.css";
```

Then apply the base class along with any desired modifiers:

```html
<div class="tabs tabs-js" data-default-value="lorem">
  <div data-part="root">
    <div data-part="list">
      <button data-part="trigger" data-value="lorem">Lorem</button>
    </div>
    <div data-part="content" data-value="lorem"></div>
  </div>
</div>
```

### Static React

> Experimental! Only works with React static export (eg. Next.js SSG.)

1. Import the Tabs component

```ts
import { Tabs } from '@corex-ui/static/react';
export default function Home() {
  return (
    <Tabs data-default-value="lorem">
      <div data-part="root">
        <div data-part="list">
          <button data-part="trigger" data-value="lorem">Lorem</button>
        </div>
        <div data-part="content" data-value="lorem" />
      </div>
    </Tabs>
  );
}
```

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/tabs.css";
```

Then apply the base class along with any desired modifiers:

```html
<Tabs className="tabs"> {/* content */} </Tabs>
```
