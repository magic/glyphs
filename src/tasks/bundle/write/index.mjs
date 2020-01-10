import { writeFile } from './writeFile.mjs'
import path from 'path'

const cwd = process.cwd()

export const write = async (result, options) => {
  const {
    name,
    fontDir,
    output,
    formats,
    dist,
    minimal,
    noCss,
    noMagicCss,
    noJs,
    noPreview,
    noModules,
    noWrite,
  } = options

  const fileContents = {}

  if (!noMagicCss) {
    fileContents[dist.magicCss] = result.magicCss
  }

  if (!minimal) {
    if (!noCss) {
      fileContents[dist.css] = result.css
    }
    if (!noJs) {
      fileContents[dist.js] = result.js
    }
    if (!noPreview) {
      fileContents[dist.html] = result.html
    }
  }

  if (!noModules) {
    fileContents[dist.modules] = result.modules
  }

  options.formats
    .map(format => [format, result.fonts[format]])
    .map(([format, data]) => {
      const destFilename = path.join(fontDir, `${name}.${format}`)
      fileContents[destFilename] = data
    })

  if (!noWrite) {
    const fixedPathFileContents = {}
    Object.entries(fileContents).forEach(([k, v]) => {
      if (!k.startsWith(cwd)) {
        k = path.join(cwd, output, k)
      }
      fixedPathFileContents[k] = v
    })

    await Promise.all(Object.entries(fixedPathFileContents).map(writeFile))
  }

  return fileContents
}
