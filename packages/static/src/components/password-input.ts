import * as passwordInput from "@zag-js/password-input";
import { Direction } from "@zag-js/types";
import { VanillaMachine, normalizeProps } from "@zag-js/vanilla";
import {
  Component,
  getString,
  generateId,
  renderPart,
  getBoolean,
  getPartIds,
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
export function initPasswordInput(
  doc: HTMLElement | Document = document,
  selector = ".password-input-js",
): void {
  doc.querySelectorAll<HTMLElement>(selector).forEach((rootEl) => {
    const directions = ["ltr", "rtl"] as const;
    const passwordInput = new PasswordInput(rootEl, {
      id: generateId(rootEl, "passwordInput"),
      ids: getPartIds(rootEl, [
        "root",
        "input",
        "label",
        "control",
        "indicator",
        "visibility-trigger",
      ]),
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
