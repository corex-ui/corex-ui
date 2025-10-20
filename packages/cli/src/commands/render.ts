import {Args, Command} from '@oclif/core'
import {JSDOM} from 'jsdom'
import fs from 'node:fs'
import {join, resolve as pathResolve} from 'node:path'
import {pathToFileURL} from 'node:url'

const log = (msg: string) => console.log(`[Corex] ${msg}`)
const logInfo = (msg: string) => console.info(`  • ${msg}`)
const logWarn = (msg: string) => console.warn(`  ⚠ ${msg}`)
const resolvePath = (p: string) => pathResolve(process.cwd(), p)

export default class Render extends Command {
  /* eslint-disable perfectionist/sort-objects */
  static args = {
    dist: Args.string({description: 'Output folder to prerender', default: 'dist', required: false}),
    components: Args.string({description: 'Components to prerender', required: false, multiple: true}),
  }
  static description = 'Prerender Corex components in HTML files'
  static examples = [
    `<%= config.bin %> <%= command.id %> dist button accordion
# Prerenders "button" and "accordion" components in the "dist" folder
`,
  ]

  async run() {
    const {args} = await this.parse(Render)
    const distPathArg = args.dist
    const componentsArg: string[] = Array.isArray(args.components)
      ? args.components
      : args.components
        ? [args.components]
        : []

    function resolveComponentsDir(): string {
      const pathsToTry = [
        join(pathResolve('../../'), 'node_modules/@corex-ui/static/dist/components'),
        join(pathResolve('node_modules/@corex-ui/static/dist/components')),
        pathResolve('components'),
      ]
      for (const dir of pathsToTry) {
        if (fs.existsSync(dir)) return dir
      }

      console.warn('⚠ Components not found. Please check uiDist or install @corex-ui/static.')
      return pathsToTry.at(-1) || '0'
    }

    function findHtmlFiles(dir: string): string[] {
      const htmlFiles: string[] = []
      if (!fs.existsSync(dir)) return htmlFiles
      for (const item of fs.readdirSync(dir, {withFileTypes: true})) {
        const fullPath = join(dir, item.name)
        if (item.isDirectory()) htmlFiles.push(...findHtmlFiles(fullPath))
        else if (item.name.endsWith('.html')) htmlFiles.push(fullPath)
      }

      return htmlFiles
    }

    async function processHtmlFile(
      htmlFilePath: string,
      targetFiles: string[],
      componentsDir: string,
      outputDir: string,
    ) {
      const fileName = htmlFilePath.replace(outputDir, '').replace(/^\//, '') || 'index.html'
      /* eslint-disable @typescript-eslint/no-explicit-any */
      let dom: JSDOM | null = null
      try {
        const htmlContent = fs.readFileSync(htmlFilePath, 'utf8')
        dom = new JSDOM(htmlContent, {runScripts: 'outside-only', url: 'http://localhost'})
        const {document} = dom.window

        globalThis.window = dom.window as any
        globalThis.document = document as any
        globalThis.HTMLElement = dom.window.HTMLElement
        globalThis.Node = dom.window.Node

        // eslint-disable-next-line n/no-unsupported-features/node-builtins
        globalThis.navigator = dom.window.navigator || {
          userAgent: 'node.js',
          clipboard: {
            async writeText() {},
            async readText() {
              return ''
            },
          },
          language: 'en-US',
        }

        // eslint-disable-next-line n/no-unsupported-features/node-builtins
        globalThis.Navigator = dom.window.Navigator

        // eslint-disable-next-line n/no-unsupported-features/node-builtins
        globalThis.CustomEvent = dom.window.CustomEvent
        globalThis.Element = dom.window.Element
        globalThis.getComputedStyle = dom.window.getComputedStyle || (() => ({getPropertyValue: () => ''}))

        let processedCount = 0
        const seen = new Set<string>()

        // Process files sequentially - components must be initialized in order to avoid DOM conflicts
        for (const file of targetFiles) {
          const baseName = file.replace(/(\.min)?\.mjs$/, '')
          if (seen.has(baseName)) continue
          seen.add(baseName)

          const jsClass = `${baseName}-js`
          const hasComponent = document.querySelector(`.${jsClass}`)
          if (!hasComponent) continue

          try {
            const moduleUrl = pathToFileURL(join(componentsDir, file)).href + '?cache_bust=' + Date.now()
            // eslint-disable-next-line no-await-in-loop
            const uiModule = await import(moduleUrl)
            const initName =
              'initialize' +
              baseName
                .split('-')
                .map((s) => s[0].toUpperCase() + s.slice(1))
                .join('')
            const initFn =
              uiModule[initName] ||
              uiModule.default?.[initName] ||
              uiModule.init ||
              uiModule.default?.init ||
              uiModule.default
            if (typeof initFn !== 'function') continue
            // eslint-disable-next-line no-await-in-loop
            await initFn(document)
            processedCount++
          } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error'
            console.warn(`Fail ${baseName}: ${errorMessage}`)
          }
        }
        /* eslint-enable @typescript-eslint/no-explicit-any */

        if (processedCount > 0) {
          fs.writeFileSync(htmlFilePath, dom.serialize(), 'utf8')
          console.log(`  ✓ ${fileName} → ${processedCount} rendered`)
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        console.warn(`Error ${fileName}: ${errorMessage}`)
      } finally {
        if (dom) dom.window.close()
      }
    }

    // --- Main ---
    log('Starting render...')
    const outputDir = resolvePath(distPathArg)
    const componentsDir = resolveComponentsDir()

    if (!fs.existsSync(outputDir)) return logWarn(`Output directory not found: ${outputDir}`)
    if (!fs.existsSync(componentsDir)) return logWarn(`Components directory not found: ${componentsDir}`)

    const allFiles = fs
      .readdirSync(componentsDir)
      .filter((f) => f.endsWith('.mjs') && !f.includes('.map') && !f.endsWith('.min.mjs'))

    const targetFiles =
      componentsArg.length > 0
        ? allFiles.filter((f) => componentsArg.includes(f.replace(/(\.min)?\.mjs$/, '')))
        : allFiles

    logInfo(`Components: ${targetFiles.length} found`)

    const htmlFiles = findHtmlFiles(outputDir)
    logInfo(`HTML files: ${htmlFiles.length} found`)

    await Promise.all(htmlFiles.map((file) => processHtmlFile(file, targetFiles, componentsDir, outputDir)))

    log('Prerender complete!')
  }
}
