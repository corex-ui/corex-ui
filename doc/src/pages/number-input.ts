import "../main.ts";
import "@corex-ui/static/components/number-input";
import "@corex-ui/design/components/number-input.css";

document
  .getElementById("my-number-input")
  ?.addEventListener("my-number-input-event", (event) => {
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
    const number = (formData.get("number-input-name") as string) || "none";
    resultCurrency.textContent = `Number entered: ${number}`;
  });
}
