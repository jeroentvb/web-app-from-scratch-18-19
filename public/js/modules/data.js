/* global fetch, localStorage */

import { apiKey } from './api-key.js'
import { Element } from './element.js'

export class Data {
  static get (rovers, sol) {
    const db = JSON.parse(localStorage.getItem('data'))
    if (sol) localStorage.setItem('sol', sol.toString())

    if (!sol && db) {
      return new Promise((resolve, reject) => {
        resolve(db)
      })
    }

    if (!sol && !db) {
      sol = 1
      localStorage.setItem('sol', sol.toString())
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
        .then(res => this.parse(res))
        .then(data => {
          this.store(data)
          resolve(data)
        })
        .catch(err => reject(err))
    })
  }

  static parse (data) {
    return data.map(x => {
      if (x.photos) {
        x.photos.forEach(photo => {
          photo.img_src = photo.img_src.replace('http', 'https')
        })
        return x.photos
      }
      if (x.error) return x.error
      if (x.errors) return x.errors
    })
  }

  static store (data) {
    localStorage.setItem('data', JSON.stringify(data))
  }
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
