import "../main.ts";
import { initNumberInput } from "@corex-ui/static";
import "@corex-ui/design/components/number-input.css";

initNumberInput();

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

const numberInputState = document.getElementById("number-input-api");
if (numberInputState) {
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="number-input-set-value"]',
  );
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      if (value && !isNaN(Number(value))) {
        numberInputState.dispatchEvent(
          new CustomEvent("number-input:set-value", {
            detail: { value },
            bubbles: true,
          }),
        );
      }
    });
  });
  const getBtns = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="number-input-value"]',
  );
  getBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      numberInputState.dispatchEvent(
        new CustomEvent("number-input:value", {
          detail: {
            callback: (value: string) => {
              alert("Number Input value: " + value);
            },
          },
        }),
      );
    }),
  );
} else {
  console.warn("Element with ID 'number-input-api' not found");
}
