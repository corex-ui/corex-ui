import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
export const SingleToMulti = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const tokensBasePath = path.resolve(__dirname, "../");
  const single_token = path.resolve(tokensBasePath, 'tokens/tokens.json');
  const multi_token_path = path.resolve(tokensBasePath, 'tokens/multi');
  try {
    const tokens = JSON.parse(await fs.promises.readFile(single_token, 'utf8'));
    const metadata = tokens.$metadata || {};
    const themes = tokens.$themes || {};
    delete tokens.$metadata;
    delete tokens.$themes;
    const writeTokensToFile = async (filePath, tokenData) => {
      const dirName = path.dirname(filePath);
      await fs.promises.mkdir(dirName, { recursive: true });
      await fs.promises.writeFile(filePath, JSON.stringify(tokenData, null, 2), 'utf8');
      console.log(`✔︎ ${path.relative(process.cwd(), filePath)}`);
    };
    await writeTokensToFile(path.join(multi_token_path, '$metadata.json'), metadata);
    await writeTokensToFile(path.join(multi_token_path, '$themes.json'), themes);
    if (metadata.tokenSetOrder) {
      for (const tokenSet of metadata.tokenSetOrder) {
        if (tokens[tokenSet]) {
          const targetPath = path.join(multi_token_path, ...tokenSet.split('/')) + '.json';
          await writeTokensToFile(targetPath, tokens[tokenSet]);
        }
      }
    }
    console.log('✅ Tokens transformed successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Token transformation failed:', error.message);
    return { success: false, error };
  }
};

export const MultiToSingle = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const tokensBasePath = path.resolve(__dirname, "../");
  const multiTokenPath = path.resolve(tokensBasePath, "tokens/multi");
  const singleTokenPath = path.resolve(tokensBasePath, "tokens/tokens.json");
  const singleTokenPxPath = path.resolve(tokensBasePath, "tokens/tokens-penpot.json");

  const mergedTokens = {};
  let metadata = {};
  let themes = [];

  const readJsonFile = async (filePath) => {
    const content = await fs.promises.readFile(filePath, "utf8");
    return JSON.parse(content);
  };

  const traverseFolder = async (folderPath) => {
    const entries = await fs.promises.readdir(folderPath, { withFileTypes: true });
    for (const entry of entries) {
      const entryPath = path.join(folderPath, entry.name);

      if (entry.isDirectory()) {
        await traverseFolder(entryPath);
      } else if (entry.isFile() && entry.name.endsWith(".json")) {
        if (entry.name === "$metadata.json") {
          metadata = await readJsonFile(entryPath);
        } else if (entry.name === "$themes.json") {
          themes = await readJsonFile(entryPath);
        } else {
          const relativePath = path
            .relative(multiTokenPath, entryPath)
            .replace(/\.json$/, "");
          const key = relativePath.split(path.sep).join("/");
          mergedTokens[key] = await readJsonFile(entryPath);
        }
      }
    }
  };

  // Convert rem → px recursively
  const convertRemToPx = (obj) => {
    if (typeof obj === "string" && obj.endsWith("rem")) {
      const remValue = parseFloat(obj);
      if (!isNaN(remValue)) return `${remValue * 16}px`;
      return obj;
    }

    if (Array.isArray(obj)) return obj.map((item) => convertRemToPx(item));

    if (typeof obj === "object" && obj !== null) {
      const result = {};
      for (const [key, value] of Object.entries(obj)) {
        result[key] = convertRemToPx(value);
      }
      return result;
    }

    return obj;
  };

  // Dynamically generate $themes from tokenSetOrder
  const generateThemesFromTokenSetOrder = (tokenSetOrder) => {
    const semanticSets = [
      "semantic/border",
      "semantic/text",
      "semantic/dimension",
      "semantic/effect",
      "semantic/font",
      "semantic/color",
    ];

    const themePaths = tokenSetOrder.filter((t) => t.startsWith("themes/"));

    return themePaths.map((themePath) => {
      const parts = themePath.split("/"); // ["themes", "neo", "light"]
      const group = parts[1];
      const name = parts[2][0].toUpperCase() + parts[2].slice(1);

      const selectedTokenSets = {};
      semanticSets.forEach((s) => (selectedTokenSets[s] = "enabled"));
      selectedTokenSets[themePath] = "enabled";

      return {
        name,
        group: group[0].toUpperCase() + group.slice(1),
        description: "",
        "is-source": false,
        selectedTokenSets,
      };
    });
  };

  try {
    await traverseFolder(multiTokenPath);

    mergedTokens["$metadata"] = metadata;
    mergedTokens["$themes"] = themes;

    await fs.promises.mkdir(path.dirname(singleTokenPath), { recursive: true });
    await fs.promises.writeFile(singleTokenPath, JSON.stringify(mergedTokens, null, 2), "utf8");

    // px version
    const pxTokens = convertRemToPx(mergedTokens);
    pxTokens["$themes"] = generateThemesFromTokenSetOrder(pxTokens["$metadata"].tokenSetOrder);
    await fs.promises.writeFile(singleTokenPxPath, JSON.stringify(pxTokens, null, 2), "utf8");

    console.log(`✅ Tokens merged into:`);
    console.log(`   - ${path.relative(process.cwd(), singleTokenPath)}`);
    console.log(`   - ${path.relative(process.cwd(), singleTokenPxPath)}`);

    return { success: true, files: [singleTokenPath, singleTokenPxPath] };
  } catch (error) {
    console.error("❌ Token merge failed:", error.message);
    return { success: false, error };
  }
};



