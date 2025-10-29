import { test, expect } from "@playwright/test";
import { getComponent } from "./utils";

test.describe("Listbox rendering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/listbox.html");
  });

  test("should render listbox with proper attributes", async ({ page }) => {
    const { parts } = getComponent(page, "basic-listbox", [
      "root",
      "label",
      "content",
      "item",
      "item-text",
      "item-indicator",
    ]);

    const root = parts["root"].first();
    await expect(root).toHaveAttribute("data-scope", "listbox");
    await expect(root).toHaveAttribute("id", /select:listbox-/);
    await expect(root).toHaveAttribute("data-orientation", "vertical");

    const label = parts["label"].first();
    await expect(label).toHaveAttribute("id", /select:listbox-.*:label/);
    await expect(label).toHaveAttribute("data-scope", "listbox");

    const content = parts["content"].first();
    await expect(content).toHaveAttribute("id", /select:listbox-.*:content/);
    await expect(content).toHaveAttribute("role", "listbox");
    await expect(content).toHaveAttribute("data-scope", "listbox");
    await expect(content).toHaveAttribute("tabindex", "0");

    const itemCount = await parts["item"].count();
    for (let i = 0; i < itemCount; i++) {
      const item = parts["item"].nth(i);
      await expect(item).toHaveAttribute("role", "option");
      await expect(item).toHaveAttribute("data-scope", "listbox");
      await expect(item).toHaveAttribute("data-state", "unchecked");

      const text = parts["item-text"].nth(i);
      await expect(text).toHaveAttribute("data-scope", "listbox");
      await expect(text).toHaveAttribute("data-state", "unchecked");

      const indicator = parts["item-indicator"].nth(i);
      await expect(indicator).toHaveAttribute("aria-hidden", "true");
      await expect(indicator).toHaveAttribute("data-state", "unchecked");
      await expect(indicator).toHaveAttribute("hidden", "true");
    }
  });
  test("should select first item on click and show indicator", async ({
    page,
  }) => {
    const { parts } = getComponent(page, "basic-listbox", [
      "item",
      "item-indicator",
    ]);

    const firstItem = parts["item"].first();
    const firstIndicator = parts["item-indicator"].first();

    await firstItem.click();

    await expect(firstItem).toHaveAttribute("data-state", "checked");

    await expect(firstIndicator).toBeVisible();

    const count = await parts["item"].count();
    for (let i = 1; i < count; i++) {
      await expect(parts["item"].nth(i)).toHaveAttribute(
        "data-state",
        "unchecked",
      );
      await expect(parts["item-indicator"].nth(i)).toHaveAttribute(
        "hidden",
        "true",
      );
    }
  });

  test("should navigate items with ArrowDown and ArrowUp", async ({ page }) => {
    const { parts } = getComponent(page, "basic-listbox", ["item"]);

    const firstItem = parts["item"].first();

    await firstItem.click();

    const count = await parts["item"].count();

    for (let i = 1; i < count; i++) {
      await page.keyboard.press("ArrowDown");

      const currentItem = parts["item"].nth(i);
      const highlighted = await currentItem.getAttribute("data-highlighted");

      expect(highlighted).not.toBeNull();
    }

    for (let i = count - 2; i >= 0; i--) {
      await page.keyboard.press("ArrowUp");

      const currentItem = parts["item"].nth(i);
      const highlighted = await currentItem.getAttribute("data-highlighted");
      expect(highlighted).not.toBeNull();
    }
  });
});
