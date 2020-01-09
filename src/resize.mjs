import path from 'path'

import fs from '@magic/fs'
import is from '@magic/types'
import log from '@magic/log'

import parse5 from 'parse5'

import * as tasks from './tasks/index.mjs'

const cwd = process.cwd()

export const resize = async (opts = {}) => {
  if (!path.isAbsolute(opts.file)) {
    opts.file = path.join(cwd, opts.file)
  }

  const content = await fs.readFile(opts.file, 'utf8')

  const resized = tasks.parse(content, opts)

  return resized
}

export default resize
