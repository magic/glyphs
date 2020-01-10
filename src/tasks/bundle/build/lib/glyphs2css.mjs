import path from 'path'
import url from 'url'
import css from '@magic/css'

import cssTemplate from '../templates/css.mjs'
import { stringifyObject } from './stringifyObject.mjs'

export const glyphs2css = async (glyphs, options) => {
  const glyphsMetaData = glyphs.map(g => g.metadata)

  const magicCss = cssTemplate(glyphsMetaData, options)

  const style = await css(magicCss)

  const result = {
    magicCss: `export const style = ${stringifyObject(magicCss)}`,
    css: style.css,
  }

  return result
}
