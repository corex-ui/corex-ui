import * as radioGroup from "@zag-js/radio-group";
import type { Direction, Orientation } from "@zag-js/types";
import { VanillaMachine, normalizeProps } from "@zag-js/vanilla";

import {
  Component,
  getString,
  getBoolean,
  generateId,
  renderPart,
} from "../lib";

export class RadioGroup extends Component<radioGroup.Props, radioGroup.Api> {
  initMachine(props: radioGroup.Props): VanillaMachine<any> {
    return new VanillaMachine(radioGroup.machine, props);
  }

  initApi(): radioGroup.Api {
    return radioGroup.connect(this.machine.service, normalizeProps);
  }

  render(): void {
    ["root", "label"].forEach((part) => renderPart(this.el, part, this.api));

    const items = this.el.querySelectorAll<HTMLElement>('[data-part="item"]');
    items.forEach((itemEl) => {
      const value = getString(itemEl, "value");
      const disabled = getBoolean(itemEl, "disabled");

      renderPart(itemEl, "item", this.api, { value, disabled });

      ["item-text", "item-hidden-input", "item-control"].forEach(
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

export function initRadioGroup(
  doc: HTMLElement | Document = document,
  selector = ".radio-group-js",
): void {
  doc.querySelectorAll<HTMLElement>(selector).forEach((rootEl) => {
    const items = rootEl.querySelectorAll<HTMLElement>('[data-part="item"]');
    items.forEach((itemEl, index) => {
      let value = getString(itemEl, "value");
      if (!value) {
        value = generateId(itemEl, `radio-group-item-${index}`);
        itemEl.setAttribute("data-value", value);
      }
    });
    const radioGroup = new RadioGroup(rootEl, {
      id: generateId(rootEl, "radioGroup"),
      orientation: getString<Orientation>(rootEl, "orientation", [
        "horizontal",
        "vertical",
      ]),
      dir: getString<Direction>(rootEl, "dir", ["ltr", "rtl"]),
      defaultValue: getString(rootEl, "defaultValue"),
      disabled: getBoolean(rootEl, "disabled"),
      form: getString(rootEl, "form"),
      name: getString(rootEl, "name"),
      readOnly: getBoolean(rootEl, "readOnly"),
      value: getString(rootEl, "value"),
      onValueChange(details) {
        const eventName = getString(rootEl, "onValueChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });

    radioGroup.init();

    radioGroup.el.addEventListener("radio-group:set-value", (event) => {
      const { value } = (event as CustomEvent<{ value: string }>).detail;
      if (radioGroup.api.value !== value) {
        radioGroup.api.setValue(value);
      }
    });

    radioGroup.el.addEventListener("radio-group:value", (event) => {
      const detail = (
        event as CustomEvent<{ callback: (value: string | null) => void }>
      ).detail;
      const callback = detail.callback;
      if (callback && typeof callback === "function") {
        callback(radioGroup.api.value);
      }
    });
  });
}
