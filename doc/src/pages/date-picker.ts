import "../main.ts";
import { initDatePicker } from "@corex-ui/static";
import "@corex-ui/design/components/date-picker.css";

initDatePicker();

document
  .getElementById("my-date-picker")
  ?.addEventListener("my-date-picker-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
const formBirth = document.getElementById(
  "my-form-birth",
) as HTMLFormElement | null;
const resultBirth = document.getElementById("result") as HTMLDivElement | null;
if (formBirth && resultBirth) {
  formBirth.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const formData = new FormData(formBirth);
    const dateOfBirth = formData.get("date-of-birth") as string;
    resultBirth.textContent = `Submitted: birth day: ${dateOfBirth}`;
  });
}
