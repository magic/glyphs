import stream from 'stream'
import SVGIcons2SVGFontStream from 'svgicons2svgfont'
import log from '@magic/log'

export const glyphs2svgFont = async (glyphs, options) => {
  const svg = await new Promise((resolve, reject) => {
    let svg = ''

    const fontStream = new SVGIcons2SVGFontStream({
      ...options,
      log: options.vebose ? log : () => {},
    })
      .on('data', data => {
        svg += data
      })
      .on('finish', () => resolve(svg))
      .on('error', error => reject(error))

    glyphs.forEach(glyphData => {
      const glyphStream = new stream.Readable()

      glyphStream.push(glyphData.contents)
      glyphStream.push(null)

      glyphStream.metadata = glyphData.metadata

      fontStream.write(glyphStream)
    })

    fontStream.end()
  })

  return svg
}
