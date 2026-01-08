import "../main.ts";
import { initPinInput } from "@corex-ui/static";
import "@corex-ui/design/components/pin-input.css";

initPinInput();

document
  .getElementById("my-pin-input")
  ?.addEventListener("my-pin-input-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });

const form = document.getElementById("my-form") as HTMLFormElement | null;
const resultCurrency = document.getElementById(
  "result",
) as HTMLDivElement | null;
if (form && resultCurrency) {
  form.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const formData = new FormData(form);
    const pin = (formData.get("pin-input-name") as string) || "none";
    resultCurrency.textContent = `Number entered: ${pin}`;
  });
}

document
  .getElementById("my-pin-input")
  ?.addEventListener("my-pin-input-change-event", (event) => {
    console.log("Value changed:", (event as CustomEvent).detail);
  });

document
  .getElementById("my-pin-input")
  ?.addEventListener("my-pin-input-complete-event", (event) => {
    console.log("Value complete:", (event as CustomEvent).detail);
  });

document
  .getElementById("my-pin-input")
  ?.addEventListener("my-pin-input-invalid-event", (event) => {
    console.log("Value invalid:", (event as CustomEvent).detail);
  });
