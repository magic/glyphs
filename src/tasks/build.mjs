import path from 'path'

import {
  glyphs2svgFont,
  glyphs2css,
  glyphs2html,
  glyphs2js,
  glyphs2module,
  hash,
  svgFont2otherFonts,
} from '../../lib/index.mjs'

const cwd = process.cwd()

export const build = async (glyphs, options) => {
  try {
    const svg = await glyphs2svgFont(glyphs, options)
    const fonts = svgFont2otherFonts(svg, options)

    const fileMark = hash(svg).slice(0, 8)

    options.fileMark = fileMark

    const { css, magicCss } = await glyphs2css(glyphs, options)

    const html = glyphs2html(glyphs, options)
    const js = glyphs2js(glyphs)

    const modules = glyphs2module(glyphs, options)

    return {
      glyphs,
      svg,
      fonts,
      fileMark,
      css,
      magicCss,
      html,
      js,
      modules,
    }
  } catch (error) {
    throw error
  }
}
