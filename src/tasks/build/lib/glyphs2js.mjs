export const glyphs2js = glyphs => {
  const jsonGlyphs = glyphs.map(g => ({
    name: g.metadata.name,
    unicode: g.metadata.unicode[0].charCodeAt(0).toString(16),
    svg: g.contents,
  }))

  const json = JSON.stringify(jsonGlyphs, null, 2)

  return `export default ${json}\n`
}
