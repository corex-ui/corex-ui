import * as treeView from "@zag-js/tree-view";
import type { Direction } from "@zag-js/types";
import {
  Component,
  VanillaMachine,
  generateId,
  getString,
  getStringList,
  arraysEqualUnordered,
  normalizeProps,
  renderPart,
  renderNode,
  getBoolean,
} from "../lib";
interface Node {
  id: string;
  name: string;
  children?: Node[];
}
function loadJsonTreeNodes(path: string): Node {
  try {
    const script = document.querySelector(
      `script[type="application/json"][data-tree-view="${path}"]`,
    );
    if (!script) throw new Error(`No inline JSON script found for ${path}`);
    return JSON.parse(script.textContent || "{}");
  } catch (e) {
    console.error("Failed to load JSON tree nodes:", e);
    return { id: "root", name: "Root" };
  }
}
function buildNodeTreeFromDOM(container: HTMLElement): Node {
  const rootEl = container.querySelector<HTMLElement>('[data-part="tree"]');
  if (!rootEl) {
    return { id: "root", name: "Root" };
  }

  function processElement(element: HTMLElement, index: number): Node | null {
    const part = element.getAttribute("data-part");
    let id = element.getAttribute("data-id");
    let name = element.getAttribute("data-name");

    // ✅ auto-generate id if missing
    if (!id) {
      id = generateId(element, `${part || "node"}-${index}`);
      element.setAttribute("data-id", id);
    }

    // ✅ auto-generate name if missing
    if (!name) {
      name = id.replace(/^.*-/, "").replace(/^\w/, (c) => c.toUpperCase());
      element.setAttribute("data-name", name);
    }

    if (part === "branch") {
      const branchContent = element.querySelector(
        `[data-part="branch-content"][data-id="${id}"]`,
      );
      if (branchContent) {
        const childElements = Array.from(branchContent.children).filter(
          (child) => {
            const childPart = child.getAttribute("data-part");
            return childPart === "item" || childPart === "branch";
          },
        );
        const childNodes = childElements
          .map((childEl, i) => processElement(childEl as HTMLElement, i))
          .filter(Boolean) as Node[];
        return {
          id,
          name,
          children: childNodes.length > 0 ? childNodes : undefined,
        };
      }
      return { id, name };
    } else if (part === "item") {
      return { id, name };
    }
    return null;
  }

  const topElements = Array.from(rootEl.children).filter((child) => {
    const childPart = child.getAttribute("data-part");
    return childPart === "item" || childPart === "branch";
  });

  const children = topElements
    .map((el, i) => processElement(el as HTMLElement, i))
    .filter(Boolean) as Node[];

  return {
    id: getString(rootEl, "nodeRootId") || "root",
    name: getString(rootEl, "nodeRootName") || "Root",
    children,
  };
}

