import { VitePWA } from "vite-plugin-pwa";

export const pwaPlugin = () =>
  VitePWA({
    registerType: "autoUpdate",
    injectRegister: "auto",
    workbox: {
      globPatterns: ["**/*.{css,html,ico,png,svg}"],
      navigateFallbackDenylist: [
        /^\/llms\.txt$/,
        /^\/components\/.+\.md$/,
        /^\/guides\/.+\.md$/,
        /^\/installation\/.+\.md$/,
      ],
    },
    mode: "production",
    manifest: {
      name: "Corex UI",

      short_name: "CorexUI",
      description: "Corex UI Documentation",
      theme_color: "#F5F7FA",
      start_url: "/",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
      ],
    },
    devOptions: {
      enabled: false,
    },
  });
