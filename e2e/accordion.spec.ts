import { test, expect } from "@playwright/test";
import {
  a11y,
  getComponent,
  expectState,
  expectVisible,
  expectHidden,
  isFocus,
} from "./utils";

test.describe("Accordion", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/accordion.html");
  });

  test("should have no accessibility violation", async ({ page }) => {
    await a11y(page);
  });

  // Reusable test helpers
  const testHelpers = {
    async verifyItemCount(parts: any, expectedCount: number) {
      const count = await parts["item"].count();
      expect(count).toBe(expectedCount);
      return count;
    },

    async verifyAllClosed(parts: any, count: number) {
      for (let i = 0; i < count; i++) {
        await expectState(parts["item-trigger"].nth(i), "closed");
        await expectHidden(parts["item-content"].nth(i));
        expect(await parts["item"].nth(i).getAttribute("data-state")).toBe(
          "closed",
        );
      }
    },

    async clickAndVerifyOpen(parts: any, index: number) {
      await parts["item-trigger"].nth(index).click();
      await expectState(parts["item-trigger"].nth(index), "open");
      await expectVisible(parts["item-content"].nth(index));
      expect(await parts["item"].nth(index).getAttribute("data-state")).toBe(
        "open",
      );
    },

    async verifyOthersClosed(
      parts: any,
      openIndex: number,
      totalCount: number,
    ) {
      for (let i = 0; i < totalCount; i++) {
        if (i !== openIndex) {
          await expectState(parts["item-trigger"].nth(i), "closed");
          await expectHidden(parts["item-content"].nth(i));
        }
      }
    },

    async navigateWithArrows(parts: any, direction: "down" | "up") {
      const triggers = parts["item-trigger"];
      const count = await triggers.count();
      const key = direction === "down" ? "ArrowDown" : "ArrowUp";
      const start = direction === "down" ? 0 : count - 1;

      await triggers.nth(start).focus();
      await isFocus(triggers.nth(start));

      if (direction === "down") {
        for (let i = 1; i < count; i++) {
          await triggers.page().keyboard.press(key);
          await isFocus(triggers.nth(i));
        }
      } else {
        for (let i = count - 2; i >= 0; i--) {
          await triggers.page().keyboard.press(key);
          await isFocus(triggers.nth(i));
        }
      }
    },

    async expandWithKeyboard(
      parts: any,
      index: number,
      key: "Enter" | "Space",
    ) {
      await parts["item-trigger"].nth(index).focus();
      await parts["item-trigger"].nth(index).page().keyboard.press(key);
      await expectState(parts["item-trigger"].nth(index), "open");
      await expectVisible(parts["item-content"].nth(index));
    },
  };

  test.describe("basic-accordion", () => {
    test("should have 3 items with auto-generated data-values", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-accordion", ["item"]);
      const count = await testHelpers.verifyItemCount(parts, 3);

      // Wait for initialization
      await expect(parts["item"].first()).toHaveAttribute("data-state");

      // All items should have data-value attribute (auto-generated during init)
      for (let i = 0; i < count; i++) {
        const dataValue = await parts["item"].nth(i).getAttribute("data-value");
        expect(dataValue).toBeTruthy();
        // Auto-generated values follow pattern: accordion-item-{index}
        expect(dataValue).toMatch(/^accordion-item-\d+-/);
      }
    });

    test("should have default state - all items closed", async ({ page }) => {
      const { parts } = getComponent(page, "basic-accordion", [
        "item",
        "item-trigger",
        "item-content",
      ]);
      const count = await testHelpers.verifyItemCount(parts, 3);
      await testHelpers.verifyAllClosed(parts, count);
    });

    test("should expand first item on click", async ({ page }) => {
      const { parts } = getComponent(page, "basic-accordion", [
        "item",
        "item-trigger",
        "item-content",
      ]);
      const count = await parts["item"].count();

      await testHelpers.clickAndVerifyOpen(parts, 0);
      await testHelpers.verifyOthersClosed(parts, 0, count);
    });

    test("should expand second item on click", async ({ page }) => {
      const { parts } = getComponent(page, "basic-accordion", [
        "item",
        "item-trigger",
        "item-content",
      ]);
      const count = await parts["item"].count();

      await testHelpers.clickAndVerifyOpen(parts, 1);
      await testHelpers.verifyOthersClosed(parts, 1, count);
    });

    test("should expand third item on click", async ({ page }) => {
      const { parts } = getComponent(page, "basic-accordion", [
        "item",
        "item-trigger",
        "item-content",
      ]);
      const count = await parts["item"].count();

      await testHelpers.clickAndVerifyOpen(parts, 2);
      await testHelpers.verifyOthersClosed(parts, 2, count);
    });

    test("should keep item open on repeated clicks (not collapsible)", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-accordion", [
        "item",
        "item-trigger",
        "item-content",
      ]);

      // Open
      await testHelpers.clickAndVerifyOpen(parts, 0);

      // Click again - should stay open (not collapsible by default)
      await parts["item-trigger"].nth(0).click();
      await expectState(parts["item-trigger"].nth(0), "open");
      await expectVisible(parts["item-content"].nth(0));
    });

    test("should close previously opened item when opening another", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-accordion", [
        "item",
        "item-trigger",
        "item-content",
      ]);

      await testHelpers.clickAndVerifyOpen(parts, 0);
      await testHelpers.clickAndVerifyOpen(parts, 1);

      // First should be closed
      await expectState(parts["item-trigger"].nth(0), "closed");
      await expectHidden(parts["item-content"].nth(0));
    });

    test("should expand each item sequentially with clicks", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-accordion", [
        "item",
        "item-trigger",
        "item-content",
      ]);
      const count = await parts["item"].count();

      for (let i = 0; i < count; i++) {
        await testHelpers.clickAndVerifyOpen(parts, i);
        await testHelpers.verifyOthersClosed(parts, i, count);
      }
    });

    test("should navigate with ArrowDown key", async ({ page }) => {
      const { parts } = getComponent(page, "basic-accordion", ["item-trigger"]);
      await testHelpers.navigateWithArrows(parts, "down");
    });

    test("should navigate with ArrowUp key", async ({ page }) => {
      const { parts } = getComponent(page, "basic-accordion", ["item-trigger"]);
      await testHelpers.navigateWithArrows(parts, "up");
    });

    test("should wrap focus from last to first with ArrowDown", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-accordion", ["item-trigger"]);
      await parts["item-trigger"].last().focus();
      await page.keyboard.press("ArrowDown");
      await isFocus(parts["item-trigger"].first());
    });

    test("should wrap focus from first to last with ArrowUp", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-accordion", ["item-trigger"]);
      await parts["item-trigger"].first().focus();
      await page.keyboard.press("ArrowUp");
      await isFocus(parts["item-trigger"].last());
    });

    test("should expand items with Enter key", async ({ page }) => {
      const { parts } = getComponent(page, "basic-accordion", [
        "item-trigger",
        "item-content",
      ]);

      for (let i = 0; i < 3; i++) {
        await testHelpers.expandWithKeyboard(parts, i, "Enter");
      }
    });

    test("should expand items with Space key", async ({ page }) => {
      const { parts } = getComponent(page, "basic-accordion", [
        "item-trigger",
        "item-content",
      ]);

      await testHelpers.expandWithKeyboard(parts, 0, "Space");
    });

    test("should keep item open with Space key (not collapsible)", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-accordion", [
        "item-trigger",
        "item-content",
      ]);

      await testHelpers.expandWithKeyboard(parts, 0, "Space");

      // Press Space again - should stay open
      await parts["item-trigger"].nth(0).page().keyboard.press("Space");
      await expectState(parts["item-trigger"].nth(0), "open");
      await expectVisible(parts["item-content"].nth(0));
    });

    test("should navigate and expand each item with keyboard", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-accordion", [
        "item",
        "item-trigger",
        "item-content",
      ]);
      const count = await parts["item"].count();

      await parts["item-trigger"].nth(0).focus();

      for (let i = 0; i < count; i++) {
        await isFocus(parts["item-trigger"].nth(i));
        await page.keyboard.press("Enter");
        await expectState(parts["item-trigger"].nth(i), "open");

        if (i < count - 1) {
          await page.keyboard.press("ArrowDown");
        }
      }
    });

    test("should jump to first item with Home key", async ({ page }) => {
      const { parts } = getComponent(page, "basic-accordion", ["item-trigger"]);
      await parts["item-trigger"].nth(2).focus();
      await page.keyboard.press("Home");
      await isFocus(parts["item-trigger"].nth(0));
    });

    test("should jump to last item with End key", async ({ page }) => {
      const { parts } = getComponent(page, "basic-accordion", ["item-trigger"]);
      await parts["item-trigger"].nth(0).focus();
      await page.keyboard.press("End");
      await isFocus(parts["item-trigger"].nth(2));
    });

    test("should verify aria attributes", async ({ page }) => {
      const { parts } = getComponent(page, "basic-accordion", [
        "item-trigger",
        "item-content",
      ]);

      // All closed by default
      expect(
        await parts["item-trigger"].nth(0).getAttribute("aria-expanded"),
      ).toBe("false");
      expect(await parts["item-content"].nth(0).getAttribute("hidden")).toBe(
        "true",
      );

      // After clicking
      await parts["item-trigger"].nth(0).click();
      expect(
        await parts["item-trigger"].nth(0).getAttribute("aria-expanded"),
      ).toBe("true");
      expect(
        await parts["item-content"].nth(0).getAttribute("hidden"),
      ).toBeNull();
    });

    test("should have vertical orientation after initialization", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-accordion", [
        "item",
        "item-trigger",
      ]);

      // Wait for initialization by checking data-state exists
      await expect(parts["item"].first()).toHaveAttribute("data-state");

      // After initialization, orientation should be set on items and triggers
      await expect(parts["item"].first()).toHaveAttribute(
        "data-orientation",
        "vertical",
      );
      await expect(parts["item-trigger"].first()).toHaveAttribute(
        "data-orientation",
        "vertical",
      );
    });
  });

  test.describe("multiple-accordion", () => {
    test("should allow multiple items to be open simultaneously", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "multiple-accordion", [
        "item",
        "item-trigger",
        "item-content",
      ]);
      const count = await parts["item"].count();

      // Open all items
      for (let i = 0; i < count; i++) {
        await testHelpers.clickAndVerifyOpen(parts, i);

        // Verify all previously opened items remain open
        for (let j = 0; j <= i; j++) {
          await expectState(parts["item-trigger"].nth(j), "open");
          await expectVisible(parts["item-content"].nth(j));
        }
      }
    });

    test("should collapse individual items", async ({ page }) => {
      const { parts } = getComponent(page, "multiple-accordion", [
        "item-trigger",
        "item-content",
      ]);
      const count = await parts["item-trigger"].count();

      // Open all
      for (let i = 0; i < count; i++) {
        await parts["item-trigger"].nth(i).click();
      }

      // Close middle item
      await parts["item-trigger"].nth(1).click();
      await expectState(parts["item-trigger"].nth(1), "closed");

      // Others remain open
      await expectState(parts["item-trigger"].nth(0), "open");
      await expectState(parts["item-trigger"].nth(2), "open");
    });
  });

  test.describe("collapsible-accordion", () => {
    test("should allow toggling items open and closed", async ({ page }) => {
      const { parts } = getComponent(page, "collapsible-accordion", [
        "item-trigger",
        "item-content",
      ]);

      // Open
      await parts["item-trigger"].first().click();
      await expectState(parts["item-trigger"].first(), "open");
      await expectVisible(parts["item-content"].first());

      // Close (only works with data-collapsible)
      await parts["item-trigger"].first().click();
      await expectState(parts["item-trigger"].first(), "closed");
      await expectHidden(parts["item-content"].first());
    });

    test("should toggle with keyboard", async ({ page }) => {
      const { parts } = getComponent(page, "collapsible-accordion", [
        "item-trigger",
        "item-content",
      ]);

      await parts["item-trigger"].first().focus();

      // Open with Enter
      await page.keyboard.press("Enter");
      await expectState(parts["item-trigger"].first(), "open");

      // Close with Enter
      await page.keyboard.press("Enter");
      await expectState(parts["item-trigger"].first(), "closed");
    });
  });

  test.describe("disabled-accordion", () => {
    test("should not respond to clicks when disabled", async ({ page }) => {
      const { parts } = getComponent(page, "disabled-accordion", [
        "item-trigger",
        "item-content",
      ]);

      const trigger = parts["item-trigger"].first();
      expect(await trigger.getAttribute("aria-disabled")).toBe("true");

      await trigger.click({ force: true });
      await expectState(trigger, "closed");
      await expectHidden(parts["item-content"].first());
    });

    test("should not respond to keyboard", async ({ page }) => {
      const { parts } = getComponent(page, "disabled-accordion", [
        "item-trigger",
      ]);

      await parts["item-trigger"].first().focus();
      await page.keyboard.press("Enter");
      await expectState(parts["item-trigger"].first(), "closed");
    });
  });

  test.describe("disabled-item-accordion", () => {
    test("should disable first two items", async ({ page }) => {
      const { parts } = getComponent(page, "disabled-item-accordion", [
        "item",
        "item-trigger",
        "item-content",
      ]);

      // First two items disabled
      expect(
        await parts["item-trigger"].nth(0).getAttribute("aria-disabled"),
      ).toBe("true");
      expect(
        await parts["item-trigger"].nth(1).getAttribute("aria-disabled"),
      ).toBe("true");

      await parts["item-trigger"].nth(0).click({ force: true });
      await expectState(parts["item-trigger"].nth(0), "closed");

      await parts["item-trigger"].nth(1).click({ force: true });
      await expectState(parts["item-trigger"].nth(1), "closed");

      // Third item enabled
      await testHelpers.clickAndVerifyOpen(parts, 2);
    });
  });

  test.describe("horizontal-accordion", () => {
    test("should navigate with ArrowRight and ArrowLeft", async ({ page }) => {
      const { parts } = getComponent(page, "horizontal-accordion", [
        "item-trigger",
      ]);
      const count = await parts["item-trigger"].count();

      await parts["item-trigger"].nth(0).focus();

      // Navigate right
      for (let i = 1; i < count; i++) {
        await page.keyboard.press("ArrowRight");
        await isFocus(parts["item-trigger"].nth(i));
      }

      // Navigate left
      for (let i = count - 2; i >= 0; i--) {
        await page.keyboard.press("ArrowLeft");
        await isFocus(parts["item-trigger"].nth(i));
      }
    });

    test("should have horizontal orientation", async ({ page }) => {
      const { parts } = getComponent(page, "horizontal-accordion", ["item"]);

      // Wait for initialization
      await expect(parts["item"].first()).toHaveAttribute("data-state");

      // Check horizontal orientation
      await expect(parts["item"].first()).toHaveAttribute(
        "data-orientation",
        "horizontal",
      );
    });
  });

  test.describe("events-accordion", () => {
    test("should fire custom event on value change", async ({ page }) => {
      const log = page.locator("#event-log");
      const loremTrigger = page.locator(
        '[data-test="events-accordion"] [data-value="lorem"] [data-part="item-trigger"]',
      );

      await loremTrigger.click();
      await expect(log).toContainText("Value changed:");
      await expect(log).toContainText("lorem");
    });
  });

  test.describe("api-accordion", () => {
    test("should set value via API", async ({ page }) => {
      const log = page.locator("#api-event-log");
      const setBtn = page.locator(
        '[data-action="accordion-set-value"][data-value="donec"]',
      );

      await setBtn.click();
      await expect(log).toContainText("Set value:");
      await expect(log).toContainText("donec");
    });

    test("should set multiple values via API", async ({ page }) => {
      const log = page.locator("#api-event-log");
      const setBtn = page.locator(
        '[data-action="accordion-set-value"][data-value="donec,duis"]',
      );

      await setBtn.click();
      await expect(log).toContainText('["donec","duis"]');
    });

    test("should get current value via API", async ({ page }) => {
      const log = page.locator("#api-event-log");
      const setBtn = page.locator(
        '[data-action="accordion-set-value"][data-value="donec"]',
      );
      const getBtn = page.locator('[data-action="accordion-value"]');

      await setBtn.click();
      await getBtn.click();
      await expect(log).toContainText("Current value:");
      await expect(log).toContainText("donec");
    });
  });
});
