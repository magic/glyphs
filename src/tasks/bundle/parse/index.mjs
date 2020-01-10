import defaultMetadataProvider from 'svgicons2svgfont/src/metadata.js'
import fs from '@magic/fs'
import log from '@magic/log'

import { findFiles } from './findFiles.mjs'
import { getGlyph } from './getGlyph.mjs'
import { getOptions } from './getOptions.mjs'

export const parse = async (options = {}) => {
  options = getOptions(options)

  const files = await findFiles(options)

  const glyphPromises = files.map(getGlyph(options))

  const glyphs = await Promise.all(glyphPromises)

  return {
    glyphs,
    options,
  }
}
