import * as zagSwitch from "@zag-js/switch";
import type { Direction } from "@zag-js/types";
import {
  Component,
  VanillaMachine,
  getString,
  generateId,
  normalizeProps,
  renderPart,
  getBoolean,
  valuesEqual,
} from "../lib";
export class ZagSwitch extends Component<zagSwitch.Props, zagSwitch.Api> {
  initMachine(props: zagSwitch.Props): VanillaMachine<any> {
    return new VanillaMachine(zagSwitch.machine, props);
  }
  initApi() {
    return zagSwitch.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = ["root", "label", "control", "thumb", "hidden-input"];
    for (const part of parts) renderPart(this.el, part, this.api);
  }
}
export function initializeSwitch(doc: HTMLElement | Document = document): void {
  doc.querySelectorAll<HTMLElement>(".switch-js").forEach((rootEl) => {
    const directions = ["ltr", "rtl"] as const;
    const zagSwitch = new ZagSwitch(rootEl, {
      id: generateId(rootEl, "zagSwitch"),
      checked: getBoolean(rootEl, "checked"),
      defaultChecked: getBoolean(rootEl, "defaultChecked"),
      dir: getString<Direction>(rootEl, "dir", directions),
      disabled: getBoolean(rootEl, "disabled"),
      invalid: getBoolean(rootEl, "invalid"),
      label: getString(rootEl, "label"),
      name: getString(rootEl, "name"),
      required: getBoolean(rootEl, "required"),
      readOnly: getBoolean(rootEl, "readOnly"),
      form: getString(rootEl, "form"),
      value: getString(rootEl, "value"),
      onCheckedChange(details: any) {
        const eventName = getString(rootEl, "onCheckedChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });
    zagSwitch.init();
    zagSwitch.el.addEventListener("switch:set-checked", (event) => {
      const { value } = (event as CustomEvent<{ value: boolean }>).detail;
      if (!valuesEqual(zagSwitch.api.checked, value)) {
        zagSwitch.api.setChecked(value);
      }
    });
    zagSwitch.el.addEventListener("switch:toggle-checked", () => {
      zagSwitch.api.toggleChecked();
    });
    zagSwitch.el.addEventListener("switch:checked", (event) => {
      const detail = (
        event as CustomEvent<{ callback: (value: boolean) => void }>
      ).detail;
      const callback = detail.callback;
      if (callback && typeof callback === "function") {
        callback(zagSwitch.api.checked);
      }
    });
  });
}
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeSwitch(document),
    );
  } else {
    initializeSwitch(document);
  }
}