export class TreeView extends Component<treeView.Props, treeView.Api> {
  collection!: ReturnType<typeof treeView.collection<Node>>;
  private domInitialized = false;
  initMachine(props: treeView.Props): VanillaMachine<any> {
    return new VanillaMachine(treeView.machine, props);
  }
  initApi(): treeView.Api {
    return treeView.connect(this.machine.service, normalizeProps);
  }
  renderNodes() {
    const treeEl = this.el.querySelector('[data-part="tree"]');
    if (!treeEl || !(treeEl instanceof HTMLElement)) return;
    const noIcon = getBoolean(this.el, "noIcon");
    const noIndicator = getBoolean(this.el, "noIndicator");
    treeEl.innerHTML = "";
    const folderIconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
    </svg>
`;
    const docIconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
`;
    const chevronIconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
    </svg>`;
    const renderNodeRecursive = (node: Node, parentEl: HTMLElement) => {
      const isBranch = !!node.children?.length;
      if (isBranch) {
        const branchEl = document.createElement("div");
        branchEl.setAttribute("data-part", "branch");
        branchEl.setAttribute("data-id", node.id);
        branchEl.setAttribute("data-name", node.name);
        const branchControl = document.createElement("div");
        branchControl.setAttribute("data-part", "branch-control");
        branchControl.setAttribute("data-id", node.id);
        branchControl.setAttribute("data-name", node.name);
        if (!noIcon)
          branchControl.insertAdjacentHTML("beforeend", folderIconSvg);
        const branchText = document.createElement("span");
        branchText.setAttribute("data-part", "branch-text");
        branchText.setAttribute("data-id", node.id);
        branchText.setAttribute("data-name", node.name);
        branchText.textContent = node.name;
        branchControl.appendChild(branchText);

        if (!noIndicator) {
          const branchIndicator = document.createElement("span");
          branchIndicator.setAttribute("data-part", "branch-indicator");
          branchIndicator.setAttribute("data-id", node.id);
          branchIndicator.setAttribute("data-name", node.name);
          branchIndicator.insertAdjacentHTML("beforeend", chevronIconSvg);
          branchControl.appendChild(branchIndicator);
        }
        branchEl.appendChild(branchControl);
        const branchContent = document.createElement("div");
        branchContent.setAttribute("data-part", "branch-content");
        branchContent.setAttribute("data-id", node.id);
        branchContent.setAttribute("data-name", node.name);
        const branchIndentGuide = document.createElement("div");
        branchIndentGuide.setAttribute("data-part", "branch-indent-guide");
        branchIndentGuide.setAttribute("data-id", node.id);
        branchIndentGuide.setAttribute("data-name", node.name);
        branchContent.appendChild(branchIndentGuide);
        node.children!.forEach((child) =>
          renderNodeRecursive(child, branchContent),
        );
        branchEl.appendChild(branchContent);
        parentEl.appendChild(branchEl);
      } else {
        const itemEl = document.createElement("div");
        itemEl.setAttribute("data-part", "item");
        itemEl.setAttribute("data-id", node.id);
        itemEl.setAttribute("data-name", node.name);
        itemEl.textContent = node.name;
        if (!noIcon) itemEl.insertAdjacentHTML("afterbegin", docIconSvg);
        parentEl.appendChild(itemEl);
      }
    };
    if (this.collection.rootNode.children) {
      this.collection.rootNode.children.forEach((childNode) => {
        renderNodeRecursive(childNode, treeEl);
      });
    }
  }
  render() {
    const isJson = getString(this.el, "json") !== undefined;
    if (isJson && !this.domInitialized) {
      this.renderNodes();
      this.domInitialized = true;
    }
    const parts = ["root", "label", "tree"];
    for (const part of parts) {
      renderPart(this.el, part, this.api);
    }
    const items = [
      "item",
      "branch",
      "branch-content",
      "branch-text",
      "branch-control",
      "branch-indicator",
      "branch-indent-guide",
    ];
    for (const item of items) {
      renderNode(this.el, item, this.api, this.collection.rootNode);
    }
  }
}
export function initializeTreeView(
  doc: HTMLElement | Document = document,
): void {
  doc.querySelectorAll<HTMLElement>(".tree-view-js").forEach((rootEl) => {
    const directions = ["ltr", "rtl"] as const;
    const selectionModes = ["single", "multiple"] as const;
    const jsonPath = getString(rootEl, "json");
    let rootNode: Node;
    if (jsonPath !== undefined) {
      rootNode = loadJsonTreeNodes(jsonPath);
    } else {
      rootNode = buildNodeTreeFromDOM(rootEl);
    }
    const collection = treeView.collection<Node>({
      nodeToValue: (node: Node) => node.id,
      nodeToString: (node: Node) => node.name,
      rootNode,
    });
    const treeViewComponent = new TreeView(rootEl, {
      id: generateId(rootEl, "treeView"),
      defaultExpandedValue: getStringList(rootEl, "defaultExpandedValue"),
      defaultSelectedValue: getStringList(rootEl, "defaultSelectedValue"),
      dir: getString<Direction>(rootEl, "dir", directions),
      expandedValue: getStringList(rootEl, "expandedValue"),
      expandOnClick: getBoolean(rootEl, "expandOnClick"),
      focusedValue: getString(rootEl, "focusedValue"),
      defaultFocusedValue: getString(rootEl, "defaultFocusedValue"),
      selectionMode: getString(rootEl, "selectionMode", selectionModes),
      selectedValue: getStringList(rootEl, "selectedValue"),
      typeahead: getBoolean(rootEl, "typeahead"),
      collection,
      onCheckedChange(details) {
        const eventName = getString(rootEl, "onCheckedChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onExpandedChange(details) {
        const eventName = getString(rootEl, "onExpandedChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onFocusChange(details) {
        const eventName = getString(rootEl, "onFocusChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onSelectionChange(details) {
        const eventName = getString(rootEl, "onSelectionChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });
    treeViewComponent.collection = collection;
    treeViewComponent.init();
    treeViewComponent.el.addEventListener("tree-view:set-value", (event) => {
      const { value } = (event as CustomEvent<{ value: string[] }>).detail;
      const current = treeViewComponent.api.selectedValue;
      if (!arraysEqualUnordered(current, value)) {
        treeViewComponent.api.setSelectedValue(value);
      }
    });
  });
}
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeTreeView(document),
    );
  } else {
    initializeTreeView(document);
  }
}
