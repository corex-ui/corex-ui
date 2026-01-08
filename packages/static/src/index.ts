import { initAccordion } from "./components/accordion";
import { initAngleSlider } from "./components/angle-slider";
import { initAvatar } from "./components/avatar";
import { initCarousel } from "./components/carousel";
import { initCheckbox } from "./components/checkbox";
import { initClipboard } from "./components/clipboard";
import { initCode } from "./components/code";
import { initCollapsible } from "./components/collapsible";
import { initColorPicker } from "./components/color-picker";
import { initCombobox } from "./components/combobox";
import { initDatePicker } from "./components/date-picker";
import { initDialog } from "./components/dialog";
import { initEditable } from "./components/editable";
import { initFileUpload } from "./components/file-upload";
import { initFloatingPanel } from "./components/floating-panel";
import { initListbox } from "./components/listbox";
import { initMenu } from "./components/menu";
import { initNumberInput } from "./components/number-input";
import { initPasswordInput } from "./components/password-input";
import { initPinInput } from "./components/pin-input";
import { initQrCode } from "./components/qr-code";
import { initRadioGroup } from "./components/radio-group";
import { initSelect } from "./components/select";
import { initSignaturePad } from "./components/signature-pad";
import { initSiteSearch } from "./components/site-search";
import { initSwitch } from "./components/switch";
import { initTabs } from "./components/tabs";
import { initTimer } from "./components/timer";
import {
  initToast,
  createToast,
  createInfoToast,
  createSuccessToast,
  createErrorToast,
  createWarningToast,
  createLoadingToast,
  updateToast,
  dismissToast,
} from "./components/toast";
import { initToggleGroup } from "./components/toggle-group";
import { initTreeView } from "./components/tree-view";

export {
  initAccordion,
  initAngleSlider,
  initAvatar,
  initCarousel,
  initCheckbox,
  initClipboard,
  initCode,
  initCollapsible,
  initColorPicker,
  initCombobox,
  initDatePicker,
  initDialog,
  initEditable,
  initFileUpload,
  initFloatingPanel,
  initListbox,
  initMenu,
  initNumberInput,
  initPasswordInput,
  initPinInput,
  initQrCode,
  initRadioGroup,
  initSelect,
  initSignaturePad,
  initSiteSearch,
  initSwitch,
  initTabs,
  initTimer,
  initToast,
  initToggleGroup,
  initTreeView,
};

// Export toast helper functions
export {
  createToast,
  createInfoToast,
  createSuccessToast,
  createErrorToast,
  createWarningToast,
  createLoadingToast,
  updateToast,
  dismissToast,
};

// Export types
export type {
  Pagefind,
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
} from "./components/site-search";

/**
 * Initialize all components with their default selectors.
 * Useful for development and testing.
 */
export function initAll(doc: HTMLElement | Document = document): void {
  initAccordion(doc);
  initAngleSlider(doc);
  initAvatar(doc);
  initCarousel(doc);
  initCheckbox(doc);
  initClipboard(doc);
  initCode(doc);
  initCollapsible(doc);
  initColorPicker(doc);
  initCombobox(doc);
  initDatePicker(doc);
  initDialog(doc);
  initEditable(doc);
  initFileUpload(doc);
  initFloatingPanel(doc);
  initListbox(doc);
  initMenu(doc);
  initNumberInput(doc);
  initPasswordInput(doc);
  initPinInput(doc);
  initQrCode(doc);
  initRadioGroup(doc);
  initSelect(doc);
  initSignaturePad(doc);
  initSiteSearch(undefined, doc);
  initSwitch(doc);
  initTabs(doc);
  initTimer(doc);
  initToast(doc);
  initToggleGroup(doc);
  initTreeView(doc);
}
