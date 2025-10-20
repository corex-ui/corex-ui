import "../main.ts";
import "@corex-ui/static/components/accordion";
import "./accordion.css";

// Events
document
  .getElementById("my-accordion")
  ?.addEventListener("my-accordion-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });

// API
const accordionState = document.getElementById("accordion-api");
if (accordionState) {
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="accordion-set-value"]',
  );
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      if (value) {
        const values = value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
        accordionState.dispatchEvent(
          new CustomEvent("accordion:set-value", {
            detail: { value: values },
          }),
        );
      }
    });
  });
  const getBtns = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="accordion-value"]',
  );
  getBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      accordionState.dispatchEvent(
        new CustomEvent("accordion:value", {
          detail: {
            callback: (value: string[]) => {
              // console.log(value)
              alert("Accordion value: " + JSON.stringify(value));
            },
          },
        }),
      );
    }),
  );
} else {
  console.warn("Element with ID 'accordion-api' not found");
}
