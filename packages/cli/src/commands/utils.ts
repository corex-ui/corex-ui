/* eslint-disable
  no-undef,
  unicorn/consistent-function-scoping,
  perfectionist/sort-imports,
  perfectionist/sort-intersection-types,
  n/no-unsupported-features/node-builtins
*/

import fs from 'node:fs'
import path from 'node:path'
import {pathToFileURL} from 'node:url'
import {JSDOM} from 'jsdom'
import ResizeObserver from 'resize-observer-polyfill'
import 'intersection-observer'

/**
 * Apply browser-like polyfills to the Node.js global scope
 */
export function applyBrowserPolyfills(win: JSDOM['window']): void {
  // TypeScript: cast globalThis so we can assign
  const g = globalThis as typeof globalThis & Record<string, unknown>

  // Assign jsdom window and DOM APIs
  g.window = win as unknown as Window & typeof globalThis
  g.document = win.document

  // Many DOM APIs exist on jsdom window but aren't recognized by TS
  g.HTMLElement = win.HTMLElement
  g.Element = win.Element
  g.Node = win.Node
  g.CustomEvent = win.CustomEvent

  g.getComputedStyle =
    win.getComputedStyle ??
    (() => ({
      getPropertyValue: (): string => '',
    }))

    const RO = ResizeObserver as any
    (g as any).ResizeObserver = RO
    ;(g.window as any).ResizeObserver = RO
    
  const raf = (cb: FrameRequestCallback): number => setTimeout(() => cb(Date.now()), 16) as unknown as number

  g.requestAnimationFrame = win.requestAnimationFrame ?? raf
  g.cancelAnimationFrame = win.cancelAnimationFrame ?? clearTimeout
  g.window.requestAnimationFrame = g.requestAnimationFrame
  g.window.cancelAnimationFrame = g.cancelAnimationFrame
}

/**
 * Process a single HTML file and render all UI components inside it
 */
export async function processHtmlFile(
  htmlFilePath: string,
  targetFiles: string[],
  componentsDir: string,
): Promise<void> {
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf8')
  const dom = new JSDOM(htmlContent, {
    runScripts: 'outside-only',
    url: 'http://localhost',
  })

  applyBrowserPolyfills(dom.window)

  const renderComponent = async (file: string): Promise<boolean> => {
    const baseName = file.replace(/(\.min)?\.mjs$/, '')
    const hasComponent = dom.window.document.querySelector(`.${baseName}-js`)
    if (!hasComponent) return false

    try {
      const filePath = path.join(componentsDir, file)
      const fileUrl = pathToFileURL(filePath).href
      const uiModule = (await import(/* @vite-ignore */ `${fileUrl}?cache_bust=${Date.now()}`)) as Record<
        string,
        unknown
      >

      const initName =
        'initialize' +
        baseName
          .split('-')
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join('')

      const initFn =
        uiModule[initName] ??
        (uiModule.default as Record<string, unknown>)?.[initName] ??
        uiModule.init ??
        uiModule.default

      if (typeof initFn !== 'function') return false

      await (initFn as (doc: Document) => Promise<void>)(dom.window.document)
      return true
    } catch (error) {
      const msg = (error as Error).message ?? ''
      if (
        msg.includes('IntersectionObserver is not a constructor') ||
        msg.includes('i.IntersectionObserver is not a constructor') ||
        msg.includes('win.IntersectionObserver is not a constructor') ||
        msg.includes('node is `null` or `undefined`')
      ) {
        return true
      }

      console.warn(`[Corex] Fail ${file}: ${msg}`)
      return false
    }
  }

  let renderedCount = 0
  for (const file of targetFiles) {
    // eslint-disable-next-line no-await-in-loop
    const rendered = await renderComponent(file)
    if (rendered) renderedCount++
  }

  fs.writeFileSync(htmlFilePath, dom.serialize(), 'utf8')
  console.log(`[Corex] ${htmlFilePath} → ${renderedCount} rendered`)
  dom.window.close()
}

/**
 * Recursively finds all HTML files in a directory.
 */
export function findHtmlFiles(dirPath: string): string[] {
  const htmlFiles: string[] = []

  if (!fs.existsSync(dirPath)) return htmlFiles

  for (const entry of fs.readdirSync(dirPath, {withFileTypes: true})) {
    const fullPath = path.join(dirPath, entry.name)

    if (entry.isDirectory()) {
      htmlFiles.push(...findHtmlFiles(fullPath))
    } else if (entry.name.endsWith('.html')) {
      htmlFiles.push(fullPath)
    }
  }

  return htmlFiles
}
