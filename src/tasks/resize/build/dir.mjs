import path from 'path'

import fs from '@magic/fs'

import { resizeFile } from './file.mjs'

const cwd = process.cwd()

export const resizeDir = async opts => {
  if (!path.isAbsolute(opts.dir)) {
    opts.dir = path.join(cwd, opts.dir)
  }

  const files = await fs.getFiles(opts.dir)

  const resized = await Promise.all(files.map(resizeFile(opts)))

  const result = {}

  Object.values(resized).forEach(({ file, resized }) => {
    result[file] = resized
  })

  return result
}
