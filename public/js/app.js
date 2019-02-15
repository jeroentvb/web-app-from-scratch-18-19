/* global routie, localStorage */

import { Render } from './modules/render.js'
import { getData } from './modules/get-data.js'

(() => {
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
    const db = JSON.parse(localStorage.getItem('data'))

    sol.submit.addEventListener('click', e => {
      e.preventDefault()
      getData(sol.select.value || 1, rovers)
        .then(data => Render.data(data, rovers))
        .catch(err => {
          console.error(err)
          Render.error(err)
        })
    })

    if (sol.number) sol.select.value = sol.number

    if (db) {
      Render.data(db, rovers)
    } else {
      getData(1, rovers)
        .then(data => Render.data(data, rovers))
        .catch(err => {
          console.error(err)
          Render.error(err)
        })
    }
  }

  function detail (id) {
    const db = JSON.parse(localStorage.getItem('data'))

    db.forEach((rover, i) => {
      rover.forEach(picture => {
        if (picture.id === parseInt(id)) {
          Render.detail(picture)
        }
      })
    })
  }
})()
