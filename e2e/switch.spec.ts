import { test, expect } from "@playwright/test";
import { a11y, getComponent } from "./utils";

test.describe("Switch", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/switch.html");
  });

  test("should have no accessibility violations", async ({ page }) => {
    await a11y(page);
  });

  test.describe("Rendering", () => {
    test("should render switch with correct structure and attributes", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-switch", [
        "root",
        "label",
        "hidden-input",
        "control",
        "thumb",
      ]);

      const root = parts["root"].first();
      await expect(root).toBeVisible();
      await expect(root).toHaveAttribute("data-scope", "switch");
      await expect(root).toHaveAttribute("data-state", "unchecked");

      const label = parts["label"].first();
      await expect(label).toBeVisible();
      await expect(label).toHaveAttribute("data-scope", "switch");
      await expect(label).toHaveAttribute("data-state", "unchecked");
      await expect(label).toHaveText("Label");

      const hiddenInput = parts["hidden-input"].first();
      await expect(hiddenInput).toHaveAttribute("type", "checkbox");
      await expect(hiddenInput).toHaveAttribute("aria-labelledby");
      await expect(hiddenInput).not.toBeChecked();

      const control = parts["control"].first();
      await expect(control).toBeVisible();
      await expect(control).toHaveAttribute("data-scope", "switch");
      await expect(control).toHaveAttribute("data-state", "unchecked");

      const thumb = parts["thumb"].first();
      await expect(thumb).toBeVisible();
      await expect(thumb).toHaveAttribute("data-scope", "switch");
      await expect(thumb).toHaveAttribute("data-state", "unchecked");
    });
  });

  test.describe("Interactions", () => {
    test("should toggle switch on click", async ({ page }) => {
      const { parts } = getComponent(page, "basic-switch", [
        "root",
        "hidden-input",
        "control",
      ]);

      const root = parts["root"].first();
      const hiddenInput = parts["hidden-input"].first();
      const control = parts["control"].first();

      await expect(hiddenInput).not.toBeChecked();
      await expect(root).toHaveAttribute("data-state", "unchecked");
      await expect(control).toHaveAttribute("data-state", "unchecked");

      await control.click();

      await expect(hiddenInput).toBeChecked();
      await expect(root).toHaveAttribute("data-state", "checked");
      await expect(control).toHaveAttribute("data-state", "checked");

      await control.click();

      await expect(hiddenInput).not.toBeChecked();
      await expect(root).toHaveAttribute("data-state", "unchecked");
      await expect(control).toHaveAttribute("data-state", "unchecked");
    });
  });
});
