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
  arraysEqualUnordered,
} from "../lib";
export class Accordion extends Component<accordion.Props, accordion.Api> {
  initMachine(props: accordion.Props): VanillaMachine<any> {
    return new VanillaMachine(accordion.machine, props);
  }
  initApi(): accordion.Api {
    const api = accordion.connect(this.machine.service, normalizeProps);
    return api;
  }
  render() {
    const parts = ["root"];
    for (const part of parts) renderPart(this.el, part, this.api);
    const items = ["item", "item-trigger", "item-indicator", "item-content"];
    for (const item of items)
      renderPart(this.el, item, this.api, {
        value: "string",
        disabled: "boolean",
      });
  }
}
export function initializeAccordion(doc: HTMLElement | Document = document) {
  doc.querySelectorAll<HTMLElement>(".accordion-js").forEach((rootEl) => {
    const directions = ["ltr", "rtl"] as const;
    const orientations = ["horizontal", "vertical"] as const;
    const accordion = new Accordion(rootEl, {
      id: generateId(rootEl, "accordion"),
      collapsible: getBoolean(rootEl, "collapsible"),
      defaultValue: getStringList(rootEl, "defaultValue"),
      value: getStringList(rootEl, "value"),
      disabled: getBoolean(rootEl, "disabled"),
      multiple: getBoolean(rootEl, "multiple"),
      orientation: getString<Orientation>(rootEl, "orientation", orientations),
      dir: getString<Direction>(rootEl, "dir", directions),
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
      const current = accordion.api.value;
      if (!arraysEqualUnordered(current, value)) {
        accordion.api.setValue(value);
      }
    });
    accordion.el.addEventListener("accordion:value", (event) => {
      const detail = (
        event as CustomEvent<{ callback: (value: string[]) => void }>
      ).detail;
      const callback = detail.callback;
      if (callback && typeof callback === "function") {
        callback(accordion.api.value);
      }
    });
    accordion.el.addEventListener("accordion:focused-value", (event) => {
      const detail = (
        event as CustomEvent<{ callback: (value: string | null) => void }>
      ).detail;
      const callback = detail.callback;
      if (callback && typeof callback === "function") {
        callback(accordion.api.focusedValue);
      }
    });
  });
}
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeAccordion(document),
    );
  } else {
    initializeAccordion(document);
  }
}
