import "../main.ts";
import { initPasswordInput } from "@corex-ui/static";
import "@corex-ui/design/components/password-input.css";

initPasswordInput();

document
  .getElementById("my-password-input")
  ?.addEventListener("my-password-input-event", (event) => {
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
    const password = (formData.get("password-input-name") as string) || "none";
    resultCurrency.textContent = `Number entered: ${password}`;
  });
}
