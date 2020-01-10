import svg2ttf from 'svg2ttf'
import ttf2eot from 'ttf2eot'
import ttf2woff from 'ttf2woff'
import ttf2woff2 from 'ttf2woff2-no-gyp'

export const svgFont2otherFonts = (svg, options) => {
  const fonts = {}
  const ttf = Buffer.from(
    svg2ttf(svg.toString(), (options.formatsOptions && options.formatsOptions.ttf) || {}).buffer,
  )

  if (options.formats.indexOf('eot') !== -1) {
    fonts.eot = Buffer.from(ttf2eot(ttf).buffer)
  }

  if (options.formats.indexOf('woff') !== -1) {
    fonts.woff = Buffer.from(
      ttf2woff(ttf, {
        metadata: options.metadata,
      }).buffer,
    )
  }

  if (options.formats.indexOf('woff2') !== -1) {
    fonts.woff2 = ttf2woff2(ttf)
  }

  if (options.formats.indexOf('svg') !== -1) {
    fonts.svg = svg
  }
  if (options.formats.indexOf('ttf') !== -1) {
    fonts.ttf = ttf
  }

  return fonts
}
