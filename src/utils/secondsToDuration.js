import fillDateNumber from './fillDateNumber'

export default (num, type = 1) => {
  if (num <= 0) return ''

  let days = 0, hours = 0, minutes = 0, seconds = 0

  minutes = Math.trunc(num / 60)
  if (minutes === 0) {
    seconds = fillDateNumber(num)
    return [`00:00:${seconds}`, `${seconds}s`][type - 1]
  }

  seconds = fillDateNumber(num % 60)
  hours = Math.trunc(minutes / 60)
  if (hours === 0) {
    minutes = fillDateNumber(minutes)
    return [`00:${minutes}:${seconds}`, `${minutes}m${seconds}s`][type - 1]
  }

  minutes = fillDateNumber(minutes % 60)
  days = Math.trunc(hours / 24)
  if (days === 0) {
    hours = fillDateNumber(hours)
    return [`${hours}:${minutes}:${seconds}`, `${hours}h${minutes}m${seconds}s`][type - 1]
  }

  hours = fillDateNumber(hours % 24)
  return [`${days}天 ${hours}:${minutes}:${seconds}`, `${days}day${hours}h${minutes}m${seconds}s`][type - 1]
}