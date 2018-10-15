export default () => {
  let userAgent = navigator.userAgent.toLowerCase()
  return userAgent.match(/iphone os/) && userAgent.match(/micromessenger/)
}
