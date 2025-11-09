import { defineConfig } from "vite";
import { resolve } from "path";
import corex from "@corex-ui/vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [corex(), tailwindcss()],
  build: {
    outDir: "./dist",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        accordion: resolve(__dirname, "pages/accordion.html"),
        "angle-slider": resolve(__dirname, "pages/angle-slider.html"),
        avatar: resolve(__dirname, "pages/avatar.html"),
        badge: resolve(__dirname, "pages/badge.html"),
        button: resolve(__dirname, "pages/button.html"),
        carousel: resolve(__dirname, "pages/carousel.html"),
        checkbox: resolve(__dirname, "pages/checkbox.html"),
        clipboard: resolve(__dirname, "pages/clipboard.html"),
        code: resolve(__dirname, "pages/code.html"),
        collapsible: resolve(__dirname, "pages/collapsible.html"),
        "color-picker": resolve(__dirname, "pages/color-picker.html"),
        combobox: resolve(__dirname, "pages/combobox.html"),
        "date-picker": resolve(__dirname, "pages/date-picker.html"),
        dialog: resolve(__dirname, "pages/dialog.html"),
        editable: resolve(__dirname, "pages/editable.html"),
        "file-upload": resolve(__dirname, "pages/file-upload.html"),
        "floating-panel": resolve(__dirname, "pages/floating-panel.html"),
        listbox: resolve(__dirname, "pages/listbox.html"),
        menu: resolve(__dirname, "pages/menu.html"),
        "number-input": resolve(__dirname, "pages/number-input.html"),
        "password-input": resolve(__dirname, "pages/password-input.html"),
        "pin-input": resolve(__dirname, "pages/pin-input.html"),
        "qr-code": resolve(__dirname, "pages/qr-code.html"),
        "radio-group": resolve(__dirname, "pages/radio-group.html"),
        select: resolve(__dirname, "pages/select.html"),
        "signature-pad": resolve(__dirname, "pages/signature-pad.html"),
        switch: resolve(__dirname, "pages/switch.html"),
        tabs: resolve(__dirname, "pages/tabs.html"),
        timer: resolve(__dirname, "pages/timer.html"),
        toast: resolve(__dirname, "pages/toast.html"),
        "toggle-group": resolve(__dirname, "pages/toggle-group.html"),
        "tree-view": resolve(__dirname, "pages/tree-view.html"),
      },
    },
  },
});
