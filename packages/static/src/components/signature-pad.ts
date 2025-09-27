import * as signaturePad from "@zag-js/signature-pad";
import type { Direction } from "@zag-js/types";
import {
  Component,
  VanillaMachine,
  getBoolean,
  getNumber,
  generateId,
  normalizeProps,
  renderPart,
  getString,
  // renderItem,
  getStringList,
} from "../lib";
export class SignaturePad extends Component<
  signaturePad.Props,
  signaturePad.Api
> {
  initMachine(props: signaturePad.Props): VanillaMachine<any> {
    return new VanillaMachine(signaturePad.machine, props);
  }
  initApi(): signaturePad.Api {
    return signaturePad.connect(this.machine.service, normalizeProps);
  }
  async render() {
    const svg = this.el.querySelector<SVGElement>('[data-part="segment"]');
    if (!svg) return;

    svg.innerHTML = "";

    this.api.paths.forEach((path) => {
      const pathEl = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      const props = this.api.getSegmentPathProps({ path });
      for (const [key, value] of Object.entries(props)) {
        if (value != null) pathEl.setAttribute(key, String(value));
      }
      svg.appendChild(pathEl);
    });

    if (this.api.currentPath) {
      const currentPathEl = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      const props = this.api.getSegmentPathProps({
        path: this.api.currentPath,
      });
      for (const [key, value] of Object.entries(props)) {
        if (value != null) currentPathEl.setAttribute(key, String(value));
      }
      svg.appendChild(currentPathEl);
    }
    const parts = [
      "root",
      "label",
      "control",
      "segment",
      "clear-trigger",
      "guide",
    ];
    for (const part of parts) renderPart(this.el, part, this.api);
    const dataUrl = await this.api.getDataUrl("image/png");
    renderPart(this.el, "hidden-input", this.api, { value: dataUrl });
  }
}
export function initializeSignaturePad(
  doc: HTMLElement | Document = document,
): void {
  doc.querySelectorAll<HTMLElement>(".signature-pad-js").forEach((rootEl) => {
    const directions = ["ltr", "rtl"] as const;
    const signaturePad = new SignaturePad(rootEl, {
      id: generateId(rootEl, "signaturePad"),
      defaultPaths: getStringList(rootEl, "defaultPaths"),
      dir: getString<Direction>(rootEl, "dir", directions),
      disabled: getBoolean(rootEl, "disabled"),
      name: getString(rootEl, "name"),
      readOnly: getBoolean(rootEl, "readOnly"),
      required: getBoolean(rootEl, "required"),
      paths: getStringList(rootEl, "paths"),
      drawing: {
        fill: getString(rootEl, "fill"),
        size: getNumber(rootEl, "size"),
        simulatePressure: getBoolean(rootEl, "simulatePressure"),
      },
      onDrawEnd(details) {
        const eventName = getString(rootEl, "onDrawEnd");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onDraw(details) {
        const eventName = getString(rootEl, "onDraw");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });
    signaturePad.init();
  });
}
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeSignaturePad(document),
    );
  } else {
    initializeSignaturePad(document);
  }
}
