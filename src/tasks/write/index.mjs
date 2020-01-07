import { writeFiles } from '../../lib/index.mjs'

export const write = async (contents, options = {}) => {
  try {
    const writtenFiles = await writeFiles(contents, options)
    return writtenFiles
  } catch (error) {
    throw error
  }
}
