import fs from '@magic/fs'

import { parse } from '../parse/index.mjs'

export const resizeFile = opts => async file => {
  const content = await fs.readFile(file, 'utf8')

  const resized = await parse(content, opts)

  return { file, resized }
}
