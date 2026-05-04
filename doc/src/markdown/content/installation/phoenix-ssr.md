---
title: Phoenix SSR Installation Guide
description: Corex for Phoenix Framework - Server-Side Rendering with LiveView and Controllers
author: Netoum
date: 2025-08-20
category: Components
tags:
  - User Interface
  - Accessibility
  - Phoenix
  - Elixir
  - LiveView
  - Corex
  - ZagJS
---

# Phoenix SSR Installation Guide

**Corex** for Phoenix is a separate Elixir library that brings accessible, unstyled UI components to the Phoenix Framework. It integrates Zag.js state machines with Phoenix Controllers and LiveView.

This guide points you to the official Phoenix documentation and resources.

---

## Quick Links

- **[Hex documentation](https://hexdocs.pm/corex)** — Full setup, API reference, and installation
- **[Live demo](https://corex.gigalixirapp.com/)** — Interactive component examples
- **[GitHub](https://github.com/corex-ui/corex)** — Source code and contribution

---

## Installation

To add Corex to your Phoenix application, follow the [official installation guide on Hex](https://hexdocs.pm/corex).

**Using the project generator:**

```bash
mix archive.install hex corex_new
mix corex.new my_app
cd my_app
mix deps.get
```

**Existing project:** See [Manual installation](https://hexdocs.pm/corex) in the Hex docs.

---

## What You Get

- **Accessible by default** — Built-in ARIA attributes and keyboard navigation
- **Unstyled components** — Full control over styling
- **Phoenix Controllers and LiveView** — Works in both rendering modes
- **Zag.js state machines** — Type-safe, predictable component behavior

---

## Learn More

For complete documentation, examples, and API details, visit [hexdocs.pm/corex](https://hexdocs.pm/corex).
