import "../main.ts";
import "@corex-ui/static/components/angle-slider";
import "./angle-slider.css";

// Events
document
  .getElementById("my-angle-slider")
  ?.addEventListener("my-angle-slider-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });

document
  .getElementById("angle-slider-rotate")
  ?.addEventListener("rotate-image", (event) => {
    const { value } = (event as CustomEvent).detail;
    const el = document.getElementById("rotate");
    if (el) {
      el.style.transform = `rotate(${value}deg)`;
      el.style.transformOrigin = "center";
    }
  });

// API
const angleSlider = document.getElementById("angle-slider-api");
console.log(angleSlider);

if (angleSlider) {
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="angle-slider-set-value"]',
  );
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      if (value) {
        const values = value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
        angleSlider.dispatchEvent(
          new CustomEvent("angle-slider:set-value", {
            detail: { value: values },
          }),
        );
      }
    });
  });
  const getBtns = document.querySelectorAll<HTMLButtonElement>(
    'button[data-action="angle-slider-get-value"]',
  );
  getBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      angleSlider.dispatchEvent(
        new CustomEvent("angle-slider:value", {
          detail: {
            callback: (value: number) => {
              console.log("Angle Slider current value:", value);
              alert("Angle Slider value: " + String(value));
            },
          },
        }),
      );
    }),
  );
} else {
  console.warn("Element with ID 'angle-slider-api' not found");
}
