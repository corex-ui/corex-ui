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
} from "../lib";
export class Tabs extends Component<tabs.Props, tabs.Api> {
  initMachine(props: tabs.Props): VanillaMachine<any> {
    return new VanillaMachine(tabs.machine, props);
  }
  initApi(): tabs.Api {
    return tabs.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = ["root", "list"];
    for (const part of parts) renderPart(this.el, part, this.api);
    const items = ["trigger", "content"];
    for (const item of items)
      renderPart(this.el, item, this.api, {
        value: "string",
        disabled: "boolean",
      });
  }
}
export function initializeTabs(doc: HTMLElement | Document = document): void {
  doc.querySelectorAll<HTMLElement>(".tabs-js").forEach((rootEl) => {
    const activationModes = ["manual", "automatic"] as const;
    const directions = ["ltr", "rtl"] as const;
    const orientations = ["horizontal", "vertical"] as const;
    const tabs = new Tabs(rootEl, {
      id: generateId(rootEl, "tabs"),
      value: getString(rootEl, "value"),
      defaultValue: getString(rootEl, "defaultValue"),
      loopFocus: getBoolean(rootEl, "loopFocus"),
      orientation: getString<Orientation>(rootEl, "orientation", orientations),
      dir: getString<Direction>(rootEl, "dir", directions),
      activationMode: getString(rootEl, "activationMode", activationModes),
      composite: getBoolean(rootEl, "composite"),
      deselectable: getBoolean(rootEl, "deselectable"),
      translations: {
        listLabel: getString(rootEl, "listLabelTranslation"),
      },
      navigate(details) {
        const eventName = getString(rootEl, "navigate");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
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
    tabs.init();
    tabs.el.addEventListener("tabs:set-value", (event) => {
      const { value } = (event as CustomEvent<{ value: string }>).detail;
      const currentValue = tabs.api.value;
      if (currentValue !== value) {
        tabs.api.setValue(value);
      }
    });
    tabs.el.addEventListener("tabs:value", (event) => {
      const callback = (
        event as CustomEvent<{ callback: (value: string | null) => void }>
      ).detail.callback;
      if (callback) callback(tabs.api.value);
    });
  });
}
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeTabs(document),
    );
  } else {
    initializeTabs(document);
  }
}
