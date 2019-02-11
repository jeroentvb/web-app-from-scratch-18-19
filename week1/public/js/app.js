'use strict'

import { getData } from './modules/get-data.js'
import { createElement } from './modules/create-element.js'
import { updateElement } from './modules/utils.js'
import { home } from './modules/templates.js'

const rovers = [
  'curiosity',
  'opportunity',
  'spirit'
]

function init () {
  home(rovers)

  const sol = {
    select: document.getElementById('sol-select'),
    submit: document.getElementById('submit-sol')
  }

  getData(1, rovers)
    .then(data => render(data, rovers))
    .catch(err => console.error(err))

  sol.submit.addEventListener('click', e => {
    e.preventDefault()
    getData(sol.select.value || 1, rovers)
      .then(data => render(data))
      .catch(err => console.error(err))
  })
}

function render (data) {
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

init()
