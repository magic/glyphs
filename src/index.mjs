import fs from '@magic/fs'
import log from '@magic/log'

import * as tasks from './tasks/index.mjs'

export const build = async (opts = {}) => {
  try {
    const exists = await fs.exists(opts.dir)
    if (!exists) {
      throw new Error('ENOENT', `directory ${opts.dir} does not exist`)
    }

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
