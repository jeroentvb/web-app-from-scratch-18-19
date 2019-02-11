/* global fetch */
import { apiKey } from './api-key.js'

export function getData (sol, rovers) {
  return new Promise((resolve, reject) => {
    rovers.forEach((rover, i) => {
      let el = document.getElementById(`rover${i}`)
      el.textContent = i === 0 ? `Loading...` : ''
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
