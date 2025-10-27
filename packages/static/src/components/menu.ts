import * as menu from "@zag-js/menu";
import type { Direction } from "@zag-js/types";
import {
  Component,
  VanillaMachine,
  spreadProps,
  getString,
  getNumber,
  getBoolean,
  generateId,
  normalizeProps,
  renderPart,
} from "../lib";

interface Node {
  id: string;
  name: string;
  children?: Node[];
}

function loadJsonTreeNodes(path: string): Node {
  try {
    const script = document.querySelector(
      `script[type="application/json"][data-menu="${path}"]`,
    );
    if (!script) throw new Error(`No inline JSON script found for ${path}`);
    return JSON.parse(script.textContent || "{}");
  } catch (e) {
    console.error("Failed to load JSON tree nodes:", e);
    return { id: "root", name: "Root" };
  }
}

export class Menu extends Component<menu.Props, menu.Api> {
  children: Menu[] = [];
  parent?: Menu;
  domInitialized = false;

  initMachine(props: menu.Props): VanillaMachine<any> {
    this.machine = new VanillaMachine(menu.machine, props);
    return this.machine;
  }

  initApi(): menu.Api {
    return menu.connect(this.machine.service, normalizeProps);
  }

  setChild(child: Menu) {
    this.api.setChild(child.machine.service);
    if (!this.children.includes(child)) {
      this.children.push(child);
    }
  }

  setParent(parent: Menu) {
    this.api.setParent(parent.machine.service);
    this.parent = parent;
  }

  renderFromJson() {
    const jsonPath = getString(this.el, "json");
    if (!jsonPath) return;

    const rootNode = loadJsonTreeNodes(jsonPath);
    if (!rootNode.children || rootNode.children.length === 0) return;

    this.el.innerHTML = "";

    rootNode.children.forEach((topLevelNode) => {
      const menuId = `${this.el.id}-${topLevelNode.id}`;

      const menuWrapper = document.createElement("div");
      menuWrapper.classList.add("menu-js", "menu");
      menuWrapper.id = menuId;
      menuWrapper.dataset.ariaLabel = `${topLevelNode.name} Menu`;

      Array.from(this.el.attributes).forEach((attr) => {
        if (attr.name.startsWith("data-") && attr.name !== "data-json") {
          menuWrapper.setAttribute(attr.name, attr.value);
        }
      });

      const trigger = document.createElement("button");
      trigger.setAttribute("data-part", "trigger");
      trigger.innerHTML = `
        ${topLevelNode.name}
        <span data-part="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
          </svg>
        </span>
      `;

      const positioner = document.createElement("div");
      positioner.setAttribute("data-part", "positioner");

      const content = document.createElement("ul");
      content.setAttribute("data-part", "content");

      positioner.appendChild(content);
      menuWrapper.appendChild(trigger);
      menuWrapper.appendChild(positioner);
      this.el.appendChild(menuWrapper);

      if (topLevelNode.children) {
        topLevelNode.children.forEach((child) => {
          this.renderNodeContent(child, content, menuWrapper, menuId);
        });
      }
    });
  }

