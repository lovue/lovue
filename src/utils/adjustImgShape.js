export default (container, ratio) => {
  const imgs = document.querySelectorAll(container + ' .img-wrap img')
  imgs.forEach(img => {
    img.onload = () => {
      img.parentNode.classList.add(img.naturalWidth / img.naturalHeight >= ratio ? 'img-w' : 'img-h')
    }
  })
}
