export default function (el) {
  const elStyle = getComputedStyle(el)
  const elDisplay = elStyle.display
  const elPosition = elStyle.position
  const elVisibility = elStyle.visibility

  if (elDisplay !== 'none') return el.offsetHeight

  el.style.position = 'absolute'
  el.style.visibility = 'hidden'
  el.style.display = 'block'

  const elHeight = el.offsetHeight

  el.style.display = elDisplay
  el.style.position = elPosition
  el.style.visibility = elVisibility

  return elHeight
}
