import "../main.ts";
import { initQrCode } from "@corex-ui/static";
import "./qr-code.css";

initQrCode();

document
  .getElementById("my-qr-code")
  ?.addEventListener("my-qr-code-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
