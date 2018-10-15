export default (arr, column, dir = 1) => {
  arr.sort((a, b) => {
    if (typeof a[column] === 'number') return dir > 0 ? (a[column] - b[column]) : (b[column] - a[column])

    return new Intl.Collator(/*'zh-Hans-CN', */{
      sensitivity: 'base'
    }).compare(dir > 0 ? a[column] : b[column], dir > 0 ? b[column] : a[column])
  })
  return arr
}
