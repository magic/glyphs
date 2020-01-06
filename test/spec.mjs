import { is } from '@magic/test'

import build from '../src/index.mjs'

export default [{ fn: () => build, expect: is.fn, info: 'build is a function' }]
