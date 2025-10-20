import fs from "fs/promises";
import path from "path";
import { glob } from "glob";
import markdownit from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import matter from "gray-matter";

// Logging functions
function logHeader(msg: string) {
  console.log(`\n[Markdown] ${msg}\n`);
}

function logInfo(msg: string) {
  console.info(`  • ${msg}`);
}

function logWarn(msg: string) {
  console.warn(`  ⚠ ${msg}`);
}

function logSuccess(msg: string) {
  console.log(`  ✓ ${msg}`);
}

function logError(msg: string) {
  console.error(`  ✖ ${msg}`);
}

const md = markdownit({
  html: true,
  linkify: false,
  typographer: false,
  breaks: true,
  xhtmlOut: false,
}).use(markdownItAnchor, {
  permalink: markdownItAnchor.permalink.linkInsideHeader({
    symbol: "#",
    placement: "before",
    class: "link",
  }),
});

function buildTOCTree(mdContent: string, allowedTags: string[] = ["h2", "h3"]) {
  const tokens = md.parse(mdContent, {});
  const root = { id: "root", name: "", children: [] };
  const stack: any[] = [root];

  tokens.forEach((token, i) => {
    if (token.type === "heading_open" && allowedTags.includes(token.tag)) {
      const level = parseInt(token.tag.slice(1)); // h2 => 2, h3 => 3
      const nextToken = tokens[i + 1];
      if (nextToken && nextToken.type === "inline") {
        const name = nextToken.content;
        const node = {
          id: name.toLowerCase().replace(/\s+/g, "-"),
          name,
          children: [],
          level,
        };

        while (stack.length > 1 && stack[stack.length - 1].level >= level) {
          stack.pop();
        }

        stack[stack.length - 1].children.push(node);
        stack.push(node);
      }
    }
  });

  function clean(node: any) {
    delete node.level;
    if (node.children) node.children.forEach(clean);
  }
  clean(root);

  return root;
}

const svgIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <title>Opens in a new window</title>
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
    ></path>
  </svg>
`;

const defaultLinkOpenRender =
  md.renderer.rules.link_open ||
  ((tokens, idx, options, _env, self) =>
    self.renderToken(tokens, idx, options));
const defaultLinkCloseRender =
  md.renderer.rules.link_close ||
  ((tokens, idx, options, _env, self) =>
    self.renderToken(tokens, idx, options));

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const token = tokens[idx];
  const hrefIndex = token.attrIndex("href");

  if (hrefIndex >= 0) {
    const href = token.attrs![hrefIndex][1];
    const isExternal =
      /^https?:\/\//.test(href) && !href.includes("yourdomain.com");

    const classIndex = token.attrIndex("class");
    if (classIndex < 0) {
      token.attrPush(["class", "link"]);
    } else if (!token.attrs![classIndex][1].includes("link")) {
      token.attrs![classIndex][1] += " link";
    }

    if (isExternal) {
      token.attrSet("target", "_blank");
      token.attrSet("rel", "noopener noreferrer");
      token.attrSet("aria-label", "External link, opens in a new window");
      token.meta = token.meta || {};
      token.meta.isExternal = true;
    }
  }

  return defaultLinkOpenRender(tokens, idx, options, env, self);
};

md.renderer.rules.link_close = function (tokens, idx, options, env, self) {
  let level = 1;
  for (let i = idx - 1; i >= 0; i--) {
    if (tokens[i].type === "link_close") level++;
    if (tokens[i].type === "link_open") level--;
    if (level === 0) {
      if (tokens[i].meta?.isExternal) {
        return (
          svgIcon + defaultLinkCloseRender(tokens, idx, options, env, self)
        );
      }
      break;
    }
  }
  return defaultLinkCloseRender(tokens, idx, options, env, self);
};

md.renderer.rules.fence = function (tokens: any[], idx: number): string {
  const token = tokens[idx];
  const info = token.info ? md.utils.unescapeAll(token.info).trim() : "";
  const langName = info ? info.split(/\s+/g)[0] : "";
  const content = token.content;

  const renderPreview = /<!--\s*render:preview\s*-->/.test(content);
  const cleanedContent = content.replace(/<!--\s*render:preview\s*-->\n?/, "");
  const cleanedEscape = md.utils.escapeHtml(cleanedContent);

  const clipboardButton = `<div class="clipboard clipboard-js" data-name="clipboard" data-default-value="${cleanedEscape}">
 <div data-part="control">
   <button data-part="trigger" class="button button--sm">
   <span data-copy class="uppercase">${langName}</span>
  <span data-copied >Copied</span>

   
     <svg data-copy class="icon" stroke="currentColor" fill="none" stroke-width="2"
         viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em"
         xmlns="http://www.w3.org/2000/svg">
       <path stroke-linecap="round" stroke-linejoin="round"
           d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2">
       </path>
     </svg>
     <svg data-copied class="icon" stroke="currentColor"
         fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" height="1em"
         width="1em" xmlns="http://www.w3.org/2000/svg">
       <path fill-rule="evenodd"
           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
           clip-rule="evenodd"></path>
     </svg>
   </button>
 </div>
