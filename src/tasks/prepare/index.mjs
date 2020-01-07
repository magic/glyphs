import defaultMetadataProvider from 'svgicons2svgfont/src/metadata.js'
import fs from '@magic/fs'
import log from '@magic/log'

import { findFiles, getGlyph, getOptions } from '../../lib/index.mjs'

export const prepare = async (options = {}) => {
  options = getOptions(options)

  const files = await findFiles(options)

  const glyphPromises = files.map(getGlyph(options))

  const glyphs = await Promise.all(glyphPromises)

  return {
    glyphs,
    options,
  }
}
