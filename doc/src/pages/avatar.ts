import "../main.ts";
import "@corex-ui/static/components/avatar";
import "./avatar.css";

document
  .getElementById("my-avatar")
  ?.addEventListener("my-avatar-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
