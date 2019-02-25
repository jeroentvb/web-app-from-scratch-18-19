/* global fetch, localStorage */

import { apiKey } from './api-key.js'
import { Element } from './element.js'

export function getData (rovers, sol) {
  const db = JSON.parse(localStorage.getItem('data'))
  localStorage.setItem('sol', sol.toString())

  if (!sol && db) {
    return new Promise((resolve, reject) => {
      resolve(db)
    })
  }

  if (!sol) {
    return new Promise((resolve, reject) => {
      reject(new Error('No sol specified'))
    })
  }

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
      .then(res => res.map(x => {
        if (x.photos) return x.photos
        if (x.error) return x.error
        if (x.errors) return x.errors
      }))
      .then(data => {
        if (data[0].code || typeof data[0] === 'string') return reject(data)

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
