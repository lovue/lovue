export default () => {
  pageYOffset > 500 && scroll(0, 500)
  let y = -pageYOffset / 15,
    t = setInterval(() => {
      pageYOffset !== 0 ? scrollBy(0, y) : clearInterval(t)
    }, 15)
}
