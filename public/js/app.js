/* global fetch */
'use strict'

const apiKey = 'DEMO_KEY'

function init () {
  let selectSol = document.getElementById('sol-select')
  let submitSol = document.getElementById('submit-sol')
  submitSol.addEventListener('click', () => {
    console.log(selectSol.value)
    getData(selectSol.value)
  })
  getData(1)
}

function getData (sol) {
  fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => render(data.photos))
    .catch(err => console.error(err))
}

function render (data) {
  const container = document.getElementById('content')

  if (data.length < 1) {
    container.innerHTML = `<article>
    <p>There were no pictures taken on this day</p>
    </article>`
    return
  }

  let content = ''

  data.forEach(item => {
    content += `<article>
    <a href="${item.img_src}" target="_blank"><img src="${item.img_src}" alt="${item.img_src}"></a>
    <p>Id: ${item.id}</p>
    <p>Mars date of photo (sol): ${item.sol}</p>
    <p>Earth date of photo: ${item.earth_date}</p>
    </article>`
  })

  container.innerHTML = content
}

init()
