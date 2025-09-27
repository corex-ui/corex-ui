import {spawn} from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const tmpDir = path.join(__dirname, 'tmp')

function runCLI(args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn('pnpm', ['exec', 'corex-ui', ...args], {
      cwd: process.cwd(),
      stdio: 'pipe',
    })

    let output = ''
    child.stdout?.on('data', (data) => {
      output += data.toString()
    })
    child.stderr?.on('data', (data) => {
      output += data.toString()
    })

    child.on('close', (code) => {
      if (code === 0) {
        resolve(output)
      } else {
        reject(new Error(`Exit code: ${code}`))
      }
    })
  })
}

describe('corex render CLI', () => {
  beforeEach(() => {
    if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, {force: true, recursive: true})
    fs.mkdirSync(tmpDir, {recursive: true})

    const html = `<html><body>
<div class="accordion accordion-js">
  <div data-part="root">
    <div data-part="item" data-value="lorem">
      <h3>
        <button data-part="item-trigger" data-value="lorem">
          <span data-part="item-text">Lorem ipsum dolor sit amet</span>
        </button>
      </h3>
      <div data-part="item-content" data-value="lorem">
        <p>Content here</p>
      </div>
    </div>
  </div>
</div>
</body></html>`
    fs.writeFileSync(path.join(tmpDir, 'index.html'), html)
  })

  afterEach(() => {
    if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, {force: true, recursive: true})
  })

  it('should find components and render HTML files', async () => {
    const output = await runCLI(['render', tmpDir])

    // Extract numbers from output
    const componentsMatch = output.match(/Components:\s*(\d+)\s*found/)
    const htmlFilesMatch = output.match(/HTML files:\s*(\d+)\s*found/)
    const renderedMatch = output.match(/(\d+)\s*rendered/)

    const componentsFound = componentsMatch ? Number.parseInt(componentsMatch[1], 10) : 0
    const htmlFilesFound = htmlFilesMatch ? Number.parseInt(htmlFilesMatch[1], 10) : 0
    const filesRendered = renderedMatch ? Number.parseInt(renderedMatch[1], 10) : 0

    console.log(`Components: ${componentsFound}, HTML files: ${htmlFilesFound}, Rendered: ${filesRendered}`)

    if (componentsFound === 0) throw new Error('No components found')
    if (htmlFilesFound === 0) throw new Error('No HTML files found')
    if (filesRendered === 0) throw new Error('No files rendered')
  })
})
