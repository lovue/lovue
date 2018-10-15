export default () => {
  let userAgent = navigator.userAgent.toLowerCase()
  return userAgent.match(/micromessenger/)
}
