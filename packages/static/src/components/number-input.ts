import * as numberInput from "@zag-js/number-input";
import { Direction } from "@zag-js/types";
import { VanillaMachine, normalizeProps } from "@zag-js/vanilla";

import {
  Component,
  getString,
  generateId,
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
export function initNumberInput(
  doc: HTMLElement | Document = document,
  selector = ".number-input-js",
): void {
  doc.querySelectorAll<HTMLElement>(selector).forEach((rootEl) => {
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

    numberInput.el.addEventListener("number-input:set-value", (event) => {
      const { value } = (event as CustomEvent<{ value: string }>).detail;
      if (typeof value === "string" && value && !isNaN(Number(value))) {
        // Type assertion needed due to zag-js type mismatch (API says number but runtime expects string)
        (numberInput.api.setValue as unknown as (value: string) => void)(value);
      }
    });

    numberInput.el.addEventListener("number-input:value", (event) => {
      const detail = (
        event as CustomEvent<{ callback: (value: string) => void }>
      ).detail;
      const callback = detail.callback;
      if (callback && typeof callback === "function") {
        callback(numberInput.api.value);
      }
    });
  });
}
