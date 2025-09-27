import * as colorPicker from "@zag-js/color-picker";
import type { ColorFormat } from "@zag-js/color-picker";
import type { Direction } from "@zag-js/types";
import {
  Component,
  VanillaMachine,
  getString,
  getBoolean,
  getNumber,
  generateId,
  normalizeProps,
  renderPart,
} from "../lib";
export class ColorPicker extends Component<colorPicker.Props, colorPicker.Api> {
  initMachine(props: colorPicker.Props): VanillaMachine<any> {
    return new VanillaMachine(colorPicker.machine, props);
  }
  initApi(): colorPicker.Api {
    return colorPicker.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = [
      "root",
      "label",
      "hidden-input",
      "control",
      "trigger",
      "positioner",
      "content",
      "area",
      "area-background",
      "area-thumb",
      "swatch-group",
      "eye-dropper-trigger",
    ];
    for (const part of parts) renderPart(this.el, part, this.api);
    const items = [
      "channel-input",
      "channel-slider",
      "channel-slider-track",
      "channel-slider-thumb",
    ];
    for (const item of items)
      renderPart(this.el, item, this.api, { channel: "string" });

    const swatchTriggers = ["swatch-trigger"];
    for (const trigger of swatchTriggers)
      renderPart(this.el, trigger, this.api, { value: "string" });

    const grids = ["transparency-grid"];
    for (const grid of grids)
      renderPart(this.el, grid, this.api, { size: "string" });

    const swatchOutside = Array.from(
      this.el.querySelectorAll<HTMLElement>("[data-part='swatch']"),
    ).filter((el) => !el.closest("[data-part='control']"));

    swatchOutside.forEach((part) => {
      renderPart(part.parentElement!, "swatch", this.api, { value: "string" });
    });

    const swatchInside = Array.from(
      this.el.querySelectorAll<HTMLElement>("[data-part='swatch']"),
    ).filter((el) => el.closest("[data-part='control']"));

    swatchInside.forEach((part) => {
      renderPart(part.parentElement!, "swatch", this.api, {
        value: this.api.value,
      });
    });
  }
}
export function initializeColorPicker(
  doc: HTMLElement | Document = document,
): void {
  doc.querySelectorAll<HTMLElement>(".color-picker-js").forEach((rootEl) => {
    const directions = ["ltr", "rtl"] as const;
    const formats = ["rgba", "hsla", "hsba"] as const;
    const placements = [
      "top",
      "right",
      "bottom",
      "left",
      "top-start",
      "top-end",
      "right-start",
      "right-end",
      "bottom-start",
      "bottom-end",
      "left-start",
      "left-end",
    ] as const;
    const strategies = ["absolute", "fixed"] as const;
    const colorPickerComponent = new ColorPicker(rootEl, {
      id: generateId(rootEl, "colorPicker"),
      defaultValue:
        getString(rootEl, "defaultValue") !== undefined
          ? colorPicker.parse(getString(rootEl, "defaultValue")!)
          : undefined,
      defaultFormat: getString<ColorFormat>(rootEl, "defaultFormat", formats),
      closeOnSelect: getBoolean(rootEl, "closeOnSelect"),
      defaultOpen: getBoolean(rootEl, "defaultOpen"),
      dir: getString<Direction>(rootEl, "dir", directions),
      disabled: getBoolean(rootEl, "disabled"),
      format: getString<ColorFormat>(rootEl, "format", formats),
      invalid: getBoolean(rootEl, "invalid"),
      name: getString(rootEl, "name") || generateId(rootEl, "color"),
      open: getBoolean(rootEl, "open"),
      openAutoFocus: getBoolean(rootEl, "openAutoFocus"),
      readOnly: getBoolean(rootEl, "readOnly"),
      required: getBoolean(rootEl, "required"),
      value:
        getString(rootEl, "value") !== undefined
          ? colorPicker.parse(getString(rootEl, "value")!)
          : undefined,
      positioning: {
        hideWhenDetached: getBoolean(rootEl, "hideWhenDetached"),
        placement: getString(rootEl, "placement", placements),
        strategy: getString(rootEl, "strategy", strategies),
        flip: getBoolean(rootEl, "flip"),
        gutter: getNumber(rootEl, "gutter"),
        arrowPadding: getNumber(rootEl, "arrowPadding"),
        overflowPadding: getNumber(rootEl, "overflowPadding"),
        offset: (() => {
          const mainAxis = getNumber(rootEl, "offsetMainAxis");
          const crossAxis = getNumber(rootEl, "offsetCrossAxis");
          if (mainAxis !== undefined || crossAxis !== undefined) {
            return {
              mainAxis: mainAxis,
              crossAxis: crossAxis,
            };
          }
          return undefined;
        })(),
        sameWidth: getBoolean(rootEl, "sameWidth"),
        overlap: getBoolean(rootEl, "overlap"),
        fitViewport: getBoolean(rootEl, "fitViewport"),
        slide: getBoolean(rootEl, "slide"),
      },
      onFocusOutside(details) {
        const eventName = getString(rootEl, "onFocusOutside");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onFormatChange(details) {
        const eventName = getString(rootEl, "onFormatChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onInteractOutside(details) {
        const eventName = getString(rootEl, "onInteractOutside");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onOpenChange(details) {
        const eventName = getString(rootEl, "onOpenChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onPointerDownOutside(details) {
        const eventName = getString(rootEl, "onPointerDownOutside");
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
      onValueChangeEnd(details) {
        const eventName = getString(rootEl, "onFocusChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });
    colorPickerComponent.init();
  });
}
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeColorPicker(document),
    );
  } else {
    initializeColorPicker(document);
  }
}
