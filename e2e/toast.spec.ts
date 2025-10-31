import { test, expect } from "@playwright/test";
import { a11y } from "./utils";

test.describe("Toast", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/toast.html");
  });

  test("should have no accessibility violations", async ({ page }) => {
    await a11y(page);
  });

  test.describe("Rendering", () => {
    test("should render toast with correct structure and attributes", async ({
      page,
    }) => {
      await page.click(".toast-loading");

      const root = page.locator('[data-part="root"][data-scope="toast"]');
      await root.waitFor({ state: "visible", timeout: 5000 });

      const group = page.locator('[data-part="group"][data-scope="toast"]');
      await expect(group).toBeAttached();

      await expect(group).toHaveAttribute("role", "region");
      await expect(group).toHaveAttribute("aria-label", /Notifications/);

      await expect(root).toHaveAttribute("role", "status");
      await expect(root).toHaveAttribute("data-state", "open");

      const title = root.locator('[data-part="title"]');
      const description = root.locator('[data-part="description"]');
      await expect(title).toHaveText(/Uploading File/);
      await expect(description).toContainText(/Please wait/i);

      const closeTrigger = root.locator('[data-part="close-trigger"]');
      await expect(closeTrigger).toHaveAttribute(
        "aria-label",
        "Dismiss notification",
      );

      const progressbar = root.locator('[data-part="progressbar"]');
      await expect(progressbar).toHaveAttribute("data-part", "progressbar");
    });
  });

  test.describe("Interactions", () => {
    test("should close toast when clicking the close button", async ({
      page,
    }) => {
      await page.click(".toast-info");
      const root = page.locator('[data-part="root"][data-scope="toast"]');
      await root.waitFor({ state: "visible", timeout: 5000 });

      const closeTrigger = root.locator('[data-part="close-trigger"]');
      await closeTrigger.click();

      await page.waitForTimeout(300);
      try {
        await expect(root).toHaveAttribute("data-state", "closed", {
          timeout: 2000,
        });
      } catch {
        await expect(root).toHaveCount(0);
      }
    });
  });
});
