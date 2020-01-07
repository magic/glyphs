## @magic/glyphs

takes a directory of svgs and builds
* iconfont files (ttf, woff2, woff, eot, svg),
* a [@magic/css](https://github.com/magic/css) file,
* a css file,
* a file with a [@magic-module](https://magic-modules.github.io/) for each icon
* and a html-preview.

[![NPM version][npm-image]][npm-url]
[![Linux Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

## install
```bash
// globally installed cli
npm install -g @magic/glyphs

// locally in your app
npm install --save-dev --save-exact @magic/glyphs
```

## usage
after installing globally, magic-glyphs will be available as an executable on the PATH.

if installed as app dependency, magic-glyphs will be available in package.json npm run scripts,
as well as node_modules/.bin/magic-glyphs.

### cli
read all svg files in src,

then write js, css, html, svg, ttf, woff, woff2 and eot files to dist.

```bash
magic-glyphs --dir src --out dist --name fontname --cssPrefix fn-
```

### api
```javascript
import glyphs from '@magic/glyphs'

const options = {
  // settings that get used in output files
  name: 'magic-icons', // name of the font when using it in css
  cssPrefix: 'mi',     // prefix of the icon class, mi-iconname
  dir: 'svg',          // the directory to read from
  output: 'dist',      // the directory to write to
  webRoot: '/',        // web root of the resulting homepage
  fontDir: '',         // sub directory to write font files to.
  cssDir: '',          // sub directory to write css files to.
  jsDir: '',           // sub directory to write js files to.
  minimal: false,      // only output minimal files, no preview, no js.
  noCss: false,        // do not generate css file
  noMagicCss: false,   // do not generate magicCss.mjs file
  noJs: false,         // do not generate javascript file
  noPreview: false,    // do not generate preview
  noModules: false,    // do not generate @magic-module file

  // default options for svg <> font generators
  ascent: undefined,
  centerHorizontally: true,
  descent: 0,
  fixedWidth: false,
  fontId: null,
  formats: ['svg', 'ttf', 'eot', 'woff2', 'woff'],
  formatsOptions: {
    ttf: {
      copyright: null,
      ts: null,
      version: null,
    },
  },
  glyphTransformFn: null,
  metadata: null,
  metadataProvider: null,
  fontHeight: 1000,
  normalize: true,
  prependUnicode: false,
  round: 10e12,
  startUnicode: 0xea01,
  verbose: false,
}

const results = glyphs()

```

#### libraries used to build font files:
[svgicons2svgfont](https://www.npmjs.com/package/svgicons2svgfont)
[svg2ttf](https://www.npmjs.com/package/svg2ttf)
[ttf2eot](https://www.npmjs.com/package/ttf2eot)
[ttf2woff](https://www.npmjs.com/package/ttf2woff)
[ttf2woff2](https://www.npmjs.com/package/ttf2woff2)

#### changelog

##### 0.0.1 - unreleased
first release

##### 0.0.2 - unreleased
...


[npm-image]: https://img.shields.io/npm/v/@magic/glyphs.svg
[npm-url]: https://www.npmjs.com/package/@magic/glyphs
[travis-image]: https://img.shields.io/travis/com/magic/glyphs/master
[travis-url]: https://travis-ci.com/magic/glyphs
[appveyor-image]: https://img.shields.io/appveyor/ci/magic/glyphs/master.svg
[appveyor-url]: https://ci.appveyor.com/project/magic/glyphs/branch/master
[coveralls-image]: https://coveralls.io/repos/github/magic/glyphs/badge.svg
[coveralls-url]: https://coveralls.io/github/magic/glyphs
[greenkeeper-image]: https://badges.greenkeeper.io/magic/glyphs.svg
[greenkeeper-url]: https://badges.greenkeeper.io/magic/glyphs.svg
[snyk-image]: https://snyk.io/test/github/magic/glyphs/badge.svg
[snyk-url]: https://snyk.io/test/github/magic/glyphs
