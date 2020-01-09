#!/usr/bin/env node

import cli from '@magic/cli'
import is from '@magic/types'
import log from '@magic/log'

import resize from '../resize.mjs'

const cliArgs = {
  options: [
    ['--help', '-help', 'help', '--h', '-h'],
    ['--file', '--in', '-f'],
    ['--output', '--out', '-o'],
    ['--glyph-height', '--gh', '--height'],
  ],
  required: [
    '--file',
    '--output',
  ],
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
  single: [
    '--file',
    '--output',
  ],
}

const run = async () => {
  const { args } = cli(cliArgs)

  console.log({ args })
}

run()
