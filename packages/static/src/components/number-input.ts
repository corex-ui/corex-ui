import * as numberInput from "@zag-js/number-input";
import { Direction } from "@zag-js/types";
import {
  Component,
  VanillaMachine,
  getString,
  generateId,
  normalizeProps,
  renderPart,
  getBoolean,
  getNumber,
} from "../lib";
export class NumberInput extends Component<numberInput.Props, numberInput.Api> {
  initMachine(props: numberInput.Props): VanillaMachine<any> {
    return new VanillaMachine(numberInput.machine, props);
  }
  initApi(): numberInput.Api {
    return numberInput.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = [
      "root",
      "label",
      "input",
      "control",
      "valueText",
      "increment-trigger",
      "decrement-trigger",
      "scrubber",
    ];
    for (const part of parts) renderPart(this.el, part, this.api);
  }
}
export function initializeNumberInput(
  doc: HTMLElement | Document = document,
): void {
  doc.querySelectorAll<HTMLElement>(".number-input-js").forEach((rootEl) => {
    const directions = ["ltr", "rtl"] as const;
    const numberInput = new NumberInput(rootEl, {
      id: generateId(rootEl, "numberInput"),
      dir: getString<Direction>(rootEl, "dir", directions),
      allowMouseWheel: getBoolean(rootEl, "allowMouseWheel"),

      allowOverflow: getBoolean(rootEl, "allowOverflow"),
      clampValueOnBlur: getBoolean(rootEl, "clampValueOnBlur"),
      disabled: getBoolean(rootEl, "disabled"),
      focusInputOnChange: getBoolean(rootEl, "focusInputOnChange"),
      invalid: getBoolean(rootEl, "invalid"),
      defaultValue: getString(rootEl, "defaultValue"),
      form: getString(rootEl, "form"),
      formatOptions: {
        currency: getString(rootEl, "currency"),
        style:
          getString(rootEl, "style", ["decimal", "currency", "percent"]) ||
          "decimal",
        maximumFractionDigits: getNumber(rootEl, "maximumFractionDigits"),
        minimumFractionDigits: getNumber(rootEl, "minimumFractionDigits"),
        maximumSignificantDigits: getNumber(rootEl, "maximumSignificantDigits"),
        minimumSignificantDigits: getNumber(rootEl, "minimumIntegerDigits"),
        minimumIntegerDigits: getNumber(rootEl, "minimumIntegerDigits"),
        numberingSystem: getString(rootEl, "numberingSystem"),
        currencyDisplay: getString(rootEl, "currencyDisplay", [
          "code",
          "symbol",
          "name",
        ]),
        compactDisplay: getString(rootEl, "compactDisplay", ["short", "long"]),
        notation: getString(rootEl, "notation", [
          "standard",
          "scientific",
          "engineering",
          "compact",
        ]),
        unit: getString(rootEl, "unit"),
        unitDisplay: getString(rootEl, "unitDisplay", [
          "short",
          "long",
          "narrow",
        ]),
        currencySign: getString(rootEl, "currencySign", [
          "standard",
          "accounting",
        ]),
      },
      inputMode: getString(rootEl, "inputMode", [
        "text",
        "tel",
        "numeric",
        "decimal",
      ]),
      locale: getString(rootEl, "locale"),
      max: getNumber(rootEl, "max"),
      min: getNumber(rootEl, "min"),
      name: getString(rootEl, "name"),
      pattern: getString(rootEl, "pattern"),
      readOnly: getBoolean(rootEl, "readOnly"),
      required: getBoolean(rootEl, "required"),
      spinOnPress: getBoolean(rootEl, "spinOnPress"),
      step: getNumber(rootEl, "step"),
      value: getString(rootEl, "value"),
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
      onValueInvalid(details) {
        const eventName = getString(rootEl, "onValueInvalid");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });
    numberInput.init();
  });
}
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeNumberInput(document),
    );
  } else {
    initializeNumberInput(document);
  }
}
