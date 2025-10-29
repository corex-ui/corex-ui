import { test, expect } from "@playwright/test";
import { a11y, getComponent } from "./utils";

test.describe("Menu", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/menu.html");
  });

  test("should have no accessibility violations", async ({ page }) => {
    await a11y(page);
  });
  test("should render menu with proper attributes", async ({ page }) => {
    const { parts } = getComponent(page, "basic-menu", [
      "trigger",
      "indicator",
      "positioner",
      "content",
      "item",
      "separator",
    ]);

    const trigger = parts["trigger"].first();
    await expect(trigger).toHaveAttribute("data-scope", "menu");
    await expect(trigger).toHaveAttribute("type", "button");
    await expect(trigger).toHaveAttribute("id", /menu:menu-/);
    await expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    await expect(trigger).toHaveAttribute("data-state", "closed");

    const indicator = parts["indicator"].first();
    await expect(indicator).toHaveAttribute("data-scope", "menu");
    await expect(indicator).toHaveAttribute("data-state", "closed");

    const positioner = parts["positioner"].first();
    await expect(positioner).toHaveAttribute("data-scope", "menu");
    await expect(positioner).toHaveAttribute("id", /menu:menu-.*:popper/);

    const content = parts["content"].first();
    await expect(content).toHaveAttribute("data-scope", "menu");
    await expect(content).toHaveAttribute("id", /menu:menu-.*:content/);
    await expect(content).toHaveAttribute("data-state", "closed");
    await expect(content).toHaveAttribute("role", "menu");
    await expect(content).toHaveAttribute("tabindex", "0");
    await expect(content).toHaveAttribute(
      "aria-labelledby",
      /menu:menu-.*:trigger/,
    );

    const itemCount = await parts["item"].count();
    for (let i = 0; i < itemCount; i++) {
      const item = parts["item"].nth(i);
      await expect(item).toHaveAttribute("data-scope", "menu");
      await expect(item).toHaveAttribute("role", "menuitem");
      await expect(item).toHaveAttribute(
        "data-ownedby",
        /menu:menu-.*:content/,
      );
    }

    const separator = parts["separator"].first();
    await expect(separator).toHaveAttribute("data-scope", "menu");
    await expect(separator).toHaveAttribute("role", "separator");
    await expect(separator).toHaveAttribute("aria-orientation", "horizontal");
  });

  test("should navigate items with ArrowDown and ArrowUp", async ({ page }) => {
    const { parts } = getComponent(page, "basic-menu", [
      "trigger",
      "content",
      "item",
    ]);

    const trigger = parts["trigger"].first();
    await trigger.click();

    const content = parts["content"].first();
    await expect(content).toBeVisible();

    await content.focus();

    const count = await parts["item"].count();

    for (let i = 0; i < count; i++) {
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
