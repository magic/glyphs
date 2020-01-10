import is from '@magic/types'

const argLength = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 }

const commandRegex = /([astvzqmhlc])([^astvzqmhlc]*)/gi

const numberRegex = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi

const parseValues = (args, ratio) => {
  const numbers = args.match(numberRegex)
  return numbers ? numbers.map(Number).map(num => num * ratio) : []
}

export const parsePathValue = (path, ratio) => {
  const data = []
  path.replace(commandRegex, (_, command, args) => {
    const type = command.toLowerCase()
    args = parseValues(args, ratio)

    // overloaded moveTo
    if (type === 'm' && args.length > 2) {
      data.push([command].concat(args.splice(0, 2)))
      type = 'l'
      command = command === 'm' ? 'l' : 'L'
    }

    while (true) {
      if (args.length === argLength[type]) {
        args.unshift(command)
        data.push(args)
        return
      }

      if (args.length < argLength[type]) {
        throw new Error('malformed path data')
      }

      data.push([command].concat(args.splice(0, argLength[type])))
    }
  })

  return data
}

export const parsePathAttr = ({ height, ratio }) => attr => {
  if (attr.name === 'd') {
    attr.value = parsePathValue(attr.value, ratio)
      .map(v => {
        const [cmd, ...args] = v
        const argString = args
          .map((arg, i) => {
            if (!is.integer(arg)) {
              let fixer = 1
              const absArg = Math.abs(arg)
              if (height >= 100) {
                arg = Math.round(arg)
              } else {
		arg = arg.toFixed(1)
	      }
            }

            if (arg >= 0 && i > 0) {
              return ` ${arg}`
            }

            return arg
          })
          .join('')

        return `${cmd}${argString}`
      })
      .join(' ')
  }

  return attr
}
