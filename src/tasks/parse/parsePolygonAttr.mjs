export const parsePolygonAttr = attr => {
  if (attr.name === 'points') {
    attr.value = attr.value
      .split(' ')
      .map(a => Math.round(a * ratio))
      .join(' ')
  }

  return attr
}
