import "../main.ts";
import { initToggleGroup } from "@corex-ui/static";
import "./toggle-group.css";

initToggleGroup();

document
  .getElementById("my-toggle-group")
  ?.addEventListener("my-toggle-group-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });

const toggleGroupState = document.getElementById("toggle-group-api");
if (toggleGroupState) {
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="toggle-group-set-value"]',
  );
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      if (value) {
        const values = value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
        toggleGroupState.dispatchEvent(
          new CustomEvent("toggle-group:set-value", {
            detail: { value: values },
          }),
        );
      }
    });
  });
  const getBtns = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="toggle-group-value"]',
  );
  getBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      toggleGroupState.dispatchEvent(
        new CustomEvent("toggle-group:value", {
          detail: {
            callback: (value: string[]) => {
              alert("Accordion value: " + JSON.stringify(value));
            },
          },
        }),
      );
    }),
  );
} else {
  console.warn("Element with ID 'toggle-group-api' not found");
}
