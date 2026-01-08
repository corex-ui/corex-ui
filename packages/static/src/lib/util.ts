/**
 * Corex utility functions for working with Zag.js components.
 *
 * Note: `normalizeProps` is provided by @zag-js/vanilla and is imported from there.
 * `spreadProps` is wrapped to ensure ARIA boolean attributes are converted to strings
 * for accessibility compliance.
 */
import { spreadProps as zagSpreadProps } from "@zag-js/vanilla";

/**
 * Wrapper around zag's spreadProps that converts boolean ARIA attributes to strings
 * ("true" or "false") for accessibility compliance. All other attributes are passed
 * through unchanged.
 *
 * The vanilla spreadProps removes boolean false attributes, but ARIA attributes
 * should always be present as strings when provided by the API.
 *
 * Exception: `aria-readonly` is omitted when false as it's invalid on certain roles
 * (e.g., role="button").
 */
export function spreadProps(
  node: Element,
  attrs: Record<string, any>,
): () => void {
  const normalizedAttrs: Record<string, any> = {};

  for (const [attrName, value] of Object.entries(attrs)) {
    if (typeof value === "boolean") {
      const lowerAttrName = attrName.toLowerCase();
      if (lowerAttrName.startsWith("aria-")) {
        if (lowerAttrName === "aria-readonly" && !value) continue;
        normalizedAttrs[attrName] = String(value);
      } else {
        normalizedAttrs[attrName] = value;
      }
    } else {
      normalizedAttrs[attrName] = value;
    }
  }

  return zagSpreadProps(node, normalizedAttrs);
}

type PropertyType = "string" | "boolean" | "number" | "string[]";
type PropMap = Record<string, PropertyType>;
/**
 * Renders a specific part of the UI based on the component's props.
 * If `propsToSend` is a PropMap, attributes are read from the DOM.
 * If `propsToSend` is a plain object, it is passed directly to the API.
 *
 * NOTE: This version treats the passed `root` element itself as a candidate
 * part (so you can call renderPart(li, 'item', api, { item }) for a single li).
 */
export const renderPart = (
  root: HTMLElement,
  name: string,
  api: any,
  propsToSend?: PropMap | Record<string, any | ((el: HTMLElement) => any)>,
) => {
  const camelizedName = name
    .split("-")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join("");
  const getterName = `get${camelizedName.charAt(0).toUpperCase()}${camelizedName.slice(1)}Props`;
  if (typeof api[getterName] !== "function") return;

  // Collect parts: include root itself if it matches, plus any descendants
  const parts: HTMLElement[] = [];
  try {
    if (
      (root as Element).matches &&
      (root as Element).matches(`[data-part='${name}']`)
    ) {
      parts.push(root);
    }
  } catch (e) {
    console.log(e);
  }
  parts.push(
    ...Array.from(root.querySelectorAll<HTMLElement>(`[data-part='${name}']`)),
  );

  // Find the component root (closest ancestor with class containing "-js")
  const componentRoot = root.closest('[class*="-js"]') as HTMLElement | null;

  const scopedParts = componentRoot
    ? parts.filter((part) => part.closest('[class*="-js"]') === componentRoot)
    : parts;

  scopedParts.forEach((part) => {
    let props: Record<string, any> | undefined;
    if (propsToSend) {
      if (isPropMap(propsToSend)) {
        props = {};
        for (const [prop, type] of Object.entries(propsToSend)) {
          const getter =
            type === "string"
              ? getString
              : type === "boolean"
                ? getBoolean
                : type === "number"
                  ? getNumber
                  : type === "string[]"
                    ? getStringList
                    : getString;
          props[prop] = getter(part, prop);
        }
      } else {
        props = {};
        for (const [key, value] of Object.entries(propsToSend)) {
          props[key] = typeof value === "function" ? value(part) : value;
        }
      }
    }
    const result = props ? api[getterName](props) : api[getterName]();
    spreadProps(part, result);
    if (name === "preview") {
      const childrenValue = part.getAttribute("children");
      if (childrenValue !== null) part.textContent = childrenValue;
    }
  });
};
function isPropMap(value: any): value is PropMap {
  if (typeof value !== "object" || value === null) return false;
  return Object.values(value).every(
    (v) =>
      v === "string" || v === "boolean" || v === "number" || v === "string[]",
  );
}

