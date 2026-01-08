import * as avatar from "@zag-js/avatar";
import { Direction } from "@zag-js/types";
import { VanillaMachine, normalizeProps } from "@zag-js/vanilla";
import { Component, getString, generateId, renderPart } from "../lib";
export class Avatar extends Component<avatar.Props, avatar.Api> {
  initMachine(props: avatar.Props): VanillaMachine<any> {
    return new VanillaMachine(avatar.machine, props);
  }
  initApi(): avatar.Api {
    return avatar.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = ["root", "fallback", "image"];
    for (const part of parts) renderPart(this.el, part, this.api);
  }
}
export function initAvatar(
  doc: HTMLElement | Document = document,
  selector = ".avatar-js",
): void {
  doc.querySelectorAll<HTMLElement>(selector).forEach((rootEl) => {
    const directions = ["ltr", "rtl"] as const;
    const avatar = new Avatar(rootEl, {
      id: generateId(rootEl, "avatar"),
      dir: getString<Direction>(rootEl, "dir", directions),
      onStatusChange(details: any) {
        const eventName = getString(rootEl, "onStatusChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });
    avatar.init();
  });
}
