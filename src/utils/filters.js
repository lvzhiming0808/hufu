export const timeFilter = value => {
  var length = Math.floor(value)
  var minute = Math.floor(value / 60)
  minute = ('' + minute).padStart(2, '0')
  var second = length % 60
  second = ('' + second).padStart(2, '0')
  return minute + ':' + second
}
