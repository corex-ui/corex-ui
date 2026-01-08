import "./main.css";
import {
  initDialog,
  initTreeView,
  initSiteSearch,
  initMenu,
  initListbox,
  initCode,
  initClipboard,
  initToggleGroup,
  initSelect,
  type Pagefind,
} from "@corex-ui/static";

initDialog();
initTreeView();
initMenu();
initListbox();
initCode();
initClipboard();
initToggleGroup();
initSelect();

(async () => {
  try {
    // @ts-expect-error Vanilla JS
    const pagefind: Pagefind = await import("/pagefind/pagefind.js");
    await pagefind.options({
      excerptLength: 5,
    });
    initSiteSearch(pagefind);
  } catch (error) {
    console.error("Failed to init Pagefind:", error);
  }
})();

document.getElementById("navigation")?.addEventListener("link", (event) => {
  const url = (event as CustomEvent).detail.focusedValue;
  const excluded = ["Components", "Getting Started", "Installation"];
  if (typeof url === "string" && !excluded.includes(url)) {
    window.location.href = url;
  }
});
document
  .getElementById("navigation-mobile")
  ?.addEventListener("link", (event) => {
    const url = (event as CustomEvent).detail.focusedValue;
    const excluded = ["Components", "Getting Started"];
    if (typeof url === "string" && !excluded.includes(url)) {
      window.location.href = url;
    }
  });
document.getElementById("pagination")?.addEventListener("link", (event) => {
  const url = (event as CustomEvent).detail.value;
  if (typeof url === "string") {
    window.location.href = url;
  }
});

document
  .getElementById("pagination-header")
  ?.addEventListener("link", (event) => {
    const url = (event as CustomEvent).detail.value;
    if (typeof url === "string") {
      window.location.href = url;
    }
  });

const ids = ["switcher", "switcher-mobile", "switcher-demo"];
const elements = ids
  .map((id) => document.getElementById(id))
  .filter(Boolean) as HTMLElement[];

elements.forEach((el) => {
  el.addEventListener("update-switcher", (event) => {
    const { value } = (event as CustomEvent<{ value: string[] }>).detail;
    const mode = value?.[0] ?? "light";

    // apply
    document.documentElement.setAttribute("data-mode", mode);
    localStorage.setItem("data-mode", mode);

    // broadcast to OTHER switchers only
    const source = event.currentTarget as HTMLElement; // <- the element with this listener
    elements.forEach((other) => {
      if (other !== source) {
        other.dispatchEvent(
          new CustomEvent("toggle-group:set-value", {
            detail: { value: value },
          }),
        );
      }
    });
  });
});

const selecterIds = ["selecter", "selecter-mobile", "selecter-demo"];
const selecterElements = selecterIds
  .map((id) => document.getElementById(id))
  .filter(Boolean) as HTMLElement[];

selecterElements.forEach((el) => {
  el.addEventListener("update-selecter", (event) => {
    const { value } = (event as CustomEvent<{ value: string[] }>).detail;
    const theme = value?.[0] ?? "neo";

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("data-theme", theme);

    const source = event.currentTarget as HTMLElement; // <- the element with this listener
    selecterElements.forEach((other) => {
      if (other !== source) {
        other.dispatchEvent(
          new CustomEvent("select:set-value", {
            detail: { value: value },
          }),
        );
      }
    });
  });
});

["toc", "toc-mobile"].forEach((tocId) => {
  const toc = document.getElementById(tocId);
  if (!toc) return;

  const content = document.querySelector<HTMLElement>(".layout__content");
  if (!content) return;

  toc
    .querySelectorAll('[data-part="item"], [data-part="branch-control"]')
    .forEach((item) => {
      const activate = () => {
        const value = item.getAttribute("data-value");
        if (!value) return;
        location.hash = value;
      };

      item.addEventListener("click", activate);
      item.addEventListener("keydown", (e) => {
        const ke = e as KeyboardEvent;
        if (ke.key === "Enter" || ke.key === " ") activate();
      });

      if (!["A", "BUTTON"].includes(item.tagName)) {
        item.setAttribute("tabindex", "0");
        item.setAttribute("role", "button");
      }
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const tocIds = ["toc-mobile"];
  const contentSelector = ".layout__article";
  const contentEl = document.querySelector<HTMLElement>(contentSelector);
  if (!contentEl) return;

  const headings = contentEl.querySelectorAll<HTMLElement>("h2, h3, h4");
  if (!headings.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        if (!id) return;
        tocIds.forEach((tocId) => {
          const toc = document.getElementById(tocId);
          if (toc) {
            toc.dispatchEvent(
              new CustomEvent("tree-view:set-value", {
                detail: { value: [id] },
              }),
            );
          }
        });
      });
    },
    {
      root: null,
      rootMargin: "-20% 50px -70% 0px",
    },
  );

  headings.forEach((heading) => observer.observe(heading));
});
