export default () => {
  if (document.documentElement.scrollTop) {
    return document.documentElement.scrollTop
  }
  return document.body.scrollTop
}
