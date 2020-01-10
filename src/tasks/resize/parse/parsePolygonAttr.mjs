export const parsePolygonAttr = ({ height, ratio }) => attr => {
  if (attr.name === 'points') {
    attr.value = attr.value
      .split(' ')
      .map(a => {
        if (height > 100) {
          return Math.round(a * ratio)
        }

        return (a * ratio).toFixed(1)
      })
      .join(' ')
  }

  return attr
}
