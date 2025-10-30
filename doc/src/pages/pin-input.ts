import "../main.ts";
import "@corex-ui/static/components/pin-input";
import "@corex-ui/design/components/pin-input.css";

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
