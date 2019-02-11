'use strict'

import { getData } from './modules/get-data.js'

const rovers = [
  'curiosity',
  'opportunity',
  'spirit'
]

function init () {
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
    let content = `<h2>Rover: ${rover}</h2>`
    if (data[i].length < 1) {
      content += `<p>There were no pictures taken by this rover for this sol.</p>`
      document.getElementById(`rover${i}`).innerHTML = content
      return
    }

    data[i].forEach(item => {
      content += `<article>
      <a href="${item.img_src}" target="_blank"><img src="${item.img_src}" alt="${item.img_src}"></a>
      <p>Id: ${item.id}</p>
      <p>Earth date of photo: ${item.earth_date}</p>
      </article>`
    })

    document.getElementById(`rover${i}`).innerHTML = content
  })
}

init()
