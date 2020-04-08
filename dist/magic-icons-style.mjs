export const style = {
  '@font-face': {
    'fontFamily': 'magic-icons',
    'fontDir': '/',
    'fontStyle': 'normal',
    'fontWeight': 'normal'
  },
  '[class^="mi"], [class*="mi"]': {
    'fontFamily': 'magic-icons',
    '-webkitFontSmoothing': 'antialiased',
    '-mozOsxFontSmoothing': 'grayscale',
    'fontStyle': 'normal'
  },
  '.mi-calendar::before': {
    'content': '"\ea01"'
  },
  '.mi-camera::before': {
    'content': '"\ea02"'
  },
  '.mi-chat::before': {
    'content': '"\ea03"'
  },
  '.mi-check::before': {
    'content': '"\ea04"'
  },
  '.mi-success::before': {
    'content': '"\ea05"'
  },
  '.mi-warning::before': {
    'content': '"\ea06"'
  }
}