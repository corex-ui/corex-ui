import "../main.ts";
import "@corex-ui/static/components/floating-panel";
import "@corex-ui/design/components/floating-panel.css";

document
  .getElementById("my-floating panel")
  ?.addEventListener("my-floating-panel-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
