export default time => {
  const d = new Date()
  let diff = Math.floor(d.getTime() / 1000) - time

  let thisDate = new Date(time * 1000),
    thisYear = thisDate.getFullYear(),
    thisMonth = thisDate.getMonth() + 1,
    thisDay = thisDate.getDate(),
    thisHour = thisDate.getHours(),
    thisMinute = thisDate.getMinutes()

  thisHour = thisHour === 0 ? '00' : thisHour
  thisMinute = thisMinute === 0 ? '00' : thisMinute

  if (diff < 60) {
    return `${diff < 1 ? 1 : diff}秒前`
  }
  if (diff >= 60 && diff < 60 * 60) {
    return `${Math.floor(diff / 60)}分钟前`
  }
  if (thisDate.toDateString() === d.toDateString()) {
    return `今天 ${thisHour}:${thisMinute}`
  }
  if (thisYear === d.getFullYear()) {
    return `${thisMonth}月${thisDay}日 ${thisHour}:${thisMinute}`
  }
  return `${thisYear}-${thisMonth}-${thisDay} ${thisHour}:${thisMinute}`
}
