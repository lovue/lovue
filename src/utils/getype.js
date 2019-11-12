/*
 * getype returns a string which represents the type of value.
 * undefined, null, number, string, boolean, symbol, array, function, date, error, regexp, object
 *
 * @access public
 * @function getype
 * @param {*} value - A thing we want to check the type of
 * @returns {string}
 * */

export default value => {
  let type = Object.prototype.toString.call(value)
  return type.replace(/\[object\s|]/g, '').toLowerCase()
}
