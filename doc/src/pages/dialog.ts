import "../main.ts";
import { initDialog } from "@corex-ui/static";
import "@corex-ui/design/components/dialog.css";

initDialog();

// Events
document
  .getElementById("my-dialog")
  ?.addEventListener("my-dialog-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });

// API
const dialogState = document.getElementById("dialog-api");
if (dialogState) {
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="dialog-set-open"]',
  );
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      if (value !== undefined) {
        const boolValue = value === "true";
        dialogState.dispatchEvent(
          new CustomEvent("dialog:set-open", {
            detail: { value: boolValue },
          }),
        );
      }
    });
  });
} else {
  console.warn("Element with ID 'dialog-api' not found");
}
