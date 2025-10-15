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
  test.describe("basic-accordion", () => {
    test("should have default settings", async ({ page }) => {
      const { parts } = getComponent(page, "basic-accordion", [
        "item-trigger",
        "item-content",
      ]);
      const triggers = parts["item-trigger"];
      const contents = parts["item-content"];
      const count = await triggers.count();
      expect(count).toBe(3);
      for (let i = 0; i < count; i++) {
        const trigger = triggers.nth(i);
        const content = contents.nth(i);
        await expectState(trigger, "closed");
        await expectHidden(content);
      }
    });
    test("should expand only item on click", async ({ page }) => {
      const { parts } = getComponent(page, "basic-accordion", [
        "item-trigger",
        "item-content",
      ]);
      const trigger = parts["item-trigger"].first();
      const content = parts["item-content"].first();
      await expectState(trigger, "closed");
      await trigger.click();
      await expectState(trigger, "open");
      await expectVisible(content);
      await trigger.click();
      await expectState(trigger, "open");
      await expectVisible(content);
    });
    test("should handle keyboard navigation", async ({ page }) => {
      const { parts } = getComponent(page, "basic-accordion", ["item-trigger"]);
      const trigger = parts["item-trigger"].first();
      await trigger.focus();
      await page.keyboard.press("Enter");
      await expectState(trigger, "open");
    });
  });
  test.describe("multiple-accordion", () => {
    test("should allow multiple expanded items", async ({ page }) => {
      const { parts } = getComponent(page, "multiple-accordion", [
        "item-trigger",
        "item-content",
      ]);
      const triggers = parts["item-trigger"];
      const contents = parts["item-content"];
      const count = await triggers.count();
      for (let i = 0; i < count; i++) {
        await triggers.nth(i).click();
        await expectState(triggers.nth(i), "open");
        await expectVisible(contents.nth(i));
        for (let j = 1; j <= i; j++) {
          await expectState(triggers.nth(j), "open");
          await expectVisible(contents.nth(j));
        }
      }
    });
  });
  test.describe("values-accordion", () => {
    test("should expand default values", async ({ page }) => {
      const { parts } = getComponent(page, "values-accordion", [
        "item-trigger",
        "item-content",
      ]);
      const triggers = parts["item-trigger"];
      const contents = parts["item-content"];
      const count = await triggers.count();
      for (let i = 0; i < count; i++) {
        const trigger = triggers.nth(i);
        const content = contents.nth(i);
        const value = await trigger.getAttribute("data-value");
        if (value === "lorem" || value === "duis") {
          await expectState(trigger, "open");
          await expectVisible(content);
        } else {
          await expectState(trigger, "closed");
          await expectHidden(content);
        }
      }
    });
  });
  test.describe("collapsible-accordion", () => {
    test("should allow collapsing items", async ({ page }) => {
      const { parts } = getComponent(page, "collapsible-accordion", [
        "item-trigger",
        "item-content",
      ]);
      const trigger = parts["item-trigger"].first();
      const content = parts["item-content"].first();
      await trigger.click();
      await expectState(trigger, "open");
      await expectVisible(content);
      await trigger.click();
      await expectState(trigger, "closed");
      await expectHidden(content);
    });
  });
  test.describe("disabled-accordion", () => {
    test("should have disabled trigger and not open on click", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "disabled-accordion", [
        "item-trigger",
      ]);
      const triggers = parts["item-trigger"];
      const count = await triggers.count();
      for (let i = 0; i < count; i++) {
        const trigger = triggers.nth(i);
        await expect(trigger).toHaveAttribute("disabled", "true");
        await expectState(trigger, "closed");
      }
    });
  });
  test.describe("disabled-item-accordion", () => {
    test("should disable only selected items", async ({ page }) => {
      const { parts } = getComponent(page, "disabled-item-accordion", [
        "item-trigger",
      ]);
      const triggers = parts["item-trigger"];
      const count = await triggers.count();
      for (let i = 0; i < count; i++) {
        const trigger = triggers.nth(i);
        if (i === 0) {
          await expect(trigger).toHaveAttribute("disabled", "true");
          await expectState(trigger, "closed");
        } else {
          await expect(trigger).not.toHaveAttribute("disabled");
          await expectState(trigger, "closed");
        }
      }
    });
  });
  test.describe("horizontal-accordion", () => {
    test("should navigate items with keyboard horizontally", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "horizontal-accordion", [
        "item-trigger",
      ]);
      const triggers = parts["item-trigger"];
      const count = await triggers.count();
      await triggers.nth(0).focus();
      await isFocus(triggers.nth(0));
      for (let i = 1; i < count; i++) {
        await page.keyboard.press("ArrowRight");
        await isFocus(triggers.nth(i));
      }
      for (let i = count - 2; i >= 0; i--) {
        await page.keyboard.press("ArrowLeft");
        await isFocus(triggers.nth(i));
      }
    });
  });
});
