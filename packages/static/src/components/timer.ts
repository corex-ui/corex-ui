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

/** Flexible parser for user input dates or times */
function parseFlexibleDate(input: string | Partial<timer.Time>): number {
  if (!input) throw new Error("Invalid date");

  if (typeof input === "string") {
    // If it contains a space, treat as local time
    if (input.includes(" ")) {
      const t = new Date(input).getTime();
      if (isNaN(t)) throw new Error(`Unable to parse date: ${input}`);
      return t;
    }

    // Otherwise parse as-is (handles ISO strings with timezone info)
    const t = new Date(input).getTime();
    if (isNaN(t)) throw new Error(`Unable to parse date: ${input}`);
    return t;
  }

  if (typeof input === "object") {
    const {
      days = 0,
      hours = 0,
      minutes = 0,
      seconds = 0,
      milliseconds = 0,
    } = input;
    return (
      ((days * 24 + hours) * 60 * 60 + minutes * 60 + seconds) * 1000 +
      milliseconds
    );
  }

  throw new Error("Invalid input");
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
    const countdown = getBoolean(rootEl, "countdown") ?? false;

    // Check for date string attributes first
    const startAttr = getString(rootEl, "start");
    const targetAttr = getString(rootEl, "target");

    let startMs: number | undefined;
    let targetMs: number | undefined;

    // Priority 1: Parse date strings if provided
    if (startAttr) {
      startMs = parseFlexibleDate(startAttr);
    }
    if (targetAttr) {
      targetMs = parseFlexibleDate(targetAttr);
    }

    // Priority 2: Fall back to individual time unit attributes
    if (!startMs) {
      const timeObj = {
        days: getNumber(rootEl, "days") || 0,
        hours: getNumber(rootEl, "hours") || 0,
        minutes: getNumber(rootEl, "minutes") || 0,
        seconds: getNumber(rootEl, "seconds") || 0,
        milliseconds: getNumber(rootEl, "milliseconds") || 0,
      };
      // Only parse if at least one value is non-zero
      if (Object.values(timeObj).some((v) => v > 0)) {
        startMs = parseFlexibleDate(timeObj);
      }
    }

    if (!targetMs) {
      const timeObj = {
        days: getNumber(rootEl, "daysTarget") || 0,
        hours: getNumber(rootEl, "hoursTarget") || 0,
        minutes: getNumber(rootEl, "minutesTarget") || 0,
        seconds: getNumber(rootEl, "secondsTarget") || 0,
        milliseconds: getNumber(rootEl, "millisecondsTarget") || 0,
      };
      // Only parse if at least one value is non-zero
      if (Object.values(timeObj).some((v) => v > 0)) {
        targetMs = parseFlexibleDate(timeObj);
      }
    }

    // Handle countdown to future date logic
    if (countdown && targetAttr && !startAttr) {
      // Countdown TO a future date: calculate duration from now
      const futureMs = parseFlexibleDate(targetAttr);
      const nowMs = Date.now();

      if (futureMs > nowMs) {
        // Set startMs to the duration between now and target
        startMs = futureMs - nowMs;
        targetMs = 0; // Count down to zero
      } else {
        // Target is in the past
        startMs = 0;
        targetMs = 0;
      }
    }

    const timerComponent = new Timer(rootEl, {
      id: generateId(rootEl, "timer"),
      countdown: countdown,
      autoStart: getBoolean(rootEl, "autoStart") ?? false,
      interval: getNumber(rootEl, "interval") || 1000,
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
