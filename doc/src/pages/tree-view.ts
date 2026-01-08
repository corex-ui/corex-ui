import "../main.ts";
import { initTreeView } from "@corex-ui/static";
import "@corex-ui/design/components/tree-view.css";

initTreeView();

document
  .getElementById("my-tree-view")
  ?.addEventListener("my-tree-view-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
