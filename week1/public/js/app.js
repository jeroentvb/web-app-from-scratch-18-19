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
    const roverContainer = document.getElementById(`rover${i}`)
    let content = `<h2>Rover: ${rover}</h2>`

    if (data[i].error) {
      content += '<p>An error occurred while getting images for this rover..</p>'
      roverContainer.innerHTML = content
      return
    }

    if (data[i].length < 1) {
      content += `<p>There were no pictures taken by this rover for this sol.</p>`
      roverContainer.innerHTML = content
      return
    }

    data[i].forEach(item => {
      content += articleTemplate(item)
    })

    roverContainer.innerHTML = content
  })
}

function articleTemplate (data) {
  return `
  <article>
    <a href="${data.img_src}" target="_blank"><img src="${data.img_src}" alt="${data.img_src}"></a>
    <p>Id: ${data.id}</p>
    <p>Earth date of photo: ${data.earth_date}</p>
  </article>`
}

init()
