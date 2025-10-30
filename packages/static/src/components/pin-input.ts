import * as pinInput from "@zag-js/pin-input";
import { Direction } from "@zag-js/types";
import {
  Component,
  VanillaMachine,
  getString,
  generateId,
  normalizeProps,
  renderPart,
  getBoolean,
  getStringList,
} from "../lib";
export class PinInput extends Component<pinInput.Props, pinInput.Api> {
  initMachine(props: pinInput.Props): VanillaMachine<any> {
    return new VanillaMachine(pinInput.machine, props);
  }
  initApi(): pinInput.Api {
    return pinInput.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = ["root", "label", "control"];
    for (const part of parts) renderPart(this.el, part, this.api);

    renderPart(this.el, "input", this.api, { index: "number" });
  }
}
export function initializePinInput(
  doc: HTMLElement | Document = document,
): void {
  doc.querySelectorAll<HTMLElement>(".pin-input-js").forEach((rootEl) => {
    const inputs = rootEl.querySelectorAll<HTMLElement>('[data-part="input"]');

    inputs.forEach((input, index) => {
      input.setAttribute("data-index", String(index));
    });

    const directions = ["ltr", "rtl"] as const;
    const pinInput = new PinInput(rootEl, {
      id: generateId(rootEl, "pinInput"),
      dir: getString<Direction>(rootEl, "dir", directions),
      autoFocus: getBoolean(rootEl, "autoFocus"),
      blurOnComplete: getBoolean(rootEl, "blurOnComplete"),
      count: inputs.length,
      defaultValue: getStringList(rootEl, "defaultValue"),
      disabled: getBoolean(rootEl, "disabled"),
      form: getString(rootEl, "form"),
      invalid: getBoolean(rootEl, "invalid"),
      mask: getBoolean(rootEl, "mask"),
      name: getString(rootEl, "name"),
      otp: getBoolean(rootEl, "otp"),
      pattern: getString(rootEl, "pattern"),
      placeholder: getString(rootEl, "placeholder"),
      readOnly: getBoolean(rootEl, "readOnly"),
      required: getBoolean(rootEl, "required"),
      selectOnFocus: getBoolean(rootEl, "selectOnFocus"),
      type: getString(rootEl, "type", [
        "alphanumeric",
        "numeric",
        "alphabetic",
      ]),
      value: getStringList(rootEl, "value"),
      onValueComplete(details) {
        const eventName = getString(rootEl, "onValueComplete");
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
      onValueInvalid(details) {
        const eventName = getString(rootEl, "onValueInvalid");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });
    pinInput.init();
  });
}
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializePinInput(document),
    );
  } else {
    initializePinInput(document);
  }
}
