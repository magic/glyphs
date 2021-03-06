import cases from '@magic/cases'

export const glyphs2module = (glyphs, options) => {
  const { cssPrefix } = options
  const fontName = cases.pascal(options.name)

  const moduleGlyphs = glyphs.map(g => {
    const id = g.metadata.name
    const name = cases.pascal(id)
    const unicode = g.metadata.unicode[0].charCodeAt(0).toString(16)

    return `export const ${name} = () => i({ class: '${cssPrefix}-${id}' }, '\\${unicode}')`
  })

  return moduleGlyphs.join(',\n\n')
}
