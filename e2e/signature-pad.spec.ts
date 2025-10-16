import { test, expect } from "@playwright/test";
import { a11y, getComponent } from "./utils";

test.describe("Signature Pad", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/signature-pad.html");
  });

  test("should have no accessibility violations", async ({ page }) => {
    await a11y(page);
  });
});
