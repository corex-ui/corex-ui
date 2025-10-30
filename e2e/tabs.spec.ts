import { test, expect } from "@playwright/test";
import { a11y, getComponent } from "./utils";

test.describe("Tabs", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/tabs.html");
  });

  test("should have no accessibility violations", async ({ page }) => {
    await a11y(page);
  });

  test.describe("Rendering", () => {
    test("should render tabs with correct structure and attributes", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-tabs", [
        "root",
        "list",
        "trigger",
        "content",
      ]);

      const root = parts["root"].first();
      await expect(root).toBeVisible();
      await expect(root).toHaveAttribute("data-scope", "tabs");

      const list = parts["list"].first();
      await expect(list).toBeVisible();
      await expect(list).toHaveAttribute("role", "tablist");

      const triggers = parts["trigger"];
      const contents = parts["content"];

      const triggerCount = await triggers.count();
      for (let i = 0; i < triggerCount; i++) {
        const trigger = triggers.nth(i);
        const content = contents.nth(i);

        const triggerId = await trigger.getAttribute("id");
        await expect(trigger).toHaveAttribute("role", "tab");
        await expect(trigger).toHaveAttribute("type", "button");

        await expect(content).toHaveAttribute("role", "tabpanel");
        const labelledBy = await content.getAttribute("aria-labelledby");
        expect(labelledBy).toBe(triggerId);
      }
    });
  });

  test.describe("Interactions", () => {
    test("should switch tabs when clicking triggers", async ({ page }) => {
      const { parts } = getComponent(page, "basic-tabs", [
        "trigger",
        "content",
      ]);

      const triggers = parts["trigger"];
      const contents = parts["content"];

      const clickAndCheck = async (index: number, prevIndex: number) => {
        await triggers.nth(index).click();

        await expect(triggers.nth(index)).toHaveAttribute(
          "aria-selected",
          "true",
        );
        await expect(contents.nth(index)).not.toHaveAttribute("hidden");

        await expect(triggers.nth(prevIndex)).toHaveAttribute(
          "aria-selected",
          "false",
        );
        await expect(contents.nth(prevIndex)).toHaveAttribute("hidden");
      };

      await clickAndCheck(1, 0);
      await clickAndCheck(2, 1);
    });
  });
});
