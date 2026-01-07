import "../main.ts";
import { initEditable } from "@corex-ui/static";
import "@corex-ui/design/components/editable.css";

initEditable();

document
  .getElementById("my-editable")
  ?.addEventListener("my-editable-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
