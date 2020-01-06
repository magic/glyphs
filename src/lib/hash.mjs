import crypto from 'crypto'

export const hash = str =>
  crypto
    .createHash('sha256')
    .update(str, 'utf8')
    .digest('hex')
