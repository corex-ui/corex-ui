import { test, expect } from "@playwright/test";
import { a11y, getComponent } from "./utils";

test.describe("Carousel", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/carousel.html");
  });

  test("should have no accessibility violations", async ({ page }) => {
    await a11y(page);
  });

  test("should render all main parts", async ({ page }) => {
    const { parts } = getComponent(page, "basic-carousel", [
      "root",
      "item-group",
      "control",
      "prev-trigger",
      "next-trigger",
      "indicator-group",
      "item",
    ]);

    for (const part of Object.values(parts)) {
      expect(await part.count()).toBeGreaterThan(0);
    }

    const itemsCount = await parts["item"].count();
    expect(itemsCount).toBe(5);
  });

  test("should show first slide and hide others by default", async ({
    page,
  }) => {
    const { parts } = getComponent(page, "basic-carousel", ["item"]);

    for (let i = 0; i < (await parts["item"].count()); i++) {
      const item = parts["item"].nth(i);
      const ariaHidden = await item.getAttribute("aria-hidden");
      if (i === 0) {
        expect(ariaHidden).toBe(null);
      } else {
        expect(ariaHidden).toBe("true");
      }
    }
  });

  test("should navigate slides using next/prev buttons", async ({ page }) => {
    const { parts } = getComponent(page, "basic-carousel", [
      "item",
      "prev-trigger",
      "next-trigger",
    ]);

    const next = parts["next-trigger"].first();
    const prev = parts["prev-trigger"].first();

    const firstSlide = parts["item"].nth(0);
    const secondSlide = parts["item"].nth(1);

    await next.click();
    await expect(secondSlide).toHaveAttribute("aria-hidden", undefined);
    await expect(firstSlide).toHaveAttribute("aria-hidden", "true");

    await prev.click();
    await expect(firstSlide).toHaveAttribute("aria-hidden", undefined);
    await expect(secondSlide).toHaveAttribute("aria-hidden", "true");
  });

  test("should navigate slides using indicators", async ({ page }) => {
    const { parts } = getComponent(page, "basic-carousel", [
      "item",
      "indicator-group",
    ]);

    const indicators = await parts["indicator-group"]
      .first()
      .locator("[data-part='indicator']")
      .all();

    await indicators[2].click();
    const thirdSlide = parts["item"].nth(2);
    await expect(thirdSlide).toHaveAttribute("aria-hidden", undefined);

    for (let i = 0; i < 5; i++) {
      if (i !== 2) {
        await expect(parts["item"].nth(i)).toHaveAttribute(
          "aria-hidden",
          "true",
        );
      }
    }
  });

  test("should have correct aria-labels for slides", async ({ page }) => {
    const { parts } = getComponent(page, "basic-carousel", ["item"]);
    const count = await parts["item"].count();

    for (let i = 0; i < count; i++) {
      const item = parts["item"].nth(i);
      expect(await item.getAttribute("aria-label")).toBe(
        `${i + 1} of ${count}`,
      );
    }
  });
});
