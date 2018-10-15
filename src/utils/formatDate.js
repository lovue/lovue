import fillDateNumber from './fillDateNumber'

export default (date, type) => {
  let year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hour = fillDateNumber(date.getHours()),
    minute = fillDateNumber(date.getMinutes()),
    second = fillDateNumber(date.getSeconds())

  if (type === 1) {
    return `${year}-${month}-${day}`
  }
  if (type === 2) {
    month = fillDateNumber(month)
    day = fillDateNumber(day)
    return Number(`${year}${month}${day}`)
  }
  if (type === 3) {
    return `${year}年${month}月${day}日 ${hour}:${minute}:${second}`
  }

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}
