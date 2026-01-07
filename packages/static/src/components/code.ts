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
export function initCode(
  doc: HTMLElement | Document = document,
  selector = ".code-js",
): void {
  doc.querySelectorAll<HTMLElement>(selector).forEach((codeEl) => {
    const code = new Code(codeEl);
    code.init();
  });
}
