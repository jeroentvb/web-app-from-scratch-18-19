/* global fetch */
import { apiKey } from './api-key.js'

export function getData (sol, rovers) {
  return new Promise((resolve, reject) => {
    rovers.forEach((rover, i) => {
      let el = document.getElementById(`rover${i}`)
      if (i === 0) {
        el.innerHTML = `<p>Loading...</p>`
        return
      }
      el.innerHTML = ''
    })

    Promise.all([
      fetchData(url(rovers[0], sol)),
      fetchData(url(rovers[1], sol)),
      fetchData(url(rovers[2], sol))
    ])
      .then(res => res.map(x => x.photos))
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
}

function url (rover, sol) {
  return `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${apiKey()}`
}

function fetchData (url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => resolve(res.json()))
      .catch(err => reject(err))
  })
}