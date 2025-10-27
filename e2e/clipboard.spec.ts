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
    const root = page
      .locator('[data-test="basic-clipboard"] [data-part="root"]')
      .first();
    const input = root.locator('[data-part="input"]');
    const trigger = root.locator('[data-part="trigger"]');

    await trigger.click();

    await expect(root).toHaveAttribute("data-copied", "");

    expect(await input.inputValue()).toBe("info@netoum.com");

    await page.waitForTimeout(5000); // matches data-timeout
    expect(await root.getAttribute("data-copied")).toBeNull();
  });
});
