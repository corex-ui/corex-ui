import * as fileUpload from "@zag-js/file-upload";
import type { Direction } from "@zag-js/types";

import {
  Component,
  VanillaMachine,
  generateId,
  getBoolean,
  getString,
  getNumber,
  normalizeProps,
  renderPart,
} from "../lib";

export class FileUpload extends Component<fileUpload.Props, fileUpload.Api> {
  initMachine(props: fileUpload.Props): VanillaMachine<any> {
    return new VanillaMachine(fileUpload.machine, props);
  }

  initApi() {
    return fileUpload.connect(this.machine.service, normalizeProps);
  }

  render() {
    [
      "root",
      "dropzone",
      "hidden-input",
      "trigger",
      "item-group",
      "preview",
    ].forEach((part) => renderPart(this.el, part, this.api));
  }
}
export function initializeFileUpload(doc: HTMLElement | Document = document) {
  doc.querySelectorAll<HTMLElement>(".file-upload-js").forEach((rootEl) => {
    const directions = ["ltr", "rtl"] as const;
    const fileUploadComponent = new FileUpload(rootEl, {
      id: generateId(rootEl, "fileUpload"),
      dir: getString<Direction>(rootEl, "dir", directions),
      accept: getString(rootEl, "accept"),
      maxFiles: getNumber(rootEl, "maxFiles"),
      allowDrop: getBoolean(rootEl, "allowDrop"),
      directory: getBoolean(rootEl, "directory"),
      maxFileSize: getNumber(rootEl, "maxFileSize"),
      minFileSize: getNumber(rootEl, "minFileSize"),
      name: getString(rootEl, "name"),

      required: getBoolean(rootEl, "required"),
      onFileChange(details) {
        const eventName = getString(rootEl, "onFileAccept");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onFileReject(details) {
        const eventName = getString(rootEl, "onFileAccept");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onFileAccept(details) {
        const eventName = getString(rootEl, "onFileAccept");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });

    fileUploadComponent.init();
  });
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeFileUpload(document),
    );
  } else {
    initializeFileUpload(document);
  }
}
