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
      await expect(root).toHaveAttribute("data-scope", "number-input");
      await expect(root).toHaveAttribute("id", /number-input:numberInput-/);
      await expect(root).toHaveAttribute("dir", "ltr");

      const label = parts["label"].first();
      await expect(label).toHaveAttribute("data-scope", "number-input");
      await expect(label).toHaveAttribute("id", /:label/);
      await expect(label).toHaveAttribute("for", /:input/);
      await expect(label).toHaveText("Enter Number");

      const control = parts["control"].first();
      await expect(control).toHaveAttribute("data-scope", "number-input");
      await expect(control).toHaveAttribute("role", "group");
      await expect(control).toHaveAttribute("aria-disabled", "false");

      const input = parts["input"].first();
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

      const incrementTrigger = parts["increment-trigger"].first();
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

      const decrementTrigger = parts["decrement-trigger"].first();
      const decrementSvg = decrementTrigger.locator("svg");
      await expect(decrementSvg).toBeVisible();
    });

    test("should have data-focus attribute when input is focused", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-number-input", [
        "root",
        "label",
        "control",
        "input",
      ]);

      const root = parts["root"].first();
      const label = parts["label"].first();
      const control = parts["control"].first();
      const input = parts["input"].first();

      // Focus the input
      await input.focus();

      await expect(root).toHaveAttribute("data-focus");
      await expect(label).toHaveAttribute("data-focus");
      await expect(control).toHaveAttribute("data-focus");
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

      // Set initial value
      await input.fill("0");

      await incrementTrigger.click();

      const newValue = await input.inputValue();
      expect(parseFloat(newValue)).toBeGreaterThan(0);
    });

    test("should decrement value when decrement button is clicked", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-number-input", [
        "input",
        "decrement-trigger",
      ]);

      const input = parts["input"].first();
      const decrementTrigger = parts["decrement-trigger"].first();

      // Set initial value
      await input.fill("0");

      await decrementTrigger.click();

      const newValue = await input.inputValue();
      expect(parseFloat(newValue)).toBeLessThan(0);
    });

    test("should increment value with ArrowUp key", async ({ page }) => {
      const { parts } = getComponent(page, "basic-number-input", ["input"]);

      const input = parts["input"].first();
      await input.focus();

      // Set initial value
      await input.fill("5");
      await input.press("ArrowUp");

      const newValue = await input.inputValue();
      expect(parseFloat(newValue)).toBeGreaterThan(5);
    });

    test("should decrement value with ArrowDown key", async ({ page }) => {
      const { parts } = getComponent(page, "basic-number-input", ["input"]);

      const input = parts["input"].first();
      await input.focus();

      // Set initial value
      await input.fill("5");
      await input.press("ArrowDown");

      const newValue = await input.inputValue();
      expect(parseFloat(newValue)).toBeLessThan(5);
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

      // Set initial value
      await input.fill("0");

      await incrementTrigger.click();
      await incrementTrigger.click();
      await incrementTrigger.click();

      const finalValue = await input.inputValue();
      expect(parseFloat(finalValue)).toBeGreaterThan(2);
    });

    test("should handle multiple decrement clicks", async ({ page }) => {
      const { parts } = getComponent(page, "basic-number-input", [
        "input",
        "decrement-trigger",
      ]);

      const input = parts["input"].first();
      const decrementTrigger = parts["decrement-trigger"].first();

      // Set initial value
      await input.fill("0");

      await decrementTrigger.click();
      await decrementTrigger.click();
      await decrementTrigger.click();

      const finalValue = await input.inputValue();
      expect(parseFloat(finalValue)).toBeLessThan(-2);
    });
  });

  test.describe("Keyboard Navigation", () => {
    test("should increment with keyboard repeatedly", async ({ page }) => {
      const { parts } = getComponent(page, "basic-number-input", ["input"]);

      const input = parts["input"].first();
      await input.focus();

      // Set initial value
      await input.fill("0");

      await input.press("ArrowUp");
      await input.press("ArrowUp");
      await input.press("ArrowUp");

      const finalValue = await input.inputValue();
      expect(parseFloat(finalValue)).toBeGreaterThan(2);
    });

    test("should decrement with keyboard repeatedly", async ({ page }) => {
      const { parts } = getComponent(page, "basic-number-input", ["input"]);

      const input = parts["input"].first();
      await input.focus();

      // Set initial value
      await input.fill("0");

      await input.press("ArrowDown");
      await input.press("ArrowDown");
      await input.press("ArrowDown");

      const finalValue = await input.inputValue();
      expect(parseFloat(finalValue)).toBeLessThan(-2);
    });

    test("should handle mixed keyboard inputs", async ({ page }) => {
      const { parts } = getComponent(page, "basic-number-input", ["input"]);

      const input = parts["input"].first();
      await input.focus();

      // Set initial value
      await input.fill("10");

      await input.press("ArrowUp");
      await input.press("ArrowUp");
      await input.press("ArrowDown");

      const finalValue = await input.inputValue();
      expect(parseFloat(finalValue)).toBeGreaterThan(10);
    });
  });
});
