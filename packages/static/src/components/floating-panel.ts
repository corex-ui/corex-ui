import * as floatingPanel from "@zag-js/floating-panel";
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
} from "../lib";
export class FloatingPanel extends Component<
  floatingPanel.Props,
  floatingPanel.Api
> {
  initMachine(props: floatingPanel.Props): VanillaMachine<any> {
    return new VanillaMachine(floatingPanel.machine, props);
  }
  initApi(): floatingPanel.Api {
    return floatingPanel.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = [
      "trigger",
      "positioner",
      "content",
      "drag-trigger",
      "header",
      "controls",
      "body",
      "close-trigger",
    ];
    for (const part of parts) renderPart(this.el, part, this.api);
    const stageItems = ["stage-trigger"];
    for (const item of stageItems)
      renderPart(this.el, item, this.api, { stage: "string" });
    const resizeItems = ["resize-trigger"];
    for (const item of resizeItems)
      renderPart(this.el, item, this.api, { axis: "string" });
  }
}
export function initializeFloatingPanel(
  doc: HTMLElement | Document = document,
): void {
  doc.querySelectorAll<HTMLElement>(".floating-panel-js").forEach((rootEl) => {
    const strategies = ["absolute", "fixed"] as const;
    const directions = ["ltr", "rtl"] as const;
    const defaultPositionX = getNumber(rootEl, "defaultPositionX");
    const defaultPositionY = getNumber(rootEl, "defaultPositionY");
    const defaultSizeWidth = getNumber(rootEl, "defaultSizeWidth");
    const defaultSizeHeight = getNumber(rootEl, "defaultSizeHeight");
    const positionX = getNumber(rootEl, "positionX");
    const positionY = getNumber(rootEl, "positionY");
    const maxSizeWidth = getNumber(rootEl, "maxSizeWidth");
    const maxSizeHeight = getNumber(rootEl, "maxSizeHeight");
    const minSizeWidth = getNumber(rootEl, "minSizeWidth");
    const minSizeHeight = getNumber(rootEl, "minSizeHeight");
    const floatingPanel = new FloatingPanel(rootEl, {
      id: generateId(rootEl, "floatingPanel"),
      allowOverflow: getBoolean(rootEl, "allowOverflow"),
      lockAspectRatio: getBoolean(rootEl, "lockAspectRatio"),
      strategy: getString(rootEl, "strategy", strategies),
      closeOnEscape: getBoolean(rootEl, "closeOnEscape"),
      defaultOpen: getBoolean(rootEl, "defaultOpen"),
      defaultPosition:
        defaultPositionX !== undefined && defaultPositionY !== undefined
          ? { x: defaultPositionX, y: defaultPositionY }
          : undefined,
      defaultSize:
        defaultSizeWidth !== undefined && defaultSizeHeight !== undefined
          ? { width: defaultSizeWidth, height: defaultSizeHeight }
          : undefined,
      position:
        positionX !== undefined && positionY !== undefined
          ? { x: positionX, y: positionY }
          : undefined,
      maxSize:
        maxSizeWidth !== undefined && maxSizeHeight !== undefined
          ? { width: maxSizeWidth, height: maxSizeHeight }
          : undefined,
      minSize:
        minSizeWidth !== undefined && minSizeHeight !== undefined
          ? { width: minSizeWidth, height: minSizeHeight }
          : undefined,
      dir: getString<Direction>(rootEl, "dir", directions),
      disabled: getBoolean(rootEl, "disabled"),
      draggable: getBoolean(rootEl, "draggable"),
      gridSize: getNumber(rootEl, "closeOnEscape"),
      open: getBoolean(rootEl, "open"),
      persistRect: getBoolean(rootEl, "persistRect"),
      resizable: getBoolean(rootEl, "resizable"),
      onOpenChange(details) {
        const eventName = getString(rootEl, "onOpenChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onPositionChange(details) {
        const eventName = getString(rootEl, "onPositionChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onPositionChangeEnd(details) {
        const eventName = getString(rootEl, "onPositionChangeEnd");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onSizeChange(details) {
        const eventName = getString(rootEl, "onSizeChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onSizeChangeEnd(details) {
        const eventName = getString(rootEl, "onSizeChangeEnd");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onStageChange(details) {
        const eventName = getString(rootEl, "onStageChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });
    floatingPanel.init();
  });
}
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeFloatingPanel(document),
    );
  } else {
    initializeFloatingPanel(document);
  }
}
