import * as collapsible from "@zag-js/collapsible";
import { VanillaMachine, normalizeProps } from "@zag-js/vanilla";

import {
  Component,
  getString,
  generateId,
  renderPart,
  getBoolean,
  valuesEqual,
  getPartIds,
} from "../lib";
export class Collapsible extends Component<collapsible.Props, collapsible.Api> {
  initMachine(props: collapsible.Props): VanillaMachine<any> {
    return new VanillaMachine(collapsible.machine, props);
  }
  initApi() {
    return collapsible.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = ["root", "trigger", "content", "indicator"];
    for (const part of parts) renderPart(this.el, part, this.api);
  }
}
export function initCollapsible(
  doc: HTMLElement | Document = document,
  selector = ".collapsible-js",
): void {
  doc.querySelectorAll<HTMLElement>(selector).forEach((rootEl) => {
    const collapsible = new Collapsible(rootEl, {
      id: generateId(rootEl, "collapsible"),
      ids: getPartIds(rootEl, ["root", "trigger", "content", "indicator"]),
      defaultOpen: getBoolean(rootEl, "defaultOpen"),
      open: getBoolean(rootEl, "open"),
      disabled: getBoolean(rootEl, "disabled"),
      onOpenChange(details) {
        const eventName = getString(rootEl, "onOpenChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onExitComplete() {
        const eventName = getString(rootEl, "onExitComplete");
        if (eventName) {
          rootEl.dispatchEvent(
            new CustomEvent(eventName, { detail: "onExitComplete" }),
          );
        }
      },
    });
    collapsible.init();
    collapsible.el.addEventListener("collapsible:set-open", (event) => {
      const { value } = (event as CustomEvent<{ value: boolean }>).detail;
      if (!valuesEqual(collapsible.api.open, value)) {
        collapsible.api.setOpen(value);
      }
    });
    collapsible.el.addEventListener("collapsible:open", (event) => {
      const detail = (
        event as CustomEvent<{ callback: (value: boolean) => void }>
      ).detail;
      const callback = detail.callback;
      if (callback && typeof callback === "function") {
        callback(collapsible.api.open);
      }
    });
  });
}
