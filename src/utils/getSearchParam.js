/*
 * get the value of name in a URL search.
 *
 * @access public
 * @function getSearchParam
 * @param {string} name - A string we want to get the value of
 * @returns {string}
 * */

export default name => {
  const searchString = new URL(location).search
  if ('URLSearchParams' in window) {
    const params = new URLSearchParams(searchString)

    return params.get(name)
  }

  const params = {}
  searchString.substring(1).split('&').forEach(pair => {
    pair = pair.split('=')
    params[pair[0]] = pair[1]
  })
  return params[name]
}
