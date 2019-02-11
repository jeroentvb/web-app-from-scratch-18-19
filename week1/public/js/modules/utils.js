export function removeChildren (el) {
  while (el.firstChild) el.removeChild(el.firstChild)
}

export function updateElement (el, elements, title) {
  removeChildren(el)

  if (elements.length < 1) {
    if (title) el.appendChild(title)
    el.appendChild(elements)
  } else {
    el.appendChild(title)
    elements.forEach(element => el.appendChild(element))
  }
}
