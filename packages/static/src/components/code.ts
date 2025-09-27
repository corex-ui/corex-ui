import Prism from "prismjs";
import { getString } from "../lib";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-shell-session";
import "prismjs/components/prism-markup";

export class Code {
  el: HTMLElement;
  constructor(el: HTMLElement) {
    this.el = el;
  }
  init(): void {
    const lang = getString(this.el, "lang") || "html";
    if (!this.el.classList.contains(`language-${lang}`)) {
      this.el.classList.add(`language-${lang}`);
    }
    Prism.highlightElement(this.el);
  }
}
export function initializeCode(doc: HTMLElement | Document = document): void {
  doc.querySelectorAll<HTMLElement>(".code-js").forEach((codeEl) => {
    const code = new Code(codeEl);
    code.init();
  });
}
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeCode(document),
    );
  } else {
    initializeCode(document);
  }
}
