---
title: Tailwind
description: Corex UI Tailwind Guide
author: Netoum
date: 2025-09-26
category: Components
tags:
  - Tailwind
  - Variables
  - Utilities
  - Components
  - Corex
---

# Tailwind Guide

Corex UI leverages Tailwind v4 namespaces extensively to create a modular, scalable, and themeable design system. We use Tailwind v4 theme variables while respecting namespaces, which allows them to behave just like any standard Tailwind variable—examples include h-ui, h-ui-sm, and other namespace-prefixed variables.

By combining these namespaced variables with Tailwind v4 utilities, Corex UI achieves several key benefits:

- Reduced CSS build size – Only the utilities and variables actually used in your components are included.
- Automatic modifiers – Component states and variants can automatically adapt without writing extra CSS.
- Dynamic theming – Themes can be switched or updated on the fly, enabling flexible styling across applications.

This approach ensures that Corex UI remains lightweight, highly maintainable, and fully compatible with standard Tailwind workflows, while giving developers powerful tools for rapid UI development.

See [Tailwind Documentation](https://tailwindcss.com/docs/theme)

---

## Utilities

Corex UI provides a set of **utility classes** built on these variables:

- **Layout utilities** handle flex direction, spacing, width, and alignment.
- **Interactive utilities** manage hover, active, focus, and disabled states for buttons, items, and triggers.
- **Content utilities** style containers with padding, border, radius, background, and typography.
- **Icon utilities** ensure scalable, color-inheriting icons that integrate smoothly with triggers and items.

By referencing CSS variables, these utilities **automatically inherit themes**, reducing the need for additional CSS and enabling **dynamic styling**.

See [Utilities](https://github.com/corex-ui/corex-ui/tree/main/packages/design/src/utilities.css)

---

## Components

Components in Corex UI are built using **Tailwind variables and utilities** for rapid customization:

- All components are fully styled with **layout, spacing, typography, and state utilities**.
- **Item triggers and content areas** automatically reflect hover, active, disabled, and selected states.
- Components are **responsive** and **theme-aware**, adapting seamlessly using the provided semantic tokens
- RTL support and state-driven modifiers ensure **accessibility and internationalization** are maintained.

See [Components](https://github.com/corex-ui/corex-ui/tree/main/packages/design/src/components)

---

## Variables

Corex UI provides a comprehensive set of variables that power the design system.

These are organized by **semantic categories**:

- Color
  Colors define the **visual identity** of the UI, including backgrounds, borders, text, accents, and status indicators. Root, layer, and UI-specific colors ensure components **adapt automatically to themes and modes**, with hover, active, and disabled states included.  
  See the [color tokens](https://github.com/corex-ui/corex-ui/tree/main/packages/design/src/tokens/semantic/color.css) for full definitions.
- Dimension
  Spacing variables provide **consistent padding, gaps, and container sizes** across all components. Responsive breakpoints and multiple scales (UI, mini, micro) enable **flexible layouts** and **adaptive spacing** that adjusts seamlessly across devices.  
  Refer to the [spacing tokens](https://github.com/corex-ui/corex-ui/tree/main/packages/design/src/tokens/semantic/dimension.css) for details.
- Font
  Typography variables control **families, and weights**. They ensure **text consistency** across UI and code elements while allowing scalable, responsive adjustments based on theme or component context.  
  Check the [font tokens](https://github.com/corex-ui/corex-ui/tree/main/packages/design/src/tokens/semantic/font.css) for full references.
- Text
  Typography variables control **font sizes, line heights**. They ensure **text consistency** across UI and code elements while allowing scalable, responsive adjustments based on theme or component context.  
  Check the [text tokens](https://github.com/corex-ui/corex-ui/tree/main/packages/design/src/tokens/semantic/text.css) for full references.
- Effect
  Shadow variables create **depth and hierarchy** for both layer and interactive UI elements. They provide hover and active state variations to maintain visual clarity and component prominence.  
  See [shadow tokens](https://github.com/corex-ui/corex-ui/tree/main/packages/design/src/tokens/semantic/effect.css).

---
