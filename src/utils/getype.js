/*
 * getype returns a string which represents the type of value.
 * undefined, null, number, string, boolean, array, function, date, error, regexp, object
 * ES2015: symbol, json, math, module, arraybuffer, dataview, map, promise, set, unit8array, weakmap, weakset, generator, generatorfunction
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