/**
 * Renders a list of items inside the root element. Each item is identified by the `name`, and the
 * properties for each item are retrieved from the API based on its `data-value`, `data-disabled`, and `data-index` attributes.
 * @param root - The root HTML element containing the items.
 * @param name - The name of the item part to render.
 * @param api - The API object used to retrieve the properties for each item.
 * ```
 */
export function renderList<T extends { value: string; label?: string }>(
  root: HTMLElement,
  name: string,
  api: any,
  items: T[],
) {
  const parts = root.querySelectorAll<HTMLElement>(`[data-part='${name}']`);
  const getter = api[`get${capitalize(name)}Props`];
  parts.forEach((el, index) => {
    const value = el.getAttribute("data-value") || items[index]?.value;
    const item = items.find((item) => item.value === value);
    if (!item) return;
    const props = getter({ item });
    spreadProps(el, props);
  });
}

function capitalize(str: string): string {
  return str.replace(/(^|-)([a-z])/g, (_m, _p, l) => l.toUpperCase());
}
interface Node {
  id: string;
  name: string;
  children?: Node[];
}
/**
 * Recursively searches for a node in a hierarchical structure based on its `id`.
 * @param tree - The tree structure to search through.
 * @param id - The ID of the node to find.
 * @returns The node if found, or `null` if no node with the specified ID exists.
 * ```
 */
export function findNodeById(tree: Node, id: string): Node | null {
  if (tree.id === id) return tree;
  if (!tree.children) return null;
  for (const child of tree.children) {
    const found = findNodeById(child, id);
    if (found) return found;
  }
  return null;
}
/**
 * Tree View Component: Renders a node from the provided hierarchical tree view into the specified part in the UI.
 * The part is identified by the `name`, and the node is retrieved from the tree using its `id` attribute.
 * @param root - The root HTML element in which the node resides.
 * @param name - The name of the node part to render.
 * @param api - The API object used to retrieve the properties for the node.
 * @param tree - The hierarchical tree structure containing the nodes.
 *
 * Example:
 * ```ts
 * const root = document.getElementById('root');
 * const tree = { id: '1', name: 'root', children: [{ id: '2', name: 'child' }] };
 * renderNode(root, 'node', api, tree); // Renders the node with properties from the tree
 * ```
 */
export const renderNode = (
  root: HTMLElement,
  name: string,
  api: any,
  tree: Node,
) => {
  const parts = root.querySelectorAll<HTMLElement>(`[data-part='${name}']`);
  // Convert part name to API method name, e.g., "branch-control" → "getBranchControlProps"
  const camelizedName = name.replace(
    /(^|-)([a-z])/g,
    (_match, _prefix, letter) => letter.toUpperCase(),
  );
  const getterName = `get${camelizedName}Props`;
  // Helper to recursively find node and index path
  const findNodeById = (
    node: Node,
    id: string,
    path: number[] = [],
  ): { node: Node; indexPath: number[] } | null => {
    if (node.id === id) return { node, indexPath: path };
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        const found = findNodeById(node.children[i], id, [...path, i]);
        if (found) return found;
      }
    }
    return null;
  };
  parts.forEach((part) => {
    const id = part.getAttribute("data-id");
    if (!id) return;
    const found = findNodeById(tree, id);
    if (!found) return;
    const { node, indexPath } = found;
    const getPropsFn =
      typeof api[getterName] === "function" ? api[getterName] : api.getProps;
    const props = getPropsFn({ indexPath, node });
    spreadProps(part, props);
    const label = part.getAttribute("children");
    if (label != null) {
      part.textContent = label;
    }
  });
};
/**
 * Extract a string data attribute with validation for specific type
 * @param element - The HTML element to extract from
 * @param attrName - The data attribute name (without 'data-' prefix)
 * @param validValues - Optional array of allowed values
 * @returns Validated string value or undefined
 */
