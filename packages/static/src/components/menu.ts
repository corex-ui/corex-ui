import * as menu from "@zag-js/menu";
import type { Direction } from "@zag-js/types";
import {
  Component,
  VanillaMachine,
  spreadProps,
  getString,
  getNumber,
  getBoolean,
  generateId,
  normalizeProps,
  renderPart,
} from "../lib";

export class Menu extends Component<menu.Props, menu.Api> {
  children: Menu[] = [];
  parent?: Menu;
  initMachine(props: menu.Props): VanillaMachine<any> {
    this.machine = new VanillaMachine(menu.machine, props);
    return this.machine;
  }
  initApi(): menu.Api {
    return menu.connect(this.machine.service, normalizeProps);
  }
  setChild(child: Menu) {
    this.api.setChild(child.machine.service);
    if (!this.children.includes(child)) {
      this.children.push(child);
    }
  }
  setParent(parent: Menu) {
    this.api.setParent(parent.machine.service);
    this.parent = parent;
  }
  render() {
    const parts = [
      "trigger",
      "indicator",
      "positioner",
      "content",
      "context-trigger",
      "separator",
    ];
    for (const part of parts) {
      renderPart(this.el, part, this.api);
    }
    const items = ["item", "item-text"];
    for (const item of items) {
      renderPart(this.el, item, this.api, {
        value: "string",
        id: "string",
        child: "string",
      });
    }
    const labels = ["item-group-label"];
    for (const item of labels) {
      renderPart(this.el, item, this.api, {
        htmlFor: (el: any) => el.getAttribute("data-htmlFor"), // explicit getter
      });
    }

    const groups = ["item-group"];
    for (const item of groups) {
      renderPart(this.el, item, this.api, { id: "string" });
    }
  }
  renderSubmenuTriggers() {
    const triggerItems = Array.from(
      this.el.querySelectorAll<HTMLElement>(
        '[data-part="trigger-item"][data-child]',
      ),
    ).filter((el) => el.closest(".menu-js") === this.el);
    for (const triggerEl of triggerItems) {
      const targetMenuId = triggerEl.dataset.child;
      if (!targetMenuId) continue;
      const childMenu = this.children.find(
        (child) => child.el.id === targetMenuId,
      );
      if (!childMenu) continue;
      const indicatorEl = triggerEl.querySelector<HTMLElement>(
        `[data-part="indicator"][data-child="${targetMenuId}"]`,
      );
      const applyProps = () => {
        const triggerProps = this.api.getTriggerItemProps(childMenu.api);
        spreadProps(triggerEl, triggerProps);
        if (indicatorEl) {
          const indicatorProps = childMenu.api.getIndicatorProps();
          spreadProps(indicatorEl, indicatorProps);
        }
      };
      applyProps();
      this.machine.subscribe(applyProps);
      childMenu.machine.subscribe(applyProps);
    }
  }
}
let hasInitialized = false;
export function initializeMenu(doc: HTMLElement | Document = document): void {
  if (hasInitialized) return;
  hasInitialized = true;
  const menusMap = new Map<string, Menu>();
  doc.querySelectorAll<HTMLElement>(".menu-js").forEach((rootEl) => {
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
    const directions = ["ltr", "rtl"] as const;
    const id = generateId(rootEl, "menu");
    const instance = new Menu(rootEl, {
      id,
      "aria-label": getString(rootEl, "ariaLabel"),
      closeOnSelect: getBoolean(rootEl, "closeOnSelect"),
      composite: getBoolean(rootEl, "composite"),
      defaultHighlightedValue: getString(rootEl, "defaultHighlightedValue"),
      defaultOpen: getBoolean(rootEl, "defaultOpen"),
      open: getBoolean(rootEl, "open"),
      dir: getString<Direction>(rootEl, "dir", directions),
      loopFocus: getBoolean(rootEl, "loopFocus"),
      typeahead: getBoolean(rootEl, "typeahead"),
      highlightedValue: getString(rootEl, "highlightedValue"),
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
      onSelect(details) {
        const eventName = getString(rootEl, "onSelect");
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
      onEscapeKeyDown(details) {
        const eventName = getString(rootEl, "onEscapeKeyDown");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onFocusOutside(details) {
        const eventName = getString(rootEl, "onFocusOutside");
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
      onInteractOutside(details) {
        const eventName = getString(rootEl, "onInteractOutside");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onPointerDownOutside(details) {
        const eventName = getString(rootEl, "onPointerDownOutside");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      navigate(details) {
        const eventName = getString(rootEl, "navigate");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });
    menusMap.set(id, instance);
  });
  menusMap.forEach((menu) => menu.init());
  menusMap.forEach((parent) => {
    const childIds = parent.el.dataset.children?.split(",") ?? [];
    for (const childId of childIds) {
      const child = menusMap.get(childId);
      if (child) {
        parent.setChild(child);
        child.setParent(parent);
      }
    }
  });
  menusMap.forEach((menu) => {
    if (!menu.parent) menu.render();
  });
  menusMap.forEach((menu) => {
    if (menu.parent) menu.render();
  });
  setTimeout(() => {
    menusMap.forEach((menu) => {
      menu.api = menu.initApi();
      if (menu.children.length > 0) menu.renderSubmenuTriggers();
    });
  }, 10);
}
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeMenu(document),
    );
  } else {
    initializeMenu(document);
  }
}
