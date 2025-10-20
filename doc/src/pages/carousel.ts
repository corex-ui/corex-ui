import "../main.ts";
import "@corex-ui/static/components/carousel";
import "@corex-ui/design/components/carousel.css";

document
  .getElementById("my-carousel")
  ?.addEventListener("my-carousel-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
