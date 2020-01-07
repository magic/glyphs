import defaultMetadataProvider from 'svgicons2svgfont/src/metadata.js'
import fs from '@magic/fs'
import log from '@magic/log'

export const getGlyph = options => async (srcPath, index) => {
  let contents = ''

  try {
    const file = await fs.readFile(srcPath, 'utf8')

    contents += file
  } catch (e) {
    throw e
  }

  if (contents.length === 0) {
    log.error('ENOGLYPHS', `No glyphs found ${srcPath}`)
  }

  const glyph = {
    contents,
    srcPath,
  }

  const metadataProvider = defaultMetadataProvider({
    prependUnicode: options.prependUnicode,
    startUnicode: options.startUnicode + index,
  })

  try {
    glyph.metadata = await new Promise((res, rej) =>
      metadataProvider(glyph.srcPath, (err, meta) => {
        if (err) {
          rej(err)
        }

        res(meta)
      }),
    )
  } catch (e) {
    log.error('EMETADATA', e)
    process.exit()
  }

  return glyph
}
