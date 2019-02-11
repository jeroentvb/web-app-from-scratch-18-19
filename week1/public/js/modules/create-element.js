export const createElement = {
  article,
  heading,
  paragraph,
  link,
  image,
  input,
  noScript,
  section
}

function article (data) {
  if (!data) throw new Error('No data given')

  const article = document.createElement('article')
  const a = link(data.img_src)
  const img = image(data.img_src)
  const p = paragraph(`Id: ${data.id}`)
  const p2 = paragraph(`Earth date of photo: ${data.earth_date}`)

  a.appendChild(img)

  article.appendChild(a)
  article.appendChild(p)
  article.appendChild(p2)

  return article
}

const headings = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6'
]

function heading (type, content = '') {
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

function paragraph (content = '') {
  if (!content) console.warn('No content given')

  const p = document.createElement('p')
  const text = document.createTextNode(content)

  p.appendChild(text)

  return p
}

function link (href) {
  if (!href) throw new Error('No href specified')

  const a = document.createElement('a')

  a.setAttribute('href', href)

  return a
}

function image (src) {
  if (!src) throw new Error('No image source specified')

  const img = document.createElement('img')

  img.setAttribute('src', src)

  return img
}

function input (type, id) {
  if (!type || !id) throw new Error('No input type or id specified')

  const input = document.createElement('input')

  input.setAttribute('type', type)
  input.setAttribute('id', id)

  return input
}

function noScript () {
  const noScript = document.createElement('noscript')
  const text = document.createTextNode('This page won\'t work since JS isn\'t enabled.')

  noScript.appendChild(text)

  return noScript
}

function section (id) {
  const section = document.createElement('section')

  if (id) section.setAttribute('id', id)

  return section
}
