import * as select from "@zag-js/select";
import type { Direction } from "@zag-js/types";
import type { ListCollection } from "@zag-js/collection";
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

interface SelectItem {
  value: string;
  label?: string;
  group?: string;
  disabled?: boolean;
}

interface Group {
  value: string;
  label?: string;
}

function flattenJsonItems(data: any, parentGroup?: string): SelectItem[] {
  if (!data) return [];
  const items: SelectItem[] = [];

  if (data.children && Array.isArray(data.children)) {
    data.children.forEach((child: any) => {
      items.push(...flattenJsonItems(child, data.name || parentGroup));
    });
  } else {
    items.push({
      value: data.id,
      label: data.name,
      group: parentGroup ?? undefined,
      disabled: data.disabled,
    });
  }

  return items;
}

function loadJsonItems(path: string): SelectItem[] {
  try {
    const script = document.querySelector(
      `script[type="application/json"][data-select="${path}"]`,
    );
    if (!script) throw new Error(`No inline JSON script found for ${path}`);
    const data = JSON.parse(script.textContent || "{}");
    return flattenJsonItems(data);
  } catch (e) {
    console.error("Failed to load JSON items:", e);
    return [];
  }
}

function getDomGroups(rootEl: HTMLElement): Group[] {
  const groups: Group[] = [];
  rootEl.querySelectorAll('[data-part="item-group"]').forEach((el) => {
    const value = el.getAttribute("data-id") || "";
    groups.push({ value });
  });
  return groups;
}

export class Select extends Component<select.Props, select.Api> {
  collection!: ListCollection<SelectItem>;
  items: SelectItem[] = [];
  groups: Group[] = [];
  private domInitialized = false;

  constructor(el: HTMLElement, props: select.Props) {
    super(el, props);
  }

  setItems(items: SelectItem[]) {
    this.items = items;
  }

  getCollection(
    items: SelectItem[],
    hasGroups: boolean = false,
  ): ListCollection<SelectItem> {
    if (hasGroups) {
      return select.collection({
        items,
        itemToValue: (item) => item.value,
        itemToString: (item) => item.label || item.value,
        groupBy: (item) => item.group || "Default",
      });
    }
    return select.collection({
      items,
      itemToValue: (item) => item.value,
      itemToString: (item) => item.label || item.value,
    });
  }

  initMachine(props: select.Props): VanillaMachine<any> {
    return new VanillaMachine(select.machine, props);
  }

  initApi(): select.Api {
    return select.connect(this.machine.service, normalizeProps);
  }

  private renderJsonDom() {
    const rootEl = this.el;
    if (!rootEl) return;

    let contentEl = rootEl.querySelector<HTMLElement>('[data-part="content"]');
    if (!contentEl) {
      contentEl = document.createElement("div");
      contentEl.setAttribute("data-part", "content");
      rootEl.appendChild(contentEl);
    } else {
      contentEl.innerHTML = "";
    }

    const groupMap: Record<string, HTMLElement> = {};

    if (this.groups.length === 0) {
      const uniqueGroups = new Set<string>();
      this.items.forEach((item) => {
        if (item.group) uniqueGroups.add(item.group);
      });
      this.groups = Array.from(uniqueGroups).map((value) => ({
        value,
        label: value,
      }));
    }

    const groupsWithItems = new Set<string>();
    this.items.forEach((item) => {
      if (item.group) groupsWithItems.add(item.group);
    });

    this.groups.forEach((g) => {
      if (!groupsWithItems.has(g.value)) return;

      const groupEl = document.createElement("div");
      groupEl.setAttribute("data-part", "item-group");
      groupEl.setAttribute("data-id", g.value);

      const labelEl = document.createElement("div");
      labelEl.setAttribute("data-part", "item-group-label");
      labelEl.setAttribute("data-id", g.value);
      labelEl.textContent = g.label || g.value;

      contentEl.appendChild(labelEl);
      contentEl.appendChild(groupEl);

      groupMap[g.value] = groupEl;
    });

    this.items.forEach((item) => {
      const itemEl = document.createElement("div");
      itemEl.setAttribute("data-part", "item");
      itemEl.setAttribute("data-value", item.value);
      itemEl.setAttribute("data-label", item.label || item.value);
      if (item.disabled) itemEl.setAttribute("data-disabled", "true");
      itemEl.textContent = item.label || item.value;

      if (item.group && groupMap[item.group]) {
        groupMap[item.group].appendChild(itemEl);
      } else {
        contentEl.appendChild(itemEl);
      }
    });
  }

  private renderDomItems() {
    const contentEl = this.el.querySelector('[data-part="content"]');
    if (!contentEl) return;

    const allDomItems = Array.from(
      contentEl.querySelectorAll('[data-part="item"]'),
    ) as HTMLElement[];

    const visibleGroups = new Set<string>();

    allDomItems.forEach((el) => {
      const value = el.getAttribute("data-value");
      const match = this.items.find((item) => item.value === value);
      if (match) {
        el.style.display = "";
        const groupEl = el.closest(
          '[data-part="item-group"]',
        ) as HTMLElement | null;
        if (groupEl) {
          const groupId = groupEl.getAttribute("data-id");
          if (groupId) visibleGroups.add(groupId);
        }
      } else {
        el.style.display = "none";
      }
    });

    const allGroupLabels = Array.from(
      contentEl.querySelectorAll('[data-part="item-group-label"]'),
    ) as HTMLElement[];

    allGroupLabels.forEach((labelEl) => {
      const groupId = labelEl.getAttribute("data-id");
      if (groupId && visibleGroups.has(groupId)) {
        labelEl.style.display = "";
      } else {
        labelEl.style.display = "none";
      }
    });

    const allGroups = Array.from(
      contentEl.querySelectorAll('[data-part="item-group"]'),
    ) as HTMLElement[];

    allGroups.forEach((groupEl) => {
      const groupId = groupEl.getAttribute("data-id");
      if (groupId && visibleGroups.has(groupId)) {
        groupEl.style.display = "";
      } else {
        groupEl.style.display = "none";
      }
    });
  }

