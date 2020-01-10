import path from 'path'

import fs from '@magic/fs'

import { resizeFile } from './file.mjs'
import { resizeDir } from './dir.mjs'

const cwd = process.cwd()

export const build = async (opts = {}) => {
  let isDir = false
  if (opts.file) {
    const stat = await fs.stat(opts.file)
    if (stat.isDirectory()) {
      opts.dir = opts.file
      isDir = true
    }
  }

  if (opts.dir) {
    if (!isDir) {
      const stat = await fs.stat(opts.dir)
      if (stat.isDirectory()) {
        isDir = true
      }
    }

    if (isDir) {
      return await resizeDir(opts)
    } else {
      if (!opts.file) {
        opts.file = opts.dir
      }
    }
  }

  if (!path.isAbsolute(opts.file)) {
    opts.file = path.join(cwd, opts.file)
  }

  const { file, resized } = await resizeFile(opts)(opts.file)

  return { [file]: resized }
}
