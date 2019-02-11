import { createElement } from './create-element.js'

export function home (rovers) {
  const main = document.createElement('main')
  const h1 = createElement.heading('h1', 'Mars Rover data & images')
  const h3 = createElement.heading('h3', 'Select sol')
  const div = document.createElement('div')
  div.setAttribute('class', 'select-sol')

  const p = createElement.paragraph('Select a number')
  const form = document.createElement('form')
  const input = {
    number: createElement.input('number', 'sol-select'),
    submit: createElement.input('submit', 'submit-sol')
  }
  input.number.setAttribute('min', '1')
  input.number.setAttribute('value', '1')
  input.submit.setAttribute('class', 'button')
  const noScript = createElement.noScript()

  main.appendChild(h1)
  main.appendChild(h3)
  main.appendChild(div)
  div.appendChild(p)
  div.appendChild(form)
  form.appendChild(input.number)
  form.appendChild(input.submit)

  rovers.forEach((rover, i) => {
    const section = createElement.section(`rover${i}`)
    main.appendChild(section)
  })

  main.appendChild(noScript)

  document.body.appendChild(main)
}
