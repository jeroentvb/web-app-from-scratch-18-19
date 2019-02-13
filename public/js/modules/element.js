export class Element {
  constructor (name, cssClass) {
    const el = document.createElement(name)

    if (cssClass) el.setAttribute('class', cssClass)

    return el
  }

  static article (data) {
    const url = window.location.href.split('#')[0]

    if (!data) throw new Error('No data given')

    const article = document.createElement('article')
    const a = this.link(`${url}#detail/${data.id}`)
    const img = this.image(data.img_src)
    const p = this.paragraph(`Id: ${data.id}`)
    const p2 = this.paragraph(`Earth date of photo: ${data.earth_date}`)

    a.appendChild(img)

    article.appendChild(a)
    article.appendChild(p)
    article.appendChild(p2)

    return article
  }

  static heading (type, content = '') {
    const headings = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6'
    ]

    if (!content) console.warn('No content given')
    if (headings.indexOf(type) === -1) {
      type = 'h1'
      console.error('No existing heading type specified')
    }

    const heading = document.createElement(type)
    const text = document.createTextNode(content)

    heading.appendChild(text)

    return heading
  }

  static paragraph (content = '') {
    if (!content) console.warn('No content given')

    const p = document.createElement('p')
    const text = document.createTextNode(content)

    p.appendChild(text)

    return p
  }

  static link (href, content, cssClass) {
    if (!href) throw new Error('No href specified')

    const a = document.createElement('a')

    a.setAttribute('href', href)

    if (content) {
      const text = document.createTextNode(content)
      a.appendChild(text)
    }

    if (cssClass) a.setAttribute('class', cssClass)

    return a
  }

  static image (src, cssClass) {
    if (!src) throw new Error('No image source specified')

    const img = document.createElement('img')

    img.setAttribute('src', src)

    if (cssClass) img.setAttribute('class', cssClass)

    return img
  }

  static input (type, id) {
    if (!type || !id) throw new Error('No input type or id specified')

    const input = document.createElement('input')

    input.setAttribute('type', type)
    input.setAttribute('id', id)

    return input
  }

  static section (id) {
    const section = document.createElement('section')

    if (id) section.setAttribute('id', id)

    return section
  }

  static removeChildren (el) {
    while (el.firstChild) el.removeChild(el.firstChild)
  }

  static update (el, elements, title) {
    this.removeChildren(el)

    if (elements.length === undefined) {
      if (title) el.appendChild(title)
      el.appendChild(elements)
    } else {
      if (title) el.appendChild(title)
      elements.forEach(element => el.appendChild(element))
    }
  }

  static appendChildren (el, elements) {
    elements.forEach(element => el.appendChild(element))
  }
}
