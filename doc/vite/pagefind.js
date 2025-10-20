import { pagefind } from "vite-plugin-pagefind";

export const pagefindPlugin = () =>
  pagefind({
    outputDirectory: "dist",
    assetsDirectory: "public",
    bundleDirectory: "pagefind",
    buildScript: "build",
    developStrategy: "lazy",
  });
