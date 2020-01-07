import path from 'path'
import fs from '@magic/fs'

export const writeFile = async ([file, data]) => {
  const dir = path.dirname(file)

  try {
    await fs.mkdirp(dir)

    await fs.writeFile(file, data)
  } catch (e) {
    throw e
  }
}

export const writeFiles = async (result, options) => {
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
      const destFilename = path.resolve(output, fontDir, `${name}.${format}`)
      fileContents[destFilename] = data
    })

  if (!noWrite) {
    console.log('write')
    await Promise.all(Object.entries(fileContents).map(writeFile))
  }

  return fileContents
}

export default writeFiles
