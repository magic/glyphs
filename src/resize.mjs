import log from '@magic/log'
import is from '@magic/types'

import * as tasks from './tasks/resize/index.mjs'

export const resize = async args => {
  const resized = await tasks.build(args)

  if (is.error(resized)) {
    if (resized.code === 'ENOENT') {
      log.error(resized.code, resized.message)
      process.exit()
    }

    throw resized
  }

  await tasks.write({ resized, args })
}

export default resize
