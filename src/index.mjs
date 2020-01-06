import path from 'path'

import defaultOptions from './defaultOptions.mjs'

import {
  findFiles,
  getGlyphs,
  glyphs2svgFont,
  glyphs2css,
  glyphs2html,
  glyphs2js,
  hash,
  svgFont2otherFonts,
  writeFiles,
} from './lib/index.mjs'

const cwd = process.cwd()

export const build = async (options = {}) => {
  options = {
    ...defaultOptions,
    ...options,
  }

  let { name, output, cssDir, jsDir, fontDir, webRoot } = options

  options.dist = {
    css: path.join(output, `${name}.css`),
    html: path.join(output, `${name}-preview.html`),
    js: path.join(output, `${name}-lib.mjs`),
    magicCss: path.join(output, `${name}-style.mjs`),
    magicView: path.join(output, `${name}.mjs`),
  }


  let cssFileUrl = `${name}.css`
  if (cssDir) {
    cssFileUrl = `${cssDir}/${cssFileUrl}`
  }
  cssFileUrl = `${webRoot}/${cssFileUrl}`

  let jsFileUrl = `${name}.js`
  if (jsDir) {
    jsFileUrl = `${jsDir}/${jsFileUrl}`
  }
  jsFileUrl = `${webRoot}/${jsFileUrl}`

  let fontFileUrl = webRoot
  if (fontDir) {
    fontFileUrl += `${fontDir}/`
  }

  options.urls = {
    css: cssFileUrl,
    html: `${webRoot}/${name}-preview.html`,
    js: jsFileUrl,
    font: fontFileUrl,
  }

  try {
    const files = await findFiles(options)
    const glyphs = await getGlyphs(files, options)
    const svg = await glyphs2svgFont(glyphs, options)
    const fonts = svgFont2otherFonts(svg, options)
    const fileMark = hash(svg).slice(0, 8)

    options.fileMark = fileMark

    const { css, magicCss } = await glyphs2css(glyphs, options)

    const contents = {
      glyphs,
      svg,
      fonts,
      fileMark,
      css,
      magicCss,
      html: glyphs2html(glyphs, options),
      js: glyphs2js(glyphs),
    }

    await writeFiles(contents, options)

    console.log(`font + css have been built with ${glyphs.length} svg-icons.`)
  } catch (error) {
    throw error
  }
}

export default build
