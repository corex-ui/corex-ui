import { test, expect } from "@playwright/test";
import { a11y, getComponent } from "./utils";

test.describe("Number Input", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/number-input.html");
  });

  test("should have no accessibility violations", async ({ page }) => {
    await a11y(page);
  });

  test.describe("Rendering", () => {
    test("should render number input with correct structure and attributes", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-number-input", [
        "root",
        "label",
        "control",
        "input",
        "trigger-group",
        "increment-trigger",
        "decrement-trigger",
      ]);

      const root = parts["root"].first();
      await expect(root).toBeVisible();
      await expect(root).toHaveAttribute("data-scope", "number-input");
      await expect(root).toHaveAttribute("id", /number-input:numberInput-/);
      await expect(root).toHaveAttribute("dir", "ltr");

      const label = parts["label"].first();
      await expect(label).toBeVisible();
      await expect(label).toHaveAttribute("data-scope", "number-input");
      await expect(label).toHaveAttribute("id", /:label/);
      await expect(label).toHaveAttribute("for", /:input/);
      await expect(label).toHaveText("Enter Number");

      const control = parts["control"].first();
      await expect(control).toBeVisible();
      await expect(control).toHaveAttribute("data-scope", "number-input");
      await expect(control).toHaveAttribute("role", "group");
      await expect(control).toHaveAttribute("aria-disabled", "false");

      const input = parts["input"].first();
      await expect(input).toBeVisible();
      await expect(input).toHaveAttribute("data-scope", "number-input");
      await expect(input).toHaveAttribute("id", /:input/);
      await expect(input).toHaveAttribute("role", "spinbutton");
      await expect(input).toHaveAttribute("inputmode", "decimal");
      await expect(input).toHaveAttribute("autocomplete", "off");
      await expect(input).toHaveAttribute("autocorrect", "off");
      await expect(input).toHaveAttribute("spellcheck", "false");
      await expect(input).toHaveAttribute("type", "text");
      await expect(input).toHaveAttribute(
        "aria-roledescription",
        "numberfield",
      );
      await expect(input).toHaveAttribute("aria-valuemin");
      await expect(input).toHaveAttribute("aria-valuemax");

      const triggerGroup = parts["trigger-group"].first();
      await expect(triggerGroup).toBeVisible();

      const incrementTrigger = parts["increment-trigger"].first();
      await expect(incrementTrigger).toBeVisible();
      await expect(incrementTrigger).toHaveAttribute(
        "data-scope",
        "number-input",
      );
      await expect(incrementTrigger).toHaveAttribute("id", /:inc/);
      await expect(incrementTrigger).toHaveAttribute(
        "aria-label",
        "increment value",
      );
      await expect(incrementTrigger).toHaveAttribute("type", "button");
      await expect(incrementTrigger).toHaveAttribute("tabindex", "-1");
      await expect(incrementTrigger).toHaveAttribute("aria-controls", /:input/);

      const decrementTrigger = parts["decrement-trigger"].first();
      await expect(decrementTrigger).toBeVisible();
      await expect(decrementTrigger).toHaveAttribute(
        "data-scope",
        "number-input",
      );
      await expect(decrementTrigger).toHaveAttribute("id", /:dec/);
      await expect(decrementTrigger).toHaveAttribute(
        "aria-label",
        "decrease value",
      );
      await expect(decrementTrigger).toHaveAttribute("type", "button");
      await expect(decrementTrigger).toHaveAttribute("tabindex", "-1");
      await expect(decrementTrigger).toHaveAttribute("aria-controls", /:input/);
    });

    test("should render SVG icons in increment and decrement triggers", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-number-input", [
        "increment-trigger",
        "decrement-trigger",
      ]);

      const incrementTrigger = parts["increment-trigger"].first();
      const incrementSvg = incrementTrigger.locator("svg");
      await expect(incrementSvg).toBeVisible();
      await expect(incrementSvg).toHaveAttribute(
        "xmlns",
        "http://www.w3.org/2000/svg",
      );

      const decrementTrigger = parts["decrement-trigger"].first();
      const decrementSvg = decrementTrigger.locator("svg");
      await expect(decrementSvg).toBeVisible();
      await expect(decrementSvg).toHaveAttribute(
        "xmlns",
        "http://www.w3.org/2000/svg",
      );
    });
  });

  test.describe("Basic Interactions", () => {
    test("should increment value when increment button is clicked", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-number-input", [
        "input",
        "increment-trigger",
      ]);

      const input = parts["input"].first();
      const incrementTrigger = parts["increment-trigger"].first();

      const initialValue = await input.inputValue();
      await incrementTrigger.click();

      const newValue = await input.inputValue();
      expect(parseFloat(newValue || "0")).toBeGreaterThan(
        parseFloat(initialValue || "0"),
      );
    });

    test("should decrement value when decrement button is clicked", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-number-input", [
        "input",
        "increment-trigger",
        "decrement-trigger",
      ]);

      const input = parts["input"].first();
      const incrementTrigger = parts["increment-trigger"].first();
      const decrementTrigger = parts["decrement-trigger"].first();

      await incrementTrigger.click();
      const valueAfterIncrement = await input.inputValue();

      await decrementTrigger.click();
      const valueAfterDecrement = await input.inputValue();

      expect(parseFloat(valueAfterDecrement || "0")).toBeLessThan(
        parseFloat(valueAfterIncrement || "0"),
      );
    });

    test("should increment value with ArrowUp key", async ({ page }) => {
      const { parts } = getComponent(page, "basic-number-input", ["input"]);

      const input = parts["input"].first();
      await input.focus();

      const initialValue = await input.inputValue();
      await page.keyboard.press("ArrowUp");

      const newValue = await input.inputValue();
      expect(parseFloat(newValue || "0")).toBeGreaterThan(
        parseFloat(initialValue || "0"),
      );
    });

    test("should decrement value with ArrowDown key", async ({ page }) => {
      const { parts } = getComponent(page, "basic-number-input", ["input"]);

      const input = parts["input"].first();
      await input.focus();

      await page.keyboard.press("ArrowUp");
      const valueAfterIncrement = await input.inputValue();

      await page.keyboard.press("ArrowDown");
      const valueAfterDecrement = await input.inputValue();

      expect(parseFloat(valueAfterDecrement || "0")).toBeLessThan(
        parseFloat(valueAfterIncrement || "0"),
      );
    });

    test("should accept manual input", async ({ page }) => {
      const { parts } = getComponent(page, "basic-number-input", ["input"]);

      const input = parts["input"].first();
      await input.focus();
      await input.fill("42");

      await expect(input).toHaveValue("42");
    });

    test("should allow typing decimal numbers", async ({ page }) => {
      const { parts } = getComponent(page, "basic-number-input", ["input"]);

      const input = parts["input"].first();
      await input.focus();
      await input.fill("3.14");

      await expect(input).toHaveValue("3.14");
    });

    test("should allow typing negative numbers", async ({ page }) => {
      const { parts } = getComponent(page, "basic-number-input", ["input"]);

      const input = parts["input"].first();
      await input.focus();
      await input.fill("-10");

      await expect(input).toHaveValue("-10");
    });

    test("should handle multiple increment clicks", async ({ page }) => {
      const { parts } = getComponent(page, "basic-number-input", [
        "input",
        "increment-trigger",
      ]);

      const input = parts["input"].first();
      const incrementTrigger = parts["increment-trigger"].first();

      await incrementTrigger.click();
      await incrementTrigger.click();
      await incrementTrigger.click();

      const finalValue = await input.inputValue();
      expect(parseFloat(finalValue || "0")).toBeGreaterThan(0);
    });

    test("should handle multiple decrement clicks", async ({ page }) => {
      const { parts } = getComponent(page, "basic-number-input", [
        "input",
        "decrement-trigger",
      ]);

      const input = parts["input"].first();
      const decrementTrigger = parts["decrement-trigger"].first();

      await decrementTrigger.click();
      await decrementTrigger.click();
      await decrementTrigger.click();

      const finalValue = await input.inputValue();
      expect(parseFloat(finalValue || "0")).toBeLessThan(0);
    });
  });

  test.describe("Keyboard Navigation", () => {
    test("should navigate between increment/decrement with Tab", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-number-input", ["input"]);

      const input = parts["input"].first();
      await input.focus();
      await expect(input).toBeFocused();

      await page.keyboard.press("Tab");
      await expect(input).not.toBeFocused();
    });

    test("should increment with keyboard repeatedly", async ({ page }) => {
      const { parts } = getComponent(page, "basic-number-input", ["input"]);

      const input = parts["input"].first();
      await input.focus();

      await page.keyboard.press("ArrowUp");
      await page.keyboard.press("ArrowUp");
      await page.keyboard.press("ArrowUp");

      const finalValue = await input.inputValue();
      expect(parseFloat(finalValue || "0")).toBeGreaterThan(0);
    });

    test("should decrement with keyboard repeatedly", async ({ page }) => {
      const { parts } = getComponent(page, "basic-number-input", ["input"]);

      const input = parts["input"].first();
      await input.focus();

      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("ArrowDown");

      const finalValue = await input.inputValue();
      expect(parseFloat(finalValue || "0")).toBeLessThan(0);
    });
  });
});
