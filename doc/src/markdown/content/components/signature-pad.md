---
title: Signature Pad
description: A pure HTML and vanilla JS implementation of Zag JS Signature Pad
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

# Signature Pad

> A pure HTML and vanilla JS implementation of [Zag JS Signature Pad](https://zagjs.com/components/react/signature-pad)

The signature pad component allows users to draw handwritten signatures using touch or pointer devices. The signature can be saved as an image or cleared.

---

## Anatomy

The Signature Pad component consists of the following data parts:

`root`, `label`, `hidden-input`, `control`, `segment`, `clear-trigger`, `guide`

```html
<!-- render:preview -->
<div
  id="signature-anatomy"
  class="signature-pad signature-pad-js"
  data-on-draw-end="save-signature"
>
  <div data-part="root">
    <label data-part="label">Signature Pad</label>
    <input data-part="hidden-input" />
    <div data-part="control">
      <svg data-part="segment"></svg>
      <button data-part="clear-trigger">
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
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
      <div data-part="guide"></div>
    </div>
    <div data-part="preview"></div>
  </div>
</div>
```

```ts
document
  .getElementById("signature-anatomy")
  ?.addEventListener("save-signature", async (event) => {
    const details = (event as CustomEvent).detail;
    console.log(details);
    const dataUrl = await details.getDataUrl("image/png");
    const preview = document.querySelector<HTMLElement>(
      '[data-part="preview"]',
    );
    console.log(preview);
    console.log(dataUrl);
    if (!preview || !dataUrl) return;
    preview.innerHTML = `
      <img src="${dataUrl}" alt="Signature preview" />
      <button class="button button--sm button--accent" id="download-signature">Save Signature</button>
    `;
    const downloadBtn = document.getElementById("download-signature");
    downloadBtn?.addEventListener("click", () => {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "signature.png";
      link.click();
    });
    console.log("Signature preview populated with save button.");
  });
```

---

## Data attributes

Each signature pad can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  class="signature-pad signature-pad-js"
  data-fill="red"
  data-simulate-pressure="true"
  data-size="6"
>
  <div data-part="root">
    <label data-part="label">Signature Pad</label>
    <input data-part="hidden-input" />
    <div data-part="control">
      <svg data-part="segment"></svg>
      <button data-part="clear-trigger">
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
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
      <div data-part="guide"></div>
    </div>
  </div>
</div>
```

**id**
Type: `string`
Description: Unique id of the signature pad. Default generated if none is provided.

**data-dir**
Type: `string`
Description: The orientation of the signature pad. Can be `ltr` or `rtl`.

**data-name**  
Type: `string`  
Description: The name of the signature pad useful for form submission.

**data-disabled**  
Type: `boolean`  
Description: Whether the signature pad is disabled.

**data-required**  
Type: `boolean`  
Description: Whether the signature pad is required.

**data-read-only**  
Type: `boolean`  
Description: Whether the signature pad is read-only.

**data-default-paths**  
Type: `string[]`  
Description: Default signature paths (uncontrolled).

**data-paths**  
Type: `string[]`  
Description: Controlled signature paths.

**data-fill**  
Type: `string`  
Description: Stroke color of the signature.

**data-size**  
Type: `number`  
Description: Stroke size of the signature.

**data-simulate-pressure**  
Type: `boolean`  
Description: Whether to simulate pressure in stroke drawing.

---

## Event Callbacks

Each signature pad component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id for the signature pad and a event listener for your event name

```ts
document
  .getElementById("my-signature-pad")
  ?.addEventListener("my-signature-pad-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

```html
<!-- render:preview -->
<div
  id="my-signature-pad"
  class="signature-pad signature-pad-js"
  data-on-draw-end="my-signature-pad-event"
>
  <div data-part="root">
    <label data-part="label">Signature Pad</label>
    <input data-part="hidden-input" />
    <div data-part="control">
      <svg data-part="segment"></svg>
      <button data-part="clear-trigger">
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
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
      <div data-part="guide"></div>
    </div>
    <div data-part="preview"></div>
  </div>
</div>
```

> Open your browser's console to see the events received when the siganture pad draw ends

**data-on-draw**  
Type: `string`  
Description: Event name triggered while drawing on the signature pad.

**data-on-draw-end**  
Type: `string`  
Description: Event name triggered when drawing ends.

---

## Form usage

Signature pad can be used inside a form

You must set the id of the form and the name of the Signature pad

`data-name="signature"`

```html
<!-- render:preview -->
<form
  id="my-form"
  class="flex flex-col items-center gap-(--spacing-ui-gap) max-w-(--container-mini)"
>
  <div class="signature-pad signature-pad-js" data-name="signature">
    <div data-part="root">
      <label data-part="label">Signature Pad</label>
      <input data-part="hidden-input" />
      <div data-part="control">
        <svg data-part="segment"></svg>
        <button data-part="clear-trigger">
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
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
        <div data-part="guide"></div>
      </div>
    </div>
  </div>
  <button class="button button--accent" type="submit">Submit</button>
  <div id="result"></div>
</form>
```

You can use the results from the form as you wish

```ts
const signaturePadForm = document.getElementById(
  "my-form",
) as HTMLFormElement | null;
const signatureResult = document.getElementById(
  "result",
) as HTMLDivElement | null;

if (signaturePadForm && signatureResult) {
  signaturePadForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const formData = new FormData(signaturePadForm);
    console.log(formData.getAll("signature"));
    const signature = (formData.get("signature") as string) || "none";
    signatureResult.innerHTML = `Submitted: signature: <span class="overflow-scroll scrollbar scrollbar--sm max-h-(--container-mini) block max-w-(--container-mini) break-all">${signature}</span>`;
  });
}
```

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

### Static

1. Import the Signature Pad component

```ts
import "@corex-ui/static/components/signature-pad";
```

This will automatically initialize all elements with `class="signature-pad-js"` and add the necessary interaction behavior.

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/signature-pad.css";
```

Then apply the base class along with any desired modifiers:

```html
<div class="signature-pad signature-pad-js">
  <div data-part="root">
    <label data-part="label">Signature Pad</label>
    <input data-part="hidden-input" />
    <div data-part="control">
      <svg data-part="segment"></svg>
      <button data-part="clear-trigger"></button>
      <div data-part="guide"></div>
    </div>
  </div>
</div>
```

### Static React

> Experimental! Only works with React static export (eg. Next.js SSG.)

1. Import the Signature Pad component

```ts
import { SignaturePad } from '@corex-ui/static/react';
export default function Home() {
  return (
    <SignaturePad>
      <div data-part="root">
        <label data-part="label">Signature Pad</label>
        <input data-part="hidden-input" />
        <div data-part="control">
          <svg data-part="segment" />
          <button data-part="clear-trigger" />
          <div data-part="guide" />
        </div>
      </div>
    </SignaturePad>
  );
}
```

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/signature-pad.css";
```

Then apply the base class along with any desired modifiers:

```html
<SignaturePad className="signature-pad signature-pad-js">
  {/* content */}
</SignaturePad>
```
