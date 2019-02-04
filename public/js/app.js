/* global fetch */
'use strict'

const container = document.getElementsById('content')
const apiKey = 'DEMO_KEY'
const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`

function init () {
  getData(url)
}

function getData (url) {
  fetch(url)
    .then(res => res.json())
    .then(data => render(data.photos))
    .catch(err => console.error(err))
}

function render (data) {
  // main.textContent = JSON.stringify(data, null, 4)
  console.log(data)

  let content = ''

  data.forEach(item => {
    console.log(item)
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
