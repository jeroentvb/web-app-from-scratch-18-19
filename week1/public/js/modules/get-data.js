/* global fetch */
import { apiKey } from './api-key.js'
import { createElement } from './create-element.js'
import { removeChildren } from './utils.js'

export function getData (sol, rovers) {
  return new Promise((resolve, reject) => {
    rovers.forEach((rover, i) => {
      let el = document.getElementById(`rover${i}`)

      removeChildren(el)

      if (i === 0) el.appendChild(createElement.heading('Loading...'))
    })

    Promise.all([
      fetchData(url(rovers[0], sol)),
      fetchData(url(rovers[1], sol)),
      fetchData(url(rovers[2], sol))
    ])
      .then(res => res.map(x => x.photos ? x.photos : { error: x.errors }))
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
}

function url (rover, sol) {
  const baseUrl = `https://api.nasa.gov/`
  const path = `mars-photos/api/v1/rovers/${rover}/photos`
  const attributes = `?sol=${sol}&api_key=${apiKey()}`
  const url = baseUrl + path + attributes

  return url
}

function fetchData (url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => resolve(res.json()))
      .catch(err => reject(err))
  })
}
