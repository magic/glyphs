export default (glyphs, options) => {
  const { name, cssPrefix, urls } = options

  const style = {
    '@font-face': {
      fontFamily: name,
      fontDir: urls.font,
      fontStyle: 'normal',
      fontWeight: 'normal',
    },
  }

  const classString = `[class^="${cssPrefix}"], [class*="${cssPrefix}"]`
  style[classString] = {
    fontFamily: `${name}`,
    '-webkitFontSmoothing': 'antialiased',
    '-mozOsxFontSmoothing': 'grayscale',
    fontStyle: 'normal',
  }

  glyphs.forEach(glyph => {
    const key = `.${cssPrefix}-${glyph.name}::before`
    style[key] = {
      content: `"\\${glyph.unicode[0].charCodeAt(0).toString(16)}"`,
    }
  })

  return style
}
