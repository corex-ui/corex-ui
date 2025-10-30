import { test, expect } from "@playwright/test";
import { getComponent } from "./utils";

test.describe("Color Picker rendering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/color-picker.html");
  });

  test("should render color picker with proper attributes", async ({
    page,
  }) => {
    const { parts } = getComponent(page, "basic-color-picker", [
      "root",
      "label",
      "hidden-input",
      "control",
      "trigger",
      "positioner",
      "content",
    ]);

    const root = parts["root"].first();
    await expect(root).toHaveAttribute("data-scope", "color-picker");
    await expect(root).toHaveAttribute("dir", "ltr");
    await expect(root).toHaveAttribute("id", /color-picker:colorPicker-/);
    await expect(root).toHaveAttribute(
      "style",
      /--value:rgba\(25, 9, 192, 0\.9\)/,
    );

    const label = parts["label"].first();
    await expect(label).toHaveAttribute("data-scope", "color-picker");
    await expect(label).toHaveAttribute(
      "id",
      /color-picker:colorPicker-.*:label/,
    );
    await expect(label).toHaveAttribute(
      "for",
      /color-picker:colorPicker-.*:hidden-input/,
    );
    await expect(label).toHaveText("Select Color (RGBA)");

    const hiddenInput = parts["hidden-input"].first();
    await expect(hiddenInput).toHaveAttribute("type", "text");
    await expect(hiddenInput).toHaveAttribute("tabindex", "-1");
    await expect(hiddenInput).toHaveAttribute(
      "id",
      /color-picker:colorPicker-.*:hidden-input/,
    );

    const control = parts["control"].first();
    await expect(control).toHaveAttribute("data-scope", "color-picker");
    await expect(control).toHaveAttribute("data-state", "closed");

    const trigger = parts["trigger"].first();
    await expect(trigger).toHaveAttribute("data-scope", "color-picker");
    await expect(trigger).toHaveAttribute("type", "button");
    await expect(trigger).toHaveAttribute("data-state", "closed");
    await expect(trigger).toHaveAttribute(
      "aria-label",
      /select color\. current color is rgba\(25, 9, 192, 0\.9\)/,
    );
    await expect(trigger).toHaveAttribute(
      "aria-controls",
      /color-picker:colorPicker-.*:content/,
    );

    const positioner = parts["positioner"].first();
    await expect(positioner).toHaveAttribute("data-scope", "color-picker");
    await expect(positioner).toHaveAttribute(
      "id",
      /color-picker:colorPicker-.*:positioner/,
    );

    const content = parts["content"].first();
    await expect(content).toHaveAttribute("data-scope", "color-picker");
    await expect(content).toHaveAttribute("tabindex", "-1");
    await expect(content).toHaveAttribute("data-state", "closed");
    await expect(content).toHaveAttribute("hidden", "true");
  });

  test("should render trigger with transparency grid and swatch", async ({
    page,
  }) => {
    const { parts } = getComponent(page, "basic-color-picker", ["trigger"]);

    const trigger = parts["trigger"].first();

    const transparencyGrid = trigger
      .locator('[data-part="transparency-grid"]')
      .first();
    await expect(transparencyGrid).toHaveAttribute("data-size", "10px");
    await expect(transparencyGrid).toHaveAttribute(
      "data-scope",
      "color-picker",
    );

    const swatch = trigger.locator('[data-part="swatch"]').first();
    await expect(swatch).toHaveAttribute("data-scope", "color-picker");
    await expect(swatch).toHaveAttribute("data-state", "checked");
    await expect(swatch).toHaveAttribute("data-value", "#1909C0");
    await expect(swatch).toHaveAttribute(
      "style",
      /background:rgba\(25, 9, 192, 0\.9\)/,
    );
  });

  test("should render channel inputs in control", async ({ page }) => {
    const { parts } = getComponent(page, "basic-color-picker", ["control"]);

    const control = parts["control"].first();

    const hexInput = control.locator('[data-channel="hex"]');
    await expect(hexInput).toHaveAttribute("type", "text");
    await expect(hexInput).toHaveAttribute("aria-label", "hex");
    await expect(hexInput).toHaveAttribute("autocomplete", "off");

    const alphaInput = control.locator(
      '[data-channel="alpha"][name="channel-input-alpha"]',
    );
    await expect(alphaInput).toHaveAttribute("type", "number");
    await expect(alphaInput).toHaveAttribute("aria-label", "alpha");
    await expect(alphaInput).toHaveAttribute("min", "0");
    await expect(alphaInput).toHaveAttribute("max", "1");
    await expect(alphaInput).toHaveAttribute("step", "0.01");
  });

  test("should render eye dropper trigger", async ({ page }) => {
    const { parts } = getComponent(page, "basic-color-picker", [
      "eye-dropper-trigger",
    ]);

    const eyeDropper = parts["eye-dropper-trigger"].first();
    await expect(eyeDropper).toHaveAttribute("data-scope", "color-picker");
    await expect(eyeDropper).toHaveAttribute("type", "button");
    await expect(eyeDropper).toHaveAttribute(
      "aria-label",
      "Pick a color from the screen",
    );

    const svg = eyeDropper.locator("svg");
    await expect(svg).toBeVisible();
  });

  test("should render area with background and thumb", async ({ page }) => {
    const { parts } = getComponent(page, "basic-color-picker", [
      "area",
      "area-background",
      "area-thumb",
    ]);

    const trigger = page
      .locator('[data-test="basic-color-picker"] [data-part="trigger"]')
      .first();
    await trigger.click();

    const area = parts["area"].first();
    await expect(area).toBeVisible();
    await expect(area).toHaveAttribute("data-scope", "color-picker");
    await expect(area).toHaveAttribute("role", "group");
    await expect(area).toHaveAttribute(
      "id",
      /color-picker:colorPicker-.*:area/,
    );

    const areaBackground = parts["area-background"].first();
    await expect(areaBackground).toBeVisible();
    await expect(areaBackground).toHaveAttribute("data-scope", "color-picker");
    await expect(areaBackground).toHaveAttribute(
      "id",
      /color-picker:colorPicker-.*:area-gradient/,
    );

    const areaThumb = parts["area-thumb"].first();
    await expect(areaThumb).toBeVisible();
    await expect(areaThumb).toHaveAttribute("data-scope", "color-picker");
    await expect(areaThumb).toHaveAttribute("role", "slider");
    await expect(areaThumb).toHaveAttribute("tabindex", "0");
    await expect(areaThumb).toHaveAttribute("aria-valuemin", "0");
    await expect(areaThumb).toHaveAttribute("aria-valuemax", "100");
    await expect(areaThumb).toHaveAttribute(
      "aria-roledescription",
      "2d slider",
    );
  });

  test("should render hue and alpha sliders", async ({ page }) => {
    const { parts } = getComponent(page, "basic-color-picker", [
      "channel-slider",
    ]);

    const trigger = page
      .locator('[data-test="basic-color-picker"] [data-part="trigger"]')
      .first();
    await trigger.click();

    const sliders = parts["channel-slider"];
    const sliderCount = await sliders.count();
    expect(sliderCount).toBeGreaterThanOrEqual(2);

    const hueSlider = sliders
      .filter({
        has: page.locator(
          '[data-part="channel-slider-track"][data-channel="hue"]',
        ),
      })
      .first();
    await expect(hueSlider).toBeVisible();
    await expect(hueSlider).toHaveAttribute("data-channel", "hue");
    await expect(hueSlider).toHaveAttribute("data-orientation", "horizontal");

    const hueTrack = hueSlider.locator('[data-part="channel-slider-track"]');
    await expect(hueTrack).toBeVisible();
    await expect(hueTrack).toHaveAttribute("role", "group");
    await expect(hueTrack).toHaveAttribute(
      "id",
      /color-picker:colorPicker-.*:slider-track:hue/,
    );

    const hueThumb = hueSlider.locator('[data-part="channel-slider-thumb"]');
    await expect(hueThumb).toBeVisible();
    await expect(hueThumb).toHaveAttribute("role", "slider");
    await expect(hueThumb).toHaveAttribute("aria-label", "hue");
    await expect(hueThumb).toHaveAttribute("tabindex", "0");
    await expect(hueThumb).toHaveAttribute("aria-valuemin", "0");
    await expect(hueThumb).toHaveAttribute("aria-valuemax", "360");

    const alphaSlider = sliders
      .filter({
        has: page.locator(
          '[data-part="channel-slider-track"][data-channel="alpha"]',
        ),
      })
      .first();
    await expect(alphaSlider).toBeVisible();
    await expect(alphaSlider).toHaveAttribute("data-channel", "alpha");

    const alphaThumb = alphaSlider.locator(
      '[data-part="channel-slider-thumb"]',
    );
    await expect(alphaThumb).toBeVisible();
    await expect(alphaThumb).toHaveAttribute("role", "slider");
    await expect(alphaThumb).toHaveAttribute("aria-label", "alpha");
    await expect(alphaThumb).toHaveAttribute("aria-valuemin", "0");
    await expect(alphaThumb).toHaveAttribute("aria-valuemax", "1");
  });

  test("should render RGBA input groups", async ({ page }) => {
    const { parts } = getComponent(page, "basic-color-picker", ["input-group"]);

    const trigger = page
      .locator('[data-test="basic-color-picker"] [data-part="trigger"]')
      .first();
    await trigger.click();

    const inputGroups = parts["input-group"];
    const groupCount = await inputGroups.count();
    expect(groupCount).toBe(4);

    const channels = ["red", "green", "blue", "alpha"];
    const labels = ["R", "G", "B", "A"];
    const maxValues = ["255", "255", "255", "1"];

    for (let i = 0; i < channels.length; i++) {
      const group = inputGroups.nth(i);
      await expect(group).toBeVisible();

      const label = group.locator("span");
      await expect(label).toHaveText(labels[i]);

      const input = group.locator("input");
      await expect(input).toBeVisible();
      await expect(input).toHaveAttribute("data-channel", channels[i]);
      await expect(input).toHaveAttribute("type", "number");
      await expect(input).toHaveAttribute("aria-label", channels[i]);
      await expect(input).toHaveAttribute("min", "0");
      await expect(input).toHaveAttribute("max", maxValues[i]);
    }
  });

  test("should render swatch group with preset colors", async ({ page }) => {
    const { parts } = getComponent(page, "basic-color-picker", [
      "swatch-group",
      "swatch-trigger",
    ]);

    const trigger = page
      .locator('[data-test="basic-color-picker"] [data-part="trigger"]')
      .first();
    await trigger.click();

    const swatchGroup = parts["swatch-group"].first();
    await expect(swatchGroup).toBeVisible();
    await expect(swatchGroup).toHaveAttribute("data-scope", "color-picker");
    await expect(swatchGroup).toHaveAttribute("role", "group");

    const swatchTriggers = parts["swatch-trigger"];
    const swatchCount = await swatchTriggers.count();
    expect(swatchCount).toBe(4);

    const expectedColors = ["#FF0000", "#00FF00", "#0000FF", "#1909C0"];

    for (let i = 0; i < swatchCount; i++) {
      const swatchTrigger = swatchTriggers.nth(i);
      await expect(swatchTrigger).toBeVisible();
      await expect(swatchTrigger).toHaveAttribute("data-scope", "color-picker");
      await expect(swatchTrigger).toHaveAttribute("type", "button");
      await expect(swatchTrigger).toHaveAttribute(
        "data-value",
        expectedColors[i],
      );
      await expect(swatchTrigger).toHaveAttribute(
        "aria-label",
        `select ${expectedColors[i]} as the color`,
      );

      const swatch = swatchTrigger.locator('[data-part="swatch"]');
      await expect(swatch).toBeVisible();
      await expect(swatch).toHaveAttribute("data-value", expectedColors[i]);
    }
  });

  test("should open picker when trigger is clicked", async ({ page }) => {
    const { parts } = getComponent(page, "basic-color-picker", [
      "trigger",
      "control",
      "content",
    ]);

    const trigger = parts["trigger"].first();
    const control = parts["control"].first();
    const content = parts["content"].first();

    await expect(control).toHaveAttribute("data-state", "closed");
    await expect(content).toHaveAttribute("data-state", "closed");
    await expect(content).toHaveAttribute("hidden", "true");

    await trigger.click();

    await expect(control).toHaveAttribute("data-state", "open");
    await expect(content).toHaveAttribute("data-state", "open");
    await expect(content).not.toHaveAttribute("hidden");
  });
});
