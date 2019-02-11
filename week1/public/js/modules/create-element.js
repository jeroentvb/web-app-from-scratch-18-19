export const createElement = {
  article,
  heading,
  paragraph,
  link,
  image
}

function article (data) {
  if (!data) throw new Error('You didn\'t pass any data!')

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

function heading (type, content) {
  if (!content) throw new Error('You didn\'t pass any content!')
  if (headings.indexOf(type) === -1) {
    type = 'h1'
    console.error('You haven\'t specified an existing heading type!')
  }

  const heading = document.createElement(type)
  const text = document.createTextNode(content)

  heading.appendChild(text)

  return heading
}

function paragraph (content) {
  if (!content) throw new Error('You didn\'t pass any content!')

  const p = document.createElement('p')
  const text = document.createTextNode(content)

  p.appendChild(text)

  return p
}

function link (href) {
  if (!href) throw new Error('You didn\'t pass a href!')

  const a = document.createElement('a')

  a.setAttribute('href', href)

  return a
}

function image (src) {
  if (!src) throw new Error('You didn\'t pass an image source!')

  const img = document.createElement('img')

  img.setAttribute('src', src)

  return img
}
