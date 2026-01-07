import "../main.ts";
import { initAvatar } from "@corex-ui/static";
import "./avatar.css";

initAvatar();

document
  .getElementById("my-avatar")
  ?.addEventListener("my-avatar-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
