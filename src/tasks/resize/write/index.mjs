import path from 'path'

import fs from '@magic/fs'
import log from '@magic/log'

const cwd = process.cwd()

export const write = async ({ resized, args }) =>
  await Promise.all(
    Object.entries(resized).map(async ([name, content]) => {
      let outDir = args.output

      if (!path.isAbsolute(outDir)) {
        outDir = path.join(cwd, outDir)
      }

      let isDir = false

      try {
        const stat = await fs.stat(outDir)
        isDir = stat.isDirectory()
      } catch (e) {
        if (e.code !== 'ENOENT') {
          throw e
        }
        isDir = false
      }

      if (!isDir) {
        log.error('ENOTADIR', `${outDir} is not a directory. Aborting.`)
        process.exit()
      }

      if (!name.startsWith(outDir)) {
        name = path.join(outDir, name.replace(cwd, ''))
      }

      await fs.writeFile(name, content)
    }),
  )
