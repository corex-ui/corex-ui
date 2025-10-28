import {Args, Command} from '@oclif/core'
import fs from 'node:fs'
import {join, resolve as pathResolve} from 'node:path'

import {findHtmlFiles, processHtmlFile} from '../utils.js'

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

      logWarn('Components not found. Please check uiDist or install @corex-ui/static.')
      return pathsToTry.at(-1) || '0'
    }

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

    // Process each HTML file using the shared util
    for (const file of htmlFiles) {
      // eslint-disable-next-line no-await-in-loop
      await processHtmlFile(file, targetFiles, componentsDir)
    }

    log('Prerender complete!')
  }
}
