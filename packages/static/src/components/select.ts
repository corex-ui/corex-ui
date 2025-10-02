import * as select from "@zag-js/select";
import type { Direction } from "@zag-js/types";
import {
  Component,
  VanillaMachine,
  generateId,
  normalizeProps,
  renderPart,
  getString,
  getBoolean,
  getNumber,
  getStringList,
  arraysEqualUnordered,
} from "../lib";

type Item = { label: string; value: string };

function loadJsonItems(path: string): Item[] {
  try {
    const script = document.querySelector(
      `script[type="application/json"][data-select="${path}"]`,
    );
    if (!script) throw new Error(`No inline JSON script found for ${path}`);
    return JSON.parse(script.textContent || "[]");
  } catch (e) {
    console.error("Failed to load JSON items:", e);
    return [];
  }
}

function getDomItems(rootEl: HTMLElement): Item[] {
  const items: Item[] = [];
  rootEl.querySelectorAll('[data-part="item"]').forEach((el) => {
    const label = el.getAttribute("data-label") || el.textContent?.trim() || "";
    const value = el.getAttribute("data-value") || "";
    items.push({ label, value });
  });
  return items;
}

export class Select extends Component<select.Props, select.Api> {
  private items: Item[] = [];
  collection!: ReturnType<typeof select.collection<Item>>;

  constructor(el: HTMLElement, props: select.Props) {
    super(el, props);
  }

  setItems(items: Item[]) {
    this.items = items;
  }

  initMachine(props: select.Props): VanillaMachine<any> {
    return new VanillaMachine(select.machine, props);
  }

  initApi(): select.Api {
    return select.connect(this.machine.service, normalizeProps);
  }

  renderOptions() {
    const contentEl = this.el.querySelector('[data-part="content"]');
    if (!contentEl) return;

    // Clear content and rebuild from JSON items
    contentEl.innerHTML = "";
    for (const item of this.items) {
      const li = document.createElement("li");
      li.setAttribute("data-part", "item");
      li.setAttribute("data-label", item.label);
      li.setAttribute("data-value", item.value);
      li.textContent = item.label;

      contentEl.appendChild(li);
      renderPart(li, "item", this.api, { item });
    }
  }

  renderDomItems() {
    const allDomItems = Array.from(
      this.el.querySelectorAll('[data-part="item"]'),
    ) as HTMLElement[];

    allDomItems.forEach((el) => {
      const value = el.getAttribute("data-value");
      const match = this.items.find((item) => item.value === value);
      if (match) {
        el.style.display = "";
        renderPart(el, "item", this.api, { item: match });
      } else {
        el.style.display = "none";
      }
    });
  }
  renderHiddenSelect() {
    const control = this.el.querySelector<HTMLElement>('[data-part="control"]');
    if (!control) return;

    // Look for existing hidden select
    let hiddenSelect = control.querySelector<HTMLSelectElement>(
      '[data-part="hidden-select"]',
    );

    // Create it if missing
    if (!hiddenSelect) {
      hiddenSelect = document.createElement("select");
      hiddenSelect.setAttribute("data-part", "hidden-select");
      control.appendChild(hiddenSelect);
    }

    // Clear existing options
    hiddenSelect.innerHTML = "";

    for (const item of this.items) {
      const option = document.createElement("option");
      option.value = item.value;
      option.textContent = item.label;

      // ✅ mark as selected if the value is currently in api.value
      if (this.api.value.includes(item.value)) {
        option.selected = true;
      }

      hiddenSelect.appendChild(option);
    }
  }

  render() {
    // Render static parts

    // Detect JSON mode
    const jsonPath = getString(this.el, "json");
    if (jsonPath !== undefined) {
      this.renderOptions();
    } else {
      this.renderDomItems();
    }
    this.renderHiddenSelect();

    if (!getString(this.el, "noTriggerUpdate")) {
      this.updateTriggerText();      
    }
    const parts = [
      "root",
      "label",
      "control",
      "trigger",
      "positioner",
      "content",
      "clear-trigger",
      "list",
      "hidden-select",
    ];
    for (const part of parts) {
      renderPart(this.el, part, this.api);
    }
  }

  private updateTriggerText() {
    const trigger = this.el.querySelector(
      '[data-part="trigger"]',
    ) as HTMLElement;
    if (!trigger) return;

    // Remove existing text nodes
    Array.from(trigger.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        trigger.removeChild(node);
      }
    });

    // Add current selection text
    const selectedItems = this.items.filter((item) =>
      this.api.value.includes(item.value),
    );
    const displayText =
      selectedItems.length > 0
        ? selectedItems.map((item) => item.label).join(", ")
        : getString(this.el, "placeholder") || "Select";

    const textNode = document.createTextNode(displayText);
    const firstChild = trigger.firstElementChild;
    if (firstChild) {
      trigger.insertBefore(textNode, firstChild);
    } else {
      trigger.appendChild(textNode);
    }
  }
}

