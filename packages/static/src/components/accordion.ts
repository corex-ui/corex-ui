import * as accordion from "@zag-js/accordion";
import type { Direction, Orientation } from "@zag-js/types";
import {
  Component,
  VanillaMachine,
  getString,
  getBoolean,
  generateId,
  normalizeProps,
  renderPart,
  getStringList,
  getPartIds,
  arraysEqualUnordered,
} from "../lib";

export class Accordion extends Component<accordion.Props, accordion.Api> {
  initMachine(props: accordion.Props): VanillaMachine<any> {
    return new VanillaMachine(accordion.machine, props);
  }

  initApi(): accordion.Api {
    return accordion.connect(this.machine.service, normalizeProps);
  }

  render(): void {
    renderPart(this.el, "root", this.api);

    const items = this.el.querySelectorAll<HTMLElement>('[data-part="item"]');
    items.forEach((itemEl) => {
      const value = getString(itemEl, "value");
      const disabled = getBoolean(itemEl, "disabled");

      renderPart(itemEl, "item", this.api, { value, disabled });

      ["item-trigger", "item-indicator", "item-content"].forEach(
        (childPart) => {
          renderPart(itemEl, childPart, this.api, {
            value,
            disabled,
          });
        },
      );
    });
  }
}

export function initializeAccordion(
  doc: HTMLElement | Document = document,
): void {
  doc.querySelectorAll<HTMLElement>(".accordion-js").forEach((rootEl) => {
    const items = rootEl.querySelectorAll<HTMLElement>('[data-part="item"]');
    items.forEach((itemEl, index) => {
      let value = getString(itemEl, "value");
      if (!value) {
        value = generateId(itemEl, `accordion-item-${index}`);
        itemEl.setAttribute("data-value", value);
      }
    });
    const accordion = new Accordion(rootEl, {
      id: generateId(rootEl, "accordion"),
      ids: getPartIds(rootEl, [
        "root",
        "item",
        "item-trigger",
        "item-indicator",
        "item-content",
      ]),
      collapsible: getBoolean(rootEl, "collapsible"),
      defaultValue: getStringList(rootEl, "defaultValue"),
      value: getStringList(rootEl, "value"),
      disabled: getBoolean(rootEl, "disabled"),
      multiple: getBoolean(rootEl, "multiple"),
      orientation: getString<Orientation>(rootEl, "orientation", [
        "horizontal",
        "vertical",
      ]),
      dir: getString<Direction>(rootEl, "dir", ["ltr", "rtl"]),
      onFocusChange(details) {
        const eventName = getString(rootEl, "onFocusChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onValueChange(details) {
        const eventName = getString(rootEl, "onValueChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });

    accordion.init();

    accordion.el.addEventListener("accordion:set-value", (event) => {
      const { value } = (event as CustomEvent<{ value: string[] }>).detail;
      if (!arraysEqualUnordered(accordion.api.value, value)) {
        accordion.api.setValue(value);
      }
    });

    accordion.el.addEventListener("accordion:value", (event) => {
      const callback = (
        event as CustomEvent<{ callback: (value: string[]) => void }>
      ).detail.callback;
      if (callback) callback(accordion.api.value);
    });

    accordion.el.addEventListener("accordion:focused-value", (event) => {
      const callback = (
        event as CustomEvent<{ callback: (value: string | null) => void }>
      ).detail.callback;
      if (callback) callback(accordion.api.focusedValue);
    });
  });
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initializeAccordion());
  } else {
    initializeAccordion();
  }
}
