import Sitemap from "vite-plugin-sitemap";

export const sitemapPlugin = () =>
  Sitemap({
    hostname: "https://corex-ui.com",
  });
