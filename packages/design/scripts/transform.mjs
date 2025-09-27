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
  const multiTokenPath = path.resolve(tokensBasePath, 'tokens/multi');
  const singleTokenPath = path.resolve(tokensBasePath, 'tokens/tokens.json');

  const mergedTokens = {};
  let metadata = {};
  let themes = [];

  const readJsonFile = async (filePath) => {
    const content = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(content);
  };

  const traverseFolder = async (folderPath) => {
    const entries = await fs.promises.readdir(folderPath, { withFileTypes: true });
    for (const entry of entries) {
      const entryPath = path.join(folderPath, entry.name);
      if (entry.isDirectory()) {
        await traverseFolder(entryPath);
      } else if (entry.isFile() && entry.name.endsWith('.json')) {
        const relativePath = path.relative(multiTokenPath, entryPath);

        if (entry.name === '$metadata.json') {
          metadata = await readJsonFile(entryPath);
        } else if (entry.name === '$themes.json') {
          themes = await readJsonFile(entryPath);
        } else {
          const pathParts = relativePath.replace(/\.json$/, '').split(path.sep);
          let current = mergedTokens;
          for (let i = 0; i < pathParts.length - 1; i++) {
            const part = pathParts[i];
            if (!current[part]) current[part] = {};
            current = current[part];
          }
          current[pathParts[pathParts.length - 1]] = await readJsonFile(entryPath);
        }
      }
    }
  };

  try {
    await traverseFolder(multiTokenPath);

    mergedTokens['$metadata'] = metadata;
    mergedTokens['$themes'] = themes;

    await fs.promises.mkdir(path.dirname(singleTokenPath), { recursive: true });
    await fs.promises.writeFile(singleTokenPath, JSON.stringify(mergedTokens, null, 2), 'utf8');

    console.log(`✅ Tokens merged into ${path.relative(process.cwd(), singleTokenPath)}`);
    return { success: true, file: singleTokenPath };
  } catch (error) {
    console.error('❌ Token merge failed:', error.message);
    return { success: false, error };
  }
};