  private renderNodeContent(
    node: Node,
    parentEl: HTMLElement,
    menuWrapper: HTMLElement,
    parentMenuId: string,
  ) {
    const hasChildren = node.children && node.children.length > 0;
    const li = document.createElement("li");

    if (hasChildren) {
      li.setAttribute("data-part", "trigger-item");
      const submenuId = node.id;
      li.dataset.child = submenuId;

      li.innerHTML = `
        ${node.name}
        <span data-part="indicator" data-child="${submenuId}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
               stroke-width="1.5" stroke="currentColor" class="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
          </svg>
        </span>
      `;

      const submenuEl = document.createElement("div");
      submenuEl.classList.add("menu-js", "menu");
      submenuEl.id = submenuId;
      submenuEl.dataset.parent = parentMenuId;
      submenuEl.dataset.ariaLabel = `${node.name} Menu`;
      submenuEl.dataset.offsetMainAxis = "5";
      submenuEl.dataset.placement = "right-start";

      const eventAttrs = [
        "onSelect",
        "onOpenChange",
        "onEscapeKeyDown",
        "onFocusOutside",
        "onHighlightChange",
        "onInteractOutside",
        "onPointerDownOutside",
        "navigate",
        "sameWidth",
      ];

      eventAttrs.forEach((attr) => {
        const value = getString(menuWrapper, attr);
        if (value !== undefined) {
          submenuEl.dataset[attr] = value;
        }
      });

      const positioner = document.createElement("div");
      positioner.setAttribute("data-part", "positioner");

      const submenuContent = document.createElement("ul");
      submenuContent.setAttribute("data-part", "content");
      positioner.appendChild(submenuContent);
      submenuEl.appendChild(positioner);

      menuWrapper.parentNode?.insertBefore(submenuEl, menuWrapper.nextSibling);

      const childrenIds: string[] = [];
      node.children!.forEach((child) => {
        if (child.children && child.children.length > 0) {
          childrenIds.push(child.id);
        }
        this.renderNodeContent(child, submenuContent, submenuEl, submenuId);
      });

      if (childrenIds.length > 0) {
        submenuEl.dataset.children = childrenIds.join(",");
      }

      const existingChildren = menuWrapper.dataset.children
        ? menuWrapper.dataset.children.split(",")
        : [];
      if (!existingChildren.includes(submenuId)) {
        menuWrapper.dataset.children = [...existingChildren, submenuId].join(
          ",",
        );
      }
    } else {
      li.setAttribute("data-part", "item");
      li.dataset.value = node.id;
      li.textContent = node.name;
    }

    parentEl.appendChild(li);
  }

  render() {
    const isJson = getString(this.el, "json") !== undefined;
    if (isJson && !this.domInitialized) {
      this.renderFromJson();
      this.domInitialized = true;
      return; // Don't render this wrapper, render the generated menus instead
    }

    const parts = [
      "trigger",
      "indicator",
      "positioner",
      "content",
      "context-trigger",
      "separator",
    ];
    for (const part of parts) {
      renderPart(this.el, part, this.api);
    }

    const items = ["item", "item-text"];
    for (const item of items) {
      renderPart(this.el, item, this.api, {
        value: "string",
        id: "string",
        child: "string",
      });
    }

    const labels = ["item-group-label"];
    for (const item of labels) {
      renderPart(this.el, item, this.api, {
        htmlFor: (el: any) => el.getAttribute("data-htmlFor"),
      });
    }

    const groups = ["item-group"];
    for (const item of groups) {
      renderPart(this.el, item, this.api, { id: "string" });
    }
  }

  renderSubmenuTriggers() {
    const triggerItems = Array.from(
      this.el.querySelectorAll<HTMLElement>(
        '[data-part="trigger-item"][data-child]',
      ),
    ).filter((el) => el.closest(".menu-js") === this.el);

    for (const triggerEl of triggerItems) {
      const targetMenuId = triggerEl.dataset.child;
      if (!targetMenuId) continue;

      const childMenu = this.children.find(
        (child) => child.el.id === targetMenuId,
      );
      if (!childMenu) continue;

      const indicatorEl = triggerEl.querySelector<HTMLElement>(
        `[data-part="indicator"][data-child="${targetMenuId}"]`,
      );

      const applyProps = () => {
        const triggerProps = this.api.getTriggerItemProps(childMenu.api);
        spreadProps(triggerEl, triggerProps);
        if (indicatorEl) {
          const indicatorProps = childMenu.api.getIndicatorProps();
          spreadProps(indicatorEl, indicatorProps);
        }
      };

      applyProps();
      this.machine.subscribe(applyProps);
      childMenu.machine.subscribe(applyProps);
    }
  }
}

let hasInitialized = false;

