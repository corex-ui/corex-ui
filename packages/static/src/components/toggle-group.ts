import * as toggleGroup from "@zag-js/toggle-group";
import type { Direction, Orientation } from "@zag-js/types";
import { VanillaMachine, normalizeProps } from "@zag-js/vanilla";
import {
  Component,
  getString,
  getStringList,
  getBoolean,
  generateId,
  renderPart,
  arraysEqualUnordered,
} from "../lib";
export class ToggleGroup extends Component<toggleGroup.Props, toggleGroup.Api> {
  initMachine(props: toggleGroup.Props): VanillaMachine<any> {
    return new VanillaMachine(toggleGroup.machine, props);
  }
  initApi(): toggleGroup.Api {
    return toggleGroup.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = ["root"];
    for (const part of parts) renderPart(this.el, part, this.api);

    const items = this.el.querySelectorAll<HTMLElement>('[data-part="item"]');
    items.forEach((itemEl) => {
      const value = getString(itemEl, "value");
      const disabled = getBoolean(itemEl, "disabled");
      renderPart(itemEl, "item", this.api, { value, disabled });
    });
  }
}
export function initToggleGroup(
  doc: HTMLElement | Document = document,
  selector = ".toggle-group-js",
): void {
  doc.querySelectorAll<HTMLElement>(selector).forEach((rootEl) => {
    const directions = ["ltr", "rtl"] as const;
    const orientations = ["horizontal", "vertical"] as const;
    const toggleGroup = new ToggleGroup(rootEl, {
      id: generateId(rootEl, "toggleGroup"),
      defaultValue: getStringList(rootEl, "defaultValue"),
      loopFocus: getBoolean(rootEl, "loopFocus"),
      orientation: getString<Orientation>(rootEl, "orientation", orientations),
      dir: getString<Direction>(rootEl, "dir", directions),
      disabled: getBoolean(rootEl, "disabled"),
      rovingFocus: getBoolean(rootEl, "rovingFocus"),
      multiple: getBoolean(rootEl, "multiple"),
      deselectable: getBoolean(rootEl, "deselectable"),
      onValueChange(details) {
        const eventName = getString(rootEl, "onValueChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });
    toggleGroup.init();

    toggleGroup.el.addEventListener("toggle-group:set-value", (event) => {
      const { value } = (event as CustomEvent<{ value: string[] }>).detail;
      const current = toggleGroup.api.value;
      if (!arraysEqualUnordered(current, value)) {
        toggleGroup.api.setValue(value);
      }
    });
    toggleGroup.el.addEventListener("toggle-group:value", (event) => {
      const detail = (
        event as CustomEvent<{ callback: (value: string[]) => void }>
      ).detail;
      const callback = detail.callback;
      if (callback && typeof callback === "function") {
        callback(toggleGroup.api.value);
      }
    });
  });
}
