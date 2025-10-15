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
  getPartIds,
} from "../lib";

const PARTS = [
  "root",
  "label",
  "control",
  "indicator",
  "hidden-input",
] as const;

export class Checkbox extends Component<checkbox.Props, checkbox.Api> {
  initMachine(props: checkbox.Props): VanillaMachine<any> {
    return new VanillaMachine(checkbox.machine, props);
  }

  initApi(): checkbox.Api {
    return checkbox.connect(this.machine.service, normalizeProps);
  }

  render(): void {
    PARTS.forEach((part) => renderPart(this.el, part, this.api));
  }
}

function registerEvents(el: HTMLElement, api: checkbox.Api): void {
  el.addEventListener("checkbox:set-checked", (event) => {
    const { value } = (event as CustomEvent<{ value: checkbox.CheckedState }>)
      .detail;
    api.setChecked(value);
  });

  el.addEventListener("checkbox:toggle-checked", () => {
    api.toggleChecked();
  });

  el.addEventListener("checkbox:checked", (event) => {
    const { callback } = (
      event as CustomEvent<{ callback: (value: boolean) => void }>
    ).detail;
    if (typeof callback === "function") callback(api.checked);
  });

  el.addEventListener("checkbox:disabled", (event) => {
    const { callback } = (
      event as CustomEvent<{ callback: (value: boolean | undefined) => void }>
    ).detail;
    if (typeof callback === "function") callback(api.disabled);
  });

  el.addEventListener("checkbox:indeterminate", (event) => {
    const { callback } = (
      event as CustomEvent<{ callback: (value: boolean) => void }>
    ).detail;
    if (typeof callback === "function") callback(api.indeterminate);
  });

  el.addEventListener("checkbox:focused", (event) => {
    const { callback } = (
      event as CustomEvent<{ callback: (value: boolean | undefined) => void }>
    ).detail;
    if (typeof callback === "function") callback(api.focused);
  });

  el.addEventListener("checkbox:checked-state", (event) => {
    const { callback } = (
      event as CustomEvent<{ callback: (value: checkbox.CheckedState) => void }>
    ).detail;
    if (typeof callback === "function") callback(api.checkedState);
  });
}

function parseCheckedState(
  el: HTMLElement,
  attr: "checked" | "defaultChecked",
): checkbox.CheckedState | undefined {
  if (getBoolean(el, attr) === true) return true;
  return getString(el, attr, ["indeterminate"] as const);
}

export function initializeCheckbox(
  doc: HTMLElement | Document = document,
): void {
  doc.querySelectorAll<HTMLElement>(".checkbox-js").forEach((rootEl) => {
    const checkbox = new Checkbox(rootEl, {
      id: generateId(rootEl, "checkbox"),
      ids: getPartIds(rootEl, PARTS),
      name: getString(rootEl, "name"),
      form: getString(rootEl, "form"),
      defaultChecked: parseCheckedState(rootEl, "defaultChecked"),
      checked: parseCheckedState(rootEl, "checked"),
      disabled: getBoolean(rootEl, "disabled"),
      invalid: getBoolean(rootEl, "invalid"),
      readOnly: getBoolean(rootEl, "readOnly"),
      required: getBoolean(rootEl, "required"),
      value: getString(rootEl, "value"),
      dir: getString<Direction>(rootEl, "dir", ["ltr", "rtl"]),
      onCheckedChange(details) {
        const eventName = getString(rootEl, "onCheckedChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });

    checkbox.init();
    registerEvents(rootEl, checkbox.api);
  });
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initializeCheckbox());
  } else {
    initializeCheckbox();
  }
}
