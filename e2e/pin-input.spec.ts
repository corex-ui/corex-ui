import { test, expect } from "@playwright/test";
import { a11y, getComponent } from "./utils";

test.describe("Pin Input", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/pin-input.html");
  });

  test("should have no accessibility violations", async ({ page }) => {
    await a11y(page);
  });

  test.describe("Rendering", () => {
    test("should render pin input with correct structure and attributes", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-pin-input", [
        "root",
        "label",
        "control",
        "input",
      ]);

      const root = parts["root"].first();
      await expect(root).toBeVisible();
      await expect(root).toHaveAttribute("data-scope", "pin-input");

      const label = parts["label"].first();
      await expect(label).toBeVisible();
      await expect(label).toHaveAttribute("data-scope", "pin-input");
      await expect(label).toHaveAttribute(
        "for",
        /pin-input:pinInput-.*:hidden/,
      );
      await expect(label).toHaveText("Enter Pin");

      const control = parts["control"].first();
      await expect(control).toBeVisible();
      await expect(control).toHaveAttribute("data-scope", "pin-input");

      const inputs = parts["input"];
      const count = await inputs.count();
      expect(count).toBe(5);

      for (let i = 0; i < count; i++) {
        const input = inputs.nth(i);
        await expect(input).toBeVisible();
        await expect(input).toHaveAttribute("data-scope", "pin-input");
        await expect(input).toHaveAttribute("data-index", `${i}`);
        await expect(input).toHaveAttribute("inputmode", "numeric");
        await expect(input).toHaveAttribute("type", "tel");
        await expect(input).toHaveAttribute("autocomplete", "off");
        await expect(input).toHaveAttribute("autocapitalize", "none");
        await expect(input).toHaveAttribute("placeholder", "○");
        await expect(input).toHaveAttribute(
          "aria-label",
          new RegExp(`pin code ${i + 1} of 5`),
        );
      }
    });
  });

  test.describe("Basic Interactions", () => {
    test("should accept numeric input in each field", async ({ page }) => {
      const { parts } = getComponent(page, "basic-pin-input", ["input"]);
      const inputs = parts["input"];

      const values = ["1", "2", "3", "4", "5"];
      for (let i = 0; i < values.length; i++) {
        const input = inputs.nth(i);
        await input.focus();
        await input.fill(values[i]);
        await expect(input).toHaveValue(values[i]);
      }
    });

    test("should move focus to next input automatically when typing", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-pin-input", ["input"]);
      const inputs = parts["input"];

      const first = inputs.nth(0);
      const second = inputs.nth(1);

      await first.focus();
      await first.fill("3");

      await expect(second).toBeFocused();
    });

    test("should ignore non-numeric input", async ({ page }) => {
      const { parts } = getComponent(page, "basic-pin-input", ["input"]);
      const first = parts["input"].nth(0);

      await first.focus();
      await first.fill("A");

      await expect(first).toHaveValue("");
    });

    test("should allow deleting input values", async ({ page }) => {
      const { parts } = getComponent(page, "basic-pin-input", ["input"]);
      const first = parts["input"].nth(0);

      await first.focus();
      await first.fill("5");
      await expect(first).toHaveValue("5");

      await first.press("Backspace");
      await expect(first).toHaveValue("");
    });
  });

  test.describe("State Management", () => {
    test("should maintain previously entered digits when refocusing", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-pin-input", ["input"]);
      const inputs = parts["input"];

      await inputs.nth(0).fill("1");
      await inputs.nth(1).fill("2");
      await inputs.nth(2).fill("3");

      await inputs.nth(0).focus();
      await expect(inputs.nth(0)).toHaveValue("1");
      await expect(inputs.nth(1)).toHaveValue("2");
      await expect(inputs.nth(2)).toHaveValue("3");
    });

    test("should handle clearing all inputs", async ({ page }) => {
      const { parts } = getComponent(page, "basic-pin-input", ["input"]);
      const inputs = parts["input"];

      for (let i = 0; i < 5; i++) {
        await inputs.nth(i).fill(String(i));
      }

      for (let i = 0; i < 5; i++) {
        await expect(inputs.nth(i)).toHaveValue(String(i));
      }

      for (let i = 0; i < 5; i++) {
        await inputs.nth(i).press("Backspace");
      }

      for (let i = 0; i < 5; i++) {
        await expect(inputs.nth(i)).toHaveValue("");
      }
    });
  });

  test.describe("Accessibility", () => {
    test("should have correct aria-labels", async ({ page }) => {
      const { parts } = getComponent(page, "basic-pin-input", ["input"]);
      const inputs = parts["input"];
      const count = await inputs.count();

      for (let i = 0; i < count; i++) {
        const input = inputs.nth(i);
        await expect(input).toHaveAttribute(
          "aria-label",
          new RegExp(`pin code ${i + 1} of ${count}`),
        );
      }
    });

    test("should have focusable inputs", async ({ page }) => {
      const { parts } = getComponent(page, "basic-pin-input", ["input"]);
      const inputs = parts["input"];
      const count = await inputs.count();

      for (let i = 0; i < count; i++) {
        const input = inputs.nth(i);
        await input.focus();
        await expect(input).toBeFocused();
      }
    });
  });
});
