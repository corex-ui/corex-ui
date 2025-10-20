import "../main.ts";
import "@corex-ui/static/components/timer";
import "@corex-ui/design/components/timer.css";

document
  .getElementById("my-timer")
  ?.addEventListener("my-timer-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
