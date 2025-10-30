import "../main.ts";
import "@corex-ui/static/components/collapsible";
import "@corex-ui/design/components/collapsible.css";

document
  .getElementById("my-collapsible")
  ?.addEventListener("my-collapsible-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });

// API
const collapsibleState = document.getElementById("collapsible-api");
if (collapsibleState) {
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="collapsible-set-open"]',
  );
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      if (value) {
        collapsibleState.dispatchEvent(
          new CustomEvent("collapsible:set-open", {
            detail: { value: value.toLowerCase() === "true" },
          }),
        );
      }
    });
  });
  const getBtns = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="collapsible-open"]',
  );
  getBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      collapsibleState.dispatchEvent(
        new CustomEvent("collapsible:open", {
          detail: {
            callback: (value: string[]) => {
              alert("Collapsible value: " + JSON.stringify(value));
            },
          },
        }),
      );
    }),
  );
} else {
  console.warn("Element with ID 'collapsible-api' not found");
}
