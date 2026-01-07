import "../main.ts";
import "@corex-ui/design/components/carousel.css";
import { initCarousel } from "@corex-ui/static";

initCarousel();

document
  .getElementById("my-carousel")
  ?.addEventListener("my-carousel-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
