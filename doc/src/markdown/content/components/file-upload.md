---
title: File Upload
description: A pure HTML and vanilla JS implementation of Zag JS File Upload
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

# File Upload

> A pure HTML and vanilla JS implementation of [Zag JS File Upload](https://zagjs.com/components/react/file-upload)

File upload component is used to upload multiple files.

The native input file element is quite difficult to style and doesn't provide a drag-n-drop version.

---

## Anatomy

The File Upload component consists of the following data parts:

`root`, `dropzone`, `hidden-input`, `trigger`

```html
<!-- render:preview -->
<div
  id="file-upload-demo"
  class="file-upload file-upload-js"
  data-on-file-accept="upload-to-supabase"
  data-accept="image/*"
  data-max-files="5"
>
  <div data-part="root">
    <label data-part="label">Upload File</label>
    <input data-part="hidden-input" />
    <div data-part="dropzone">
      <span>Drag your file(s) here</span>
    </div>
    <button data-part="trigger">Choose file(s)</button>
  </div>
</div>
<div data-part="upload-previews"></div>
```

This example uses **Supabase Bucket** in order to upload the files.

```bash
pnpm install @supabase/supabase-js
```

Replace `<SupabaseURL>` and `<AnonPublicKey>` by your Supabase project name and public key

You also must replace the `<BucketName>` and `<FolderName>`

```ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("<SupabaseURL>", "<AnonPublicKey>");

const root = document.getElementById("file-upload-demo")!;
const previewContainer = document.querySelector(
  '[data-part="upload-previews"]',
)!;

root.addEventListener("upload-to-supabase", async (event) => {
  const { files } = (event as CustomEvent).detail;
  if (!files || files.length === 0) return;

  for (const file of files) {
    const path = `<FolderName>/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("<BucketName>")
      .upload(path, file);

    if (error) {
      console.error("Upload failed:", file.name, error.message);
      continue;
    }

    const { data: publicUrl } = supabase.storage
      .from("<BucketName>")
      .getPublicUrl(path);

    const previewBlock = document.createElement("div");
    previewBlock.setAttribute("data-part", "upload-preview");

    const imageDiv = document.createElement("div");
    imageDiv.setAttribute("data-part", "image");
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement("img");
      img.src = e.target?.result as string;
      imageDiv.appendChild(img);
    };
    reader.readAsDataURL(file);
    const nameDiv = document.createElement("div");
    nameDiv.setAttribute("data-part", "name");
    nameDiv.textContent = file.name;
    const sizeDiv = document.createElement("div");
    sizeDiv.setAttribute("data-part", "size");
    sizeDiv.textContent = `${(file.size / 1024).toFixed(1)} KB`;
    const urlLink = document.createElement("a");
    urlLink.setAttribute("data-part", "url");
    urlLink.href = publicUrl.publicUrl;
    urlLink.target = "_blank";
    urlLink.textContent = publicUrl.publicUrl;
    previewBlock.appendChild(imageDiv);
    previewBlock.appendChild(nameDiv);
    previewBlock.appendChild(sizeDiv);
    previewBlock.appendChild(urlLink);
    previewContainer.appendChild(previewBlock);
    console.log("✅ Uploaded:", file.name, publicUrl.publicUrl);
  }
});
```

---

## Data attributes

Each file upload can be set with different settings with the following data-attribute.

**id**
Type: `string`
Description: Unique id of the file upload. Default generated if none is provided.

**data-dir**
Type: `string`
Description: The orientation of the file upload. Can be `ltr` or `rtl`.

**data-name**  
Type: `string`  
Description: The name of the underlying file input.

**data-disabled**  
Type: `boolean`  
Description: Whether the file input is disabled.

**data-required**  
Type: `boolean`  
Description: Whether the file input is required.

**data-max-files**  
Type: `number`  
Description: Maximum number of files allowed.

**data-max-file-size**  
Type: `number`  
Description: Maximum file size in bytes.

**data-accept**  
Type: `string`  
Description: Accepted file types (e.g. `"image/*"`).

---

## Event Callbacks

Each file upload component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id for the file upload and a event listener for your event name

```ts
document
  .getElementById("my-file-upload")
  ?.addEventListener("my-file-upload-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

**data-on-file-change**  
Type: `string`  
Description: Event name triggered when the files change.

**data-on-file-accept**  
Type: `string`  
Description: Event name triggered when a file is accepted.

**data-on-file-reject**  
Type: `string`  
Description: Event name triggered when a file is rejected.

---

## Form usage

File upload can be used inside a form

You must set the id of the form and the name of the file upload

`data-form="form-id"`
`data-name="combobox-name"`

```html
<!-- render:preview -->
<form id="my-form" class="flex flex-col items-center gap-(--spacing-ui-gap)">
  <div
    id="my-form-file-upload"
    class="file-upload file-upload-js"
    data-accept="image/*"
    data-max-files="5"
    data-name="image"
    data-on-file-accept="preview-image"
  >
    <div data-part="root">
      <label data-part="label">Upload File</label>
      <input data-part="hidden-input" />
      <div data-part="dropzone">
        <span>Drag your file(s) here</span>
      </div>
      <button data-part="trigger">Choose file(s)</button>
    </div>
  </div>
  <div data-part="form-previews"></div>
  <button class="button button--accent" type="submit">Submit</button>
</form>
<div id="result"></div>
```

```ts
const fileUploadEl = document.getElementById("my-form-file-upload");
fileUploadEl?.addEventListener("preview-image", (event) => {
  const files = (event as CustomEvent).detail.files as File[];
  const previewContainer = document.querySelector(
    '[data-part="form-previews"]',
  );
  if (!files || files.length === 0 || !previewContainer) return;
  previewContainer.innerHTML = "";
  for (const file of files) {
    const previewBlock = document.createElement("div");
    previewBlock.setAttribute("data-part", "form-preview");
    const imageDiv = document.createElement("div");
    imageDiv.setAttribute("data-part", "image");
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement("img");
      img.src = e.target?.result as string;
      img.alt = file.name;
      img.style.maxWidth = "200px";
      imageDiv.appendChild(img);
      const urlText = document.createElement("div");
      urlText.setAttribute("data-part", "url");
      urlText.textContent = img.src;
      previewBlock.appendChild(urlText);
    };
    reader.readAsDataURL(file);
    const nameDiv = document.createElement("div");
    nameDiv.setAttribute("data-part", "name");
    nameDiv.textContent = file.name;
    const sizeDiv = document.createElement("div");
    sizeDiv.setAttribute("data-part", "size");
    sizeDiv.textContent = `${(file.size / 1024).toFixed(1)} KB`;
    previewBlock.appendChild(imageDiv);
    previewBlock.appendChild(nameDiv);
    previewBlock.appendChild(sizeDiv);
    previewContainer.appendChild(previewBlock);
  }
});

const formImage = document.getElementById("my-form") as HTMLFormElement | null;
const resultDiv = document.getElementById("result") as HTMLDivElement | null;
formImage?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!formImage) return;
  const formData = new FormData(formImage);
  console.log("FormData entries:");
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }
  const file = formData.get("image") as File | null;
  if (!file) {
    if (resultDiv) resultDiv.textContent = "⚠️ No file selected.";
    return;
  }
  if (resultDiv) {
    resultDiv.textContent = `✅ File submitted: ${file.name}`;
  }
});
```

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

1. Import the component

```ts
import "@corex-ui/static/components/file-upload";
```

This will automatically initialize all elements with `class="file-upload-js"` and add the necessary interaction behavior.

2. Add styling

The component is **unstyled by default** for maximum customization flexibility.

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/file-upload.css";
```

These styles will be applied to all elements with the `file-upload` class.
