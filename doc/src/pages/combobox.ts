import "../main.ts";
import { initCombobox } from "@corex-ui/static";
import "./combobox.css";

initCombobox();

const formCurrency = document.getElementById(
  "my-form",
) as HTMLFormElement | null;
const resultCurrency = document.getElementById(
  "result",
) as HTMLDivElement | null;
if (formCurrency && resultCurrency) {
  formCurrency.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const formData = new FormData(formCurrency);
    const currency = (formData.get("currency") as string) || "none";
    resultCurrency.textContent = `Submitted currency: ${currency}`;
  });
}

document
  .getElementById("my-combobox")
  ?.addEventListener("my-combobox-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
