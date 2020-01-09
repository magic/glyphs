import path from 'path'

import parse5 from 'parse5'

import fs from '@magic/fs'

import { parseChildNode } from './parseChildNode.mjs'

const cwd = process.cwd()

export const parse = async (content, opts = {}) => {
  const parsed = parse5.parseFragment(content)

  parsed.childNodes = parsed.childNodes.map(parseChildNode(opts))

  const serialized = parse5.serialize(parsed)

  return serialized
}
