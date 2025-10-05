// src/commands/render.ts
import {Args, Command} from '@oclif/core'
import fs from 'node:fs'
import {join, resolve as pathResolve} from 'node:path'

import {findHtmlFiles, processHtmlFile} from './utils'

const log = (msg: string) => console.log(`[Corex] ${msg}`)
const logInfo = (msg: string) => console.info(`  • ${msg}`)
const logWarn = (msg: string) => console.warn(`  ⚠ ${msg}`)
const resolvePath = (p: string) => pathResolve(process.cwd(), p)

export default class Render extends Command {
  static args = {
    components: Args.string({
      description: 'Components to prerender',
      multiple: true,
      required: false,
    }),
    dist: Args.string({
      description: 'Output folder to prerender',
      required: true,
    }),
  }
  static description = 'Prerender Corex components in HTML files'
  static examples = [
    `<%= config.bin %> <%= command.id %> dist button accordion
# Prerenders "button" and "accordion" components in the "dist" folder`,
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

    // --- Main ---
    log('Starting render...')

    const outputDir = resolvePath(distPathArg)
    const componentsDir = resolveComponentsDir()

    if (!fs.existsSync(outputDir)) {
      logWarn(`Output directory not found: ${outputDir}`)
      return
    }

    if (!fs.existsSync(componentsDir)) {
      logWarn(`Components directory not found: ${componentsDir}`)
      return
    }

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

    // Avoid `no-await-in-loop` by using Promise.all
    await Promise.all(htmlFiles.map((file) => processHtmlFile(file, targetFiles, componentsDir)))

    log('Prerender complete!')
  }
}
