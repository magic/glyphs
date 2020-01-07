import * as tasks from './tasks/index.mjs'

export const build = async (opts = {}) => {
  try {
    const { glyphs, options } = await tasks.prepare(opts)

    const contents = await tasks.build(glyphs, options)

    const writtenFiles = await tasks.write(contents, options)

    return writtenFiles
  } catch (error) {
    throw error
  }
}

export default build
