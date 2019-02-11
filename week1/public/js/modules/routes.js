/* global routie */

import { home } from './templates.js'

const rovers = [
  'curiosity',
  'opportunity',
  'spirit'
]

routie({
  'home': () => {
    home(rovers)
  },
  'detail': () => {

  }
})
