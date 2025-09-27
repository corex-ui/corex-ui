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
  valuesEqual,
} from "../lib";
export class AngleSlider extends Component<angleSlider.Props, angleSlider.Api> {
  initMachine(props: angleSlider.Props): VanillaMachine<any> {
    return new VanillaMachine(angleSlider.machine, props);
  }
  initApi(): angleSlider.Api {
    return angleSlider.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = [
      "root",
      "label",
      "control",
      "thumb",
      "marker-group",
      "value-text",
      "hidden-input",
    ];
    for (const part of parts) renderPart(this.el, part, this.api);
    const items = ["marker"];
    for (const item of items)
      renderPart(this.el, item, this.api, { value: "number" });

    const valueEl = this.el.querySelector<HTMLElement>(
      '[data-part="value-text"] [data-part="value"]',
    );
    if (valueEl) {
      const numberingSystem = getString(this.el, "numberingSystem");
      if (numberingSystem) {
        valueEl.textContent = Intl.NumberFormat(undefined, {
          numberingSystem: "arab",
        }).format(this.api.value);
      } else {
        valueEl.textContent = String(this.api.value);
      }
    }
  }
}
export function initializeAngleSlider(
  doc: HTMLElement | Document = document,
): void {
  doc.querySelectorAll<HTMLElement>(".angle-slider-js").forEach((rootEl) => {
    const angleSlider = new AngleSlider(rootEl, {
      id: generateId(rootEl, "angleSlider"),
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
    angleSlider.el.addEventListener("angle-slider:set-value", (event) => {
      const { value } = (event as CustomEvent<{ value: number }>).detail;
      if (!valuesEqual(angleSlider.api.value, value)) {
        angleSlider.api.setValue(value);
      }
    });
    angleSlider.el.addEventListener("angle-slider:get-value", (event) => {
      const detail = (
        event as CustomEvent<{ callback: (value: number) => void }>
      ).detail;
      const callback = detail.callback;
      if (callback && typeof callback === "function") {
        callback(angleSlider.api.value);
      }
    });
    angleSlider.el.addEventListener(
      "angle-slider:get-value-degree",
      (event) => {
        const detail = (
          event as CustomEvent<{ callback: (value: string) => void }>
        ).detail;
        const callback = detail.callback;
        if (callback && typeof callback === "function") {
          callback(angleSlider.api.valueAsDegree);
        }
      },
    );
  });
}
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeAngleSlider(document),
    );
  } else {
    initializeAngleSlider(document);
  }
}
