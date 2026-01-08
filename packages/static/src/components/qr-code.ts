import * as qrCode from "@zag-js/qr-code";
import { Direction } from "@zag-js/types";
import { VanillaMachine, normalizeProps } from "@zag-js/vanilla";

import {
  Component,
  getString,
  generateId,
  renderPart,
  getNumber,
  getBoolean,
  getPartIds,
} from "../lib";
export class QrCode extends Component<qrCode.Props, qrCode.Api> {
  initMachine(props: qrCode.Props): VanillaMachine<any> {
    return new VanillaMachine(qrCode.machine, props);
  }
  initApi(): qrCode.Api {
    return qrCode.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = ["root", "frame", "pattern", "overlay", "downloadTrigger"];
    for (const part of parts) renderPart(this.el, part, this.api);
  }
}
export function initQrCode(
  doc: HTMLElement | Document = document,
  selector = ".qr-code-js",
): void {
  doc.querySelectorAll<HTMLElement>(selector).forEach((rootEl) => {
    const directions = ["ltr", "rtl"] as const;
    const qrCode = new QrCode(rootEl, {
      id: generateId(rootEl, "qrCode"),
      ids: getPartIds(rootEl, [
        "root",
        "frame",
        "pattern",
        "overlay",
        "downloadTrigger",
      ]),
      dir: getString<Direction>(rootEl, "dir", directions),
      defaultValue: getString(rootEl, "defaultValue"),
      pixelSize: getNumber(rootEl, "pixelSize"),
      encoding: {
        boostEcc: getBoolean(rootEl, "boostEcc"),
        border: getNumber(rootEl, "border"),
        ecc: getString(rootEl, "ecc", ["L", "M", "Q", "H"]),
        invert: getBoolean(rootEl, "invert"),
        maskPattern: getNumber(rootEl, "maskPattern"),
        maxVersion: getNumber(rootEl, "maxVersion"),
        minVersion: getNumber(rootEl, "minVersion"),
        onEncoded(qr) {
          const eventName = getString(rootEl, "onEncoded");
          if (eventName) {
            queueMicrotask(() => {
              rootEl.dispatchEvent(new CustomEvent(eventName, { detail: qr }));
            });
          }
        },
      },
    });
    qrCode.init();
  });
}
