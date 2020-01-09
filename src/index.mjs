import path from 'path'

import fs from '@magic/fs'
import is from '@magic/types'
import log from '@magic/log'

import * as tasks from './tasks/index.mjs'

import { resize as res } from './resize.mjs'

export const resize = res

export const build = async (opts = {}) => {
  if (is.string(opts.dir)) {
    opts.dir = [opts.dir]
  }

  try {
    let numDirs = opts.dir.length

    await Promise.all(opts.dir.map(async dir => {
      if (!path.isAbsolute(dir)) {
        dir = path.join(process.cwd(), dir)
      }

      await fs.stat(dir)
    }))

    const { glyphs, options } = await tasks.prepare(opts)

    const contents = await tasks.build(glyphs, options)

    const writtenFiles = await tasks.write(contents, options)

    return writtenFiles
  } catch (e) {
    return e
  }
}

export default build
