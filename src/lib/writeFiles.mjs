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
  } = options

  const fileContents = {
    [dist.css]: result.css,
    [dist.magicCss]: result.magicCss,
    [dist.js]: result.js,
    [dist.html]: result.html,
  }

  options.formats
    .map(format => [format, result.fonts[format]])
    .map(([format, data]) => {
      const destFilename = path.resolve(output, `${name}.${format}`)
      fileContents[destFilename] = data
    })

  await Promise.all(Object.entries(fileContents).map(writeFile))

  return result
}

export default writeFiles
