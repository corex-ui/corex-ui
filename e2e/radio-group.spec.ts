import { test, expect } from "@playwright/test";
import { a11y, getComponent } from "./utils";

test.describe("Radio Group", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/radio-group.html");
  });

  test("should have no accessibility violations", async ({ page }) => {
    await a11y(page);
  });

  test.describe("Rendering", () => {
    test("should render with correct structure and attributes", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-radio-group", [
        "root",
        "label",
        "item",
        "item-text",
        "item-hidden-input",
        "item-control",
      ]);

      const root = parts["root"].first();
      await expect(root).toBeVisible();
      await expect(root).toHaveAttribute("data-scope", "radio-group");
      await expect(root).toHaveAttribute("role", "radiogroup");

      const label = parts["label"].first();
      await expect(label).toBeVisible();
      const labelledBy = (await root.getAttribute("aria-labelledby")) ?? "";
      await expect(label).toHaveAttribute("id", labelledBy);

      const items = parts["item"];
      const itemCount = await items.count();
      expect(itemCount).toBeGreaterThan(0);

      for (let i = 0; i < itemCount; i++) {
        const item = items.nth(i);
        const input = parts["item-hidden-input"].nth(i);
        const text = parts["item-text"].nth(i);
        const control = parts["item-control"].nth(i);

        await expect(item).toHaveAttribute("data-scope", "radio-group");
        await expect(item).toHaveAttribute("data-state");

        await expect(input).toHaveAttribute("type", "radio");
        await expect(input).toHaveAttribute("name");

        const inputId = await input.getAttribute("id");
        if (!inputId) throw new Error("Expected input to have an id attribute");

        await expect(item).toHaveAttribute("for", inputId);
        await expect(item).toHaveAttribute("for", inputId);
        await expect(text).toBeVisible();
        await expect(control).toHaveAttribute("aria-hidden", "true");
      }
    });
  });

  test.describe("Interaction", () => {
    test("should select item when clicked", async ({ page }) => {
      const { parts } = getComponent(page, "basic-radio-group", [
        "item",
        "item-hidden-input",
      ]);

      const firstInput = parts["item-hidden-input"].nth(0);
      const secondInput = parts["item-hidden-input"].nth(1);

      await expect(firstInput).not.toBeChecked();
      await expect(secondInput).not.toBeChecked();

      const secondItem = parts["item"].nth(1);
      await secondItem.click();

      await expect(secondInput).toBeChecked();
      await expect(firstInput).not.toBeChecked();

      const thirdItem = parts["item"].nth(2);
      const thirdInput = parts["item-hidden-input"].nth(2);

      await thirdItem.click();
      await expect(thirdInput).toBeChecked();
      await expect(secondInput).not.toBeChecked();
    });
  });
});