export function initializeMenu(doc: HTMLElement | Document = document): void {
  if (hasInitialized) return;
  hasInitialized = true;

  const menusMap = new Map<string, Menu>();
  doc.querySelectorAll<HTMLElement>(".menu-js[data-json]").forEach((rootEl) => {
    const id = generateId(rootEl, "menu");
    const jsonPath = getString(rootEl, "json");

    if (jsonPath) {
      const tempInstance = new Menu(rootEl, { id });
      tempInstance.renderFromJson();
      tempInstance.domInitialized = true;
    }
  });

  doc
    .querySelectorAll<HTMLElement>(".menu-js:not([data-json])")
    .forEach((rootEl) => {
      const placements = [
        "top",
        "right",
        "bottom",
        "left",
        "top-start",
        "top-end",
        "right-start",
        "right-end",
        "bottom-start",
        "bottom-end",
        "left-start",
        "left-end",
      ] as const;
      const strategies = ["absolute", "fixed"] as const;
      const directions = ["ltr", "rtl"] as const;

      const id = generateId(rootEl, "menu");
      const instance = new Menu(rootEl, {
        id,
        "aria-label": getString(rootEl, "ariaLabel"),
        closeOnSelect: getBoolean(rootEl, "closeOnSelect"),
        composite: getBoolean(rootEl, "composite"),
        defaultHighlightedValue: getString(rootEl, "defaultHighlightedValue"),
        defaultOpen: getBoolean(rootEl, "defaultOpen"),
        open: getBoolean(rootEl, "open"),
        dir: getString<Direction>(rootEl, "dir", directions),
        loopFocus: getBoolean(rootEl, "loopFocus"),
        typeahead: getBoolean(rootEl, "typeahead"),
        highlightedValue: getString(rootEl, "highlightedValue"),
        positioning: {
          hideWhenDetached: getBoolean(rootEl, "hideWhenDetached"),
          placement: getString(rootEl, "placement", placements),
          strategy: getString(rootEl, "strategy", strategies),
          flip: getBoolean(rootEl, "flip"),
          gutter: getNumber(rootEl, "gutter"),
          arrowPadding: getNumber(rootEl, "arrowPadding"),
          overflowPadding: getNumber(rootEl, "overflowPadding"),
          offset: (() => {
            const mainAxis = getNumber(rootEl, "offsetMainAxis");
            const crossAxis = getNumber(rootEl, "offsetCrossAxis");
            if (mainAxis !== undefined || crossAxis !== undefined) {
              return { mainAxis, crossAxis };
            }
            return undefined;
          })(),
          sameWidth: getBoolean(rootEl, "sameWidth"),
          overlap: getBoolean(rootEl, "overlap"),
          fitViewport: getBoolean(rootEl, "fitViewport"),
          slide: getBoolean(rootEl, "slide"),
        },
        onSelect(details) {
          const eventName = getString(rootEl, "onSelect");
          if (eventName) {
            const event = new CustomEvent(eventName, {
              detail: details,
              bubbles: true,
            });
            rootEl.dispatchEvent(event);
          }
        },
        onOpenChange(details) {
          const eventName = getString(rootEl, "onOpenChange");
          if (eventName) {
            rootEl.dispatchEvent(
              new CustomEvent(eventName, { detail: details }),
            );
          }
        },
        onEscapeKeyDown(details) {
          const eventName = getString(rootEl, "onEscapeKeyDown");
          if (eventName) {
            rootEl.dispatchEvent(
              new CustomEvent(eventName, { detail: details }),
            );
          }
        },
        onFocusOutside(details) {
          const eventName = getString(rootEl, "onFocusOutside");
          if (eventName) {
            rootEl.dispatchEvent(
              new CustomEvent(eventName, { detail: details }),
            );
          }
        },
        onHighlightChange(details) {
          const eventName = getString(rootEl, "onHighlightChange");
          if (eventName) {
            rootEl.dispatchEvent(
              new CustomEvent(eventName, { detail: details }),
            );
          }
        },
        onInteractOutside(details) {
          const eventName = getString(rootEl, "onInteractOutside");
          if (eventName) {
            rootEl.dispatchEvent(
              new CustomEvent(eventName, { detail: details }),
            );
          }
        },
        onPointerDownOutside(details) {
          const eventName = getString(rootEl, "onPointerDownOutside");
          if (eventName) {
            rootEl.dispatchEvent(
              new CustomEvent(eventName, { detail: details }),
            );
          }
        },
        navigate(details) {
          const eventName = getString(rootEl, "navigate");
          if (eventName) {
            rootEl.dispatchEvent(
              new CustomEvent(eventName, { detail: details }),
            );
          }
        },
      });

      menusMap.set(id, instance);
    });

  menusMap.forEach((menu) => menu.init());

  setTimeout(() => {
    doc.querySelectorAll<HTMLElement>(".menu-js").forEach((rootEl) => {
      const id = rootEl.id || generateId(rootEl, "menu");
      if (!menusMap.has(id) && rootEl.dataset.parent) {
        const instance = new Menu(rootEl, {
          id,
          "aria-label": getString(rootEl, "ariaLabel"),
          closeOnSelect: getBoolean(rootEl, "closeOnSelect"),
          dir: getString<Direction>(rootEl, "dir"),
          positioning: {
            placement: getString(rootEl, "placement") as any,
            offset: (() => {
              const mainAxis = getNumber(rootEl, "offsetMainAxis");
              const crossAxis = getNumber(rootEl, "offsetCrossAxis");
              if (mainAxis !== undefined || crossAxis !== undefined) {
                return { mainAxis, crossAxis };
              }
              return undefined;
            })(),
          },
          onSelect(details) {
            const eventName = getString(rootEl, "onSelect");
            if (eventName) {
              const event = new CustomEvent(eventName, {
                detail: details,
                bubbles: true,
              });
              rootEl.dispatchEvent(event);

              const parentId = rootEl.dataset.parent;
              if (parentId) {
                const parentMenu = doc.querySelector(`#${parentId}`);
                if (parentMenu) {
                  const parentEvent = new CustomEvent(eventName, {
                    detail: details,
                    bubbles: true,
                  });
                  parentMenu.dispatchEvent(parentEvent);
                }
              }
            }
          },
          onOpenChange(details) {
            const eventName = getString(rootEl, "onOpenChange");
            if (eventName) {
              rootEl.dispatchEvent(
                new CustomEvent(eventName, { detail: details }),
              );
            }
          },
          onEscapeKeyDown(details) {
            const eventName = getString(rootEl, "onEscapeKeyDown");
            if (eventName) {
              rootEl.dispatchEvent(
                new CustomEvent(eventName, { detail: details }),
              );
            }
          },
          onFocusOutside(details) {
            const eventName = getString(rootEl, "onFocusOutside");
            if (eventName) {
              rootEl.dispatchEvent(
                new CustomEvent(eventName, { detail: details }),
              );
            }
          },
          onHighlightChange(details) {
            const eventName = getString(rootEl, "onHighlightChange");
            if (eventName) {
              rootEl.dispatchEvent(
                new CustomEvent(eventName, { detail: details }),
              );
            }
          },
          onInteractOutside(details) {
            const eventName = getString(rootEl, "onInteractOutside");
            if (eventName) {
              rootEl.dispatchEvent(
                new CustomEvent(eventName, { detail: details }),
              );
            }
          },
          onPointerDownOutside(details) {
            const eventName = getString(rootEl, "onPointerDownOutside");
            if (eventName) {
              rootEl.dispatchEvent(
                new CustomEvent(eventName, { detail: details }),
              );
            }
          },
          navigate(details) {
            const eventName = getString(rootEl, "navigate");
            if (eventName) {
              rootEl.dispatchEvent(
                new CustomEvent(eventName, { detail: details }),
              );
            }
          },
        });
        instance.init();
        menusMap.set(id, instance);
      }
    });

    menusMap.forEach((parent) => {
      const childIds =
        parent.el.dataset.children?.split(",").map((id) => id.trim()) ?? [];
      for (const childId of childIds) {
        const child = menusMap.get(childId);
        if (child) {
          parent.setChild(child);
          child.setParent(parent);
        }
      }
    });

    menusMap.forEach((menu) => {
      if (!menu.parent) menu.render();
    });
    menusMap.forEach((menu) => {
      if (menu.parent) menu.render();
    });

    setTimeout(() => {
      menusMap.forEach((menu) => {
        menu.api = menu.initApi();
        if (menu.children.length > 0) menu.renderSubmenuTriggers();
      });
    }, 10);
  }, 0);
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeMenu(document),
    );
  } else {
    initializeMenu(document);
  }
}
