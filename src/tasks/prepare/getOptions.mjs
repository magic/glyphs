import path from 'path'

import defaultOptions from '../../defaultOptions.mjs'

export const getOptions = options => {
  options = { ...defaultOptions, ...options }

  let { name, output, cssDir, jsDir, fontDir, webRoot } = options

  options.dist = {
    css: path.join(output, `${name}.css`),
    html: path.join(output, `${name}-preview.html`),
    js: path.join(output, `${name}-lib.mjs`),
    magicCss: path.join(output, `${name}-style.mjs`),
    magicView: path.join(output, `${name}.mjs`),
    modules: path.join(output, `${name}.mjs`),
  }

  if (!webRoot.endsWith('/')) {
    webRoot += '/'
  }
  if (!webRoot.startsWith('/')) {
    webRoot = `/${webRoot}`
  }

  let cssFileUrl = `${name}.css`
  if (cssDir) {
    cssFileUrl = `${cssDir}${cssFileUrl}`
  }
  cssFileUrl = `${webRoot}${cssFileUrl}`

  let jsFileUrl = `${name}.js`
  if (jsDir) {
    jsFileUrl = `${jsDir}${jsFileUrl}`
  }
  jsFileUrl = `${webRoot}${jsFileUrl}`

  let fontFileUrl = webRoot
  if (fontDir) {
    fontFileUrl += `${fontDir}/`
  }

  options.urls = {
    css: cssFileUrl,
    html: `${webRoot}${name}-preview.html`,
    js: jsFileUrl,
    font: fontFileUrl,
  }

  return options
}
