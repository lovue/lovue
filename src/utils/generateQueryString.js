/*
 * Generate a string for GET query
 *
 * @access public
 * @function generateQueryString
 * @param {object} obj
 * @returns {string}
 * */

export default obj => {
	let str = ''
	for (let k in obj) {
		str += `&${k}=${obj[k]}`
	}
	return str.substring(1)
}
