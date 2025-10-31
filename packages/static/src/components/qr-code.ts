import * as qrCode from "@zag-js/qr-code";
import { Direction } from "@zag-js/types";
import {
  Component,
  VanillaMachine,
  getString,
  generateId,
  normalizeProps,
  renderPart,
  getNumber,
  getBoolean,
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
export function initializeQrCode(doc: HTMLElement | Document = document): void {
  doc.querySelectorAll<HTMLElement>(".qr-code-js").forEach((rootEl) => {
    const directions = ["ltr", "rtl"] as const;
    const qrCode = new QrCode(rootEl, {
      id: generateId(rootEl, "qrCode"),
      dir: getString<Direction>(rootEl, "dir", directions),
      defaultValue: getString(rootEl, "defaultValue"),
      pixelSize: getNumber(rootEl, "pixelSize"),
      value: getString(rootEl, "value"),
      encoding: {
        boostEcc: getBoolean(rootEl, "boostEcc"),
        border: getNumber(rootEl, "border"),
        ecc: getString(rootEl, "ecc", ["L", "M", "Q", "H"]),
        invert: getBoolean(rootEl, "invert"),
        maskPattern: getNumber(rootEl, "maskPattern"),
        maxVersion: getNumber(rootEl, "maxVersion"),
        minVersion: getNumber(rootEl, "minVersion"),
        onEncoded(qr) {
          const eventName = getString(rootEl, "onValueChange");
          if (eventName) {
            rootEl.dispatchEvent(new CustomEvent(eventName, { detail: qr }));
          }
        },
      },

      onValueChange(details: any) {
        const eventName = getString(rootEl, "onValueChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });
    qrCode.init();
  });
}
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeQrCode(document),
    );
  } else {
    initializeQrCode(document);
  }
}
