import * as passwordInput from "@zag-js/password-input";
import { Direction } from "@zag-js/types";
import {
  Component,
  VanillaMachine,
  getString,
  generateId,
  normalizeProps,
  renderPart,
  getBoolean,
} from "../lib";
export class PasswordInput extends Component<
  passwordInput.Props,
  passwordInput.Api
> {
  initMachine(props: passwordInput.Props): VanillaMachine<any> {
    return new VanillaMachine(passwordInput.machine, props);
  }
  initApi(): passwordInput.Api {
    return passwordInput.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = [
      "root",
      "input",
      "label",
      "control",
      "indicator",
      "visibility-trigger",
    ];
    for (const part of parts) renderPart(this.el, part, this.api);
  }
}
export function initializePasswordInput(
  doc: HTMLElement | Document = document,
): void {
  doc.querySelectorAll<HTMLElement>(".password-input-js").forEach((rootEl) => {
    const directions = ["ltr", "rtl"] as const;
    const passwordInput = new PasswordInput(rootEl, {
      id: generateId(rootEl, "passwordInput"),
      dir: getString<Direction>(rootEl, "dir", directions),
      autoComplete: getString(rootEl, "autoComplete", [
        "current-password",
        "new-password",
      ]),
      defaultVisible: getBoolean(rootEl, "defaultVisible"),
      disabled: getBoolean(rootEl, "disabled"),
      ignorePasswordManagers: getBoolean(rootEl, "ignorePasswordManagers"),
      invalid: getBoolean(rootEl, "invalid"),
      name: getString(rootEl, "name"),
      readOnly: getBoolean(rootEl, "readOnly"),
      required: getBoolean(rootEl, "required"),
      visible: getBoolean(rootEl, "visible"),
      onVisibilityChange(details) {
        const eventName = getString(rootEl, "onVisibilityChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });
    passwordInput.init();
  });
}
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializePasswordInput(document),
    );
  } else {
    initializePasswordInput(document);
  }
}
