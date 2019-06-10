export default (ua) => {
  const target = ua || navigator.userAgent
  if (/Mobi/i.test(target)) return true
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(target)
}
