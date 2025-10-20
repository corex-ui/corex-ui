import "../main.ts";
import "@corex-ui/static/components/switch";
import "@corex-ui/design/components/switch.css";

document
  .getElementById("my-switch")
  ?.addEventListener("my-switch-event", (event) => {
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

const switchState = document.getElementById("switch-api");
if (switchState) {
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="switch-set-checked"]',
  );
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      if (value !== undefined) {
        const boolValue = value === "true";

        switchState.dispatchEvent(
          new CustomEvent("switch:set-checked", {
            detail: { value: boolValue },
          }),
        );
      }
    });
  });
} else {
  console.warn("Element with ID 'switch-api' not found");
}
