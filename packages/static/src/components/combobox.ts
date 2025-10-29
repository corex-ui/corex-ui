import * as combobox from "@zag-js/combobox";
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
} from "../lib";
import { createFilter } from "@zag-js/i18n-utils";

interface ComboboxItem {
  value: string;
  label?: string;
  group?: string;
  disabled?: boolean;
}

interface Group {
  value: string;
  label?: string;
}

function flattenJsonItems(data: any, parentGroup?: string): ComboboxItem[] {
  if (!data) return [];
  const items: ComboboxItem[] = [];

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

function loadJsonItems(path: string): ComboboxItem[] {
  try {
    const script = document.querySelector(
      `script[type="application/json"][data-combobox="${path}"]`,
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

export class Combobox extends Component<combobox.Props, combobox.Api> {
  userOnInputValueChange?: combobox.Props["onInputValueChange"];
  userOnOpenChange?: combobox.Props["onOpenChange"];

  constructor(el: HTMLElement, props: combobox.Props) {
    super(el, {
      ...props,
      onInputValueChange: undefined,
      onOpenChange: undefined,
    });
    this.userOnInputValueChange = props.onInputValueChange;
    this.userOnOpenChange = props.onOpenChange;
  }

  options: ComboboxItem[] = [];
  allItems: ComboboxItem[] = [];
  groups: Group[] = [];
  private domInitialized = false;

  setItems(items: ComboboxItem[]) {
    this.allItems = items;
    this.options = items;
  }

  getCollection(
    items: ComboboxItem[],
    hasGroups: boolean = false,
  ): ListCollection<ComboboxItem> {
    if (hasGroups) {
      return combobox.collection({
        items,
        itemToValue: (item) => item.value,
        itemToString: (item) => item.label || item.value,
        groupBy: (item) => item.group || "Default",
      });
    }
    return combobox.collection({
      items,
      itemToValue: (item) => item.value,
      itemToString: (item) => item.label || item.value,
    });
  }

  initMachine(props: combobox.Props): VanillaMachine<any> {
    const self = this;
    const hasGroups =
      (this.groups?.length ?? 0) > 0 ||
      ((this.allItems?.length ?? 0) > 0 && this.allItems.some((i) => i.group));

    return new VanillaMachine(combobox.machine, {
      ...props,
      get collection() {
        return self.getCollection(self.options || [], hasGroups);
      },
      onOpenChange(...args: any[]) {
        self.options = self.allItems;
        const isJson = getString(self.el, "json") !== undefined;
        if (isJson) {
          self.renderJsonDom();
        } else {
          self.renderDomItems();
        }
        self.userOnOpenChange?.(args[0]);
      },
      onInputValueChange(...args: any[]) {
        const [details] = args;
        if (!details.inputValue.trim()) {
          self.options = self.allItems;
        } else {
          const filter = createFilter({
            sensitivity: getString(self.el, "sensitivity") || "base",
            locale: getString(self.el, "locale") || "en-US",
          });
          const filtered = self.allItems.filter((item) =>
            filter.contains(item.label || item.value, details.inputValue),
          );
          self.options = filtered.length > 0 ? filtered : self.allItems;
        }
        const isJson = getString(self.el, "json") !== undefined;
        if (isJson) {
          self.renderJsonDom();
        } else {
          self.renderDomItems();
        }
        self.userOnInputValueChange?.(args[0]);
      },
    });
  }

  initApi(): combobox.Api {
    return combobox.connect(this.machine.service, normalizeProps);
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
      this.options.forEach((item) => {
        if (item.group) uniqueGroups.add(item.group);
      });
      this.groups = Array.from(uniqueGroups).map((value) => ({
        value,
        label: value,
      }));
    }

    const groupsWithItems = new Set<string>();
    this.options.forEach((item) => {
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

    this.options.forEach((item) => {
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

  private renderDomItems() {
    const contentEl = this.el.querySelector('[data-part="content"]');
    if (!contentEl) return;

    const allDomItems = Array.from(
      contentEl.querySelectorAll('[data-part="item"]'),
    ) as HTMLElement[];

    const visibleGroups = new Set<string>();

    allDomItems.forEach((el) => {
      const value = el.getAttribute("data-value");
      const match = this.options.find((item) => item.value === value);
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

  render() {
    const isJson = getString(this.el, "json") !== undefined;
    if (isJson && !this.domInitialized) {
      this.renderJsonDom();
      this.domInitialized = true;
    }

    const parts = [
      "root",
      "label",
      "control",
      "input",
      "trigger",
      "positioner",
      "content",
      "clear-trigger",
      "list",
    ];
    for (const part of parts) {
      renderPart(this.el, part, this.api);
    }

    const itemParts = ["item", "item-text", "item-indicator"];
    for (const part of itemParts) {
      renderPart(this.el, part, this.api, {
        item: (el: HTMLElement) => {
          const value = el.getAttribute("data-value");
          const item = this.options.find((i) => i.value === value);
          if (!item) {
            console.warn(`[Combobox] No matching item for value: ${value}`);
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

export function initializeCombobox(
  doc: HTMLElement | Document = document,
): void {
  doc.querySelectorAll<HTMLElement>(".combobox-js").forEach((rootEl) => {
    const groupElements = rootEl.querySelectorAll<HTMLElement>(
      '[data-part="item-group"]',
    );
    groupElements.forEach((groupEl, index) => {
      const groupId =
        getString(groupEl, "id") ??
        generateId(groupEl, `combobox-group-${index}`);
      groupEl.setAttribute("data-id", groupId);

      const labelEl = groupEl.querySelector<HTMLElement>(
        '[data-part="item-group-label"]',
      );
      if (labelEl) labelEl.setAttribute("data-id", groupId);
    });

    const itemElements =
      rootEl.querySelectorAll<HTMLElement>('[data-part="item"]');
    itemElements.forEach((itemEl, index) => {
      const value =
        getString(itemEl, "value") ??
        generateId(itemEl, `combobox-item-${index}`);
      itemEl.setAttribute("data-value", value);

      if (!itemEl.hasAttribute("data-label")) {
        const textEl = itemEl.querySelector<HTMLElement>(
          '[data-part="item-text"]',
        );
        const label = textEl?.textContent?.trim() || value;
        itemEl.setAttribute("data-label", label);
      }

      const textEl = itemEl.querySelector<HTMLElement>(
        '[data-part="item-text"]',
      );
      if (textEl) textEl.setAttribute("data-value", value);

      const indicatorEl = itemEl.querySelector<HTMLElement>(
        '[data-part="item-indicator"]',
      );
      if (indicatorEl) indicatorEl.setAttribute("data-value", value);
    });

    const jsonPath = getString(rootEl, "json");
    const items: ComboboxItem[] = jsonPath
      ? loadJsonItems(jsonPath)
      : Array.from(itemElements).map((itemEl) => {
          const value = getString(itemEl, "value")!;
          const label =
            itemEl.getAttribute("data-label") ||
            itemEl
              .querySelector<HTMLElement>('[data-part="item-text"]')
              ?.textContent?.trim() ||
            value;
          const groupEl = itemEl.closest(
            '[data-part="item-group"]',
          ) as HTMLElement | null;
          const group = groupEl ? getString(groupEl, "id") : undefined;
          const disabled = getBoolean(itemEl, "disabled");
          return { value, label, group, disabled };
        });

    const groups = getDomGroups(rootEl);

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
    const inputBehaviors = ["autohighlight", "autocomplete", "none"] as const;
    const selectionBehaviors = ["replace", "clear", "preserve"] as const;

    const comboboxComponent = new Combobox(rootEl, {
      id: generateId(rootEl, "combobox"),
      placeholder: getString(rootEl, "placeholder"),
      allowCustomValue: getBoolean(rootEl, "allowCustomValue"),
      autoFocus: getBoolean(rootEl, "autoFocus"),
      closeOnSelect: getBoolean(rootEl, "closeOnSelect"),
      composite: getBoolean(rootEl, "composite"),
      defaultHighlightedValue: getString(rootEl, "defaultHighlightedValue"),
      defaultInputValue: getString(rootEl, "defaultInputValue"),
      defaultOpen: getBoolean(rootEl, "defaultOpen"),
      defaultValue: getStringList(rootEl, "defaultValue"),
      dir: getString<Direction>(rootEl, "dir", directions),
      disabled: getBoolean(rootEl, "disabled"),
      disableLayer: getBoolean(rootEl, "disableLayer"),
      form: getString(rootEl, "form"),
      highlightedValue: getString(rootEl, "highlightedValue"),
      inputBehavior: getString(rootEl, "inputBehavior", inputBehaviors),
      inputValue: getString(rootEl, "inputValue"),
      invalid: getBoolean(rootEl, "invalid"),
      loopFocus: getBoolean(rootEl, "loopFocus"),
      multiple: getBoolean(rootEl, "multiple"),
      name: getString(rootEl, "name"),
      readOnly: getBoolean(rootEl, "readOnly"),
      required: getBoolean(rootEl, "required"),
      open: getBoolean(rootEl, "open"),
      openOnChange: getBoolean(rootEl, "openOnChange"),
      openOnClick: getBoolean(rootEl, "openOnClick"),
      openOnKeyPress: getBoolean(rootEl, "openOnKeyPress"),
      value: getStringList(rootEl, "value"),
      selectionBehavior: getString(
        rootEl,
        "selectionBehavior",
        selectionBehaviors,
      ),
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
            return {
              mainAxis: mainAxis,
              crossAxis: crossAxis,
            };
          }
          return undefined;
        })(),
        sameWidth: getBoolean(rootEl, "sameWidth"),
        overlap: getBoolean(rootEl, "overlap"),
        fitViewport: getBoolean(rootEl, "fitViewport"),
        slide: getBoolean(rootEl, "slide"),
      },
      navigate(details: any) {
        const eventName = getString(rootEl, "navigate");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onInputValueChange(details: any) {
        const eventName = getString(rootEl, "onInputValueChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onFocusOutside(event: any) {
        const eventName = getString(rootEl, "onFocusOutside");
        if (eventName) {
          rootEl.dispatchEvent(
            new CustomEvent(eventName, { detail: event.detail }),
          );
        }
      },
      onHighlightChange(details: any) {
        const eventName = getString(rootEl, "onHighlightChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onInteractOutside(event: any) {
        const eventName = getString(rootEl, "onInteractOutside");
        if (eventName) {
          rootEl.dispatchEvent(
            new CustomEvent(eventName, { detail: event.detail }),
          );
        }
      },
      onOpenChange(details: any) {
        const eventName = getString(rootEl, "onOpenChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onPointerDownOutside(event: any) {
        const eventName = getString(rootEl, "onPointerDownOutside");
        if (eventName) {
          rootEl.dispatchEvent(
            new CustomEvent(eventName, { detail: event.detail }),
          );
        }
      },
      onSelect(details: any) {
        const eventName = getString(rootEl, "onSelect");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onValueChange(details: any) {
        const eventName = getString(rootEl, "onValueChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });

    comboboxComponent.setItems(items);
    comboboxComponent.options = items;
    comboboxComponent.groups = groups;
    comboboxComponent.init();
  });
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeCombobox(document),
    );
  } else {
    initializeCombobox(document);
  }
}
