import * as timer from "@zag-js/timer";
import {
  Component,
  VanillaMachine,
  getString,
  getBoolean,
  getNumber,
  generateId,
  normalizeProps,
  renderPart,
  renderItem,
} from "../lib";
declare global {
  var IS_PRERENDER: boolean;
}

export class Timer extends Component<timer.Props, timer.Api> {
  initMachine(props: timer.Props): VanillaMachine<any> {
    return new VanillaMachine(timer.machine, props);
  }
  initApi(): timer.Api {
    return timer.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = ["root", "area", "control"];
    for (const part of parts) renderPart(this.el, part, this.api);
    const items = ["item", "separator", "action-trigger"];
    for (const item of items) renderItem(this.el, item, this.api);
    document
      .querySelectorAll(`[data-start-timer="${this.el.id}"]`)
      .forEach((el) => {
        el.addEventListener("click", () => this.api.start());
      });
    document
      .querySelectorAll(`[data-resume-timer="${this.el.id}"]`)
      .forEach((el) => {
        el.addEventListener("click", () => this.api.resume());
      });
    document
      .querySelectorAll(`[data-pause-timer="${this.el.id}"]`)
      .forEach((el) => {
        el.addEventListener("click", () => this.api.pause());
      });
  }
}
export function initializeTimer(doc: HTMLElement | Document = document): void {
  doc.querySelectorAll<HTMLElement>(".timer-js").forEach((rootEl) => {
    const startMs = timer.parse({
      days: getNumber(rootEl, "days"),
      hours: getNumber(rootEl, "hours"),
      minutes: getNumber(rootEl, "minutes"),
      seconds: getNumber(rootEl, "seconds"),
      milliseconds: getNumber(rootEl, "milliseconds"),
    });
    const targetMs = timer.parse({
      days: getNumber(rootEl, "daysTarget"),
      hours: getNumber(rootEl, "hoursTarget"),
      minutes: getNumber(rootEl, "minutesTarget"),
      seconds: getNumber(rootEl, "secondsTarget"),
      milliseconds: getNumber(rootEl, "millisecondsTarget"),
    });

    const timerComponent = new Timer(rootEl, {
      id: generateId(rootEl, "timer"),
      countdown: getBoolean(rootEl, "countdown"),
      autoStart: getBoolean(rootEl, "autoStart"),
      interval: getNumber(rootEl, "interval"),
      startMs: startMs,
      targetMs: targetMs,
      onTick(details) {
        if (globalThis.IS_PRERENDER) return;
        const eventName = getString(rootEl, "onTick");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onComplete() {
        if (globalThis.IS_PRERENDER) return;
        const eventName = getString(rootEl, "onComplete");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName));
        }
      },
    });

    if (!globalThis.IS_PRERENDER) {
      timerComponent.init();
    } else {
      timerComponent.render();
    }
  });
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeTimer(document),
    );
  } else {
    initializeTimer(document);
  }
}
