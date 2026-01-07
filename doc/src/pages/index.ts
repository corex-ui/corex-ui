import "../main.ts";
import "./index.css";
import {
  initAngleSlider,
  initCombobox,
  initTimer,
  initSwitch,
  initClipboard,
  initDatePicker,
  initColorPicker,
  initSignaturePad,
  initToast,
  createToast,
} from "@corex-ui/static";

initAngleSlider();
initCombobox();
initTimer();
initSwitch();
initClipboard();
initDatePicker();
initColorPicker();
initSignaturePad();
initToast();

document
  .getElementById("angle-slider-rotate")
  ?.addEventListener("rotate-image", (event) => {
    const { value } = (event as CustomEvent).detail;
    const consoleEl = document.getElementById("console");
    if (consoleEl) {
      consoleEl.textContent = JSON.stringify(
        (event as CustomEvent).detail,
        null,
        2,
      ); // pretty-print
    }
    const el = document.getElementById("rotate");
    if (el) {
      el.style.transform = `rotate(${value}deg)`;
      el.style.transformOrigin = "center";
    }
  });
const form = document.getElementById("my-form") as HTMLFormElement | null;
const resultCurrency = document.getElementById(
  "result",
) as HTMLDivElement | null;
if (form && resultCurrency) {
  form.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const formData = new FormData(form);
    const terms = (formData.get("terms") as string) || "none";
    resultCurrency.textContent = `Terms accepted: ${terms}`;
  });
}
const formCurrency = document.getElementById(
  "my-form-combobox",
) as HTMLFormElement | null;
const resultCurrencyCombobox = document.getElementById(
  "result-combobox",
) as HTMLDivElement | null;
if (formCurrency && resultCurrencyCombobox) {
  formCurrency.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const formData = new FormData(formCurrency);
    const currency = (formData.get("currency") as string) || "none";
    resultCurrencyCombobox.textContent = `Submitted currency: ${currency}`;
  });
}
const selectForm = document.getElementById(
  "my-form-select",
) as HTMLFormElement | null;
const seectResult = document.getElementById(
  "result-select",
) as HTMLDivElement | null;
if (selectForm && seectResult) {
  selectForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const formData = new FormData(selectForm);
    console.log(formData.getAll("currency"));
    const currency = (formData.get("currency") as string) || "none";
    seectResult.textContent = `Submitted: currency: ${currency}`;
  });
}
const signaturePadForm = document.getElementById(
  "my-form-signature",
) as HTMLFormElement | null;
const signatureResult = document.getElementById(
  "result-signature",
) as HTMLDivElement | null;
if (signaturePadForm && signatureResult) {
  signaturePadForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const formData = new FormData(signaturePadForm);
    console.log(formData.getAll("signature"));
    const signature = (formData.get("signature") as string) || "none";
    signatureResult.innerHTML = `Submitted: signature: <span class="overflow-scroll scrollbar scrollbar--sm max-h-(--spacing-ui) block max-w-(--container-mini) break-all">${signature}</span>`;
  });
}
const formCookies = document.getElementById(
  "form-cookies",
) as HTMLFormElement | null;
if (formCookies) {
  formCookies.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const formData = new FormData(formCookies);
    const required = (formData.get("required") as string) || "not accepted";
    const functional = (formData.get("functional") as string) || "not accepted";
    console.log(`Required: ${required}`);
    console.log(`Required: ${functional}`);
    createToast({
      title: "Cookies updated",
      description: `Cookies setting saved..
                          (Dev: Open console to see the data submitted)
                          `,
      type: "success",
      duration: 5000,
    });
  });
}
const formVisa = document.getElementById("form-visa") as HTMLFormElement | null;
if (formVisa) {
  formVisa.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const formData = new FormData(formVisa);
    const signature = (formData.get("signature") as string) || "";
    console.log(`Signature: ${signature}`);
    if (!signature.trim()) {
      createToast({
        title: "Application error",
        description: "The signature is required before submitting.",
        type: "error",
        duration: 5000,
      });
      return;
    } else {
      createToast({
        title: "Application submitted",
        description: `Thank you for your application.
        (Dev: Open console to see the data submitted)`,
        type: "success",
        duration: 5000,
      });
    }
  });
}
