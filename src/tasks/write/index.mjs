import { writeFiles } from './writeFiles.mjs'

export const write = async (contents, options = {}) => {
  try {
    const writtenFiles = await writeFiles(contents, options)
    return writtenFiles
  } catch (error) {
    throw error
  }
}