  renderHiddenSelect() {
    const control = this.el.querySelector<HTMLElement>('[data-part="control"]');
    if (!control) return;
    let hiddenSelect = control.querySelector<HTMLSelectElement>(
      '[data-part="hidden-select"]',
    );
    if (!hiddenSelect) {
      hiddenSelect = document.createElement("select");
      hiddenSelect.setAttribute("data-part", "hidden-select");
      control.appendChild(hiddenSelect);
    }
    hiddenSelect.innerHTML = "";
    for (const item of this.items) {
      const option = document.createElement("option");
      option.value = item.value;
      option.textContent = item.label || item.value;
      if (this.api.value.includes(item.value)) {
        option.selected = true;
      }
      hiddenSelect.appendChild(option);
    }
  }

  render() {
    const isJson = getString(this.el, "json") !== undefined;
    if (isJson && !this.domInitialized) {
      this.renderJsonDom();
      this.domInitialized = true;
    } else if (!isJson) {
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

    const itemParts = ["item"];
    for (const part of itemParts) {
      renderPart(this.el, part, this.api, {
        item: (el: HTMLElement) => {
          const value = el.getAttribute("data-value");
          const item = this.items.find((i) => i.value === value);
          if (!item) {
            console.warn(`[Select] No matching item for value: ${value}`);
            return undefined;
          }
          return {
            ...item,
            label: item.label || el.getAttribute("data-label") || item.value,
            disabled: getBoolean(el, "disabled") || item.disabled,
          };
        },
      });
    }

    renderPart(this.el, "item-group", this.api, {
      group: (el: HTMLElement) => {
        const id = el.getAttribute("data-id");
        const group = this.groups.find((g) => g.value === id);
        return group;
      },
      id: (el: HTMLElement) => el.getAttribute("data-id"),
    });

    renderPart(this.el, "item-group-label", this.api, {
      group: (el: HTMLElement) => {
        const id = el.getAttribute("data-id");
        return this.groups.find((g) => g.value === id);
      },
      htmlFor: (el: HTMLElement) => el.getAttribute("data-id"),
    });
  }

  private updateTriggerText() {
    const trigger = this.el.querySelector(
      '[data-part="trigger"]',
    ) as HTMLElement;
    if (!trigger) return;
    Array.from(trigger.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        trigger.removeChild(node);
      }
    });
    const selectedItems = this.items.filter((item) =>
      this.api.value.includes(item.value),
    );
    const displayText =
      selectedItems.length > 0
        ? selectedItems.map((item) => item.label || item.value).join(", ")
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
    // Initialize group elements with data-id
    const groupElements = rootEl.querySelectorAll<HTMLElement>(
      '[data-part="item-group"]',
    );
    groupElements.forEach((groupEl, index) => {
      const groupId =
        getString(groupEl, "id") ??
        generateId(groupEl, `select-group-${index}`);
      groupEl.setAttribute("data-id", groupId);

      const labelEl = groupEl.querySelector<HTMLElement>(
        '[data-part="item-group-label"]',
      );
      if (labelEl) labelEl.setAttribute("data-id", groupId);
    });

    // Initialize item elements with data-value
    const itemElements =
      rootEl.querySelectorAll<HTMLElement>('[data-part="item"]');
    itemElements.forEach((itemEl, index) => {
      const value =
        getString(itemEl, "value") ??
        generateId(itemEl, `select-item-${index}`);
      itemEl.setAttribute("data-value", value);

      if (!itemEl.hasAttribute("data-label")) {
        const label = itemEl.textContent?.trim() || value;
        itemEl.setAttribute("data-label", label);
      }
    });

    // Load items
    const jsonPath = getString(rootEl, "json");
    const items: SelectItem[] = jsonPath
      ? loadJsonItems(jsonPath)
      : Array.from(itemElements).map((itemEl) => {
          const value = getString(itemEl, "value")!;
          const label =
            itemEl.getAttribute("data-label") ||
            itemEl.textContent?.trim() ||
            value;
          const groupEl = itemEl.closest(
            '[data-part="item-group"]',
          ) as HTMLElement | null;
          const group = groupEl ? getString(groupEl, "id") : undefined;
          const disabled = getBoolean(itemEl, "disabled");
          return { value, label, group, disabled };
        });

    const groups = getDomGroups(rootEl);
    const hasGroups = groups.length > 0 || items.some((i) => i.group);

    const collection = hasGroups
      ? select.collection({
          items,
          itemToValue: (item) => item.value,
          itemToString: (item) => item.label || item.value,
          groupBy: (item) => item.group || "Default",
        })
      : select.collection({
          items,
          itemToValue: (item) => item.value,
          itemToString: (item) => item.label || item.value,
        });

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

    const selectComponent = new Select(rootEl, {
      id: generateId(rootEl, "select"),
      collection,
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

    selectComponent.collection = collection;
    selectComponent.setItems(items);
    selectComponent.groups = groups;
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
