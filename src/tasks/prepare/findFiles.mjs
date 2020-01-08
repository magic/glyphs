import path from 'path'

import deep from '@magic/deep'
import fs from '@magic/fs'
import log from '@magic/log'
import is from '@magic/types'

const cwd = process.cwd()

export const findFiles = async options => {
  let { dir } = options

  if (is.string(dir)) {
    dir = [dir]
  }

  const files = await Promise.all(
    dir.map(async dir => {
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
    }),
  )

  return deep.flatten(files).sort((a, b) => (a > b ? 1 : -1))
}

export default findFiles
