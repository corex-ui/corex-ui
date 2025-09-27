import * as editable from "@zag-js/editable";
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
  valuesEqual,
} from "../lib";
export class Editable extends Component<editable.Props, editable.Api> {
  initMachine(props: editable.Props): VanillaMachine<any> {
    return new VanillaMachine(editable.machine, props);
  }
  initApi(): editable.Api {
    return editable.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = [
      "root",
      "area",
      "input",
      "preview",
      "edit-trigger",
      "submit-trigger",
      "cancel-trigger",
    ];
    for (const part of parts) renderPart(this.el, part, this.api);
  }
}
export function initializeEditable(
  doc: HTMLElement | Document = document,
): void {
  doc.querySelectorAll<HTMLElement>(".editable-js").forEach((rootEl) => {
    const activationModes = ["focus", "dblclick", "click", "none"] as const;
    const submitModes = ["enter", "blur", "both", "none"] as const;
    const directions = ["ltr", "rtl"] as const;
    const editable = new Editable(rootEl, {
      id: generateId(rootEl, "editable"),
      defaultValue: getString(rootEl, "defaultValue"),
      dir: getString<Direction>(rootEl, "dir", directions),
      activationMode: getString(rootEl, "activationMode", activationModes),
      autoResize: getBoolean(rootEl, "autoResize") || true,
      defaultEdit: getBoolean(rootEl, "defaultEdit"),
      disabled: getBoolean(rootEl, "disabled"),
      edit: getBoolean(rootEl, "edit"),
      form: getString(rootEl, "form"),
      submitMode: getString(rootEl, "submitMode", submitModes),
      invalid: getBoolean(rootEl, "invalid"),
      maxLength: getNumber(rootEl, "maxLength"),
      name: getString(rootEl, "name"),
      placeholder: getString(rootEl, "placeholder"),
      readOnly: getBoolean(rootEl, "readOnly"),
      required: getBoolean(rootEl, "required"),
      selectOnFocus: getBoolean(rootEl, "selectOnFocus"),
      value: getString(rootEl, "value"),
      onEditChange(details) {
        const eventName = getString(rootEl, "onEditChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onFocusOutside(details) {
        const eventName = getString(rootEl, "onFocusOutside");
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
      onValueCommit(details) {
        const eventName = getString(rootEl, "onValueCommit");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onValueRevert(details) {
        const eventName = getString(rootEl, "onValueRevert");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });
    editable.init();
    editable.el.addEventListener("editable:set-value", (event) => {
      const { value } = (event as CustomEvent<{ value: string }>).detail;
      const current = editable.api.value;
      if (!valuesEqual(current, value)) {
        editable.api.setValue(value);
      }
    });
  });
}
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeEditable(document),
    );
  } else {
    initializeEditable(document);
  }
}
