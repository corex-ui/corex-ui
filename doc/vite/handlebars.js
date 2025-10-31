import handlebars from "vite-plugin-handlebars";
import { resolve } from "path";

const navigation = {
  group: [
    {
      label: "Installation",
      link: [
        { label: "Introduction", url: "/installation/introduction" },
        { label: "Vite", url: "/installation/vite" },
        { label: "Astro", url: "/installation/astro" },
        { label: "Eleventy", url: "/installation/eleventy" },
        { label: "Serve", url: "/installation/serve" },
      ],
    },
    {
      label: "Guides",
      link: [
        { label: "Figma", url: "/guides/figma" },
        { label: "LLMs", url: "/guides/llms" },
        { label: "Penpot", url: "/guides/penpot" },
        { label: "Tailwind", url: "/guides/tailwind" },
        { label: "Theming", url: "/guides/theming" },
      ],
    },
    {
      label: "Components",
      link: [
        { label: "Accordion", url: "/components/accordion" },
        { label: "Angle Slider", url: "/components/angle-slider" },
        { label: "Avatar", url: "/components/avatar" },
        { label: "Badge", url: "/components/badge" },
        { label: "Button", url: "/components/button" },
        { label: "Carousel", url: "/components/carousel" },
        { label: "Checkbox", url: "/components/checkbox" },
        { label: "Clipboard", url: "/components/clipboard" },
        { label: "Code", url: "/components/code" },
        { label: "Collapsible", url: "/components/collapsible" },
        { label: "Color Picker", url: "/components/color-picker" },
        { label: "Combobox", url: "/components/combobox" },
        { label: "Date Picker", url: "/components/date-picker" },
        { label: "Dialog", url: "/components/dialog" },
        { label: "Editable", url: "/components/editable" },
        { label: "File Upload", url: "/components/file-upload" },
        { label: "Floating Panel", url: "/components/floating-panel" },
        { label: "Icon", url: "/components/icon" },
        { label: "Link", url: "/components/link" },
        { label: "Listbox", url: "/components/listbox" },
        { label: "Menu", url: "/components/menu" },
        { label: "Number Input", url: "/components/number-input", beta: true },
        {
          label: "Password Input",
          url: "/components/password-input",
          beta: true,
        },
        { label: "Pin Input", url: "/components/pin-input", beta: true },
        { label: "QR Code", url: "/components/qr-code", beta: true },
        { label: "Radio Group", url: "/components/radio-group", beta: true },
        { label: "Scrollbar", url: "/components/scrollbar" },
        { label: "Select", url: "/components/select" },
        { label: "Signature Pad", url: "/components/signature-pad" },
        { label: "Site Search", url: "/components/site-search" },
        { label: "Switch", url: "/components/switch" },
        { label: "Tabs", url: "/components/tabs" },
        { label: "Timer", url: "/components/timer" },
        { label: "Toast", url: "/components/toast" },
        { label: "Toggle Group", url: "/components/toggle-group" },
        { label: "Tree View", url: "/components/tree-view" },
      ],
    },
  ],
};

const getAllLinks = () => navigation.group.flatMap((g) => g.link);

const stripExt = (p) => p.replace(/\.(html|md)$/, "");

const resolveUrlFromPagePath = (pagePath) => {
  let p = pagePath.replace(/\\/g, "/");
  p = p.split("#")[0].split("?")[0];

  if (p.endsWith("/index.html") || p.endsWith("/index.md")) return "/";

  const links = getAllLinks().map((l) => l.url);

  for (const u of links) {
    if (p.endsWith(u)) return u;
  }

  for (const u of links) {
    const base = stripExt(u);
    if (
      p.endsWith(`${base}.html`) ||
      p.endsWith(`${base}.md`) ||
      p.endsWith(`${base}/index.html`) ||
      p.endsWith(`${base}/index.md`)
    ) {
      return u;
    }
  }

  const m = p.match(/(\/[^?#]+?)(?:\/index)?\.(html|md)$/);
  if (m) return m[1].replace(/\/index$/, "/");

  return "/";
};

const findCurrentPage = (url) => {
  let currentSection = null;
  let currentPage = null;

  navigation.group.forEach((group) => {
    const match = group.link.find((link) => link.url === url);
    if (match) {
      currentSection = group.label;
      currentPage = match.url;
    }
  });

  return { currentSection, currentPage };
};

const getAdjacentPage = (url, direction) => {
  const links = getAllLinks();
  const currentIndex = links.findIndex((link) => link.url === url);
  const targetIndex = currentIndex + direction;

  return targetIndex >= 0 && targetIndex < links.length
    ? { name: links[targetIndex].label, link: links[targetIndex].url }
    : null;
};

export const handlebarsPlugin = (dirname) =>
  handlebars({
    partialDirectory: [
      resolve(dirname, "src/partials"),
      resolve(dirname, "src/markdown/partials"),
    ],
    context: (pagePath) => {
      const url = resolveUrlFromPagePath(pagePath);
      const { currentSection, currentPage } = findCurrentPage(url);
      const prev = getAdjacentPage(url, -1);
      const next = getAdjacentPage(url, 1);

      return {
        ...navigation,
        current: { page: currentPage, section: currentSection, url },
        page: currentPage,
        section: currentSection,
        currentUrl: url,
        prevName: prev?.name || "",
        prevUrl: prev?.link || "",
        nextName: next?.name || "",
        nextUrl: next?.link || "",
      };
    },
    helpers: {
      eq: (a, b) => a === b,
      getPrevious: (url) => getAdjacentPage(url, -1),
      getNext: (url) => getAdjacentPage(url, 1),
      not: (value, test) => value !== test,
      and: (...args) => args.slice(0, -1).every(Boolean),
      or: (...args) => args.slice(0, -1).some(Boolean),
    },
  });
