---
title: Code
description: A pure HTML and vanilla JS implementation of PrismJS
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

# Code

> A pure HTML and vanilla JS implementation of [PrismJS](https://prismjs.com/)

Prism is a lightweight, extensible syntax highlighter

---

## Anatomy

The Code component can be configured as a code block or a inline code.

The code block must wrapped in a `pre` tag

```html
<!-- render:preview -->
<code data-lang="html" class="code-js"
  >&lt;button class=&quot;button&quot;&gt;Text&lt;&#47;button&gt;
</code>
<pre>
<code  data-lang="html" class="code-js">&lt;button class=&quot;button&quot;&gt;Text&lt;&#47;button&gt;
</code>
</pre>
```

---

## Data attributes

Each code can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<pre>
<code data-lang="bash" class="code-js">npm install @corex-ui/static</code>
</pre>
<pre>
<code data-lang="js" class="code-js">import "@corex-ui/static";</code>
</pre>
<pre>
<code data-lang="ts" class="code-js">import "@corex-ui/static";</code>
</pre>
<pre>
<code data-lang="css" class="code-js">@import "@corex-ui/static-css";</code>
</pre>
<pre>
<code data-lang="html" class="code-js">&lt;button class="button"&gt;Text&lt;/button&gt;</code>
</pre>
```

**data-lang**
Type: `string`
Description: The language code used for code highlighting. Default to "html"

---

## Custom Languages

By default the following languages are available

`html`, `js`, `ts`, `css`, `markup`, `bash`, `shell-session`

To add more languages you will need to install and import to required languages

```bash
pnpm install prismjs @types/prismjs
```

```ts
import "prismjs/components/prism-go";
import "prismjs/components/prism-halm";
```

---

## Modifiers

Code block support modifier classes that control their appearance.  
You can combine multiple modifiers on the same code block.

The default modifier is applied automatically, so you don’t need to include it explicitly.

| Modifier      | Description                                 |
| ------------- | ------------------------------------------- |
| [Size](#size) | Adjusts the overall size of the code block. |

> You may have noticed the double dash before the modifier name — this follows the BEM (Block Element Modifier) naming convention

### Size

Use `class="code--{size}"` to set the size of a code.

Available options:  
**sm**, **inherit**(default), **md**, **lg**, **xl**

```html
<!-- render:preview -->
<div>
  <code data-lang="css" class="code-js code--sm"
    >@import "@corex-ui/static-css";</code
  >
</div>
<div>
  <code data-lang="css" class="code-js">@import "@corex-ui/static-css";</code>
</div>
<div>
  <code data-lang="css" class="code-js code--md"
    >@import "@corex-ui/static-css";</code
  >
</div>
<div>
  <code data-lang="css" class="code-js code--lg"
    >@import "@corex-ui/static-css";</code
  >
</div>
<div>
  <code data-lang="css" class="code-js code--xl"
    >@import "@corex-ui/static-css";</code
  >
</div>
<div>
  <pre class="code--sm">
<code data-lang="css" class="code-js">@import "@corex-ui/static-css";
    @import "@tailwindcss";
</code>
</pre>
</div>
<div>
  <pre>
<code data-lang="css" class="code-js">@import "@corex-ui/static-css";
    @import "@tailwindcss";
</code>
</pre>
</div>
<div>
  <pre>
<code data-lang="css" class="code-js code--md">@import "@corex-ui/static-css";
    @import "@tailwindcss";
</code>
</pre>
</div>
<div>
  <pre class="code--lg">
<code data-lang="css" class="code-js">@import "@corex-ui/static-css";
    @import "@tailwindcss";
</code>
</pre>
</div>
<div>
  <pre class="code--xl">
<code data-lang="css" class="code-js">@import "@corex-ui/static-css";
    @import "@tailwindcss";
</code>
</pre>
</div>
```
