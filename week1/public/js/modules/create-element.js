export const createElement = {
  article,
  heading,
  paragraph,
  link,
  image
}

function article (data) {
  let article = document.createElement('article')
  let a = link(data.img_src)
  let img = image(data.img_src)
  let p = paragraph(`Id: ${data.id}`)
  let p2 = paragraph(`Earth date of photo: ${data.earth_date}`)

  a.appendChild(img)

  article.appendChild(a)
  article.appendChild(p)
  article.appendChild(p2)

  return article
}

function heading (content) {
  let h1 = document.createElement('h1')
  let text = document.createTextNode(content)
  h1.appendChild(text)
  return h1
}

function paragraph (content) {
  let p = document.createElement('p')
  let text = document.createTextNode(content)
  p.appendChild(text)
  return p
}

function link (href) {
  let a = document.createElement('a')
  a.setAttribute('href', href)
  return a
}

function image (src) {
  let img = document.createElement('img')
  img.setAttribute('src', src)
  return img
}
