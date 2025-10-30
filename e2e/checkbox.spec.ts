import { test, expect } from "@playwright/test";
import { a11y, getComponent } from "./utils";

test.describe("Checkbox", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/checkbox.html");
  });

  test("should have no accessibility violations", async ({ page }) => {
    await a11y(page);
  });

  test("should render all main parts", async ({ page }) => {
    const { parts } = getComponent(page, "basic-checkbox", [
      "root",
      "label",
      "hidden-input",
      "control",
    ]);

    for (const part of Object.values(parts)) {
      expect(await part.first().count()).toBeGreaterThan(0);
    }
  });

  test("should toggle checked state on click", async ({ page }) => {
    const { parts } = getComponent(page, "basic-checkbox", [
      "root",
      "hidden-input",
    ]);

    const root = parts["root"].first();
    const input = parts["hidden-input"].first();

    expect(await root.getAttribute("data-state")).toBe("unchecked");
    expect(await input.isChecked()).toBeFalsy();

    await root.click();
    expect(await root.getAttribute("data-state")).toBe("checked");
    expect(await input.isChecked()).toBeTruthy();

    await root.click();
    expect(await root.getAttribute("data-state")).toBe("unchecked");
    expect(await input.isChecked()).toBeFalsy();
  });
});
