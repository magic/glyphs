export const parsePathAttr = attr => {
  const regex = /[LMA]/g

  if (attr.name === 'd') {
    const parts = attr.value.split(regex)
    console.log({ parts })
  }

  return attr
}
