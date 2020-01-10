import path from 'path'
import fs from '@magic/fs'

export const writeFile = async ([file, data]) => {
  const dir = path.dirname(file)

  try {
    await fs.mkdirp(dir)

    await fs.writeFile(file, data)
  } catch (e) {
    throw e
  }
}
