import { test, expect } from "@playwright/test";
import {
  a11y,
  getComponent,
  expectState,
  expectVisible,
  expectHidden,
  isFocus,
} from "./utils";

test.describe("Collapsible (basic)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/collapsible.html");
  });

  test("should have no accessibility violations", async ({ page }) => {
    await a11y(page);
  });

  test("should render main parts", async ({ page }) => {
    const { parts } = getComponent(page, "basic-collapsible", [
      "root",
      "trigger",
      "content",
      "indicator",
    ]);

    await expect(parts["root"].first()).toBeVisible();
    await expect(parts["trigger"].first()).toBeVisible();
    await expect(parts["indicator"].first()).toBeVisible();
    await expect(parts["content"].first()).toHaveCount(1);
  });

  test("should toggle open and closed on click", async ({ page }) => {
    const { parts } = getComponent(page, "basic-collapsible", [
      "trigger",
      "content",
    ]);

    const trigger = parts["trigger"].first();
    const content = parts["content"].first();

    await expectState(trigger, "closed");
    await expectHidden(content);

    await trigger.click();
    await expectState(trigger, "open");
    await expectVisible(content);

    await trigger.click();
    await expectState(trigger, "closed");
    await expectHidden(content);
  });

  test("should toggle open/closed with keyboard (Enter and Space)", async ({
    page,
  }) => {
    const { parts } = getComponent(page, "basic-collapsible", [
      "trigger",
      "content",
    ]);

    const trigger = parts["trigger"].first();
    const content = parts["content"].first();

    await trigger.focus();
    await isFocus(trigger);

    await page.keyboard.press("Enter");
    await expectState(trigger, "open");
    await expectVisible(content);

    await page.keyboard.press("Enter");
    await expectState(trigger, "closed");
    await expectHidden(content);

    await page.keyboard.press("Space");
    await expectState(trigger, "open");
    await expectVisible(content);

    await page.keyboard.press("Space");
    await expectState(trigger, "closed");
    await expectHidden(content);
  });
});
