import { test, expect } from "@playwright/test";
import { a11y, getComponent } from "./utils";

test.describe("Password Input", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/password-input.html");
  });

  test("should have no accessibility violations", async ({ page }) => {
    await a11y(page);
  });

  test.describe("Rendering", () => {
    test("should render password input with correct structure and attributes", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-password-input", [
        "root",
        "label",
        "control",
        "input",
        "visibility-trigger",
        "indicator",
      ]);

      const root = parts["root"].first();
      await expect(root).toBeVisible();
      await expect(root).toHaveAttribute("data-scope", "password-input");

      const label = parts["label"].first();
      await expect(label).toBeVisible();
      await expect(label).toHaveAttribute("data-scope", "password-input");
      await expect(label).toHaveAttribute(
        "for",
        /p-input-passwordInput-.*-input/,
      );
      await expect(label).toHaveText("Enter Password");

      const control = parts["control"].first();
      await expect(control).toBeVisible();
      await expect(control).toHaveAttribute("data-scope", "password-input");

      const input = parts["input"].first();
      await expect(input).toBeVisible();
      await expect(input).toHaveAttribute("data-scope", "password-input");
      await expect(input).toHaveAttribute(
        "id",
        /p-input-passwordInput-.*-input/,
      );
      await expect(input).toHaveAttribute("type", "password");
      await expect(input).toHaveAttribute("autocapitalize", "off");
      await expect(input).toHaveAttribute("autocomplete", "new-password");
      await expect(input).toHaveAttribute("data-state", "hidden");
      await expect(input).toHaveAttribute("data-1p-ignore");
      await expect(input).toHaveAttribute("data-lpignore", "true");
      await expect(input).toHaveAttribute("data-bwignore", "true");
      await expect(input).toHaveAttribute("data-protonpass-ignore", "true");

      const visibilityTrigger = parts["visibility-trigger"].first();
      await expect(visibilityTrigger).toBeVisible();
      await expect(visibilityTrigger).toHaveAttribute(
        "data-scope",
        "password-input",
      );
      await expect(visibilityTrigger).toHaveAttribute("type", "button");
      await expect(visibilityTrigger).toHaveAttribute("tabindex", "-1");
      await expect(visibilityTrigger).toHaveAttribute(
        "aria-controls",
        /p-input-passwordInput-.*-input/,
      );
      await expect(visibilityTrigger).toHaveAttribute("aria-expanded", "false");
      await expect(visibilityTrigger).toHaveAttribute("data-state", "hidden");
      await expect(visibilityTrigger).toHaveAttribute(
        "aria-label",
        "Show password",
      );

      const indicator = parts["indicator"].first();
      await expect(indicator).toBeVisible();
      await expect(indicator).toHaveAttribute("data-scope", "password-input");
      await expect(indicator).toHaveAttribute("aria-hidden", "true");
      await expect(indicator).toHaveAttribute("data-state", "hidden");
    });

    test("should render SVG icons in visibility indicator", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-password-input", [
        "indicator",
      ]);

      const indicator = parts["indicator"].first();
      const visibleSvg = indicator.locator("svg[data-visible]");
      await expect(visibleSvg).toBeAttached();
      await expect(visibleSvg).toHaveAttribute(
        "xmlns",
        "http://www.w3.org/2000/svg",
      );

      const hiddenSvg = indicator.locator("svg[data-hidden]");
      await expect(hiddenSvg).toBeAttached();
      await expect(hiddenSvg).toHaveAttribute(
        "xmlns",
        "http://www.w3.org/2000/svg",
      );
    });
  });

  test.describe("Basic Interactions", () => {
    test("should toggle password visibility when button is clicked", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-password-input", [
        "input",
        "visibility-trigger",
      ]);

      const input = parts["input"].first();
      const visibilityTrigger = parts["visibility-trigger"].first();

      await expect(input).toHaveAttribute("type", "password");
      await expect(input).toHaveAttribute("data-state", "hidden");
      await expect(visibilityTrigger).toHaveAttribute("aria-expanded", "false");
      await expect(visibilityTrigger).toHaveAttribute(
        "aria-label",
        "Show password",
      );

      await visibilityTrigger.click();
      await expect(input).toHaveAttribute("type", "text");
      await expect(input).toHaveAttribute("data-state", "visible");
      await expect(visibilityTrigger).toHaveAttribute("aria-expanded", "true");
      await expect(visibilityTrigger).toHaveAttribute(
        "aria-label",
        "Hide password",
      );

      await visibilityTrigger.click();
      await expect(input).toHaveAttribute("type", "password");
      await expect(input).toHaveAttribute("data-state", "hidden");
      await expect(visibilityTrigger).toHaveAttribute("aria-expanded", "false");
      await expect(visibilityTrigger).toHaveAttribute(
        "aria-label",
        "Show password",
      );
    });

    test("should accept password input", async ({ page }) => {
      const { parts } = getComponent(page, "basic-password-input", ["input"]);

      const input = parts["input"].first();
      await input.focus();
      await input.fill("MySecurePassword123!");

      await expect(input).toHaveValue("MySecurePassword123!");
    });

    test("should mask password by default", async ({ page }) => {
      const { parts } = getComponent(page, "basic-password-input", ["input"]);

      const input = parts["input"].first();
      await input.focus();
      await input.fill("secret");

      await expect(input).toHaveAttribute("type", "password");
    });

    test("should show password in plain text when visibility is toggled", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-password-input", [
        "input",
        "visibility-trigger",
      ]);

      const input = parts["input"].first();
      const visibilityTrigger = parts["visibility-trigger"].first();

      await input.focus();
      await input.fill("mypassword");

      await visibilityTrigger.click();
      await expect(input).toHaveAttribute("type", "text");
      await expect(input).toHaveValue("mypassword");
    });

    test("should maintain input value when toggling visibility", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-password-input", [
        "input",
        "visibility-trigger",
      ]);

      const input = parts["input"].first();
      const visibilityTrigger = parts["visibility-trigger"].first();

      await input.focus();
      await input.fill("testpassword");

      await visibilityTrigger.click();
      await expect(input).toHaveValue("testpassword");

      await visibilityTrigger.click();
      await expect(input).toHaveValue("testpassword");
    });

    test("should allow typing special characters", async ({ page }) => {
      const { parts } = getComponent(page, "basic-password-input", ["input"]);

      const input = parts["input"].first();
      await input.focus();
      await input.fill("P@ssw0rd!#$%");

      await expect(input).toHaveValue("P@ssw0rd!#$%");
    });

    test("should allow typing long passwords", async ({ page }) => {
      const { parts } = getComponent(page, "basic-password-input", ["input"]);

      const input = parts["input"].first();
      const longPassword = "a".repeat(100);
      await input.focus();
      await input.fill(longPassword);

      await expect(input).toHaveValue(longPassword);
    });

    test("should handle empty password", async ({ page }) => {
      const { parts } = getComponent(page, "basic-password-input", ["input"]);

      const input = parts["input"].first();
      await input.focus();
      await input.fill("");

      await expect(input).toHaveValue("");
    });
  });

  test.describe("State Management", () => {
    test("should update indicator state when visibility changes", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-password-input", [
        "indicator",
        "visibility-trigger",
      ]);

      const indicator = parts["indicator"].first();
      const visibilityTrigger = parts["visibility-trigger"].first();

      await expect(indicator).toHaveAttribute("data-state", "hidden");

      await visibilityTrigger.click();
      await expect(indicator).toHaveAttribute("data-state", "visible");

      await visibilityTrigger.click();
      await expect(indicator).toHaveAttribute("data-state", "hidden");
    });

    test("should handle multiple rapid visibility toggles", async ({
      page,
    }) => {
      const { parts } = getComponent(page, "basic-password-input", [
        "input",
        "visibility-trigger",
      ]);

      const input = parts["input"].first();
      const visibilityTrigger = parts["visibility-trigger"].first();

      await input.fill("testpass");

      await visibilityTrigger.click();
      await visibilityTrigger.click();
      await visibilityTrigger.click();
      await visibilityTrigger.click();

      await expect(input).toHaveAttribute("type", "password");
      await expect(input).toHaveValue("testpass");
    });
  });

  test.describe("Password Manager Integration", () => {
    test("should have password manager ignore attributes", async ({ page }) => {
      const { parts } = getComponent(page, "basic-password-input", ["input"]);

      const input = parts["input"].first();

      await expect(input).toHaveAttribute("data-1p-ignore");
      await expect(input).toHaveAttribute("data-lpignore", "true");
      await expect(input).toHaveAttribute("data-bwignore", "true");
      await expect(input).toHaveAttribute("data-protonpass-ignore", "true");
    });

    test("should have correct autocomplete attribute", async ({ page }) => {
      const { parts } = getComponent(page, "basic-password-input", ["input"]);

      const input = parts["input"].first();
      await expect(input).toHaveAttribute("autocomplete", "new-password");
    });
  });
});
