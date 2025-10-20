import "../main.ts";
import "@corex-ui/static/components/file-upload";
import "./file-upload.css";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://pmbmemytehehldnvtetd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtYm1lbXl0ZWhlaGxkbnZ0ZXRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMDI3NTksImV4cCI6MjA3MTg3ODc1OX0.Mo0G_WLbQc953soR2hTRVpfDQKKAgS3LDo2ykZgpxfQ",
);
const root = document.getElementById("file-upload-demo")!;
const previewContainer = document.querySelector(
  '[data-part="upload-previews"]',
)!;
root.addEventListener("upload-to-supabase", async (event) => {
  const { files } = (event as CustomEvent).detail;
  if (!files || files.length === 0) return;
  for (const file of files) {
    const path = `uploads/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("corex").upload(path, file);
    if (error) {
      console.error("Upload failed:", file.name, error.message);
      continue;
    }
    const { data: publicUrl } = supabase.storage
      .from("corex")
      .getPublicUrl(path);
    const previewBlock = document.createElement("div");
    previewBlock.setAttribute("data-part", "upload-preview");
    const imageDiv = document.createElement("div");
    imageDiv.setAttribute("data-part", "image");
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement("img");
      img.src = e.target?.result as string;
      imageDiv.appendChild(img);
    };
    reader.readAsDataURL(file);
    const nameDiv = document.createElement("div");
    nameDiv.setAttribute("data-part", "name");
    nameDiv.textContent = file.name;
    const sizeDiv = document.createElement("div");
    sizeDiv.setAttribute("data-part", "size");
    sizeDiv.textContent = `${(file.size / 1024).toFixed(1)} KB`;
    const urlLink = document.createElement("a");
    urlLink.setAttribute("data-part", "url");
    urlLink.href = publicUrl.publicUrl;
    urlLink.target = "_blank";
    urlLink.textContent = publicUrl.publicUrl;
    previewBlock.appendChild(imageDiv);
    previewBlock.appendChild(nameDiv);
    previewBlock.appendChild(sizeDiv);
    previewBlock.appendChild(urlLink);
    previewContainer.appendChild(previewBlock);
    console.log("✅ Uploaded:", file.name, publicUrl.publicUrl);
  }
});

const fileUploadEl = document.getElementById("my-form-file-upload");
fileUploadEl?.addEventListener("preview-image", (event) => {
  const files = (event as CustomEvent).detail.files as File[];
  const previewContainer = document.querySelector(
    '[data-part="form-previews"]',
  );
  if (!files || files.length === 0 || !previewContainer) return;
  previewContainer.innerHTML = "";
  for (const file of files) {
    const previewBlock = document.createElement("div");
    previewBlock.setAttribute("data-part", "form-preview");
    const imageDiv = document.createElement("div");
    imageDiv.setAttribute("data-part", "image");
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement("img");
      img.src = e.target?.result as string;
      img.alt = file.name;
      img.style.maxWidth = "200px";
      imageDiv.appendChild(img);
      const urlText = document.createElement("div");
      urlText.setAttribute("data-part", "url");
      urlText.textContent = img.src;
      previewBlock.appendChild(urlText);
    };
    reader.readAsDataURL(file);
    const nameDiv = document.createElement("div");
    nameDiv.setAttribute("data-part", "name");
    nameDiv.textContent = file.name;
    const sizeDiv = document.createElement("div");
    sizeDiv.setAttribute("data-part", "size");
    sizeDiv.textContent = `${(file.size / 1024).toFixed(1)} KB`;
    previewBlock.appendChild(imageDiv);
    previewBlock.appendChild(nameDiv);
    previewBlock.appendChild(sizeDiv);
    previewContainer.appendChild(previewBlock);
  }
});

const formImage = document.getElementById("my-form") as HTMLFormElement | null;
const resultDiv = document.getElementById("result") as HTMLDivElement | null;
formImage?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!formImage) return;
  const formData = new FormData(formImage);
  console.log("FormData entries:");
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }
  const file = formData.get("image") as File | null;
  if (!file) {
    if (resultDiv) resultDiv.textContent = "⚠️ No file selected.";
    return;
  }
  if (resultDiv) {
    resultDiv.textContent = `✅ File submitted: ${file.name}`;
  }
});
