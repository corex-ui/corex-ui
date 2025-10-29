import { test, expect } from "@playwright/test";
import { getComponent, a11y } from "./utils";

test.describe("Combobox", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/combobox.html");
  });

  test("should render combobox with correct structure and attributes", async ({
    page,
  }) => {
    const { parts } = getComponent(page, "basic-combobox", [
      "root",
      "label",
      "control",
      "input",
      "trigger",
      "clear-trigger",
      "positioner",
      "content",
      "item",
    ]);

    const root = parts["root"].first();
    await expect(root).toHaveAttribute("data-scope", "combobox");
    await expect(root).toHaveAttribute("id", /combobox:combobox-/);

    const label = parts["label"].first();
    await expect(label).toHaveAttribute("data-scope", "combobox");
    await expect(label).toHaveAttribute("for", /:input/);

    const input = parts["input"].first();
    await expect(input).toHaveAttribute("role", "combobox");
    await expect(input).toHaveAttribute("aria-expanded", "false");
    await expect(input).toHaveAttribute("aria-autocomplete", "list");
    await expect(input).toHaveAttribute("data-state", "closed");

    const trigger = parts["trigger"].first();
    await expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
    await expect(trigger).toHaveAttribute("data-state", "closed");

    const content = parts["content"].first();
    await expect(content).toHaveAttribute("role", "listbox");
    await expect(content).toHaveAttribute("data-state", "closed");
  });

  test("should open on ArrowDown and highlight first item", async ({
    page,
  }) => {
    const { parts } = getComponent(page, "basic-combobox", [
      "input",
      "content",
      "item",
    ]);

    const input = parts["input"].first();
    const content = parts["content"].first();

    await input.focus();

    await page.keyboard.press("ArrowDown");

    await expect(content).toBeVisible();
    await expect(content).toHaveAttribute("data-state", "open");

    const firstItem = parts["item"].first();
    await expect(firstItem).toHaveAttribute("data-highlighted", "");

    await page.keyboard.press("ArrowDown");
    const secondItem = parts["item"].nth(1);
    await expect(secondItem).toHaveAttribute("data-highlighted", "");
  });
});
