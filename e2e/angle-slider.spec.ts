import { test, expect } from "@playwright/test";
import { a11y, getComponent, isFocus } from "./utils";

test.describe("Angle Slider", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/angle-slider.html");
  });

  test("should have no accessibility violations", async ({ page }) => {
    await a11y(page);
  });

  test.describe("basic-angle-slider", () => {
    test("should render all parts", async ({ page }) => {
      const { parts } = getComponent(page, "basic-angle-slider", [
        "root",
        "label",
        "control",
        "thumb",
        "value",
        "text",
        "hidden-input",
      ]);

      for (const [name, part] of Object.entries(parts)) {
        if (name === "hidden-input") {
          expect(await part.first().count()).toBe(1);
        } else {
          await expect(part.first()).toBeVisible();
        }
      }
    });

    test("should have initial value 0 and angle 0", async ({ page }) => {
      const { parts } = getComponent(page, "basic-angle-slider", [
        "root",
        "thumb",
        "value",
        "hidden-input",
      ]);

      const root = parts["root"].first();
      const thumb = parts["thumb"].first();
      const value = parts["value"].first();
      const input = parts["hidden-input"].first();

      await expect(value).toHaveText("0");
      await expect(input).toHaveValue("0");
      expect(await root.getAttribute("style")).toContain("--value:0");
      expect(await root.getAttribute("style")).toContain("--angle:0deg");
      expect(await thumb.getAttribute("aria-valuenow")).toBe("0");
    });

    test("should focus thumb with keyboard", async ({ page }) => {
      const { parts } = getComponent(page, "basic-angle-slider", ["thumb"]);
      const thumb = parts["thumb"].first();

      await thumb.focus();
      await isFocus(thumb);
      expect(await thumb.getAttribute("tabindex")).toBe("0");
    });

    test("should update value and angle on keyboard ArrowRight/ArrowLeft", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-angle-slider", [
        "root",
        "thumb",
        "value",
        "hidden-input",
      ]);

      const root = parts["root"].first();
      const thumb = parts["thumb"].first();
      const value = parts["value"].first();
      const input = parts["hidden-input"].first();

      await thumb.focus();

      await page.keyboard.press("ArrowRight");
      expect(Number(await value.textContent())).toBeGreaterThan(0);
      expect(Number(await input.inputValue())).toBeGreaterThan(0);
      expect(await root.getAttribute("style")).toMatch(/--value:\d+/);
      expect(await root.getAttribute("style")).toMatch(/--angle:\d+deg/);

      await page.keyboard.press("ArrowLeft");
      expect(Number(await value.textContent())).toBeGreaterThanOrEqual(0);
    });

    test("should update value and angle on pointer drag", async ({ page }) => {
      const { parts } = getComponent(page, "basic-angle-slider", [
        "root",
        "control",
        "thumb",
        "value",
        "hidden-input",
      ]);

      const control = parts["control"].first();
      const value = parts["value"].first();
      const input = parts["hidden-input"].first();

      const box = await control.boundingBox();
      if (!box) return;

      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width, box.y + box.height / 2);
      await page.mouse.up();

      expect(Number(await value.textContent())).toBeGreaterThan(0);
      expect(Number(await input.inputValue())).toBeGreaterThan(0);
    });

    test("should respect min/max aria attributes", async ({ page }) => {
      const { parts } = getComponent(page, "basic-angle-slider", ["thumb"]);
      const thumb = parts["thumb"].first();

      expect(await thumb.getAttribute("aria-valuemin")).toBe("0");
      expect(await thumb.getAttribute("aria-valuemax")).toBe("360");
    });
  });
});
