import { test, expect } from "@playwright/test";
import { a11y, getComponent } from "./utils";

test.describe("Signature Pad", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/signature-pad.html");
  });

  test("should have no accessibility violations", async ({ page }) => {
    await a11y(page);
  });

  test.describe("Rendering", () => {
    test("should render signature pad with correct structure and attributes", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-signature-pad", [
        "root",
        "label",
        "hidden-input",
        "control",
        "segment",
        "clear-trigger",
        "guide",
        "preview",
      ]);

      const root = parts["root"].first();
      await expect(root).toBeVisible();
      await expect(root).toHaveAttribute("data-scope", "signature-pad");

      const label = parts["label"].first();
      await expect(label).toBeVisible();
      await expect(label).toHaveAttribute("data-scope", "signature-pad");
      await expect(label).toHaveText("Signature Pad");

      const hiddenInput = parts["hidden-input"].first();
      await expect(hiddenInput).toHaveAttribute("hidden", "true");

      const control = parts["control"].first();
      await expect(control).toBeVisible();
      await expect(control).toHaveAttribute("data-scope", "signature-pad");

      const segment = parts["segment"].first();
      await expect(segment).toBeVisible();

      const clearButton = parts["clear-trigger"].first();
      await expect(clearButton).toHaveAttribute("hidden", "true");

      const guide = parts["guide"].first();
      await expect(guide).toBeVisible();
    });
  });

  test.describe("Interactions", () => {
    test("should allow drawing and update hidden input", async ({ page }) => {
      const { parts } = getComponent(page, "basic-signature-pad", [
        "control",
        "hidden-input",
        "clear-trigger",
        "segment",
      ]);

      const control = parts["control"].first();
      const hiddenInput = parts["hidden-input"].first();
      const clearButton = parts["clear-trigger"].first();
      const segment = parts["segment"].first();

      const box = await control.boundingBox();
      if (!box) throw new Error("Control bounding box not found");

      await page.mouse.move(box.x + 10, box.y + 10);
      await page.mouse.down();
      await page.mouse.move(box.x + 50, box.y + 50);
      await page.mouse.up();

      await expect(hiddenInput).not.toHaveValue("");
      await expect(clearButton).toBeVisible();

      const path = segment.locator("path");
      await expect(path).toBeVisible();
    });

    test("should clear signature when clicking clear button", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-signature-pad", [
        "control",
        "hidden-input",
        "clear-trigger",
      ]);

      const control = parts["control"].first();
      const hiddenInput = parts["hidden-input"].first();
      const clearButton = parts["clear-trigger"].first();

      const box = await control.boundingBox();
      if (!box) throw new Error("Control bounding box not found");

      await page.mouse.move(box.x + 10, box.y + 10);
      await page.mouse.down();
      await page.mouse.move(box.x + 50, box.y + 50);
      await page.mouse.up();

      await clearButton.click();

      await expect(hiddenInput).toHaveAttribute("hidden", "true");
      await expect(hiddenInput).toHaveAttribute("readonly", "true");
    });
  });
});
