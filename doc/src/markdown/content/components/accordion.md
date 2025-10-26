---
title: Accordion
description: A pure HTML and vanilla JS implementation of Zag JS Accordion
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

# Accordion

> A pure HTML and vanilla JS implementation of [Zag JS Accordion](https://zagjs.com/components/react/accordion)

An accordion is a stacked set of interactive headings containing a title, content snippet, or thumbnail representing a section of content.

---

## Anatomy

The Accordion component consists of the following data parts:

`root`, `item`, `item-trigger`, `item-text`, `item-indicator`, `item-content`

An optional `data-value` can be added to each `data-part="item"`, this is useful when using the API or setting default values.

```html
<!-- render:preview -->
<div class="accordion accordion-js">
  <div data-part="root">
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Lorem ipsum dolor sit amet</span>
          <span data-part="item-indicator">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Consectetur adipiscing elit. Sed sodales ullamcorper tristique. Proin
          quis risus feugiat tellus iaculis fringilla.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text"
            >Duis dictum gravida odio ac pharetra?</span
          >
          <span data-part="item-indicator">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat,
          dui ut fermentum sodales, lectus metus dignissim ex.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Donec condimentum ex mi</span>
          <span data-part="item-indicator">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis
          non, pellentesque elit. Pellentesque sagittis fermentum.
        </p>
      </div>
    </div>
  </div>
</div>
```

> To adhere to **_WAI-ARIA_** design patterns, every item trigger is wrapped in a `h3` tag, preserving the semantic structure of the page.

---

## Item Indicator

You can choose to switch the item indicator when the item state changes.
You must add `data-open` and `data-closed` to the respective icons

```html
<!-- render:preview -->
<div class="accordion accordion-js" data-collapsible>
  <div data-part="root">
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Lorem ipsum dolor sit amet</span>
          <span data-part="item-indicator" data-closed>
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </span>
          <span data-part="item-indicator" data-open>
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
                d="M5 12h14"
              />
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Consectetur adipiscing elit. Sed sodales ullamcorper tristique. Proin
          quis risus feugiat tellus iaculis fringilla.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text"
            >Duis dictum gravida odio ac pharetra?</span
          >
          <span data-part="item-indicator" data-closed>
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </span>
          <span data-part="item-indicator" data-open>
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
                d="M5 12h14"
              />
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat,
          dui ut fermentum sodales, lectus metus dignissim ex.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Donec condimentum ex mi</span>
          <span data-part="item-indicator" data-closed>
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </span>
          <span data-part="item-indicator" data-open>
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
                d="M5 12h14"
              />
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis
          non, pellentesque elit. Pellentesque sagittis fermentum.
        </p>
      </div>
    </div>
  </div>
</div>
```

---

## Data attributes

Each accordion can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  class="accordion accordion-js"
  id="custom-accordion"
  data-default-value="lorem, donec"
  data-dir="ltr"
  data-orientation="vertical"
  data-collapsible
  data-multiple
>
  <div data-part="root">
    <div data-part="item" data-value="lorem">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Lorem ipsum dolor sit amet</span>
          <span data-part="item-indicator">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Consectetur adipiscing elit. Sed sodales ullamcorper tristique. Proin
          quis risus feugiat tellus iaculis fringilla.
        </p>
      </div>
    </div>
    <div data-part="item" data-value="duis">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text"
            >Duis dictum gravida odio ac pharetra?</span
          >
          <span data-part="item-indicator">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat,
          dui ut fermentum sodales, lectus metus dignissim ex.
        </p>
      </div>
    </div>
    <div data-part="item" data-value="donec">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Donec condimentum ex mi</span>
          <span data-part="item-indicator">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis
          non, pellentesque elit. Pellentesque sagittis fermentum.
        </p>
      </div>
    </div>
  </div>
</div>
```

**id**
Type: `string`
Description: Unique id of the accordion. Default generated if none is provided.

**data-dir**
Type: `string`
Description: The orientation of the accordion. Can be `ltr` or `rtl`.

**data-disabled**
Type: `boolean`
Description: Whether the accordion is disabled.

**data-multiple**
Type: `boolean`
Description: Whether multiple accordion items can be expanded at the same time.

**data-collapsible**
Type: `boolean`
Description: Whether an accordion item can be closed after it has been expanded.

**data-default-value**
Type: `string[]`
Description: Initial default value of the accordion when rendered. Use when you don't need to control the value.

**data-value**
Type: `string[]`
Description: Initial default value of the accordion when rendered. Use when you don't need to control the value.

**data-orientation**
Type: `string`
Description: The orientation of the accordion. Can be `horizontal` or `vertical` - `horizontal`: only left and right arrow key navigation will work. - `vertical`: only up and down arrow key navigation will work.

---

## Event Callbacks

Each accordion component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id for the accordion and a event listener for your event name

> Open your browser's console to see the events received when the accordion value changes

```html
<!-- render:preview -->
<div
  id="my-accordion"
  class="accordion accordion-js"
  data-on-value-change="my-accordion-event"
>
  <div data-part="root">
    <div data-part="item" data-value="lorem">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Lorem ipsum dolor sit amet</span>
          <span data-part="item-indicator">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Consectetur adipiscing elit. Sed sodales ullamcorper tristique. Proin
          quis risus feugiat tellus iaculis fringilla.
        </p>
      </div>
    </div>
    <div data-part="item" data-value="duis">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text"
            >Duis dictum gravida odio ac pharetra?</span
          >
          <span data-part="item-indicator">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat,
          dui ut fermentum sodales, lectus metus dignissim ex.
        </p>
      </div>
    </div>
    <div data-part="item" data-value="donex">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Donec condimentum ex mi</span>
          <span data-part="item-indicator">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis
          non, pellentesque elit. Pellentesque sagittis fermentum.
        </p>
      </div>
    </div>
  </div>
</div>
```

```ts
document
  .getElementById("my-accordion")
  ?.addEventListener("my-accordion-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

**data-on-value-change**
Type: `string`
Description: Event name to be send when the focused accordion item changes.

**data-on-focus-change**
Type: `string`
Description: Event name to be send when the state of expanded/collapsed accordion items changes.

---

## API

You can interact with the Accordion API by dispatching custom events.

```html
<!-- render:preview -->
<button data-action="accordion-set-value" class="button">Set Donec</button>
<button
  data-action="accordion-set-value"
  data-value="donec,duis"
  class="button"
>
  Set Donec and Duis
</button>
<button data-action="accordion-value" class="button">Get current value</button>
<div id="accordion-api" class="accordion accordion-js" data-multiple>
  <div data-part="root">
    <div data-part="item" data-value="lorem">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Lorem ipsum dolor sit amet</span>
          <span data-part="item-indicator">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Consectetur adipiscing elit. Sed sodales ullamcorper tristique. Proin
          quis risus feugiat tellus iaculis fringilla.
        </p>
      </div>
    </div>
    <div data-part="item" data-value="duis">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text"
            >Duis dictum gravida odio ac pharetra?</span
          >
          <span data-part="item-indicator">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat,
          dui ut fermentum sodales, lectus metus dignissim ex.
        </p>
      </div>
    </div>
    <div data-part="item" data-value="donec">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Donec condimentum ex mi</span>
          <span data-part="item-indicator">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis
          non, pellentesque elit. Pellentesque sagittis fermentum.
        </p>
      </div>
    </div>
  </div>
</div>
```

```ts
const accordionState = document.getElementById("accordion-api");
if (accordionState) {
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="accordion-set-value"]',
  );
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      if (value) {
        const values = value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
        accordionState.dispatchEvent(
          new CustomEvent("accordion:set-value", {
            detail: { value: values },
          }),
        );
      }
    });
  });
  const getBtns = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="accordion-value"]',
  );
  getBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      accordionState.dispatchEvent(
        new CustomEvent("accordion:value", {
          detail: {
            callback: (value: string[]) => {
              alert("Accordion value: " + JSON.stringify(value));
            },
          },
        }),
      );
    }),
  );
} else {
  console.warn("Element with ID 'accordion-api' not found");
}
```

**accordion:set-value**
Type: `string[]`
Description: Sets the value of the accordion

**accordion:value**
Type: `callback`
Description: Get the current value of the accordion

**accordion:focused-value**
Type: `callback`
Description: Get the current focused value of the accordion

---

## Orientation

By default, the accordion is displayed **vertically**.  
You can also switch it to a **horizontal** layout.

You must set you desired size for the content
When using the horizontal layout, keyboard navigation changes accordingly:

- **Vertical:** use <kbd>↑</kbd> / <kbd>↓</kbd> to move between items
- **Horizontal:** use <kbd>←</kbd> / <kbd>→</kbd> to move between items

```html
<!-- render:preview -->
<div
  class="accordion accordion-js"
  data-orientation="horizontal"
  data-default-value="lorem"
>
  <div data-part="root" class="grid grid-cols-3">
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">A</span>
          <span data-part="item-indicator">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p
          class="w-full h-ui-xl my-ui-padding rounded-ui border-1 border-dashed bg-root mx-auto"
        ></p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">B</span>
          <span data-part="item-indicator">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p
          class="w-full h-ui-xl my-ui-padding rounded-ui border-1 border-dashed bg-root mx-auto"
        ></p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">C</span>
          <span data-part="item-indicator">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p
          class="w-full h-ui-xl my-ui-padding rounded-ui border-1 border-dashed bg-root mx-auto"
        ></p>
      </div>
    </div>
  </div>
</div>
```

---

## RTL

RTL support for accordion

```html
<!-- render:preview -->
<div class="accordion accordion-js" data-dir="rtl">
  <div data-part="root">
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">لوريم إيبسوم دولور سيت أميت</span>
          <span data-part="item-indicator">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>هذا نص عربي تجريبي. يمكنك وضع أي محتوى هنا لتوضيح شكل الفقرة.</p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text"
            >دويس ديكتوم غرافيادا أوديو أك فارِترا؟</span
          >
          <span data-part="item-indicator">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          هذا مثال على فقرة أخرى باللغة العربية، يمكنك استخدامه كنموذج لمحتوى
          الفقرة.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">دونيك كونديمينتوم إكس مي</span>
          <span data-part="item-indicator">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          فقرة تجريبية ثالثة باللغة العربية لتوضيح كيفية عرض النصوص داخل محتوى
          الأكورديون.
        </p>
      </div>
    </div>
  </div>
</div>
```

---

## Disabled

Each accordion can be disabled either globally or per item.

- To disable the entire accordion, add `data-disabled` to the accordion element.
- To disable a specific item, add `data-disabled` to that item’s element.

```html
<!-- render:preview -->
<div class="accordion accordion-js" data-disabled>
  <div data-part="root">
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Lorem ipsum dolor sit amet</span>
          <span data-part="item-indicator">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Consectetur adipiscing elit. Sed sodales ullamcorper tristique. Proin
          quis risus feugiat tellus iaculis fringilla.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text"
            >Duis dictum gravida odio ac pharetra?</span
          >
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat,
          dui ut fermentum sodales, lectus metus dignissim ex.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Donec condimentum ex mi</span>
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis
          non, pellentesque elit. Pellentesque sagittis fermentum.
        </p>
      </div>
    </div>
  </div>
</div>
<div class="accordion accordion-js">
  <div data-part="root">
    <div data-part="item" data-disabled>
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Lorem ipsum dolor sit amet</span>
          <span data-part="item-indicator">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Consectetur adipiscing elit. Sed sodales ullamcorper tristique. Proin
          quis risus feugiat tellus iaculis fringilla.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text"
            >Duis dictum gravida odio ac pharetra?</span
          >
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat,
          dui ut fermentum sodales, lectus metus dignissim ex.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Donec condimentum ex mi</span>
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis
          non, pellentesque elit. Pellentesque sagittis fermentum.
        </p>
      </div>
    </div>
  </div>
</div>
```

---

## Modifiers

Accordions support modifier classes that control their appearance.  
You can combine multiple modifiers on the same accordion.

The default modifier is applied automatically, so you don’t need to include it explicitly.

| Modifier        | Description                                |
| --------------- | ------------------------------------------ |
| [Color](#color) | Sets the color theme of the accordion.     |
| [Size](#size)   | Adjusts the overall size of the accordion. |

> You may have noticed the double dash bebfore the modifier name — this follows the BEM (Block Element Modifier) naming convention

### Color

Use `class="accordion--{color}"` to set the color of an accordion.

Available options:  
**accent**(default), **brand**, **alert**, **info**, **success**

```html
<!-- render:preview -->
<div
  class="accordion accordion-js accordion--accent"
  data-multiple
  data-default-value="lorem"
>
  <div data-part="root">
    <div data-part="item" data-value="lorem">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Lorem ipsum dolor sit amet</span>
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Consectetur adipiscing elit. Sed sodales ullamcorper tristique. Proin
          quis risus feugiat tellus iaculis fringilla.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text"
            >Duis dictum gravida odio ac pharetra?</span
          >
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat,
          dui ut fermentum sodales, lectus metus dignissim ex.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Donec condimentum ex mi</span>
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis
          non, pellentesque elit. Pellentesque sagittis fermentum.
        </p>
      </div>
    </div>
  </div>
</div>

<div
  class="accordion accordion-js accordion--brand"
  data-multiple
  data-default-value="lorem"
>
  <div data-part="root">
    <div data-part="item" data-value="lorem">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Lorem ipsum dolor sit amet</span>
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Consectetur adipiscing elit. Sed sodales ullamcorper tristique. Proin
          quis risus feugiat tellus iaculis fringilla.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text"
            >Duis dictum gravida odio ac pharetra?</span
          >
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat,
          dui ut fermentum sodales, lectus metus dignissim ex.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Donec condimentum ex mi</span>
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis
          non, pellentesque elit. Pellentesque sagittis fermentum.
        </p>
      </div>
    </div>
  </div>
</div>

<div
  class="accordion accordion-js accordion--alert"
  data-multiple
  data-default-value="lorem"
>
  <div data-part="root">
    <div data-part="item" data-value="lorem">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Lorem ipsum dolor sit amet</span>
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Consectetur adipiscing elit. Sed sodales ullamcorper tristique. Proin
          quis risus feugiat tellus iaculis fringilla.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text"
            >Duis dictum gravida odio ac pharetra?</span
          >
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat,
          dui ut fermentum sodales, lectus metus dignissim ex.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Donec condimentum ex mi</span>
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis
          non, pellentesque elit. Pellentesque sagittis fermentum.
        </p>
      </div>
    </div>
  </div>
</div>

<div
  class="accordion accordion-js accordion--info"
  data-multiple
  data-default-value="lorem"
>
  <div data-part="root">
    <div data-part="item" data-value="lorem">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Lorem ipsum dolor sit amet</span>
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Consectetur adipiscing elit. Sed sodales ullamcorper tristique. Proin
          quis risus feugiat tellus iaculis fringilla.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text"
            >Duis dictum gravida odio ac pharetra?</span
          >
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat,
          dui ut fermentum sodales, lectus metus dignissim ex.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Donec condimentum ex mi</span>
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis
          non, pellentesque elit. Pellentesque sagittis fermentum.
        </p>
      </div>
    </div>
  </div>
</div>
<div
  class="accordion accordion-js accordion--success"
  data-multiple
  data-default-value="lorem"
>
  <div data-part="root">
    <div data-part="item" data-value="lorem">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Lorem ipsum dolor sit amet</span>
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Consectetur adipiscing elit. Sed sodales ullamcorper tristique. Proin
          quis risus feugiat tellus iaculis fringilla.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text"
            >Duis dictum gravida odio ac pharetra?</span
          >
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat,
          dui ut fermentum sodales, lectus metus dignissim ex.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Donec condimentum ex mi</span>
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis
          non, pellentesque elit. Pellentesque sagittis fermentum.
        </p>
      </div>
    </div>
  </div>
</div>
```

---

### Size

Use `class="accordion--{size}"` to set the size of an accordion.

Available options:  
**sm**, **md** (default), **lg**, **xl**

```html
<!-- render:preview -->
<div class="accordion accordion-js accordion--sm">
  <div data-part="root">
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Lorem ipsum dolor sit amet</span>
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Consectetur adipiscing elit. Sed sodales ullamcorper tristique. Proin
          quis risus feugiat tellus iaculis fringilla.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text"
            >Duis dictum gravida odio ac pharetra?</span
          >
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat,
          dui ut fermentum sodales, lectus metus dignissim ex.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Donec condimentum ex mi</span>
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis
          non, pellentesque elit. Pellentesque sagittis fermentum.
        </p>
      </div>
    </div>
  </div>
</div>

<div class="accordion accordion-js accordion--base">
  <div data-part="root">
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Lorem ipsum dolor sit amet</span>
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Consectetur adipiscing elit. Sed sodales ullamcorper tristique. Proin
          quis risus feugiat tellus iaculis fringilla.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text"
            >Duis dictum gravida odio ac pharetra?</span
          >
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat,
          dui ut fermentum sodales, lectus metus dignissim ex.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Donec condimentum ex mi</span>
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis
          non, pellentesque elit. Pellentesque sagittis fermentum.
        </p>
      </div>
    </div>
  </div>
</div>

<div class="accordion accordion-js accordion--lg">
  <div data-part="root">
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Lorem ipsum dolor sit amet</span>
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Consectetur adipiscing elit. Sed sodales ullamcorper tristique. Proin
          quis risus feugiat tellus iaculis fringilla.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text"
            >Duis dictum gravida odio ac pharetra?</span
          >
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat,
          dui ut fermentum sodales, lectus metus dignissim ex.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Donec condimentum ex mi</span>
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis
          non, pellentesque elit. Pellentesque sagittis fermentum.
        </p>
      </div>
    </div>
  </div>
</div>

<div class="accordion accordion-js accordion--xl">
  <div data-part="root">
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Lorem ipsum dolor sit amet</span>
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Consectetur adipiscing elit. Sed sodales ullamcorper tristique. Proin
          quis risus feugiat tellus iaculis fringilla.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text"
            >Duis dictum gravida odio ac pharetra?</span
          >
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat,
          dui ut fermentum sodales, lectus metus dignissim ex.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Donec condimentum ex mi</span>
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis
          non, pellentesque elit. Pellentesque sagittis fermentum.
        </p>
      </div>
    </div>
  </div>
</div>
```

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

1. Import the Accordion component

```ts
import "@corex-ui/static/components/accordion";
```

This will automatically initialize all elements with `class="accordion-js"` and add the necessary interaction behavior.

2. Add styling

The Accordion component is **unstyled by default** for maximum customization flexibility.

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/accordion.css";
```

Then apply the base class along with any desired modifiers:

```html
<div class="accordion accordion-js accordion--sm">
  <div data-part="root">
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Lorem ipsum dolor sit amet</span>
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Consectetur adipiscing elit. Sed sodales ullamcorper tristique. Proin
          quis risus feugiat tellus iaculis fringilla.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text"
            >Duis dictum gravida odio ac pharetra?</span
          >
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Nullam eget vestibulum ligula, at interdum tellus. Quisque feugiat,
          dui ut fermentum sodales, lectus metus dignissim ex.
        </p>
      </div>
    </div>
    <div data-part="item">
      <h3>
        <button data-part="item-trigger">
          <span data-part="item-text">Donec condimentum ex mi</span>
          <span data-indicator="item-trigger">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h3>
      <div data-part="item-content">
        <p>
          Congue molestie ipsum gravida a. Sed ac eros luctus, cursus turpis
          non, pellentesque elit. Pellentesque sagittis fermentum.
        </p>
      </div>
    </div>
  </div>
</div>
```
