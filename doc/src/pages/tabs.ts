import "../main.ts";
import { initTabs } from "@corex-ui/static";
import "@corex-ui/design/components/tabs.css";

initTabs();

document
  .getElementById("my-tabs")
  ?.addEventListener("my-tabs-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
