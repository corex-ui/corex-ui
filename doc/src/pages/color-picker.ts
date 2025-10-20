import "../main.ts";
import "@corex-ui/static/components/color-picker";
import "@corex-ui/design/components/color-picker.css";

document
  .getElementById("my-color-picker")
  ?.addEventListener("my-color-picker-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