</div>`;

  if (renderPreview) {
    return `
      <div class="preview">
        <div class="preview__display">${cleanedContent}</div>
        <div class="preview__code">
          ${clipboardButton}
          <pre><code class="code-js" data-lang="${langName}">${cleanedEscape}</code></pre>
        </div>
      </div>`;
  }

  return `
    <div class="preview">
      <div class="preview__code">
        ${clipboardButton}
        <pre><code class="code-js" data-lang="${langName}">${cleanedEscape}</code></pre>
      </div>
    </div>`;
};

async function buildMarkdown(): Promise<void> {
  try {
    logHeader("Building markdown files → partials");

    const markdownFiles = await glob("src/markdown/content/**/*.md");
    const partialsDir = "src/partials/markdown";
    await fs.mkdir(partialsDir, { recursive: true });

    if (markdownFiles.length === 0) {
      logWarn("No markdown files found.");
      return;
    }

    let processed = 0;
    for (const file of markdownFiles) {
      const rawContent = await fs.readFile(file, "utf-8");
      const { data: frontmatter, content: mdContent } = matter(rawContent);
      const htmlContent = md.render(mdContent);

      const match = file.match(/markdown\/content\/(.*?)\.md$/);
      if (!match) continue;

      const elementId = match[1];
      const outputDirPath = path.join(partialsDir, path.dirname(elementId));
      const baseName = path.basename(elementId);

      await fs.mkdir(outputDirPath, { recursive: true });

      await fs.writeFile(
        path.join(partialsDir, `${elementId}.html`),
        htmlContent,
      );

      const metaHTML = Object.entries(frontmatter)
        .map(([key, value]) => {
          let content: string;
          if (key === "date") {
            content =
              value instanceof Date
                ? value.toISOString().split("T")[0]
                : String(value);
          } else if (Array.isArray(value)) {
            content = value.join(", ");
          } else {
            content = String(value);
          }

          if (key === "title") return `<title>${content}</title>`;
          if (key === "tags")
            return `<meta name="keywords" content="${content}">`;
          return `<meta name="${key}" content="${content}">`;
        })
        .join("\n");

      await fs.writeFile(
        path.join(outputDirPath, `${baseName}.meta.html`),
        metaHTML,
      );

      const tocTree = buildTOCTree(mdContent, ["h2", "h3"]);

      const tocScript = `<script type="application/json" data-tree-view="toc">
${JSON.stringify(tocTree, null, 2)}
</script>`;

      await fs.writeFile(
        path.join(outputDirPath, `${baseName}.toc.html`),
        tocScript,
      );

      processed++;
      if (processed <= 5) {
        logSuccess(`Generated partials for ${elementId}`);
      }
    }

    if (processed > 5) {
      logInfo(`... and ${processed - 5} more files`);
    }
    logHeader(`Built ${processed} partial files in ${partialsDir}/\n`);
  } catch (error) {
    logError("Error building markdown:");
    console.error(error);
    process.exit(1);
  }
}

buildMarkdown();
