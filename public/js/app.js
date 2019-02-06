'use strict'

import { getData } from './modules/get-data.js'

function init () {
  const rovers = [
    'curiosity',
    'opportunity',
    'spirit'
  ]

  let sol = {
    select: document.getElementById('sol-select'),
    submit: document.getElementById('submit-sol')
  }

  sol.submit.addEventListener('click', e => {
    e.preventDefault()
    if (sol.select.value === '') {
      sol.select.value = 1
      getData(1, rovers)
        .then(data => render(data, rovers))
        .catch(err => console.error(err))
    }
    getData(sol.select.value, rovers)
      .then(data => render(data, rovers))
      .catch(err => console.error(err))
  })

  getData(1, rovers)
    .then(data => render(data, rovers))
    .catch(err => console.error(err))
}

function render (data, rovers) {
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
