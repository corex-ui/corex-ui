import "../main.ts";
import "@corex-ui/static/components/signature-pad";
import "@corex-ui/design/components/signature-pad.css";
document
  .getElementById("my-signature-pad")
  ?.addEventListener("my-signature-pad-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
document
  .getElementById("signature-anatomy")
  ?.addEventListener("save-signature", async (event) => {
    const details = (event as CustomEvent).detail;
    console.log(details);
    const dataUrl = await details.getDataUrl("image/png");
    const preview = document.querySelector<HTMLElement>(
      '[data-part="preview"]',
    );
    console.log(preview);
    console.log(dataUrl);
    if (!preview || !dataUrl) return;
    preview.innerHTML = `
      <img src="${dataUrl}" alt="Signature preview" />
      <button class="button button--sm button--accent" id="download-signature">Save Signature</button>
    `;
    const downloadBtn = document.getElementById("download-signature");
    downloadBtn?.addEventListener("click", () => {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "signature.png";
      link.click();
    });
    console.log("Signature preview populated with save button.");
  });
const signaturePadForm = document.getElementById(
  "my-form",
) as HTMLFormElement | null;
const signatureResult = document.getElementById(
  "result",
) as HTMLDivElement | null;
if (signaturePadForm && signatureResult) {
  signaturePadForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const formData = new FormData(signaturePadForm);
    console.log(formData.getAll("signature"));
    const signature = (formData.get("signature") as string) || "none";
    signatureResult.innerHTML = `Submitted: signature: <span class="overflow-scroll scrollbar scrollbar--sm max-h-(--container-mini) block max-w-(--container-mini) break-all">${signature}</span>`;
  });
}
