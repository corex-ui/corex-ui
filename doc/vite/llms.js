import { viteStaticCopy } from "vite-plugin-static-copy";

export const llms = () =>
  viteStaticCopy({
    silent: true,
    hook: "writeBundle",
    targets: [
      {
        src: "src/markdown/content/components/*.md",
        dest: "components",
      },
      {
        src: "src/markdown/content/llms.txt",
        dest: "",
      },
    ],
  });
