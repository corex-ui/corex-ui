import "../main.ts";
import { initTimer } from "@corex-ui/static";
import "@corex-ui/design/components/timer.css";

initTimer();

document
  .getElementById("my-timer")
  ?.addEventListener("my-timer-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
