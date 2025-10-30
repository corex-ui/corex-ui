import * as tabs from "@zag-js/tabs";
import type { Direction, Orientation } from "@zag-js/types";
import {
  Component,
  VanillaMachine,
  getString,
  getBoolean,
  generateId,
  normalizeProps,
  renderPart,
  getPartIds,
} from "../lib";

export class Tabs extends Component<tabs.Props, tabs.Api> {
  initMachine(props: tabs.Props): VanillaMachine<any> {
    return new VanillaMachine(tabs.machine, props);
  }

  initApi(): tabs.Api {
    return tabs.connect(this.machine.service, normalizeProps);
  }

  render(): void {
    renderPart(this.el, "root", this.api);

    const list = this.el.querySelector<HTMLElement>('[data-part="list"]');
    if (list) renderPart(list, "list", this.api);

    const triggers = Array.from(
      this.el.querySelectorAll<HTMLElement>('[data-part="trigger"]'),
    );
    const contents = Array.from(
      this.el.querySelectorAll<HTMLElement>('[data-part="content"]'),
    );

    triggers.forEach((triggerEl, index) => {
      // Assign value to trigger
      let value = getString(triggerEl, "value");
      if (!value) {
        value = generateId(triggerEl, `tab-${index}`);
        triggerEl.setAttribute("data-value", value);
      }

      renderPart(triggerEl, "trigger", this.api, {
        value,
        disabled: getBoolean(triggerEl, "disabled"),
      });

      // Assign the same value to the corresponding content in order
      const contentEl = contents[index];
      if (contentEl) {
        contentEl.setAttribute("data-value", value);
        renderPart(contentEl, "content", this.api, { value });
      }
    });
  }
}

export function initializeTabs(doc: HTMLElement | Document = document): void {
  doc.querySelectorAll<HTMLElement>(".tabs-js").forEach((rootEl) => {
    const triggers = rootEl.querySelectorAll<HTMLElement>(
      '[data-part="trigger"]',
    );
    const contents = rootEl.querySelectorAll<HTMLElement>(
      '[data-part="content"]',
    );

    // Generate values once in order
    triggers.forEach((triggerEl, index) => {
      let value = getString(triggerEl, "value");
      if (!value) {
        value = generateId(triggerEl, `tab-${index}`);
        triggerEl.setAttribute("data-value", value);
      }

      const contentEl = contents[index];
      if (contentEl) {
        contentEl.setAttribute("data-value", value);
      }
    });

    const tabsInstance = new Tabs(rootEl, {
      id: generateId(rootEl, "tabs"),
      value: getString(rootEl, "value"),
      defaultValue: getString(rootEl, "defaultValue"),
      loopFocus: getBoolean(rootEl, "loopFocus"),
      orientation: getString<Orientation>(rootEl, "orientation", [
        "horizontal",
        "vertical",
      ]),
      dir: getString<Direction>(rootEl, "dir", ["ltr", "rtl"]),
      activationMode: getString(rootEl, "activationMode", [
        "manual",
        "automatic",
      ]),
      composite: getBoolean(rootEl, "composite"),
      deselectable: getBoolean(rootEl, "deselectable"),
      ids: getPartIds(rootEl, ["root", "list", "trigger", "content"]),
      translations: {
        listLabel: getString(rootEl, "listLabelTranslation"),
      },
      onFocusChange(details) {
        const eventName = getString(rootEl, "onFocusChange");
        if (eventName)
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
      },
      onValueChange(details) {
        const eventName = getString(rootEl, "onValueChange");
        if (eventName)
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
      },
    });

    tabsInstance.init();

    rootEl.addEventListener("tabs:set-value", (event) => {
      const { value } = (event as CustomEvent<{ value: string }>).detail;
      if (tabsInstance.api.value !== value && value !== null) {
        tabsInstance.api.setValue(value);
      }
    });

    rootEl.addEventListener("tabs:value", (event) => {
      const callback = (
        event as CustomEvent<{ callback: (value: string) => void }>
      ).detail.callback;
      if (callback && tabsInstance.api.value !== null) {
        callback(tabsInstance.api.value);
      }
    });

    rootEl.addEventListener("tabs:focused-value", (event) => {
      const callback = (
        event as CustomEvent<{ callback: (value: string | null) => void }>
      ).detail.callback;
      if (callback) callback(tabsInstance.api.focusedValue);
    });
  });
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initializeTabs());
  } else {
    initializeTabs();
  }
}
