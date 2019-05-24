import fillDateNumber from './fillDateNumber'

export default (date, type) => {
  let year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds()

  switch (type) {
    case 'YYYY-M-D':
    case 1:
      return `${year}-${month}-${day}`
    case 'YYYYMMDD':
    case 2:
      return Number(`${year}${fillDateNumber(month)}${fillDateNumber(day)}`)
    case 3:
      return `${year}年${month}月${day}日 ${hour}:${minute}:${second}`
    case 'YYYY-MM-DD':
    case 4:
      return `${year}-${fillDateNumber(month)}-${fillDateNumber(day)}`
    case 'YYYY-M-D h:m:s':
      return `${year}-${month}-${day} ${hour % 12}:${minute}:${second}`
    case 'YYYY-M-D H:m:s':
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    case 'YYYY-MM-DD HH:mm:ss':
      return `${year}-${fillDateNumber(month)}-${fillDateNumber(day)} ${fillDateNumber(hour)}:${fillDateNumber(minute)}:${fillDateNumber(second)}`
    case 'YYYY-MM-DD hh:mm:ss':
      return `${year}-${fillDateNumber(month)}-${fillDateNumber(day)} ${fillDateNumber(hour % 12)}:${fillDateNumber(minute)}:${fillDateNumber(second)}`
    default:
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }
}
