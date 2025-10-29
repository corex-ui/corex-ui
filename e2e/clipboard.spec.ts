import { test, expect } from "@playwright/test";
import { a11y, getComponent } from "./utils";

test.describe("Clipboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/clipboard.html");
  });

  test("should have no accessibility violations", async ({ page }) => {
    await a11y(page);
  });

  test("should copy value to clipboard on trigger click", async ({ page }) => {
    const { parts } = getComponent(page, "basic-clipboard", [
      "root",
      "trigger",
      "input",
    ]);

    await parts.trigger.click();

    await expect(parts.root).toHaveAttribute("data-copied", "");

    expect(await parts.input.inputValue()).toBe("info@netoum.com");

    await page.waitForTimeout(5000);
    expect(await parts.root.getAttribute("data-copied")).toBeNull();
  });
});
