import { mapSvgAttrs } from './mapSvgAttrs.mjs'

export const parseChildNode = opts => svg => {
  const meta = mapSvgAttrs(svg.attrs)

  if (!meta.height) {
    return svg
  }

  const ratio = opts.glyphHeight / meta.height

  svg.childNodes = svg.childNodes.map(child => {
    if (child.nodeName === 'polygon') {
      child.attrs = child.attrs.map(attr => {
        if (attr.name === 'points') {
          attr.value = attr.value
            .split(' ')
            .map(a => Math.round(a * ratio))
            .join(' ')
        }

        return attr
      })
    }

    if (child.nodeName === 'path') {
      console.log(child)
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
