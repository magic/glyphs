#!/usr/bin/env node

import { cli } from '@magic/cli/src/index.mjs'
import log from '@magic/log'

import build from './index.mjs'

const args = {
  options: [
    ['--help', '-help', 'help', '--h', '-h'],
    ['--dir', '--in', '-d'],
    ['--output', '--out', '-o'],
    ['--name', '-n'],
    ['--cssPrefix', '--prefix', '-p'],
    ['--webRoot', '-w'],
    ['--fontDir', '-f'],
    ['--cssDir', '-c'],
    ['--jsDir', '-j'],
    ['--minimal', '--min', '-m'],
  ],
  commands: ['build'],
  help: {
    name: 'magic-glyphs',
    header: 'generate webfont files from svg.',
    commands: {
      build: 'build the font files',
    },
    options: {
      '--dir': 'directory with svg files',
      '--output': 'directory to output files to',
      '--name': 'font name',
      '--cssPrefix': 'css prefix for font',
      '--webRoot':  "root URL, eg '/', '/dirname/'",
      '--fontDir': 'directory to write font file to',
      '--cssDir': 'directory to write css file to',
      '--jsDir': 'directory to write js file to',
      '--minimal': 'only output minimal files, no preview, no js.'
    },
    example: `
build a font from src to dist, calling it my-cool-font and css prefixing with mcf-
magic-glyphs --in ./src --out ./dist --name my-cool-font --cssPrefix mcf-
`,
  },
  default: {
    '--name': 'magic-icons',
    '--cssPrefix': 'mi',
  },
}

const run = async () => {
  const res = cli(args)

  if (!res.args.dir) {
    log.error('--dir is required')
    process.exit()
  }

  if (!res.args.output) {
    log.error('--output is required')
    process.exit()
  } else {
    res.args.output = res.args.output[0]
  }

  res.args.name = res.args.name[0]

  build(res.args)
}

run()