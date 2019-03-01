/* global routie, localStorage */

import { Render } from './modules/render.js'
import { Data } from './modules/data.js'

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

async function home () {
  Render.home(rovers)
  const sol = {
    select: document.getElementById('sol-select'),
    submit: document.getElementById('submit-sol'),
    number: localStorage.getItem('sol')
  }

  try {
    const data = await Data.get(rovers)

    if (data[0].code || typeof data[0] === 'string') return Render.error(data)

    Render.data(data, rovers)
  } catch (err) {
    console.error(err)
    Render.error(err)
  }

  sol.submit.addEventListener('click', async e => {
    e.preventDefault()

    try {
      const data = await Data.get(rovers, sol.select.value || 1)

      Render.data(data, rovers)
      if (!sol.select.value) sol.select.value = 1
    } catch (err) {
      console.error(err)
      Render.error(err)
    }
  })

  if (sol.number) sol.select.value = sol.number
}

async function detail (id) {
  let foundPicture = false

  try {
    const data = await Data.get(rovers)

    data.forEach((rover, i) => {
      rover.forEach(picture => {
        if (picture.id === parseInt(id)) {
          foundPicture = true
          Render.detail(picture)
          window.scrollTo(0, 0)
        }
      })
    })

    if (!foundPicture) Render.error('A photo with this id was not found..')
  } catch (err) {
    console.error(err)
  }
}