export function initializeSelect(doc: HTMLElement | Document = document): void {
  doc.querySelectorAll<HTMLElement>(".select-js").forEach((rootEl) => {
    // Load items
    let items: Item[];
    const jsonPath = getString(rootEl, "json");
    if (jsonPath !== undefined) {
      items = loadJsonItems(jsonPath);
    } else {
      items = getDomItems(rootEl);
    }

    // Create collection first
    const collection = select.collection({
      items,
      itemToValue: (item) => item.value,
      itemToString: (item) => item.label,
    });

    // Define allowed values
    const directions = ["ltr", "rtl"] as const;
    const placements = [
      "top",
      "right",
      "bottom",
      "left",
      "top-start",
      "top-end",
      "right-start",
      "right-end",
      "bottom-start",
      "bottom-end",
      "left-start",
      "left-end",
    ] as const;
    const strategies = ["absolute", "fixed"] as const;

    // Create select component
    const selectComponent = new Select(rootEl, {
      id: generateId(rootEl, "select"),
      collection: collection,
      closeOnSelect: getBoolean(rootEl, "closeOnSelect"),
      composite: getBoolean(rootEl, "composite"),
      defaultHighlightedValue: getString(rootEl, "defaultHighlightedValue"),
      defaultOpen: getBoolean(rootEl, "defaultOpen"),
      defaultValue: getStringList(rootEl, "defaultValue"),
      dir: getString<Direction>(rootEl, "dir", directions),
      disabled: getBoolean(rootEl, "disabled"),
      form: getString(rootEl, "form"),
      highlightedValue: getString(rootEl, "highlightedValue"),
      invalid: getBoolean(rootEl, "invalid"),
      loopFocus: getBoolean(rootEl, "loopFocus"),
      multiple: getBoolean(rootEl, "multiple"),
      name: getString(rootEl, "name"),
      readOnly: getBoolean(rootEl, "readOnly"),
      required: getBoolean(rootEl, "required"),
      open: getBoolean(rootEl, "open"),
      value: getStringList(rootEl, "value"),
      positioning: {
        hideWhenDetached: getBoolean(rootEl, "hideWhenDetached"),
        placement: getString(rootEl, "placement", placements),
        strategy: getString(rootEl, "strategy", strategies),
        flip: getBoolean(rootEl, "flip"),
        gutter: getNumber(rootEl, "gutter"),
        arrowPadding: getNumber(rootEl, "arrowPadding"),
        overflowPadding: getNumber(rootEl, "overflowPadding"),
        offset: (() => {
          const mainAxis = getNumber(rootEl, "offsetMainAxis");
          const crossAxis = getNumber(rootEl, "offsetCrossAxis");
          if (mainAxis !== undefined || crossAxis !== undefined) {
            return { mainAxis, crossAxis };
          }
          return undefined;
        })(),
        sameWidth: getBoolean(rootEl, "sameWidth") || true,
        overlap: getBoolean(rootEl, "overlap"),
        fitViewport: getBoolean(rootEl, "fitViewport"),
        slide: getBoolean(rootEl, "slide"),
      },
      // Event handlers
      onValueChange(details) {
        const eventName = getString(rootEl, "onValueChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onOpenChange(details) {
        const eventName = getString(rootEl, "onOpenChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onHighlightChange(details) {
        const eventName = getString(rootEl, "onHighlightChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onFocusOutside(event) {
        const eventName = getString(rootEl, "onFocusOutside");
        if (eventName) {
          rootEl.dispatchEvent(
            new CustomEvent(eventName, { detail: event.detail }),
          );
        }
      },
      onInteractOutside(event) {
        const eventName = getString(rootEl, "onInteractOutside");
        if (eventName) {
          rootEl.dispatchEvent(
            new CustomEvent(eventName, { detail: event.detail }),
          );
        }
      },
      onPointerDownOutside(event) {
        const eventName = getString(rootEl, "onPointerDownOutside");
        if (eventName) {
          rootEl.dispatchEvent(
            new CustomEvent(eventName, { detail: event.detail }),
          );
        }
      },
      onSelect(details) {
        const eventName = getString(rootEl, "onSelect");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });

    // Set collection and items, then initialize
    selectComponent.collection = collection;
    selectComponent.setItems(items);
    selectComponent.init();
    selectComponent.el.addEventListener("select:set-value", (event) => {
      const { value } = (event as CustomEvent<{ value: string[] }>).detail;
      const current = selectComponent.api.value;
      if (!arraysEqualUnordered(current, value)) {
        selectComponent.api.setValue(value);
      }
    });
  });
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeSelect(document),
    );
  } else {
    initializeSelect(document);
  }
}
