import { Element } from './element.js'

export class Render {
  static data (data, rovers) {
    rovers.forEach((rover, i) => {
      const roverContainer = document.getElementById(`rover${i}`)
      const title = Element.heading('h2', `Rover ${rover}`)
      let articles = []

      if (data[i].error) {
        Element.update(roverContainer, Element.paragraph(data[i].error))
        return
      }

      if (data[i].length < 1) {
        Element.update(roverContainer, Element.paragraph('There were no pictures taken by this rover for this sol.'))
        return
      }

      data[i].forEach(item => {
        articles.push(Element.article(item))
      })

      Element.update(roverContainer, articles, title)
    })
  }

  static home (rovers) {
    const main = new Element('main')
    const h1 = Element.heading('h1', 'Mars Rover data & images')
    const h3 = Element.heading('h3', 'Select sol')
    const div = new Element('div')
    div.setAttribute('class', 'select-sol')

    const p = Element.paragraph('Select a number')
    const form = new Element('form')
    const input = {
      number: Element.input('number', 'sol-select'),
      submit: Element.input('submit', 'submit-sol')
    }
    input.number.setAttribute('min', '1')
    input.number.setAttribute('value', '1')
    input.submit.setAttribute('class', 'button')
    const noScript = Element.noScript()

    const elements = [
      h1,
      h3,
      div,
      p,
      form,
      input.number,
      input.submit
    ]

    Element.appendChildren(main, elements)

    rovers.forEach((rover, i) => {
      const section = Element.section(`rover${i}`)
      main.appendChild(section)
    })

    main.appendChild(noScript)

    Element.update(document.body, main)
  }

  static detail (data) {
    const main = new Element('main')
    const h1 = Element.heading('h1', 'Detail page')
    const a = Element.link('/week1/#home', 'Back', 'button')

    const a2 = Element.link(data.img_src)
    const img = Element.image(data.img_src, 'detail-image')
    a2.appendChild(img)

    const h2 = Element.heading('h2', `Photo id: ${data.id}`)
    const p = Element.paragraph(`Earth date of photo: ${data.earth_date}`)
    const p2 = Element.paragraph(`Mars date of photo: sol ${data.sol}`)
    const p3 = Element.paragraph(`Camera used: ${data.camera.full_name} (${data.camera.name})`)
    const h3 = Element.heading('h3', 'Rover info')
    const p4 = Element.paragraph(`Rover name: ${data.rover.name}`)
    const p5 = Element.paragraph(`Launch date: ${data.rover.launch_date}`)
    const p6 = Element.paragraph(`Landing date: ${data.rover.landing_date}`)
    const p7 = Element.paragraph(`Amount of photos taken: ${data.rover.total_photos}`)

    const elements = [
      h1,
      a,
      a2,
      h2,
      p,
      p2,
      p3,
      h3,
      p4,
      p5,
      p6,
      p7
    ]

    Element.appendChildren(main, elements)

    Element.update(document.body, main)
  }
}
