import "../main.ts";
import "@corex-ui/static/components/tree-view";
import "@corex-ui/design/components/tree-view.css";

document
  .getElementById("my-tree-view")
  ?.addEventListener("my-tree-view-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
