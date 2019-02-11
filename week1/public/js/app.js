'use strict'

import { createElement } from './modules/create-element.js'
import { updateElement } from './modules/utils.js'

const rovers = [
  'curiosity',
  'opportunity',
  'spirit'
]

export function render (data) {
  rovers.forEach((rover, i) => {
    const roverContainer = document.getElementById(`rover${i}`)
    const title = createElement.heading('h2', `Rover ${rover}`)
    let articles = []

    if (data[i].error) {
      updateElement(roverContainer, createElement.paragraph(data[i].error))
      return
    }

    if (data[i].length < 1) {
      updateElement(roverContainer, createElement.paragraph('There were no pictures taken by this rover for this sol.'))
      return
    }

    data[i].forEach(item => {
      articles.push(createElement.article(item))
    })

    updateElement(roverContainer, articles, title)
  })
}
