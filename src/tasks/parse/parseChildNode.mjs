import { mapSvgAttrs } from './mapSvgAttrs.mjs'
import { parsePolygonAttr } from './parsePolygonAttr.mjs'
import { parsePathAttr } from './parsePathAttr.mjs'

export const parseChildNode = opts => svg => {
  const meta = mapSvgAttrs(svg.attrs)

  if (!meta.height) {
    return svg
  }

  const ratio = opts.glyphHeight / meta.height

  svg.childNodes = svg.childNodes.map(child => {
    if (child.nodeName === 'polygon') {
      child.attrs = child.attrs.map(parsePolygonAttr)
    }

    if (child.nodeName === 'path') {
      child.attrs = child.attrs.map(parsePathAttr)

    }

    return child
  })

  if (meta) {
    const x = meta.viewBox.x * ratio
    const y = meta.viewBox.y * ratio

    const height = Math.round(meta.height * ratio)
    const width = Math.round(meta.width * ratio)


    const viewBox = `${x} ${y} ${width} ${height}`

    svg.attrs = svg.attrs.map(attr => {
      if (attr.name === 'height') {
        // height has to be a string
        attr.value = `${height}`
      }
      if (attr.name === 'width') {
        // width has to be a string
        attr.value = `${width}`
      }
      if (attr.name === 'viewBox') {
        attr.value = viewBox
      }
      return attr
    })
  }

  return svg
}
