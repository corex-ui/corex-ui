import "../main.ts";
import "@corex-ui/static/components/toast";
import "@corex-ui/design/components/toast.css";

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
document
  .querySelectorAll<HTMLElement>(".toast-info-attributes")
  .forEach((btn) => {
    btn.addEventListener("click", () => {
      createToast({
        title: "Profile Updated",
        description: "Your account settings have been saved successfully.",
        type: "info",
        duration: 5000,
        groupId: "toast-attributes",
      });
    });
  });
document
  .querySelectorAll<HTMLElement>(".toast-alert-attributes")
  .forEach((btn) => {
    btn.addEventListener("click", () => {
      createToast({
        title: "Failed to Save Changes",
        description:
          "There was a problem updating your profile. Please try again later.",
        type: "error",
        duration: 5000,
        groupId: "toast-attributes",
      });
    });
  });
document
  .querySelectorAll<HTMLElement>(".toast-success-attributes")
  .forEach((btn) => {
    btn.addEventListener("click", () => {
      createToast({
        title: "Payment Completed",
        description:
          "Your payment was processed successfully. Thank you for your purchase!",
        type: "success",
        duration: 5000,
        groupId: "toast-attributes",
      });
    });
  });
document
  .querySelectorAll<HTMLElement>(".toast-loading-attributes")
  .forEach((btn) => {
    btn.addEventListener("click", () => {
      createToast({
        title: "Uploading File",
        description: "Your document is currently being uploaded. Please wait…",
        type: "loading",
        groupId: "toast-attributes",
      });
    });
  });
document.querySelectorAll<HTMLElement>(".toast-settings").forEach((btn) => {
  btn.addEventListener("click", () => {
    createToast({
      title: "This is custom toast",
      description: "Open you console to see the event received.",
      type: "loading",
      duration: 10000,
      removeDelay: 0,
      onStatusChange(details: any) {
        console.log(details);
      },
    });
  });
});
