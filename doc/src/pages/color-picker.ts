import "../main.ts";
import { initColorPicker } from "@corex-ui/static";
import "@corex-ui/design/components/color-picker.css";

initColorPicker();

document
  .getElementById("my-color-picker")
  ?.addEventListener("my-color-picker-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
