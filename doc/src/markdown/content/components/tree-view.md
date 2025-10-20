---
title: Tree View
description: A pure HTML and vanilla JS implementation of Zag JS Tree View
author: Netoum
date: 2025-08-20
category: Components
tags:
  - JavaScript
  - Accessibility
  - Tree View
  - UI Components
  - ZagJS
---

# Tree View

> A pure HTML and vanilla JS implementation of [Zag JS Tree View](https://zagjs.com/components/react/tree-view)

The Tree View component provides a hierarchical view of data, similar to a file system explorer. It allows users to expand and collapse branches, select individual or multiple nodes, and traverse the hierarchy using keyboard navigation.

---

## Anatomy

The Listbox component consists of the following data parts:

`root`, `tree`, `branch`, `branch-control`, `branch-text`, `branch-indicator`, `branch-content`, `branch-indent-guide`, `item`

```html
<!-- render:preview -->
<div class="tree-view-js tree-view">
  <div data-part="root">
    <div data-part="label">Tree View Label</div>
    <div data-part="tree" class="scrollbar scrollbar--sm">
      <div data-part="branch" data-id="branch" data-name="branch">
        <div data-part="branch-control" data-id="branch" data-name="branch">
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
              d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            ></path>
          </svg>
          <span data-part="branch-text" data-id="branch" data-name="branch"
            >Branch</span
          >
          <span
            data-part="branch-indicator"
            data-id="branch"
            data-name="branch"
          >
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
        </div>
        <div data-part="branch-content" data-id="branch" data-name="branch">
          <div
            data-part="branch-indent-guide"
            data-id="branch"
            data-name="branch"
          ></div>
          <div data-part="item" data-id="nested-item" data-name="nested-item">
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            Nested Item
          </div>
          <div data-part="branch" data-id="sub-branch" data-name="sub-branch">
            <div
              data-part="branch-control"
              data-id="sub-branch"
              data-name="sub-branch"
            >
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
                  d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                ></path>
              </svg>
              <span
                data-part="branch-text"
                data-id="sub-branch"
                data-name="sub-branch"
                >Sub Branch</span
              >
              <span
                data-part="branch-indicator"
                data-id="sub-branch"
                data-name="sub-branch"
              >
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
            </div>
            <div
              data-part="branch-content"
              data-id="sub-branch"
              data-name="sub-branch"
            >
              <div
                data-part="branch-indent-guide"
                data-id="sub-branch"
                data-name="sub-branch"
              ></div>
              <div
                data-part="item"
                data-id="sub-nested-item"
                data-name="sub-nested-item"
              >
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
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
                Sub Nested Item
              </div>
              <div
                data-part="branch"
                data-id="nested-sub-branch"
                data-name="nested-sub-branch"
              >
                <div
                  data-part="branch-control"
                  data-id="nested-sub-branch"
                  data-name="nested-sub-branch"
                >
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
                      d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                    ></path>
                  </svg>
                  <span
                    data-part="branch-text"
                    data-id="nested-sub-branch"
                    data-name="nested-sub-branch"
                    >Nested Sub Branch</span
                  >
                  <span
                    data-part="branch-indicator"
                    data-id="nested-sub-branch"
                    data-name="nested-sub-branch"
                  >
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
                </div>
                <div
                  data-part="branch-content"
                  data-id="nested-sub-branch"
                  data-name="nested-sub-branch"
                >
                  <div
                    data-part="branch-indent-guide"
                    data-id="nested-sub-branch"
                    data-name="nested-sub-branch"
                  ></div>
                  <div
                    data-part="item"
                    data-id="nested-sub-nested-item"
                    data-name="nested-sub-nested-item"
                  >
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
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                    Nested Sub Nested Item
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Load from JSON

You can initialize the Tree View component by embedding your JSON data directly in your HTML using a `<script>` tag with `type="application/json"` and a unique `data-tree-view` attribute. Then, reference this JSON in your Tree View container via the corresponding `data-json` attribute.

> **Did you know?**  
> You can use the same JSON format and data as the [Menu Component](/components/menu#load-from-json).  
> This allows you for exapmle to render a navigation as a **Tree View** on mobile and as a **Menu** on desktop.

```html
<script type="application/json" data-tree-view="tree-view-data">
  {
    "id": "root",
    "name": "",
    "children": [
      {
        "id": "menu",
        "name": "Menu",
        "children": [
          { "id": "menu/item", "name": "Item" },
          {
            "id": "submenu",
            "name": "Sub Menu",
            "children": [
              { "id": "menu/submenu/item", "name": "Item" },
              { "id": "layouts/submenu/item-2", "name": "Item" },
              {
                "id": "nestedmenu",
                "name": "Nested  Menu",

                "children": [
                  { "id": "menu/submenu/nestedmenu/item", "name": "Item" },
                  { "id": "menu/submenu/nestedmenu/item-2", "name": "Item" },

                  {
                    "id": "subnested",
                    "name": "Sub Nested",
                    "children": [
                      {
                        "id": "menu/submenu/nestedmenu/subnested/nested-item",
                        "name": "Nested Item"
                      },
                      {
                        "id": "menu/submenu/nestedmenu/subnested/nested-item-2",
                        "name": "Nested Item"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
</script>
```

```html
<!-- render:preview -->
<div class="tree-view-js tree-view" data-json="tree-view-data">
  <div data-part="root">
    <div data-part="label">Tree View Label</div>
    <div data-part="tree" class="scrollbar scrollbar--sm"></div>
  </div>
</div>
```

---

## RTL

RTL support for tree view

```html
<!-- render:preview -->
<div class="tree-view-js tree-view" data-dir="rtl">
  <div data-part="root">
    <div data-part="label">Tree View Label</div>
    <div data-part="tree" class="scrollbar scrollbar--sm">
      <div data-part="branch" data-id="branch" data-name="branch">
        <div data-part="branch-control" data-id="branch" data-name="branch">
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
              d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            ></path>
          </svg>
          <span data-part="branch-text" data-id="branch" data-name="branch"
            >Branch</span
          >
          <span
            data-part="branch-indicator"
            data-id="branch"
            data-name="branch"
          >
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
        </div>
        <div data-part="branch-content" data-id="branch" data-name="branch">
          <div
            data-part="branch-indent-guide"
            data-id="branch"
            data-name="branch"
          ></div>
          <div data-part="item" data-id="nested-item" data-name="nested-item">
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            Nested Item
          </div>
          <div data-part="branch" data-id="sub-branch" data-name="sub-branch">
            <div
              data-part="branch-control"
              data-id="sub-branch"
              data-name="sub-branch"
            >
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
                  d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                ></path>
              </svg>
              <span
                data-part="branch-text"
                data-id="sub-branch"
                data-name="sub-branch"
                >Sub Branch</span
              >
              <span
                data-part="branch-indicator"
                data-id="sub-branch"
                data-name="sub-branch"
              >
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
            </div>
            <div
              data-part="branch-content"
              data-id="sub-branch"
              data-name="sub-branch"
            >
              <div
                data-part="branch-indent-guide"
                data-id="sub-branch"
                data-name="sub-branch"
              ></div>
              <div
                data-part="item"
                data-id="sub-nested-item"
                data-name="sub-nested-item"
              >
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
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
                Sub Nested Item
              </div>
              <div
                data-part="branch"
                data-id="nested-sub-branch"
                data-name="nested-sub-branch"
              >
                <div
                  data-part="branch-control"
                  data-id="nested-sub-branch"
                  data-name="nested-sub-branch"
                >
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
                      d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                    ></path>
                  </svg>
                  <span
                    data-part="branch-text"
                    data-id="nested-sub-branch"
                    data-name="nested-sub-branch"
                    >Nested Sub Branch</span
                  >
                  <span
                    data-part="branch-indicator"
                    data-id="nested-sub-branch"
                    data-name="nested-sub-branch"
                  >
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
                </div>
                <div
                  data-part="branch-content"
                  data-id="nested-sub-branch"
                  data-name="nested-sub-branch"
                >
                  <div
                    data-part="branch-indent-guide"
                    data-id="nested-sub-branch"
                    data-name="nested-sub-branch"
                  ></div>
                  <div
                    data-part="item"
                    data-id="nested-sub-nested-item"
                    data-name="nested-sub-nested-item"
                  >
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
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                    Nested Sub Nested Item
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## Data attributes

Each tree view can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  class="tree-view-js tree-view"
  id="custom-tree-view"
  data-default-expanded-value="branch,sub-branch"
  data-default-selected-value="nested-item, sub-nested-item"
>
  <div data-part="root">
    <div data-part="label">Tree View Label</div>
    <div data-part="tree" class="scrollbar scrollbar--sm">
      <div data-part="branch" data-id="branch" data-name="branch">
        <div data-part="branch-control" data-id="branch" data-name="branch">
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
              d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            ></path>
          </svg>
          <span data-part="branch-text" data-id="branch" data-name="branch"
            >Branch</span
          >
          <span
            data-part="branch-indicator"
            data-id="branch"
            data-name="branch"
          >
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
        </div>
        <div data-part="branch-content" data-id="branch" data-name="branch">
          <div
            data-part="branch-indent-guide"
            data-id="branch"
            data-name="branch"
          ></div>
          <div data-part="item" data-id="nested-item" data-name="nested-item">
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            Nested Item
          </div>
          <div data-part="branch" data-id="sub-branch" data-name="sub-branch">
            <div
              data-part="branch-control"
              data-id="sub-branch"
              data-name="sub-branch"
            >
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
                  d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                ></path>
              </svg>
              <span
                data-part="branch-text"
                data-id="sub-branch"
                data-name="sub-branch"
                >Sub Branch</span
              >
              <span
                data-part="branch-indicator"
                data-id="sub-branch"
                data-name="sub-branch"
              >
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
            </div>
            <div
              data-part="branch-content"
              data-id="sub-branch"
              data-name="sub-branch"
            >
              <div
                data-part="branch-indent-guide"
                data-id="sub-branch"
                data-name="sub-branch"
              ></div>
              <div
                data-part="item"
                data-id="sub-nested-item"
                data-name="sub-nested-item"
              >
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
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
                Sub Nested Item
              </div>
              <div
                data-part="branch"
                data-id="nested-sub-branch"
                data-name="nested-sub-branch"
              >
                <div
                  data-part="branch-control"
                  data-id="nested-sub-branch"
                  data-name="nested-sub-branch"
                >
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
                      d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                    ></path>
                  </svg>
                  <span
                    data-part="branch-text"
                    data-id="nested-sub-branch"
                    data-name="nested-sub-branch"
                    >Nested Sub Branch</span
                  >
                  <span
                    data-part="branch-indicator"
                    data-id="nested-sub-branch"
                    data-name="nested-sub-branch"
                  >
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
                </div>
                <div
                  data-part="branch-content"
                  data-id="nested-sub-branch"
                  data-name="nested-sub-branch"
                >
                  <div
                    data-part="branch-indent-guide"
                    data-id="nested-sub-branch"
                    data-name="nested-sub-branch"
                  ></div>
                  <div
                    data-part="item"
                    data-id="nested-sub-nested-item"
                    data-name="nested-sub-nested-item"
                  >
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
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                    Nested Sub Nested Item
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**id**
Type: `string`
Description: Unique id of the component. Default generated if none is provided.

**data-dir**
Type: `string`
Description: The orientation of the listbox. Can be `ltr` or `rtl`.

**data-default-expanded-value**
Type: `string[]`
Description: The initial expanded node ids when rendered. Use when you don't need to control the expanded node value.

**data-default-selected-value**
Type: `string[]`
Description: The initial selected node value when rendered. Use when you don't need to control the selected node value.

**data-default-focused-value**
Type: `string[]`
Description: The initial focused node value when rendered. Use when you don't need to control the focused node value.

**data-expanded-value**
Type: `string[]`
Description: The controlled expanded node ids

**data-selected-value**
Type: `string[]`
Description: The controlled selected node value

**data-focused-value**
Type: `string[]`
Description: The value of the focused node

**data-expand-on-click**
Type: `boolean`
Description: Whether clicking on a branch should open it or not.

**data-typeahead**
Type: `boolean`
Description: Whether to enable typeahead on the listbox.

---

## Event Callbacks

Each Listbox component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id for the listbox and a event listener for your event name

```ts
document
  .getElementById("my-tree-view")
  ?.addEventListener("my-tree-view-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

```html
<!-- render:preview -->
<div
  class="tree-view-js tree-view"
  id="my-tree-view"
  data-on-selection-change="my-tree-view-event"
>
  <div data-part="root">
    <div data-part="label">Tree View Label</div>
    <div data-part="tree" class="scrollbar scrollbar--sm">
      <div data-part="branch" data-id="branch" data-name="branch">
        <div data-part="branch-control" data-id="branch" data-name="branch">
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
              d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            ></path>
          </svg>
          <span data-part="branch-text" data-id="branch" data-name="branch"
            >Branch</span
          >
          <span
            data-part="branch-indicator"
            data-id="branch"
            data-name="branch"
          >
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
        </div>
        <div data-part="branch-content" data-id="branch" data-name="branch">
          <div
            data-part="branch-indent-guide"
            data-id="branch"
            data-name="branch"
          ></div>
          <div data-part="item" data-id="nested-item" data-name="nested-item">
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            Nested Item
          </div>
          <div data-part="branch" data-id="sub-branch" data-name="sub-branch">
            <div
              data-part="branch-control"
              data-id="sub-branch"
              data-name="sub-branch"
            >
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
                  d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                ></path>
              </svg>
              <span
                data-part="branch-text"
                data-id="sub-branch"
                data-name="sub-branch"
                >Sub Branch</span
              >
              <span
                data-part="branch-indicator"
                data-id="sub-branch"
                data-name="sub-branch"
              >
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
            </div>
            <div
              data-part="branch-content"
              data-id="sub-branch"
              data-name="sub-branch"
            >
              <div
                data-part="branch-indent-guide"
                data-id="sub-branch"
                data-name="sub-branch"
              ></div>
              <div
                data-part="item"
                data-id="sub-nested-item"
                data-name="sub-nested-item"
              >
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
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
                Sub Nested Item
              </div>
              <div
                data-part="branch"
                data-id="nested-sub-branch"
                data-name="nested-sub-branch"
              >
                <div
                  data-part="branch-control"
                  data-id="nested-sub-branch"
                  data-name="nested-sub-branch"
                >
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
                      d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                    ></path>
                  </svg>
                  <span
                    data-part="branch-text"
                    data-id="nested-sub-branch"
                    data-name="nested-sub-branch"
                    >Nested Sub Branch</span
                  >
                  <span
                    data-part="branch-indicator"
                    data-id="nested-sub-branch"
                    data-name="nested-sub-branch"
                  >
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
                </div>
                <div
                  data-part="branch-content"
                  data-id="nested-sub-branch"
                  data-name="nested-sub-branch"
                >
                  <div
                    data-part="branch-indent-guide"
                    data-id="nested-sub-branch"
                    data-name="nested-sub-branch"
                  ></div>
                  <div
                    data-part="item"
                    data-id="nested-sub-nested-item"
                    data-name="nested-sub-nested-item"
                  >
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
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                    Nested Sub Nested Item
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

> Open your browser's console to see the events received when a tree view item is selected

**data-on-selection-change**
Type: `string`
Description: Event name to be send when when the selection changes

**data-on-focus-change**
Type: `string`
Description: Event name to be send when the focused node changes

**data-on-expanded-change**
Type: `string`
Description: Event name to be send when the tree is opened or closed

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

### Static

1. Import the Tree View component

```ts
import "@corex-ui/static/components/tree-view";
```

This will automatically initialize all elements with `class="tree-view-js"` and add the necessary interaction behavior.

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/tree-view.css";
```

Then apply the base class along with any desired modifiers:

```html
<div class="tree-view tree-view-js">
  <div data-part="root"></div>
</div>
```

### Static React

> Experimental! Only works with React static export (eg. Next.js SSG.)

1. Import the Tree View component

```ts
import { TreeView } from '@corex-ui/static/react';
export default function Home() {
  return (
    <TreeView>
      <div data-part="root" />
    </TreeView>
  );
}
```

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/tree-view.css";
```

Then apply the base class along with any desired modifiers:

```html
<TreeView className="tree-view"> {/* content */} </TreeView>
```
