/**
 * Corex is based on the original Zag.js Vanilla JS example.
 * The code has been adapted and modified for this project to suit specific requirements.
 *
 * All credit goes to the authors of Zag.js for their excellent work in providing a lightweight, accessible,
 * and flexible library for UI components.
 *
 * For more details about Zagjs, visit the official Zag.js Vanilla JS example GitHub repository:
 * https://github.com/chakra-ui/zag/tree/main/examples/vanilla-ts
 */

import { createNormalizer } from "@zag-js/types";
const propMap: Record<string, any> = {
  onFocus: "onFocusin",
  onBlur: "onFocusout",
  onChange: "onInput",
  onDoubleClick: "onDblclick",
  htmlFor: "for",
  className: "class",
  defaultValue: "value",
  defaultChecked: "checked",
};
/**
 * Converts a style object into a CSS style string.
 * @param style - The style object where keys are CSS properties and values are their corresponding values.
 * @returns A string that represents the styles, formatted as CSS (e.g., `color: red; background-color: blue;`).
 * ```
 */
const toStyleString = (style: any) => {
  return Object.entries(style).reduce((styleString, [key, value]) => {
    if (value === null || value === undefined) return styleString;
    const formattedKey = key.startsWith("--")
      ? key
      : key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
    return `${styleString}${formattedKey}:${value};`;
  }, "");
};
/**
 * Normalizes the provided properties, converting them to a lower case format
 * and adjusting specific attributes for compatibility with certain HTML conventions.
 * Additionally, transforms style objects into a valid CSS style string.
 * @param props - An object where keys represent property names and values are the corresponding values.
 * @returns A normalized version of the properties, where attributes are adjusted as necessary.
 * ```
 */
export const normalizeProps = createNormalizer((props: any) => {
  return Object.entries(props).reduce<any>((acc, [key, value]) => {
    if (value === undefined) return acc;
    if (key in propMap) {
      key = propMap[key];
    }
    if (key === "style" && typeof value === "object") {
      acc.style = toStyleString(value);
      return acc;
    }
    acc[key.toLowerCase()] = value;
    return acc;
  }, {});
});
export interface Attrs {
  [key: string]: any;
}
const prevAttrsMap = new WeakMap<HTMLElement, Attrs>();
/**
 * Applies the given attributes (props) to the provided HTML element, including event listeners and attributes.
 * It tracks previous attributes and ensures that only the necessary updates are applied to the element.
 * @param node - The HTML element to which the attributes will be applied.
 * @param attrs - The attributes (props) to apply to the element.
 * @returns A cleanup function that removes event listeners when called.
 * ```
 */
export function spreadProps(node: HTMLElement, attrs: Attrs): () => void {
  const oldAttrs = prevAttrsMap.get(node) || {};
  const attrKeys = Object.keys(attrs);
  const addEvt = (e: string, f: EventListener) => {
    node.addEventListener(e.toLowerCase(), f);
  };
  const remEvt = (e: string, f: EventListener) => {
    node.removeEventListener(e.toLowerCase(), f);
  };
  const onEvents = (attr: string) => attr.startsWith("on");
  const others = (attr: string) => !attr.startsWith("on");
  const setup = (attr: string) => addEvt(attr.substring(2), attrs[attr]);
  const teardown = (attr: string) => remEvt(attr.substring(2), attrs[attr]);
  const apply = (attrName: string) => {
    let value = attrs[attrName];
    const oldValue = oldAttrs[attrName];
    if (value === oldValue) return;
    if (typeof value === "boolean") {
      const lower = attrName.toLowerCase();
      const isAria = lower.startsWith("aria-");
      value = value === true ? "true" : isAria ? "false" : undefined;
    }
    if (value != null) {
      if (["value", "checked", "htmlFor"].includes(attrName)) {
        (node as any)[attrName] = value;
      } else {
        node.setAttribute(attrName.toLowerCase(), value);
      }
      return;
    }
    node.removeAttribute(attrName.toLowerCase());
  };
  for (const key in oldAttrs) {
    if (attrs[key] == null) {
      node.removeAttribute(key.toLowerCase());
    }
  }
  const oldEvents = Object.keys(oldAttrs).filter(onEvents);
  oldEvents.forEach((evt) => {
    remEvt(evt.substring(2), oldAttrs[evt]);
  });
  attrKeys.filter(onEvents).forEach(setup);
  attrKeys.filter(others).forEach(apply);
  prevAttrsMap.set(node, attrs);
  return function cleanup() {
    attrKeys.filter(onEvents).forEach(teardown);
  };
}

type PropertyType = "string" | "boolean" | "number";
type PropMap = Record<string, PropertyType>;

/**
 * Renders a specific part of the UI based on the component's props.
 * If `propsToSend` is provided, only those properties are sent to the API dynamically.
 * @param root - The root HTML element in which the part resides.
 * @param name - The name of the part to render.
 * @param api - An API object that provides functions to get properties for the specified part.
 * @param propsToSend - Optional: a map of properties to send with their types.
 */
