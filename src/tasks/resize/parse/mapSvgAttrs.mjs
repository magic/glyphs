export const mapSvgAttrs = (attrs = false) => {
  if (!attrs) {
    return attrs
  }

  const args = {}

  attrs.map(a => {
    if (a.name === 'width') {
      args.width = a.value.replace('px', '')
    }

    if (a.name === 'height') {
      args.height = a.value.replace('px', '')
    }

    if (a.name === 'viewBox') {
      const [x, y, w, h] = a.value.split(' ')
      args.viewBox = {
        x,
        y,
        w,
        h,
      }
    }
  })

  if (!args.width) {
    args.width = args.viewBox.w
  }
  if (!args.height) {
    args.height = args.viewBox.h
  }
  if (!args.viewBox) {
    args.viewBox = { x: 0, y: 0, w: args.width, h: args.height }
  }

  return args
}
