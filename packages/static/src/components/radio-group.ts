import * as radioGroup from "@zag-js/radio-group";
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

export function initializeRadioGroup(
  doc: HTMLElement | Document = document,
): void {
  doc.querySelectorAll<HTMLElement>(".radio-group-js").forEach((rootEl) => {
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
  });
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initializeRadioGroup());
  } else {
    initializeRadioGroup();
  }
}
