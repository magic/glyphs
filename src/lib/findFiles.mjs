import path from 'path'

import deep from '@magic/deep'
import fs from '@magic/fs'
import log from '@magic/log'

const cwd = process.cwd()

export const findFiles = async options => {
  let { dir } = options

  const files = await Promise.all(dir.map(async dir => {
    if (!path.isAbsolute(dir)) {
      dir = path.join(cwd, dir)
    }

    try {
      const stat = await fs.stat(dir)
      if (!stat.isDirectory()) {
        log.error('NOT A DIR', `${dir} is not a directory`)
        process.exit()
      }
    } catch (e) {
      if (e.code === 'ENOENT') {
        log.error('ENOENT', `${dir} does not exist.`)
        process.exit()
      }
      throw e
    }

    try {
      let files = await fs.getFiles(dir)
      files = files.filter(f => path.extname(f).toLowerCase() === '.svg')

      if (files.length === 0) {
        log.error('ENOFILES', `${dir} does not contain any svg files`)
        process.exit()
      }

      return files
    } catch (e) {
      throw e
    }
  }))

  return deep.flatten(files)
}

export default findFiles
