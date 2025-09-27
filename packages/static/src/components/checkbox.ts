import * as checkbox from "@zag-js/checkbox";
import type { Direction } from "@zag-js/types";

import {
  Component,
  VanillaMachine,
  getString,
  getBoolean,
  generateId,
  normalizeProps,
  renderPart,
  // getStringList,
} from "../lib";
export class Checkbox extends Component<checkbox.Props, checkbox.Api> {
  initMachine(props: checkbox.Props): VanillaMachine<any> {
    return new VanillaMachine(checkbox.machine, props);
  }
  initApi(): checkbox.Api {
    const api = checkbox.connect(this.machine.service, normalizeProps);
    return api;
  }
  render() {
    const parts = ["root", "label", "control", "indicator", "hidden-input"];
    for (const part of parts) renderPart(this.el, part, this.api);
  }
}
export function initializeCheckbox(
  doc: HTMLElement | Document = document,
): void {
  doc.querySelectorAll<HTMLElement>(".checkbox-js").forEach((rootEl) => {
    const directions = ["ltr", "rtl"] as const;
    const checkbox = new Checkbox(rootEl, {
      id: generateId(rootEl, "checkbox"),
      name: getString(rootEl, "name"),
      form: getString(rootEl, "form"),
      defaultChecked:
        getBoolean(rootEl, "defaultChecked") === true
          ? true
          : getString(rootEl, "checked", ["indeterminate"]) === "indeterminate"
            ? "indeterminate"
            : undefined,
      checked:
        getBoolean(rootEl, "checked") === true
          ? true
          : getString(rootEl, "checked", ["indeterminate"]) === "indeterminate"
            ? "indeterminate"
            : undefined,
      disabled: getBoolean(rootEl, "disabled"),
      invalid: getBoolean(rootEl, "invalid"),
      readOnly: getBoolean(rootEl, "readOnly"),
      required: getBoolean(rootEl, "required"),
      value: getString(rootEl, "value"),
      dir: getString<Direction>(rootEl, "dir", directions),
      onCheckedChange(details) {
        const eventName = getString(rootEl, "onCheckedChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });
    checkbox.init();
    // checkbox.el.addEventListener("checkbox:set-value", (event) => {
    //   const { value } = (event as CustomEvent<{ value: string[] }>).detail;
    //   checkbox.api.setValue(value);
    // });
    // checkbox.el.addEventListener("checkbox:get-value", (event) => {
    //   const detail = (event as CustomEvent<{ callback: (value: string[]) => void }>).detail;
    //   const callback = detail.callback;
    //   if (callback && typeof callback === "function") {
    //     callback(checkbox.api.value);
    //   }
    // });
    // checkbox.el.addEventListener("checkbox:get-focused-value", (event) => {
    //   const detail = (event as CustomEvent<{ callback: (value: string | null) => void }>).detail;
    //   const callback = detail.callback;
    //   if (callback && typeof callback === "function") {
    //     callback(checkbox.api.focusedValue);
    //   }
    // });
  });
}
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeCheckbox(document),
    );
  } else {
    initializeCheckbox(document);
  }
}
