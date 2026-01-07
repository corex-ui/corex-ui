import "../main.ts";
import { initSelect } from "@corex-ui/static";
import "@corex-ui/design/components/select.css";

initSelect();

const selectForm = document.getElementById("my-form") as HTMLFormElement | null;
const seectResult = document.getElementById("result") as HTMLDivElement | null;

if (selectForm && seectResult) {
  selectForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const formData = new FormData(selectForm);
    console.log(formData.getAll("currency"));
    const currency = (formData.get("currency") as string) || "none";
    seectResult.textContent = `Submitted: currency: ${currency}`;
  });
}
