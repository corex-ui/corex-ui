import * as toast from "@zag-js/toast";
import {
  Component,
  VanillaMachine,
  normalizeProps,
  renderPart,
  generateId,
  spreadProps,
  getString,
  getNumber,
} from "../lib";
import { bindable } from "../lib/bindable";
import type { Placement, StatusChangeDetails } from "@zag-js/toast";
export class ToastItem extends Component<
  toast.Options<any> & { parent: any; index: number },
  toast.Api
> {
  actor: toast.Options<any> & { parent: any; index: number };
  index = bindable.ref(0);
  private isDestroyed = false;
  constructor(
    el: HTMLElement,
    actor: toast.Options<any> & { parent: any; index: number },
  ) {
    super(el, actor);
    this.actor = actor;
  }
  initMachine(props: toast.Options<any> & { parent: any; index: number }) {
    return new VanillaMachine(toast.machine, { ...props });
  }
  initApi(): toast.Api {
    return toast.connect(this.machine.service, normalizeProps);
  }
  destroy = () => {
    this.isDestroyed = true;
    this.machine.stop();
    this.el.remove();
  };
  render() {
    if (this.isDestroyed) return;
    const rootProps = this.api.getRootProps();
    spreadProps(this.el, rootProps);
    if (!this.el.innerHTML) {
      this.el.innerHTML = `
        <div data-scope="toast" data-part="content">
        <div data-scope="toast" data-part="title"></div>
        <div data-scope="toast" data-part="description"></div>
        </div>
        <button data-scope="toast" data-part="close-trigger">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
      <div data-scope="toast" data-part="progressbar"></div>
      `;
    }
    renderPart(this.el, "progressbar", this.api);
    renderPart(this.el, "close-trigger", this.api);
    const titleEl = this.el.querySelector<HTMLElement>('[data-part="title"]');
    if (titleEl && titleEl.textContent !== this.api.title)
      titleEl.textContent = this.api.title || "";
    const descEl = this.el.querySelector<HTMLElement>(
      '[data-part="description"]',
    );
    if (descEl && descEl.textContent !== this.api.description)
      descEl.textContent = this.api.description || "";
  }
}
export class Toast extends Component<toast.GroupProps, toast.GroupApi> {
  private toastComponents = new Map<string, ToastItem>();
  private groupEl!: HTMLElement;
  public groupId: string;
  constructor(el: HTMLElement, props: toast.GroupProps) {
    super(el, props);
    this.groupId = props.id || generateId(el, "toaster");
  }
  initMachine(props: toast.GroupProps): VanillaMachine<any> {
    return new VanillaMachine(toast.group.machine, {
      ...props,
      id: props.id ?? generateId(this.el, "toaster"),
    });
  }
  initApi(): toast.GroupApi {
    const api = toast.group.connect(this.machine.service, normalizeProps);
    this.groupEl = this.el.querySelector<HTMLElement>('[data-part="group"]')!;
    if (!this.groupEl) {
      this.groupEl = document.createElement("div");
      this.el.appendChild(this.groupEl);
    }
    return api;
  }
  addToast(toastActor: toast.Options<any> & { id: string }, index: number) {
    let toastComp = this.toastComponents.get(toastActor.id);
    if (!toastComp) {
      const rootEl = document.createElement("div");
      this.groupEl.appendChild(rootEl);
      const groupProps = this.api.getGroupProps;
      spreadProps(this.el, groupProps);
      toastComp = new ToastItem(rootEl, {
        ...toastActor,
        parent: this.machine.service,
        index,
      });
      toastComp.init();
      this.toastComponents.set(toastActor.id, toastComp);
    }
    toastComp.index.set(index);
    toastComp.render();
  }
  render() {
    renderPart(this.el, "group", this.api);
    const toasts = this.api
      .getToasts()
      .filter((t): t is toast.Options<any> & { id: string } => !!t.id);
    const newToastMap = new Map<string, ToastItem>();
    toasts.forEach((toastActor, i) => {
      this.addToast(toastActor, i);
      newToastMap.set(toastActor.id, this.toastComponents.get(toastActor.id)!);
    });
    for (const [id, comp] of this.toastComponents) {
      if (!newToastMap.has(id)) comp.destroy();
    }
    this.toastComponents = newToastMap;
  }
}
export function initializeToast(
  doc: HTMLElement | Document = document,
): Toast | null {
  let toasterInstance: Toast | null = null;
  doc.querySelectorAll<HTMLElement>(".toast-js").forEach((rootEl) => {
    const groupId = generateId(rootEl, "toaster");
    const placements = [
      "top-start",
      "top",
      "top-end",
      "bottom-start",
      "bottom",
      "bottom-end",
    ] as const;
    const placement =
      getString<Placement>(rootEl, "placement", placements) || "bottom-end";
    const max = getNumber(rootEl, "max");
    const gap = getNumber(rootEl, "gap");
    const offsets = getString(rootEl, "offsets");
    const store = toast.createStore({
      placement,
      gap,
      max,
      offsets,
    });
    toasterInstance = new Toast(rootEl, { id: groupId, store });
    toasterInstance.init();
    (rootEl as any).__toasterInstance = toasterInstance;
    (rootEl as any).__toasterStore = store;
  });
  return toasterInstance;
}
export function createToast(options: {
  title: string;
  description?: string;
  type?: "info" | "success" | "error" | "warning" | "loading";
  id?: string;
  duration?: number;
  onStatusChange?: (details: StatusChangeDetails) => void;
  removeDelay?: number;
  groupId?: string;
}) {
  let store: any;

  if (options.groupId) {
    const el = document.getElementById(options.groupId);
    store = (el as any)?.__toasterStore;
  } else {
    store = (document.querySelector(".toast-js") as any)?.__toasterStore;
  }

  if (!store) throw new Error("No toast store found");

  if (!options.id) options.id = generateId(undefined, "toast");

  return store.create(options);
}
export function createInfoToast(title: string, description?: string) {
  return createToast({ title, description, type: "info" });
}
export function createSuccessToast(title: string, description?: string) {
  return createToast({ title, description, type: "success" });
}
export function createErrorToast(title: string, description?: string) {
  return createToast({ title, description, type: "error" });
}
export function createWarningToast(title: string, description?: string) {
  return createToast({ title, description, type: "warning" });
}
export function createLoadingToast(title: string, description?: string) {
  return createToast({
    title,
    description,
    type: "loading",
    duration: Infinity,
  });
}
export function updateToast(
  id: string,
  options: Partial<{
    title: string;
    description?: string;
    type?: "info" | "success" | "error" | "warning" | "loading";
  }>,
) {
  const stores = document.querySelectorAll(".toast-js");
  if (!stores.length) throw new Error("No toast store found");

  stores.forEach((el: any) => {
    const store = el.__toasterStore;
    if (store) store.update(id, options);
  });
}

export function dismissToast(id: string) {
  const stores = document.querySelectorAll(".toast-js");
  if (!stores.length) throw new Error("No toast store found");

  stores.forEach((el: any) => {
    const store = el.__toasterStore;
    if (store) store.dismiss(id);
  });
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      initializeToast(document),
    );
  } else {
    initializeToast(document);
  }
}
