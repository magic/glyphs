import path from 'path'

import htmlTemplate from '../templates/html.mjs'

export const glyphs2html = (glyphs, options) => {
  glyphs = glyphs.map(g => g.metadata)

  const html = htmlTemplate(glyphs, options)
  return html
}
