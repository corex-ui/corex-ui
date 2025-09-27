import * as dialog from "@zag-js/dialog";
import type { Direction } from "@zag-js/types";
import {
  Component,
  VanillaMachine,
  getString,
  getBoolean,
  generateId,
  normalizeProps,
  renderPart,
  valuesEqual,
} from "../lib";
export class Dialog extends Component<dialog.Props, dialog.Api> {
  initMachine(props: dialog.Props): VanillaMachine<any> {
    return new VanillaMachine(dialog.machine, props);
  }
  initApi(): dialog.Api {
    return dialog.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = [
      "content",
      "title",
      "trigger",
      "backdrop",
      "positioner",
      "description",
      "close-trigger",
    ];
    for (const part of parts) {
      const node = this.el.querySelector(`[data-part="${part}"]`);
      if (node) renderPart(this.el, part, this.api);
    }
  }
}
export function initializeDialog(doc: HTMLElement | Document = document): void {
  doc.querySelectorAll<HTMLElement>(".dialog-js").forEach((rootEl) => {
    const directions = ["ltr", "rtl"] as const;
    const roles = ["dialog", "alertdialog"] as const;
    const dialog = new Dialog(rootEl, {
      id: generateId(rootEl, "dialog"),
      "aria-label": getString(rootEl, "aria-label"),
      defaultOpen: getBoolean(rootEl, "loopFocus"),
      dir: getString<Direction>(rootEl, "dir", directions),
      modal: getBoolean(rootEl, "modal"),
      open: getBoolean(rootEl, "open"),
      preventScroll: getBoolean(rootEl, "preventScroll"),
      restoreFocus: getBoolean(rootEl, "restoreFocus"),
      trapFocus: getBoolean(rootEl, "trapFocus"),
      closeOnInteractOutside: getBoolean(rootEl, "closeOnInteractOutside"),
      closeOnEscape: getBoolean(rootEl, "closeOnEscape"),
      role: getString(rootEl, "dir", roles),
      onOpenChange(details: any) {
        const eventName = getString(rootEl, "onOpenChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });
    dialog.init();
    dialog.el.addEventListener("dialog:set-open", (event) => {
      const { value } = (event as CustomEvent<{ value: boolean }>).detail;
      if (!valuesEqual(dialog.api.open, value)) {
        dialog.api.setOpen(value);
      }
    });
    dialog.el.addEventListener("dialog:open", (event) => {
      const detail = (
        event as CustomEvent<{ callback: (value: boolean) => void }>
      ).detail;
      const callback = detail.callback;
      if (callback && typeof callback === "function") {
        callback(dialog.api.open);
      }
    });
  });
}
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeDialog(document),
    );
  } else {
    initializeDialog(document);
  }
}
