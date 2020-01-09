#!/usr/bin/env node

import cli from '@magic/cli'
import is from '@magic/types'
import log from '@magic/log'
import fs from '@magic/fs'

import resize from '../resize.mjs'

const cliArgs = {
  options: [
    ['--help', '-help', 'help', '--h', '-h'],
    ['--file', '--in', '-f'],
    ['--output', '--out', '-o'],
    ['--glyph-height', '--gh', '--height'],
  ],
  required: ['--file', '--output'],
  help: {
    name: 'magic-glyphs-resize',
    header: 'resize a svg.',
    options: {
      '--file': 'svg file',
      '--output': 'directory to output files to',
      '--glyph-height': 'height of a single svg glyph in the font directory',
    },
    example: `
#resize a svg file to 1000 pixel
magic-glyphs-resize --in src/svg.svg --out dist/svg.svg

#resize a svg file to 32 pixels
magic-glyphs-resize --in src/svg.svg --out dist/svg.svg --glyph-height 32
`,
  },
  default: {
    '--glyph-height': 1000,
  },
  single: ['--file', '--output', '--glyph-height'],
}

const run = async () => {
  const { args } = cli(cliArgs)

  const resizedFile = await resize(args)

  if (is.error(resizedFile)) {
    if (resizedFile.code === 'ENOENT') {
      log.error(resizedFile.code, resizedFile.message)
      process.exit()
    }

    throw resizedFile
  }

  const outFile = args.output

  await fs.writeFile(outFile, resizedFile)
  log.success('svg resize', `${args.file} has been resized to ${args.glyphHeight}`)
}

run()
