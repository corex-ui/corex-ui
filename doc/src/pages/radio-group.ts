import "../main.ts";
import { initRadioGroup } from "@corex-ui/static";
import "./radio-group.css";

initRadioGroup();

document
  .getElementById("my-radio-group")
  ?.addEventListener("my-radio-group-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });

const radioGroupState = document.getElementById("radio-group-api");
if (radioGroupState) {
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="radio-group-set-value"]',
  );
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      if (value) {
        radioGroupState.dispatchEvent(
          new CustomEvent("radio-group:set-value", {
            detail: { value },
          }),
        );
      }
    });
  });
  const getBtns = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="radio-group-value"]',
  );
  getBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      radioGroupState.dispatchEvent(
        new CustomEvent("radio-group:value", {
          detail: {
            callback: (value: string | null) => {
              alert("Radio Group value: " + (value ?? "none"));
            },
          },
        }),
      );
    }),
  );
} else {
  console.warn("Element with ID 'radio-group-api' not found");
}
