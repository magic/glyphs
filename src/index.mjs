import path from 'path'

import fs from '@magic/fs'
import log from '@magic/log'

import * as tasks from './tasks/index.mjs'

export const build = async (opts = {}) => {
  let numDirs = opts.dir.length
    await Promise.all(opts.dir.map(async dir => {
      if (!path.isAbsolute(dir)) {
          dir = path.join(process.cwd(), dir)
      }

      const exists = await fs.exists(dir)

      if (!exists) {
        numDirs -= 1
      }
    }))

  if (numDirs === 0) {
    log.error(`ENOENT: --dir ${opts.dir.join(' ')} does not exist`)
    process.exit()
  }

  try {
    const { glyphs, options } = await tasks.prepare(opts)

    const contents = await tasks.build(glyphs, options)

    const writtenFiles = await tasks.write(contents, options)

    return writtenFiles
  } catch (e) {
    //log.error(e)
    return e
  }
}

export default build
