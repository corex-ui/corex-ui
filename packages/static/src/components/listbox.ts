import * as listbox from "@zag-js/listbox";
import type { Direction, Orientation } from "@zag-js/types";
import {
  Component,
  VanillaMachine,
  generateId,
  normalizeProps,
  renderPart,
  getString,
  getStringList,
  getNumber,
  getBoolean,
} from "../lib";

interface ListboxItem {
  value: string;
  label?: string;
  group?: string;
  disabled?: boolean;
}

interface Group {
  value: string;
  label?: string;
}

function flattenJsonItems(data: any, parentGroup?: string): ListboxItem[] {
  if (!data) return [];
  const items: ListboxItem[] = [];

  if (data.children && Array.isArray(data.children)) {
    data.children.forEach((child: any) => {
      items.push(...flattenJsonItems(child, data.name || parentGroup));
    });
  } else {
    // leaf node = actual item
    items.push({
      value: data.id,
      label: data.name,
      group: parentGroup,
      disabled: data.disabled,
    });
  }

  return items;
}

function loadJsonItems(path: string): ListboxItem[] {
  try {
    const script = document.querySelector(
      `script[type="application/json"][data-listbox="${path}"]`,
    );
    if (!script) throw new Error(`No inline JSON script found for ${path}`);
    const data = JSON.parse(script.textContent || "{}");
    return flattenJsonItems(data);
  } catch (e) {
    console.error("Failed to load JSON items:", e);
    return [];
  }
}

function getDomItems(rootEl: HTMLElement): ListboxItem[] {
  const items: ListboxItem[] = [];
  rootEl.querySelectorAll('[data-part="item"]').forEach((el) => {
    const value = el.getAttribute("data-value") || "";
    const label = el.getAttribute("data-label") || "";
    const groupEl = el.closest('[data-part="item-group"]');
    const group = groupEl?.getAttribute("data-id") || undefined;
    const disabled = getBoolean(el as HTMLElement, "disabled");
    items.push({ value, label, group, disabled });
  });
  return items;
}

function getDomGroups(rootEl: HTMLElement): Group[] {
  const groups: Group[] = [];
  rootEl.querySelectorAll('[data-part="item-group"]').forEach((el) => {
    const value = el.getAttribute("data-id") || "";
    groups.push({ value });
  });
  return groups;
}

export class Listbox extends Component<listbox.Props, listbox.Api> {
  collection!: listbox.ListCollection<ListboxItem>;
  items: ListboxItem[] = [];
  groups: Group[] = [];
  private domInitialized = false;

  getCollection(items: ListboxItem[], hasGroups: boolean = false) {
    if (hasGroups) {
      return listbox.collection({
        items,
        itemToValue: (item) => item.value,
        itemToString: (item) => item.label || item.value,
        groupBy: (item) => item.group || "Default",
      });
    }
    return listbox.collection({
      items,
      itemToValue: (item) => item.value,
      itemToString: (item) => item.label || item.value,
    });
  }

  initMachine(props: listbox.Props): VanillaMachine<any> {
    return new VanillaMachine(listbox.machine, props);
  }

