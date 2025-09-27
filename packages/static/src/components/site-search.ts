import * as combobox from "@zag-js/combobox";
import type { Direction } from "@zag-js/types";
import type { ListCollection } from "@zag-js/collection";
import {
  Component,
  VanillaMachine,
  generateId,
  normalizeProps,
  renderPart,
  spreadProps,
  getString,
  getBoolean,
  getNumber,
  getStringList,
} from "../lib";
type SearchItem = {
  label: string;
  code: string;
  url?: string;
  excerpt?: string;
  title?: string;
};
function getDomItems(rootEl: HTMLElement): SearchItem[] {
  const items: SearchItem[] = [];
  rootEl.querySelectorAll('[data-part="item"]').forEach((el) => {
    const label = el.getAttribute("data-label") || el.textContent?.trim() || "";
    const code = el.getAttribute("data-code") || "";
    const url = el.getAttribute("href") || "";
    items.push({ label, code, url });
  });
  return items;
}
export class SiteSearch extends Component<combobox.Props, combobox.Api> {
  private pagefind: Pagefind | null = null;
  userOnInputValueChange?: combobox.Props["onInputValueChange"];
  userOnOpenChange?: combobox.Props["onOpenChange"];
  constructor(el: HTMLElement, props: combobox.Props) {
    super(el, {
      ...props,
      onInputValueChange: undefined,
      onOpenChange: undefined,
    });
    this.userOnInputValueChange = props.onInputValueChange;
    this.userOnOpenChange = props.onOpenChange;
  }
  options: SearchItem[] = [];
  allItems: SearchItem[] = [];
  setItems(items: SearchItem[]): void {
    this.allItems = items;
    this.options = items;
  }
  setPagefindInstance(pagefind: Pagefind): void {
    this.pagefind = pagefind;
  }
  getCollection(items: SearchItem[]): ListCollection<SearchItem> {
    return combobox.collection({
      items,
      itemToValue: (item) => item.code,
      itemToString: (item) => item.label,
    });
  }
  async performPagefindSearch(query: string): Promise<SearchItem[]> {
    if (!this.pagefind || !query.trim()) {
      return this.allItems;
    }
    try {
      const searchResults: PagefindSearchResults =
        await this.pagefind.search(query);
      const searchItems: SearchItem[] = [];
      for (const result of searchResults.results.slice(
        0,
        getNumber(this.el, "maxResults") || 20,
      )) {
        try {
          const data: PagefindSearchFragment = await result.data();
          searchItems.push({
            label: data.meta.title ?? data.url,
            code: data.url,
            url: data.url,
            excerpt: data.excerpt,
            title: data.meta.title,
          });
        } catch (error) {
          console.warn("Failed to load result data:", error);
        }
      }
      return searchItems;
    } catch (error) {
      console.error("Pagefind search error:", error);
      return this.allItems;
    }
  }
  updateCollection(): void {
    const newCollection = this.getCollection(this.options);
    this.machine.service.send({
      type: "COLLECTION.SET",
      collection: newCollection,
    });
  }
  initMachine(props: combobox.Props): VanillaMachine<any> {
    const self = this;
    return new VanillaMachine(combobox.machine, {
      ...props,
      get collection() {
        return self.getCollection(self.options || []);
      },
      async onInputValueChange(details) {
        const query = details.inputValue.trim();
        if (!query) {
          self.options = self.allItems;
          self.updateCollection();
          self.renderItems();
          self.userOnInputValueChange?.(details);
          return;
        }
        try {
          const searchResults = await self.performPagefindSearch(query);
          self.options =
            searchResults.length > 0 ? searchResults : self.allItems;
          self.updateCollection();
          self.renderItems();
          self.userOnInputValueChange?.(details);
        } catch (error) {
          console.error("Search error", error);
          self.options = self.allItems;
          self.updateCollection();
          self.renderItems();
          self.userOnInputValueChange?.(details);
        }
      },
      onOpenChange(details) {
        if (details.open) {
          self.options = self.allItems;
          self.updateCollection();
          self.renderItems();
        }
        self.userOnOpenChange?.(details);
      },
      onSelect(details) {
        if (details.itemValue) {
          window.location.href = details.itemValue;
        }
      },
    });
  }
  initApi(): combobox.Api {
    return combobox.connect(this.machine.service, normalizeProps);
  }
  renderItems(): void {
    const contentEl = this.el.querySelector('[data-part="content"]');
    if (!contentEl) return;
    contentEl.innerHTML = "";
    if (this.options.length === 0) {
      const noResult = document.createElement("div");
      noResult.setAttribute("data-part", "no-results");
      noResult.textContent =
        getString(this.el, "noResults") || "No results found";
      contentEl.appendChild(noResult);
      return;
    }
    const list = document.createElement("ul");
    list.setAttribute("data-part", "list");
    spreadProps(list, this.api.getListProps());
    for (const item of this.options) {
      const li = document.createElement("li");
      li.setAttribute("data-part", "item");
      li.setAttribute("data-label", item.label);
      li.setAttribute("data-code", item.code);
      spreadProps(li, this.api.getItemProps({ item }));
      li.textContent = item.label;
      if (item.excerpt) {
        const excerptDiv = document.createElement("span");
        excerptDiv.setAttribute("data-part", "excerpt");
        excerptDiv.innerHTML = item.excerpt;
        li.appendChild(excerptDiv);
      }
      list.appendChild(li);
    }
    contentEl.appendChild(list);
  }
  render(): void {
    const parts = [
      "root",
      "label",
      "control",
      "input",
      "trigger",
      "positioner",
      "content",
      "clear-trigger",
      "item-group",
      "item-group-label",
      "item-indicator",
      "item-text",
      "list",
    ];
    for (const part of parts) {
      renderPart(this.el, part, this.api);
    }
    this.renderItems();
  }
}
export function initializeSiteSearch(
  pagefindInstance?: Pagefind,
  doc: HTMLElement | Document = document,
): void {
  doc.querySelectorAll<HTMLElement>(".site-search-js").forEach((rootEl) => {
    const items: SearchItem[] = getDomItems(rootEl);
    const directions = ["ltr", "rtl"] as const;
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
    const inputBehaviors = ["autohighlight", "autocomplete", "none"] as const;
    const selectionBehaviors = ["replace", "clear", "preserve"] as const;
    const siteSearchComponent = new SiteSearch(rootEl, {
      id: generateId(rootEl, "site-search"),
      placeholder: getString(rootEl, "placeholder"),
      allowCustomValue: getBoolean(rootEl, "allowCustomValue"),
      autoFocus: getBoolean(rootEl, "autoFocus"),
      closeOnSelect: getBoolean(rootEl, "closeOnSelect"),
      composite: getBoolean(rootEl, "composite"),
      defaultHighlightedValue: getString(rootEl, "defaultHighlightedValue"),
      defaultInputValue: getString(rootEl, "defaultInputValue"),
      defaultOpen: getBoolean(rootEl, "defaultOpen"),
      defaultValue: getStringList(rootEl, "defaultValue"),
      dir: getString<Direction>(rootEl, "dir", directions),
      disabled: getBoolean(rootEl, "disabled"),
      disableLayer: getBoolean(rootEl, "disableLayer"),
      form: getString(rootEl, "form"),
      highlightedValue: getString(rootEl, "highlightedValue"),
      inputBehavior: getString(rootEl, "inputBehavior", inputBehaviors),
      inputValue: getString(rootEl, "inputValue"),
      invalid: getBoolean(rootEl, "invalid"),
      loopFocus: getBoolean(rootEl, "loopFocus"),
      multiple: getBoolean(rootEl, "multiple"),
      name: getString(rootEl, "name"),
      readOnly: getBoolean(rootEl, "readOnly"),
      required: getBoolean(rootEl, "required"),
      open: getBoolean(rootEl, "open"),
      openOnChange: getBoolean(rootEl, "openOnChange"),
      openOnClick: getBoolean(rootEl, "openOnClick"),
      openOnKeyPress: getBoolean(rootEl, "openOnKeyPress"),
      value: getStringList(rootEl, "value"),
      selectionBehavior: getString(
        rootEl,
        "selectionBehavior",
        selectionBehaviors,
      ),
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
            return {
              mainAxis,
              crossAxis,
            };
          }
          return undefined;
        })(),
        sameWidth: getBoolean(rootEl, "sameWidth"),
        overlap: getBoolean(rootEl, "overlap"),
        fitViewport: getBoolean(rootEl, "fitViewport"),
        slide: getBoolean(rootEl, "slide"),
      },
      navigate(details) {
        const eventName = getString(rootEl, "navigate");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onInputValueChange(details) {
        const eventName = getString(rootEl, "onInputValueChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onFocusOutside(event) {
        const eventName = getString(rootEl, "onFocusOutside");
        if (eventName) {
          rootEl.dispatchEvent(
            new CustomEvent(eventName, { detail: event.detail }),
          );
        }
      },
      onHighlightChange(details) {
        const eventName = getString(rootEl, "onHighlightChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onInteractOutside(event) {
        const eventName = getString(rootEl, "onInteractOutside");
        if (eventName) {
          rootEl.dispatchEvent(
            new CustomEvent(eventName, { detail: event.detail }),
          );
        }
      },
      onOpenChange(details) {
        const eventName = getString(rootEl, "onOpenChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onPointerDownOutside(event) {
        const eventName = getString(rootEl, "onPointerDownOutside");
        if (eventName) {
          rootEl.dispatchEvent(
            new CustomEvent(eventName, { detail: event.detail }),
          );
        }
      },
      onSelect(details) {
        const eventName = getString(rootEl, "onSelect");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onValueChange(details) {
        const eventName = getString(rootEl, "onValueChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });
    siteSearchComponent.setItems(items);
    siteSearchComponent.options = items;
    siteSearchComponent.init();
    if (pagefindInstance) {
      siteSearchComponent.setPagefindInstance(pagefindInstance);
    }
  });
}

interface PagefindIndexOptions {
  basePath?: string;
  baseUrl?: string;
  excerptLength?: number;
  indexWeight?: number;
  mergeFilter?: Record<string, unknown>;
  highlightParam?: string;
  language?: string;
  primary?: boolean;
  ranking?: PagefindRankingWeights;
}

interface PagefindRankingWeights {
  termSimilarity?: number;
  pageLength?: number;
  termSaturation?: number;
  termFrequency?: number;
}

interface PagefindSearchOptions {
  preload?: boolean;
  verbose?: boolean;
  filters?: Record<string, unknown>;
  sort?: Record<string, unknown>;
}

type PagefindFilterCounts = Record<string, Record<string, number>>;

interface PagefindSearchResults {
  results: PagefindSearchResult[];
  unfilteredResultCount: number;
  filters: PagefindFilterCounts;
  totalFilters: PagefindFilterCounts;
  timings: {
    preload: number;
    search: number;
    total: number;
  };
}

interface PagefindSearchResult {
  id: string;
  score: number;
  words: number[];
  data: () => Promise<PagefindSearchFragment>;
}

interface PagefindSearchFragment {
  url: string;
  raw_url?: string;
  content: string;
  raw_content?: string;
  excerpt: string;
  sub_results: PagefindSubResult[];
  word_count: number;
  locations: number[];
  weighted_locations: PagefindWordLocation[];
  filters: Record<string, string[]>;
  meta: Record<string, string>;
  anchors: PagefindSearchAnchor[];
}

interface PagefindSubResult {
  title: string;
  url: string;
  locations: number[];
  weighted_locations: PagefindWordLocation[];
  excerpt: string;
  anchor?: PagefindSearchAnchor;
}

interface PagefindWordLocation {
  weight: number;
  balanced_score: number;
  location: number;
}

interface PagefindSearchAnchor {
  element: string;
  id: string;
  text?: string;
  location: number;
}

interface Pagefind {
  debouncedSearch: (
    query: string,
    options?: PagefindSearchOptions,
    duration?: number,
  ) => Promise<PagefindSearchResults>;
  destroy: () => Promise<void>;
  filters: () => Promise<PagefindFilterCounts>;
  init: () => Promise<void>;
  mergeIndex: (
    indexPath: string,
    options?: Record<string, unknown>,
  ) => Promise<void>;
  options: (options: PagefindIndexOptions) => Promise<void>;
  preload: (term: string, options?: PagefindIndexOptions) => Promise<void>;
  search: (
    term: string,
    options?: PagefindSearchOptions,
  ) => Promise<PagefindSearchResults>;
}

export type {
  PagefindIndexOptions,
  PagefindRankingWeights,
  PagefindSearchOptions,
  PagefindFilterCounts,
  PagefindSearchResults,
  PagefindSearchResult,
  PagefindSearchFragment,
  PagefindSubResult,
  PagefindWordLocation,
  PagefindSearchAnchor,
  Pagefind,
};
