import { test, expect } from "@playwright/test";
import { a11y, getComponent } from "./utils";

test.describe("Select", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/select.html");
  });

  test("should have no accessibility violations", async ({ page }) => {
    await a11y(page);
  });

  test.describe("Rendering", () => {
    test("should render select with correct structure and attributes", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-select", [
        "root",
        "control",
        "label",
        "trigger",
        "content",
        "item",
      ]);

      const root = parts["root"].first();
      await expect(root).toBeVisible();
      await expect(root).toHaveAttribute("data-scope", "select");

      const control = parts["control"].first();
      await expect(control).toBeVisible();
      await expect(control).toHaveAttribute("data-scope", "select");

      const label = parts["label"].first();
      await expect(label).toBeVisible();
      await expect(label).toHaveAttribute("data-scope", "select");
      await expect(label).toHaveText("Your Currency");

      const trigger = parts["trigger"].first();
      await expect(trigger).toBeVisible();
      await expect(trigger).toHaveAttribute("type", "button");
      await expect(trigger).toHaveAttribute("role", "combobox");
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
      await expect(trigger).toHaveAttribute("aria-haspopup", "listbox");

      await trigger.click();

      const items = parts["item"];
      for (const item of await items.all()) {
        const text = item.locator('[data-part="item-text"]');
        await expect(text).toBeVisible();
        await expect(text).toHaveAttribute("data-part", "item-text");
        await expect(item).toHaveAttribute("role", "option");
        await expect(item).toHaveAttribute("data-state", "unchecked");
      }
    });
  });

  test.describe("Interactions", () => {
    test("should open and close dropdown when trigger is clicked", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-select", [
        "trigger",
        "content",
      ]);

      const trigger = parts["trigger"].first();
      const content = parts["content"].first();

      await expect(content).toHaveAttribute("data-state", "closed");

      await trigger.click();
      await expect(content).toHaveAttribute("data-state", "open");

      await trigger.click();
      await expect(content).toHaveAttribute("data-state", "closed");
    });

    test("should select item when clicked", async ({ page }) => {
      const { parts } = getComponent(page, "basic-select", [
        "trigger",
        "content",
        "item",
      ]);

      const trigger = parts["trigger"].first();
      await trigger.click();

      const items = parts["item"];
      const euroItem = items.nth(1);
      await euroItem.click();

      await expect(trigger).toHaveText(/Euro/);

      const content = parts["content"].first();
      await expect(content).toHaveAttribute("data-state", "closed");
    });

    test("should navigate items with keyboard", async ({ page }) => {
      const { parts } = getComponent(page, "basic-select", [
        "trigger",
        "content",
        "item",
      ]);

      const trigger = parts["trigger"].first();
      await trigger.click();

      const items = parts["item"];
      const firstItem = items.first();
      const secondItem = items.nth(1);

      await page.keyboard.press("ArrowDown");
      await expect(firstItem).toHaveAttribute("data-highlighted", {
        timeout: 5000,
      });

      await page.keyboard.press("ArrowDown");
      await expect(secondItem).toHaveAttribute("data-highlighted", {
        timeout: 5000,
      });
      await page.keyboard.press("Enter");
      await expect(trigger).toHaveText(/Euro/);
    });
  });

  test("should close dropdown when clicking outside", async ({ page }) => {
    const { parts } = getComponent(page, "basic-select", [
      "trigger",
      "content",
    ]);

    const trigger = parts["trigger"].first();
    const content = parts["content"].first();

    await trigger.click();
    await expect(content).toHaveAttribute("data-state", "open");

    await page.waitForTimeout(50);
    await page.mouse.click(0, 0);
    await expect(content).toHaveAttribute("data-state", "closed");
  });
});
