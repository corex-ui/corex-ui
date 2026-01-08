import "../main.ts";
import { initCheckbox } from "@corex-ui/static";
import "@corex-ui/design/components/checkbox.css";
initCheckbox();

document
  .getElementById("my-checkbox")
  ?.addEventListener("my-checkbox-event", (event) => {
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
    const terms = (formData.get("terms") as string) || "no";
    resultCurrency.textContent = `Terms accepted: ${terms}`;
  });
}