export const renderPart = (
  root: HTMLElement,
  name: string,
  api: any,
  propsToSend?: PropMap,
  skipScope = false,
) => {
  const camelizedName = name
    .split("-")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join("");

  const getterName = `get${camelizedName.charAt(0).toUpperCase()}${camelizedName.slice(1)}Props`;
  if (typeof api[getterName] !== "function") return;

  const componentClass = Array.from(root.classList).find((cls) =>
    cls.endsWith("-js"),
  );

  const parts = Array.from(
    root.querySelectorAll<HTMLElement>(`[data-part='${name}']`),
  );

  let scopedParts;

  if (skipScope || !componentClass) {
    scopedParts = parts;
  } else {
    // Better scoping: ensure parts belong directly to this component
    // and not to any nested component instances
    scopedParts = parts.filter((part) => {
      // Find the closest component container (any element with a *-js class)
      const closestComponent = part.closest('[class*="-js"]');

      // The part belongs to this component if:
      // 1. The closest component container is our root element
      return closestComponent === root;
    });
  }

  scopedParts.forEach((part) => {
    let props: Record<string, any> | undefined;
    if (propsToSend) {
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
    }

    const result = props ? api[getterName](props) : api[getterName]();
    spreadProps(part, result);

    if (name === "preview") {
      const childrenValue = part.getAttribute("children");
      if (childrenValue !== null) part.textContent = childrenValue;
    }
  });
};

/**
 * Renders a list of items inside the root element. Each item is identified by the `name`, and the
 * properties for each item are retrieved from the API based on its `data-value`, `data-disabled`, and `data-index` attributes.
 * @param root - The root HTML element containing the items.
 * @param name - The name of the item part to render.
 * @param api - The API object used to retrieve the properties for each item.
 * ```
 */
export const renderItem = (root: HTMLElement, name: string, api: any) => {
  const camelizedName = name.replace(
    /(^|-)([a-z])/g,
    (_match, _prefix, letter) => letter.toUpperCase(),
  );
  const getterName = `get${camelizedName}Props`;

  if (typeof api[getterName] !== "function") return;

  // Detect component class from root
  const componentClass = Array.from(root.classList).find((cls) =>
    cls.endsWith("-js"),
  );

  // Get all items with this part name under root
  const parts = Array.from(
    root.querySelectorAll<HTMLElement>(`[data-part='${name}']`),
  );

  // Filter out items that are nested inside another component of the same type
  const scopedParts = componentClass
    ? parts.filter((part) => part.closest(`.${componentClass}`) === root)
    : parts;

  scopedParts.forEach((part) => {
    const value = getString(part, "value");
    const disabled = getBoolean(part, "disabled");
    const index = getNumber(part, "index");
    const id = getString(part, "id");
    const type = getString(part, "type");
    const action = getString(part, "action");
    const size = getString(part, "size");
    const channel = getString(part, "channel");
    const view = getString(part, "view");
    const stage = getString(part, "stage");
    const axis = getString(part, "axis");

    const props = api[getterName]({
      value,
      disabled,
      index,
      id,
      type,
      action,
      size,
      channel,
      view,
      stage,
      axis,
    });

    spreadProps(part, props);
  });
};

export const renderSwatch = (root: HTMLElement, name: string, api: any) => {
  const camelizedName = name.replace(
    /(^|-)([a-z])/g,
    (_match, _prefix, letter) => letter.toUpperCase(),
  );
  const getterName = `get${camelizedName}Props`;

  // Find the control container
  const control = root.querySelector<HTMLElement>('[data-part="control"]');
  if (!control) return;

  // Only select parts inside control
  const parts = control.querySelectorAll<HTMLElement>(`[data-part='${name}']`);

  parts.forEach((part) => {
    const preset = getString(part, "preset");
    const value = preset ?? api.value;

    spreadProps(
      part,
      api[getterName]({
        value,
      }),
    );
  });
};

export const renderPage = (root: HTMLElement, name: string, api: any) => {
  const camelizedName = name.replace(
    /(^|-)([a-z])/g,
    (_match, _prefix, letter) => letter.toUpperCase(),
  );
  const getterName = `get${camelizedName}Props`;
  const parts = root.querySelectorAll<HTMLElement>(`[data-part='${name}']`);

  parts.forEach((part) => {
    const value = part.getAttribute("data-value");
    const type = part.getAttribute("data-type");

    if (type === "page" && value != null) {
      spreadProps(
        part,
        api[getterName]({
          type,
          value: Number(value),
          index: Number(value) - 1,
        }),
      );
    }
  });
};

export const renderEllipsis = (root: HTMLElement, api: any) => {
  const parts = root.querySelectorAll<HTMLElement>(`[data-part='ellipsis']`);

  parts.forEach((part) => {
    const index = part.getAttribute("data-index");
    if (index != null) {
      spreadProps(part, api.getEllipsisProps({ index: Number(index) }));
    }
  });
};
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

/**
 * Renders a list of groups inside the root element. Each group is identified by the `name`, and the
 * properties for each group are retrieved from the API based on its `data-id` attribute.
 * @param root - The root HTML element containing the groups.
 * @param name - The name of the group part to render (e.g., 'item-group', 'item-group-label').
 * @param api - The API object used to retrieve the properties for each group.
 * @param groups - Array of group objects with value property.
 */
export function renderGroup<T extends { value: string }>(
  root: HTMLElement,
  name: string,
  api: any,
  groups: T[],
) {
  const parts = root.querySelectorAll<HTMLElement>(`[data-part='${name}']`);
  const getter = api[`get${capitalize(name)}Props`];

  if (!getter) {
    console.warn(`API method get${capitalize(name)}Props not found`);
    return;
  }

  parts.forEach((el, index) => {
    const value = el.getAttribute("data-id") || groups[index]?.value;
    const group = groups.find((group) => group.value === value);

    if (!group) return;

    // For group labels, we need to pass the group id/value
    const props =
      name === "item-group-label"
        ? getter({ htmlFor: group.value })
        : getter({ id: group.value });

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

    // Pick the right props getter, fallback to generic
    const getPropsFn =
      typeof api[getterName] === "function" ? api[getterName] : api.getProps;
    const props = getPropsFn({ indexPath, node });

    spreadProps(part, props);

    // If a `children` attribute is explicitly set, use it as text
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
  if (value === "true") return true;
  if (value === "false") return false;
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
