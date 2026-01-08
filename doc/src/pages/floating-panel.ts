import "../main.ts";
import { initFloatingPanel } from "@corex-ui/static";
import "@corex-ui/design/components/floating-panel.css";

initFloatingPanel();

document
  .getElementById("my-floating panel")
  ?.addEventListener("my-floating-panel-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
