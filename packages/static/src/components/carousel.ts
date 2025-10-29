import * as carousel from "@zag-js/carousel";
import type { Direction, Orientation } from "@zag-js/types";
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

export class Carousel extends Component<carousel.Props, carousel.Api> {
  initMachine(props: carousel.Props): VanillaMachine<any> {
    return new VanillaMachine(carousel.machine, props);
  }

  initApi(): carousel.Api {
    return carousel.connect(this.machine.service, normalizeProps);
  }

  render() {
    const itemsPart = Array.from(
      this.el.querySelectorAll<HTMLElement>('[data-part="item"]'),
    );
    itemsPart.forEach((itemEl, index) => {
      itemEl.setAttribute("data-index", index.toString());
    });

    const indicatorGroup = this.el.querySelector<HTMLElement>(
      '[data-part="indicator-group"]',
    );
    if (indicatorGroup) {
      const pageCount = this.api.pageSnapPoints.length;
      const buttons = Array.from(
        indicatorGroup.querySelectorAll<HTMLButtonElement>(
          '[data-part="indicator"]',
        ),
      );
      for (let i = buttons.length; i < pageCount; i++) {
        const button = document.createElement("button");
        button.setAttribute("data-part", "indicator");
        button.setAttribute("data-index", i.toString());
        indicatorGroup.appendChild(button);
      }
    }

    const parts = [
      "root",
      "control",
      "prev-trigger",
      "next-trigger",
      "autoplay-trigger",
      "item-group",
      "indicator-group",
    ];
    for (const part of parts) renderPart(this.el, part, this.api);

    const items = ["item", "indicator"];
    for (const item of items)
      renderPart(this.el, item, this.api, { index: "number" });
  }
}

export function initializeCarousel(
  doc: HTMLElement | Document = document,
): void {
  doc.querySelectorAll<HTMLElement>(".carousel-js").forEach((rootEl) => {
    const directions = ["ltr", "rtl"] as const;
    const orientations = ["horizontal", "vertical"] as const;
    const snapTypes = ["proximity", "mandatory"] as const;

    const itemCount =
      rootEl.querySelectorAll<HTMLElement>('[data-part="item"]').length;

    const carousel = new Carousel(rootEl, {
      id: generateId(rootEl, "carousel"),
      slideCount: itemCount,
      slidesPerPage: getNumber(rootEl, "slidesPerPage"),
      loop: getBoolean(rootEl, "loop"),
      allowMouseDrag: getBoolean(rootEl, "allowMouseDrag") ?? true,
      autoplay: getBoolean(rootEl, "autoplay")
        ? getNumber(rootEl, "delay") !== undefined
          ? { delay: getNumber(rootEl, "delay")! }
          : undefined
        : false,
      defaultPage: getNumber(rootEl, "defaultPage"),
      padding: getString(rootEl, "padding"),
      page: getNumber(rootEl, "page"),
      slidesPerMove:
        getNumber(rootEl, "slidesPerMove") ??
        (getString(rootEl, "slidesPerMove") === "auto" ? "auto" : undefined),
      snapType: getString(rootEl, "snapType", snapTypes),
      spacing: getString(rootEl, "spacing"),
      inViewThreshold: getNumber(rootEl, "inViewThreshold"),
      orientation: getString<Orientation>(rootEl, "orientation", orientations),
      dir: getString<Direction>(rootEl, "dir", directions),
      onAutoplayStatusChange(details) {
        const eventName = getString(rootEl, "onAutoplayStatusChange");
        if (eventName)
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
      },
      onDragStatusChange(details) {
        const eventName = getString(rootEl, "onDragStatusChange");
        if (eventName)
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
      },
      onPageChange(details) {
        const eventName = getString(rootEl, "onPageChange");
        if (eventName)
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
      },
    });

    carousel.init();
  });
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeCarousel(document),
    );
  } else {
    initializeCarousel(document);
  }
}
