import { test, expect } from "@playwright/test";
import { a11y, getComponent } from "./utils";

test.describe("Button", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/button.html");
  });

  test("should have no accessibility violations", async ({ page }) => {
    await a11y(page, ".button");
  });
});
