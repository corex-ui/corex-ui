---
title: Toast
description: A pure HTML and vanilla JS implementation of Zag JS Toast
author: Netoum
date: 2025-08-20
category: Components
tags:
  - JavaScript
  - Accessibility
  - Toast
  - UI Components
  - ZagJS
---

# Toast

> A pure HTML and vanilla JS implementation of [Zag JS Toast](https://zagjs.com/components/react/tabs)

The toast component is used to give feedback to users after an action has taken place.

---

## Anatomy

The Toast component consists of the following data parts:

`group`, `root`, `content`, `title`, `description`, `progessbar`

You can created 4 different types of toast:

`info`, `error`, `success` and `loading`

```html
<!-- render:preview -->
<div class="toast toast-js" data-max="5">
  <div data-part="group"></div>
</div>
<button class="button toast-info">Info Toast</button>
<button class="button toast-alert">Alert Toast</button>
<button class="button toast-success">Success Toast</button>
<button class="button toast-loading">Loading Toast</button>
```

```ts
document.querySelectorAll<HTMLElement>(".toast-info").forEach((btn) => {
  btn.addEventListener("click", () => {
    createToast({
      title: "Profile Updated",
      description: "Your account settings have been saved successfully.",
      type: "info",
      duration: 5000,
    });
  });
});
document.querySelectorAll<HTMLElement>(".toast-alert").forEach((btn) => {
  btn.addEventListener("click", () => {
    createToast({
      title: "Failed to Save Changes",
      description:
        "There was a problem updating your profile. Please try again later.",
      type: "error",
      duration: 5000,
    });
  });
});
document.querySelectorAll<HTMLElement>(".toast-success").forEach((btn) => {
  btn.addEventListener("click", () => {
    createToast({
      title: "Payment Completed",
      description:
        "Your payment was processed successfully. Thank you for your purchase!",
      type: "success",
      duration: 5000,
    });
  });
});
document.querySelectorAll<HTMLElement>(".toast-loading").forEach((btn) => {
  btn.addEventListener("click", () => {
    createToast({
      title: "Uploading File",
      description: "Your document is currently being uploaded. Please wait…",
      type: "loading",
    });
  });
});
```

---

## Data attributes

Each toast can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  id="toast-attributes"
  class="toast toast-js"
  data-placement="top-start"
  data-gap="5"
  data-max="2"
  data-offsets="20px"
>
  <div data-part="group"></div>
</div>
<button class="button toast-info-attributes">Info Toast</button>
<button class="button toast-alert-attributes">Alert Toast</button>
<button class="button toast-success-attributes">Success Toast</button>
<button class="button toast-loading-attributes">Loading Toast</button>
```

```ts
document
  .querySelectorAll<HTMLElement>(".toast-info-attributes")
  .forEach((btn) => {
    btn.addEventListener("click", () => {
      createToast({
        title: "Profile Updated",
        description: "Your account settings have been saved successfully.",
        type: "info",
        duration: 5000,
        groupId: "toast-attributes",
      });
    });
  });
document
  .querySelectorAll<HTMLElement>(".toast-alert-attributes")
  .forEach((btn) => {
    btn.addEventListener("click", () => {
      createToast({
        title: "Failed to Save Changes",
        description:
          "There was a problem updating your profile. Please try again later.",
        type: "error",
        duration: 5000,
        groupId: "toast-attributes",
      });
    });
  });
document
  .querySelectorAll<HTMLElement>(".toast-success-attributes")
  .forEach((btn) => {
    btn.addEventListener("click", () => {
      createToast({
        title: "Payment Completed",
        description:
          "Your payment was processed successfully. Thank you for your purchase!",
        type: "success",
        duration: 5000,
        groupId: "toast-attributes",
      });
    });
  });
document
  .querySelectorAll<HTMLElement>(".toast-loading-attributes")
  .forEach((btn) => {
    btn.addEventListener("click", () => {
      createToast({
        title: "Uploading File",
        description: "Your document is currently being uploaded. Please wait…",
        type: "loading",
        groupId: "toast-attributes",
      });
    });
  });
```

**data-placement**  
Type: `"top-start" | "top" | "top-end" | "bottom-start" | "bottom" | "bottom-end"`  
Description: The placement of the toast.

**data-max**  
Type: `string`  
Description: The maximum number of toasts. When the number of toasts exceeds this limit, the new toasts are queued.

**data-gap**  
Type: `number`  
Description: The gap between the toasts.

**data-offsets**  
Type: `string`  
Description: The offset from the safe environment edge of the viewport

---

## Toast Settings

Each individual toast can be set with different options:

```html
<!-- render:preview -->
<button class="button toast-settings">Custom Toast</button>
```

```ts
document.querySelectorAll<HTMLElement>(".toast-settings").forEach((btn) => {
  btn.addEventListener("click", () => {
    createToast({
      title: "This is custom toast",
      description: "Open you console to see the event received.",
      type: "loading",
      duration: 10000,
      removeDelay: 0,
      onStatusChange(details) {
        console.log(details);
      },
    });
  });
});
```

**id**  
Type: `string`  
Description: Custom id for the toast.

**title**  
Type: `string`  
Description: The title of the toast.

**description**  
Type: `string`  
Description: The description of the toast.

**duration**  
Type: `number`  
Description: The duration of the toast.

**removeDelay**  
Type: `number`  
Description: The duration for the toast to kept alive before it is removed. Useful for exit transitions.

**onStatusChange(details)**  
Type: `function`  
Description: Function called when the toast is visible

**groupId**  
Type: `string`  
Description: The id of the toast. Default to the first toast.

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

### Static

1. Import the Toast component

```ts
import "@corex-ui/static/components/toast";
```

This will automatically initialize all elements with `class="toast-js"` and add the necessary interaction behavior.

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/toast.css";
```

Then apply the base class along with any desired modifiers:

```html
<div class="toast toast-js" data-max="5">
  <div data-part="group"></div>
</div>
```

### Static React

> Experimental! Only works with React static export (eg. Next.js SSG.)

1. Import the Toast component

```ts
import { Toast } from '@corex-ui/static/react';
export default function Home() {
  return (
    <Toast data-max={5}>
      <div data-part="group" />
    </Toast>
  );
}
```

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/toast.css";
```

Then apply the base class along with any desired modifiers:

```html
<Toast className="toast"> {/* content */} </Toast>
```
