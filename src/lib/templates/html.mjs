export default (glyphs, options) => {
  const { name, cssPrefix, htmlCssFile, cssFileUrl } = options

  const glyphString = glyphs
    .map(glyph =>
      `
<section>
  <header>${cssPrefix}-${glyph.name}</header>
  <div><i class="${cssPrefix}-${glyph.name}"></i></div>
</section>
  `.trim(),
    )
    .join('\n')

  return `
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>IconFonts Preview Demo -- ${name}</title>
    <meta name="description" content="An Icon Font Generated By webpack-iconfont-plugin-nodejs">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${cssFileUrl}">
    <style>
        .info {
            padding: 0 20px;
        }

        .flex-tb {
            display: flex;
            flex-flow: wrap;
            margin-bottom: 150px;
        }

        .flex-tb > section {
            display: flex;
            flex-flow: column;
            flex: 0 0 240px;
            align-items: center;
            margin-bottom: 50px;
        }

        .flex-tb > section > header {
            height: 30px;
            outline: none;
        }

        .flex-tb i {
            font-size: 40px;
            line-height: 1;
            display: block;
        }

        .flex-tb div:hover {
            position: absolute;
            background: #fff;
            border: 1px solid #ddd;
        }

        .flex-tb div:hover > i {
            font-size: 200px;
        }
        body{
            background: #ddd;
        }
    </style>
<body>
    <div class="info">
        <h3>${name} (${glyphs.length})</h3>
        <div>Class name prefix: ${cssPrefix}-</div>
    </div>
    <hr/>
    <div class="flex-tb">
      ${glyphString}
    </div>
</body>
</html>
`.trim()
}
