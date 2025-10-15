import * as angleSlider from "@zag-js/angle-slider";

import {
  Component,
  VanillaMachine,
  getString,
  getBoolean,
  getNumber,
  generateId,
  normalizeProps,
  renderPart,
  getPartIds,
  valuesEqual,
} from "../lib";

const PARTS = [
  "root",
  "label",
  "control",
  "thumb",
  "marker-group",
  "value-text",
  "hidden-input",
] as const;

const ITEM_PARTS = ["marker"] as const;

export class AngleSlider extends Component<angleSlider.Props, angleSlider.Api> {
  initMachine(props: angleSlider.Props): VanillaMachine<any> {
    return new VanillaMachine(angleSlider.machine, props);
  }

  initApi(): angleSlider.Api {
    return angleSlider.connect(this.machine.service, normalizeProps);
  }

  render(): void {
    PARTS.forEach((part) => renderPart(this.el, part, this.api));

    ITEM_PARTS.forEach((part) =>
      renderPart(this.el, part, this.api, { value: "number" }),
    );

    this.updateValueText();
  }

  private updateValueText(): void {
    const valueEl = this.el.querySelector<HTMLElement>(
      '[data-part="value-text"] [data-part="value"]',
    );

    if (!valueEl) return;

    const numberingSystem = getString(this.el, "numberingSystem");

    if (numberingSystem) {
      valueEl.textContent = new Intl.NumberFormat(undefined, {
        numberingSystem,
      } as Intl.NumberFormatOptions).format(this.api.value);
    } else {
      valueEl.textContent = String(this.api.value);
    }
  }
}

function registerEvents(el: HTMLElement, api: angleSlider.Api): void {
  el.addEventListener("angle-slider:set-value", (event) => {
    const { value } = (event as CustomEvent<{ value: number }>).detail;
    if (!valuesEqual(api.value, value)) {
      api.setValue(value);
    }
  });

  el.addEventListener("angle-slider:value", (event) => {
    const { callback } = (
      event as CustomEvent<{ callback: (value: number) => void }>
    ).detail;
    if (typeof callback === "function") callback(api.value);
  });

  el.addEventListener("angle-slider:value-degree", (event) => {
    const { callback } = (
      event as CustomEvent<{ callback: (value: string) => void }>
    ).detail;
    if (typeof callback === "function") callback(api.valueAsDegree);
  });
}

export function initializeAngleSlider(
  doc: HTMLElement | Document = document,
): void {
  doc.querySelectorAll<HTMLElement>(".angle-slider-js").forEach((rootEl) => {
    const angleSlider = new AngleSlider(rootEl, {
      id: generateId(rootEl, "angleSlider"),
      ids: getPartIds(rootEl, PARTS),
      defaultValue: getNumber(rootEl, "defaultValue"),
      disabled: getBoolean(rootEl, "disabled"),
      invalid: getBoolean(rootEl, "invalid"),
      name: getString(rootEl, "name"),
      step: getNumber(rootEl, "step"),
      value: getNumber(rootEl, "value"),
      readOnly: getBoolean(rootEl, "readOnly"),
      onValueChangeEnd(details) {
        const eventName = getString(rootEl, "onValueChangeEnd");
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

    angleSlider.init();
    registerEvents(rootEl, angleSlider.api);
  });
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeAngleSlider(),
    );
  } else {
    initializeAngleSlider();
  }
}
