import esbuild from 'esbuild';
import { execSync } from 'child_process';
import { readdirSync } from 'fs';
import { join } from 'path';
import fs from 'fs';
import zlib from 'zlib';

async function build() {
  try {
    console.log('🛠️ Generating declaration files...');
    execSync('tsc --emitDeclarationOnly --declaration --outDir dist --project tsconfig.json');

    const componentsDir = 'src/components';
    const libDir = 'src/lib';

    const components = readdirSync(componentsDir, { withFileTypes: true })
      .filter(d => d.isFile() && /\.(ts|tsx)$/.test(d.name))
      .map(d => d.name.replace(/\.(ts|tsx)$/, ''));

    const libs = readdirSync(libDir, { withFileTypes: true })
      .filter(d => d.isFile() && /\.(ts|tsx)$/.test(d.name))
      .map(d => d.name.replace(/\.(ts|tsx)$/, ''));

    const builds = [];

    // Bundle main index
    ['index.ts'].forEach(entry => {
      ['esm', 'cjs'].forEach(format => {
        builds.push(
          { entry: `src/${entry}`, outfile: `dist/${entry.replace('.ts', format === 'esm' ? '.mjs' : '.cjs.js')}`, format, minify: false },
          { entry: `src/${entry}`, outfile: `dist/${entry.replace('.ts', format === 'esm' ? '.min.mjs' : '.cjs.min.js')}`, format, minify: true }
        );
      });
    });

    // Bundle individual components
    components.forEach(component => {
      const input = join(componentsDir, `${component}.ts`);
      ['esm', 'cjs'].forEach(format => {
        builds.push(
          { entry: input, outfile: `dist/components/${component}.${format === 'esm' ? 'mjs' : 'cjs.js'}`, format, minify: false },
          { entry: input, outfile: `dist/components/${component}.${format === 'esm' ? 'min.mjs' : 'cjs.min.js'}`, format, minify: true }
        );
      });
    });

    // Bundle libs
    libs.forEach(lib => {
      const input = join(libDir, `${lib}.ts`);
      ['esm', 'cjs'].forEach(format => {
        builds.push(
          { entry: input, outfile: `dist/lib/${lib}.${format === 'esm' ? 'mjs' : 'cjs.js'}`, format, minify: false },
          { entry: input, outfile: `dist/lib/${lib}.${format === 'esm' ? 'min.mjs' : 'cjs.min.js'}`, format, minify: true }
        );
      });
    });

    console.log('📦 Building bundles with esbuild...');
    for (const { entry, outfile, format, minify } of builds) {
      await esbuild.build({
        entryPoints: [entry],
        bundle: true,
        minify,
        sourcemap: true,
        target: 'esnext',
        format,
        outfile,
        treeShaking: true,
      });

      const fileBuffer = fs.readFileSync(outfile);
      const rawSize = fileBuffer.length;
      const gzipSize = zlib.gzipSync(fileBuffer).length;
      console.log(`✅ Built ${outfile} — size: ${(rawSize / 1024).toFixed(2)} kB | gzip: ${(gzipSize / 1024).toFixed(2)} kB`);
    }

    // Generate React wrappers
    const reactDir = 'dist/react/components';
    if (!fs.existsSync(reactDir)) fs.mkdirSync(reactDir, { recursive: true });

    const toPascalCase = (str) => str.split(/[-_]/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');

    components.forEach(component => {
      const componentName = toPascalCase(component);
      const wrapperFile = join(reactDir, `${componentName}.tsx`);

      let initCall;
      if (componentName === "SiteSearch") {
        initCall = `initialize${componentName}(undefined, ref.current)`;
      } else {
        initCall = `initialize${componentName}(ref.current)`;
      }
      
      const content = `
      // AUTO-GENERATED - DO NOT EDIT
      'use client';
      import { useEffect, useRef, forwardRef } from 'react';
      import { initialize${componentName} } from '../../components/${component}';
      
      interface ${componentName}Props extends React.HTMLAttributes<HTMLDivElement> {}
      
      export const ${componentName} = forwardRef<HTMLDivElement, ${componentName}Props>(
        ({ className = '', ...props }, refFromParent) => {
          const ref = useRef<HTMLDivElement>(null);
      
          useEffect(() => {
            if (ref.current) {
              ${initCall};
            }
          }, []);
      
          return (
            <div
              ref={(node) => {
                ref.current = node;
                if (typeof refFromParent === 'function') refFromParent(node);
                else if (refFromParent) (refFromParent as React.MutableRefObject<HTMLDivElement | null>).current = node;
              }}
              className={\`${component}-js \${className}\`}
              {...props}
            >
              {props.children}
            </div>
          );
        }
      );
      
      ${componentName}.displayName = '${componentName}';
      `;
      
      fs.writeFileSync(wrapperFile, content.trim(), 'utf8');
      console.log(`🟢 Generated React wrapper: ${wrapperFile}`);
    });

    // Generate index.ts for React wrappers
    const reactIndexFile = join('dist/react', 'index.ts');
    let indexContent = `// AUTO-GENERATED - export all wrappers\n`;
    components.forEach(c => {
      const componentName = toPascalCase(c);
      indexContent += `export * from './components/${componentName}';\n`;
    });
    fs.writeFileSync(reactIndexFile, indexContent.trim(), 'utf8');
    console.log(`🟢 Generated React index: ${reactIndexFile}`);

    console.log('🏁 Build completed successfully!');
  } catch (err) {
    console.error('❌ Build failed:', err);
    process.exit(1);
  }
}

build();
