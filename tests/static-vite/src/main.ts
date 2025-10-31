import "./style.css";
import "@corex-ui/static";

import { createToast } from "@corex-ui/static/components/toast";

document.querySelectorAll<HTMLElement>(".toast-info").forEach((btn) => {
  btn.addEventListener("click", () => {
    createToast({
      title: "Profile Updated",
      description: "Your account settings have been saved successfully.",
      type: "info",
      duration: 5000,
    });
  });
});
document.querySelectorAll<HTMLElement>(".toast-alert").forEach((btn) => {
  btn.addEventListener("click", () => {
    createToast({
      title: "Failed to Save Changes",
      description:
        "There was a problem updating your profile. Please try again later.",
      type: "error",
      duration: 5000,
    });
  });
});
document.querySelectorAll<HTMLElement>(".toast-success").forEach((btn) => {
  btn.addEventListener("click", () => {
    createToast({
      title: "Payment Completed",
      description:
        "Your payment was processed successfully. Thank you for your purchase!",
      type: "success",
      duration: 5000,
    });
  });
});
document.querySelectorAll<HTMLElement>(".toast-loading").forEach((btn) => {
  btn.addEventListener("click", () => {
    createToast({
      title: "Uploading File",
      description: "Your document is currently being uploaded. Please wait…",
      type: "loading",
    });
  });
});
