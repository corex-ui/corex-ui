import "../main.ts";
import "@corex-ui/static/components/editable";
import "@corex-ui/design/components/editable.css";

document
  .getElementById("my-editable")
  ?.addEventListener("my-editable-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
