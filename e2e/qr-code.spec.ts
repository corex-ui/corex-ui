import { test, expect } from "@playwright/test";
import { a11y, getComponent } from "./utils";

test.describe("QR Code", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/qr-code.html");
  });

  test("should have no accessibility violations", async ({ page }) => {
    await a11y(page);
  });

  test.describe("Rendering", () => {
    test("should render with correct structure and attributes", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-qr-code", [
        "root",
        "frame",
        "pattern",
        "overlay",
      ]);

      const root = parts["root"].first();
      await expect(root).toBeVisible();
      await expect(root).toHaveAttribute("data-scope", "qr-code");
      await expect(root).toHaveAttribute("data-part", "root");

      const frame = parts["frame"].first();
      await expect(frame).toBeVisible();
      await expect(frame).toHaveAttribute("data-part", "frame");
      await expect(frame).toHaveAttribute("data-scope", "qr-code");
      await expect(frame).toHaveAttribute("xmlns", /svg/);

      const pattern = parts["pattern"].first();
      await expect(pattern).toBeVisible();
      await expect(pattern).toHaveAttribute("data-part", "pattern");
      await expect(pattern).toHaveAttribute("data-scope", "qr-code");
      const d = await pattern.getAttribute("d");
      expect(d).not.toBeNull();
      expect(d).toContain("h10");

      const overlay = parts["overlay"].first();
      await expect(overlay).toBeVisible();
      await expect(overlay).toHaveAttribute("data-part", "overlay");

      const img = overlay.locator("img");
      await expect(img).toBeVisible();
      await expect(img).toHaveAttribute("src", /logo\.svg/);
    });
  });

  test.describe("Behavior", () => {
    test("should have a valid data-value and auto-generated IDs", async ({
      page,
    }) => {
      const qr = page.locator(".qr-code").first();

      await expect(qr).toHaveAttribute("data-value", "https://corex-ui.com/");

      const root = qr.locator('[data-part="root"]');
      const frame = qr.locator('[data-part="frame"]');

      const rootId = await root.getAttribute("id");
      const frameId = await frame.getAttribute("id");

      expect(rootId).not.toBeNull();
      expect(frameId).not.toBeNull();

      expect(rootId).toContain("qrcode:");
      expect(frameId).toContain("qrcode:");
    });
  });
});
