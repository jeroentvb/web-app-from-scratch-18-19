/* global routie, localStorage */

import { Render } from './modules/render.js'
import { getData } from './modules/get-data.js'

const rovers = [
  'curiosity',
  'opportunity',
  'spirit'
]

routie({
  'home': () => home(),
  'detail/:id': id => detail(id),
  '*': () => home()
})

function home () {
  Render.home(rovers)
  const sol = {
    select: document.getElementById('sol-select'),
    submit: document.getElementById('submit-sol'),
    number: localStorage.getItem('sol')
  }

  getData(rovers)
    .then(data => Render.data(data, rovers))
    .catch(err => {
      console.error(err)
      Render.error(err)
    })

  sol.submit.addEventListener('click', e => {
    e.preventDefault()
    getData(rovers, sol.select.value || 1)
      .then(data => {
        Render.data(data, rovers)
        if (!sol.select.value) sol.select.value = 1
      })
      .catch(err => {
        console.error(err)
        Render.error(err)
      })
  })

  if (sol.number) sol.select.value = sol.number
}

function detail (id) {
  let foundPicture = false

  getData(rovers)
    .then(data => {
      data.forEach((rover, i) => {
        rover.forEach(picture => {
          if (picture.id === parseInt(id)) {
            foundPicture = true
            Render.detail(picture)
          }
        })
      })
    })
    .then(() => {
      if (!foundPicture) Render.error('A photo with this id was not found..')
    })
    .catch(err => console.error(err))
}