export const getString = <T extends string>(
  element: HTMLElement,
  attrName: string,
  validValues?: readonly T[],
): T | undefined => {
  const value = element.dataset[attrName];
  if (
    value !== undefined &&
    (!validValues || (validValues as readonly string[]).includes(value))
  ) {
    return value as T;
  }
  return undefined;
};
/**
 * Extract a list of string values from a data attribute
 * @param element - The HTML element to extract from
 * @param attrName - The data attribute name (without 'data-' prefix)
 * @returns Array of strings or undefined
 */
export const getStringList = (
  element: HTMLElement,
  attrName: string,
): string[] | undefined => {
  const value = element.dataset[attrName];
  if (typeof value === "string") {
    return value
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v.length > 0);
  }
  return undefined;
};
/**
 * Extract a number data attribute with optional validation
 * @param element - The HTML element to extract from
 * @param attrName - The data attribute name (without 'data-' prefix)
 * @param validValues - Optional array of allowed numeric values
 * @returns Parsed number value or undefined
 */
export const getNumber = (
  element: HTMLElement,
  attrName: string,
  validValues?: readonly number[],
): number | undefined => {
  const raw = element.dataset[attrName];
  if (raw === undefined) return undefined;
  const parsed = Number(raw);
  if (Number.isNaN(parsed)) return undefined;
  if (validValues && !validValues.includes(parsed)) return 0;
  return parsed;
};
/**
 * Extract a boolean data attribute
 * @param element - The HTML element to extract from
 * @param attrName - The data attribute name (without 'data-' prefix)
 * @returns Boolean value or undefined
 */
export const getBoolean = (
  element: HTMLElement,
  attrName: string,
): boolean | undefined => {
  const value = element.dataset[attrName];
  if (value === "") return true;
  if (value === "true") return true;
  if (value === "false") return false;
  if (element.hasAttribute(attrName)) return true;
  if (element.hasAttribute(`data-${attrName}`)) return true;

  return undefined;
};
/**
 * Generate a random ID if none is provided
 * @param element - Optional HTML element to get an existing id
 * @param fallbackId - Optional fallback base string (e.g. "checkbox")
 * @returns ID string (existing or generated)
 */
export const generateId = (
  element?: HTMLElement,
  fallbackId: string = "element",
): string => {
  if (element?.id) return element.id;
  return `${fallbackId}-${Math.random().toString(36).substring(2, 9)}`;
};

export function valuesEqual<T>(a: T, b: T): boolean {
  return a === b;
}

export function arraysEqualUnordered(
  a: string[] = [],
  b: string[] = [],
): boolean {
  if (a === b) return true;
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length !== b.length) return false;
  return a.every((v) => b.includes(v));
}

/**
 * Parse element IDs from child parts with data-part and data-id attributes
 * @param root - The root element containing the parts
 * @param partNames - Array of part names to look for (e.g., ['root', 'control', 'label'])
 * @returns Object with parsed IDs or undefined if no IDs found
 *
 * Example:
 * ```html
 * <div class="checkbox-js">
 *   <div data-part="root" data-id="my-root"></div>
 *   <div data-part="control" data-id="my-control"></div>
 * </div>
 * ```
 * ```ts
 * const ids = getPartIds(element, ['root', 'control', 'label']);
 * // Returns: { root: 'my-root', control: 'my-control' }
 * ```
 */
export const getPartIds = (
  root: HTMLElement,
  partNames: readonly string[],
): Record<string, string> | undefined => {
  const ids: Record<string, string> = {};
  let hasAnyId = false;

  for (const partName of partNames) {
    const part = root.querySelector<HTMLElement>(`[data-part="${partName}"]`);
    const id = part?.dataset.id;

    if (id) {
      // Convert kebab-case to camelCase: hidden-input -> hiddenInput
      const camelKey = partName.replace(/-([a-z])/g, (_, letter) =>
        letter.toUpperCase(),
      );
      ids[camelKey] = id;
      hasAnyId = true;
    }
  }

  return hasAnyId ? ids : undefined;
};
