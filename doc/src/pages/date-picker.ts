import "../main.ts";
import "@corex-ui/static/components/date-picker";
import "@corex-ui/design/components/date-picker.css";

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
