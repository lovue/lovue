import isWeixin from './isWeixin'

export default () => {
  if (isWeixin()) {
    location.href = location.href + '?v=' + 10000 * Math.random()
  } else {
    location.reload()
  }
}
