export function removeChildren (el) {
  while (el.firstChild) el.removeChild(el.firstChild)
}

export function updateElement (el, elements, title) {
  removeChildren(el)

  if (elements.length === undefined) {
    if (title) el.appendChild(title)
    el.appendChild(elements)
  } else {
    if (title) el.appendChild(title)
    elements.forEach(element => el.appendChild(element))
  }
}
