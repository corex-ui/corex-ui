import { test, expect } from "@playwright/test";
import { a11y, getComponent } from "./utils";

test.describe("Avatar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/avatar.html");
  });

  test("should have no accessibility violations", async ({ page }) => {
    await a11y(page);
  });

  test("should render all parts", async ({ page }) => {
    const { parts } = getComponent(page, "basic-avatar", [
      "root",
      "fallback",
      "image",
    ]);

    for (const [name, part] of Object.entries(parts)) {
      if (name === "fallback") {
        expect(await part.first().count()).toBe(1);
      } else {
        await expect(part.first()).toBeVisible();
      }
    }
  });

  test("should show image when available and hide fallback", async ({
    page,
  }) => {
    const { parts } = getComponent(page, "basic-avatar", ["image", "fallback"]);

    await expect(parts["image"].first()).toBeVisible();
    const fallbackHidden = await parts["fallback"]
      .first()
      .getAttribute("hidden");
    expect(fallbackHidden).toBe("true");

    expect(await parts["image"].first().getAttribute("alt")).toBe("Corex HTML");
  });

  test("should show fallback when image fails to load", async ({ page }) => {
    const { parts } = getComponent(page, "basic-avatar", ["image", "fallback"]);

    await page.evaluate(() => {
      const img = document.querySelector(
        '[data-part="image"]',
      ) as HTMLImageElement;
      img.src = "/invalid-path.svg";
    });

    await page.waitForFunction(() => {
      const fallback = document.querySelector(
        '[data-part="fallback"]',
      ) as HTMLElement;
      return !fallback.hasAttribute("hidden");
    });

    await expect(parts["fallback"].first()).toBeVisible();
    const imageHidden = await parts["image"].first().getAttribute("data-state");
    expect(imageHidden).toBe("hidden");
  });

  test("should have correct data-state attributes", async ({ page }) => {
    const { parts } = getComponent(page, "basic-avatar", ["image", "fallback"]);

    const imageState = await parts["image"].first().getAttribute("data-state");
    const fallbackState = await parts["fallback"]
      .first()
      .getAttribute("data-state");

    expect(imageState).toBe("visible");
    expect(fallbackState).toBe("hidden");
  });
});
