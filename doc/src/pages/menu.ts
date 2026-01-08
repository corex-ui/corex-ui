import "../main.ts";
import { initMenu } from "@corex-ui/static";
import "@corex-ui/design/components/menu.css";

initMenu();

document
  .getElementById("my-menu")
  ?.addEventListener("my-menu-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
