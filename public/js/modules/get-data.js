/* global fetch, localStorage */

import { apiKey } from './api-key.js'
import { Element } from './element.js'

export function getData (sol, rovers) {
  localStorage.setItem('sol', sol.toString())

  return new Promise((resolve, reject) => {
    rovers.forEach((rover, i) => {
      const el = document.getElementById(`rover${i}`)

      Element.removeChildren(el)

      if (i === 0) el.appendChild(Element.heading('h1', 'Loading...'))
    })

    Promise.all([
      fetchData(url(rovers[0], sol)),
      fetchData(url(rovers[1], sol)),
      fetchData(url(rovers[2], sol))
    ])
      .then(res => res.map(x => x.photos ? x.photos : { error: x.errors }))
      .then(data => {
        localStorage.setItem('data', JSON.stringify(data))
        resolve(data)
      })
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
