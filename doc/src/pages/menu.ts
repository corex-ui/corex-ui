import "../main.ts";
import "@corex-ui/static/components/menu";
import "@corex-ui/design/components/menu.css";

document
  .getElementById("my-menu")
  ?.addEventListener("my-menu-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
