import AxeBuilder from "@axe-core/playwright";
import { expect, Locator, type Page } from "@playwright/test";

export async function a11y(
  page: Page,
  selector = "body",
  disableRules: string[] = [],
) {
  await page.waitForSelector(selector);

  const results = await new AxeBuilder({ page: page as any })
    .disableRules([...disableRules])
    .include(selector)
    .analyze();

  expect(results.violations).toEqual([]);
}

/**
 * Get a component root and optionally some parts.
 * Example:
 *   const { root, parts } = getComponent(page, "accordion", ["item-trigger", "item-content"])
 */
export function getComponent(
  page: Page,
  testId: string,
  partNames: string[] = [],
) {
  const root = page.locator(`[data-test="${testId}"]`);
  const parts = Object.fromEntries(
    partNames.map((name) => [name, root.locator(`[data-part="${name}"]`)]),
  );

  return { root, parts };
}

/**
 * Get one or more parts under a root.
 * Example:
 *   const triggers = getParts(root, "item-trigger")
 */
export function getParts(root: Locator, ...names: string[]) {
  return Object.fromEntries(
    names.map((name) => [name, root.locator(`[data-part="${name}"]`)]),
  );
}

/**
 * Generic state expectation.
 * Works for data-state, aria-checked, etc.
 */
export async function expectState(
  locator: Locator,
  state: string,
  attr = "data-state",
) {
  await expect(locator).toHaveAttribute(attr, state);
}

/**
 * Visibility helpers
 */
export async function expectVisible(locator: Locator) {
  await expect(locator).toBeVisible();
}

export async function expectHidden(locator: Locator) {
  await expect(locator).toBeHidden();
}

/**
 * Check if the element is currently focused
 */
export async function isFocus(locator: Locator) {
  const focused = await locator.evaluate((el) => document.activeElement === el);
  expect(focused).toBe(true);
}

/**
 * Check if the element is currently highlighted (focused in listbox)
 */
export async function isHighlightedFocus(locator: Locator) {
  const highlighted = await locator.getAttribute("data-highlighted");
  expect(highlighted).not.toBeNull();
}

/**
 * Expect the element to have the selected state for listbox
 * Works with data-state="checked"/"unchecked"
 */
export async function expectSelected(locator: Locator) {
  await locator.waitFor({ state: "attached" });
  const state = await locator.getAttribute("data-state");
  expect(state).toBe("checked");
}

/**
 * Expect the element to be unselected in listbox
 */
export async function expectUnselected(locator: Locator) {
  await locator.waitFor({ state: "attached" });
  const state = await locator.getAttribute("data-state");
  expect(state).toBe("unchecked");
}