  initApi(): listbox.Api {
    return listbox.connect(this.machine.service, normalizeProps);
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
    const noIcon = getBoolean(this.el, "noIcon");

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

    this.groups.forEach((g) => {
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

      const textEl = document.createElement("span");
      textEl.setAttribute("data-part", "item-text");
      textEl.setAttribute("data-value", item.value);
      textEl.textContent = item.label || item.value;

      itemEl.appendChild(textEl);

      if (!noIcon) {
        const indicatorEl = document.createElement("span");
        indicatorEl.setAttribute("data-part", "item-indicator");
        indicatorEl.setAttribute("data-value", item.value);
        indicatorEl.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        `;
        itemEl.appendChild(indicatorEl);
      }

      if (item.group && groupMap[item.group]) {
        groupMap[item.group].appendChild(itemEl);
      } else {
        contentEl.appendChild(itemEl);
      }
    });
  }
  render() {
    const isJson = getString(this.el, "json") !== undefined;
    if (isJson && !this.domInitialized) {
      this.renderJsonDom();
      this.domInitialized = true;
    }

    const parts = ["root", "label", "content"];
    for (const part of parts) renderPart(this.el, part, this.api);

    const itemParts = ["item", "item-text", "item-indicator"];
    for (const part of itemParts) {
      renderPart(this.el, part, this.api, {
        item: (el: HTMLElement) => {
          const value = el.getAttribute("data-value");
          const item = this.items.find((i) => i.value === value);
          if (!item) {
            console.warn(`[Listbox] No matching item for value: ${value}`);
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
}

export function initializeListbox(
  doc: HTMLElement | Document = document,
): void {
  doc.querySelectorAll<HTMLElement>(".listbox-js").forEach((rootEl) => {
    const groupElements = rootEl.querySelectorAll<HTMLElement>(
      '[data-part="item-group"]',
    );
    groupElements.forEach((groupEl, index) => {
      let groupId = groupEl.getAttribute("data-id");
      if (!groupId) {
        groupId = generateId(groupEl, `listbox-group-${index}`);
        groupEl.setAttribute("data-id", groupId);
      }

      const labelEl = groupEl.querySelector<HTMLElement>(
        '[data-part="item-group-label"]',
      );

      if (labelEl && !labelEl.getAttribute("data-id")) {
        labelEl.setAttribute("data-id", groupId);
      }
    });

    const itemElements =
      rootEl.querySelectorAll<HTMLElement>('[data-part="item"]');
    itemElements.forEach((itemEl, index) => {
      let value = getString(itemEl, "value");
      if (!value) {
        value = generateId(itemEl, `listbox-item-${index}`);
        itemEl.setAttribute("data-value", value);
      }

      const textEl = itemEl.querySelector<HTMLElement>(
        '[data-part="item-text"]',
      );
      if (textEl && !textEl.getAttribute("data-value")) {
        textEl.setAttribute("data-value", value);
      }

      const indicatorEl = itemEl.querySelector<HTMLElement>(
        '[data-part="item-indicator"]',
      );
      if (indicatorEl && !indicatorEl.getAttribute("data-value")) {
        indicatorEl.setAttribute("data-value", value);
      }
    });

    const jsonPath = getString(rootEl, "json");
    const items: ListboxItem[] = jsonPath
      ? loadJsonItems(jsonPath)
      : getDomItems(rootEl);

    const groups = getDomGroups(rootEl);
    const hasGroups = groups.length > 0 || items.some((i) => i.group);

    const columnCount = getNumber(rootEl, "columnCount");
    const collection =
      columnCount && columnCount > 1
        ? listbox.gridCollection<ListboxItem>({
            items,
            itemToValue: (item) => item.value,
            columnCount,
            ...(hasGroups && { groupBy: (item) => item.group || "Default" }),
          })
        : hasGroups
          ? listbox.collection({
              items,
              itemToValue: (item) => item.value,
              groupBy: (item) => item.group || "Default",
            })
          : listbox.collection({
              items,
              itemToValue: (item) => item.value,
            });

    const directions = ["ltr", "rtl"] as const;
    const orientations = ["horizontal", "vertical"] as const;
    const selectionModes = ["single", "multiple", "extended"] as const;

    const listboxComponent = new Listbox(rootEl, {
      id: generateId(rootEl, "listbox"),
      collection,
      dir: getString<Direction>(rootEl, "dir", directions),
      disabled: getBoolean(rootEl, "disabled"),
      disallowSelectAll: getBoolean(rootEl, "disallowSelectAll"),
      value: getStringList(rootEl, "value"),
      defaultValue: getStringList(rootEl, "defaultValue"),
      defaultHighlightedValue: getString(rootEl, "defaultHighlightedValue"),
      highlightedValue: getString(rootEl, "highlightedValue"),
      loopFocus: getBoolean(rootEl, "loopFocus"),
      typeahead: getBoolean(rootEl, "typeahead"),
      deselectable: getBoolean(rootEl, "deselectable"),
      orientation: getString<Orientation>(rootEl, "orientation", orientations),
      selectionMode: getString(rootEl, "selectionMode", selectionModes),
      selectOnHighlight: getBoolean(rootEl, "selectOnHighlight"),
      onSelect(details) {
        const eventName = getString(rootEl, "onSelect");
        if (eventName)
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
      },
      onHighlightChange(details) {
        const eventName = getString(rootEl, "onHighlightChange");
        if (eventName)
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
      },
      onValueChange(details) {
        const eventName = getString(rootEl, "onValueChange");
        if (eventName)
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
      },
    });

    listboxComponent.collection = collection;
    listboxComponent.items = items;
    listboxComponent.groups = groups;
    listboxComponent.init();
  });
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeListbox(document),
    );
  } else {
    initializeListbox(document);
  }
}
