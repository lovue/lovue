/*
 * 将数字按国际化格式显示
 *
 * @access public
 * @function intlNumber
 * @param {number} value - 待处理数字
 * @returns {string}
 * */

export default (value) => {
	if (typeof Intl === 'undefined') return value
	if (value === undefined) return 0

	return new Intl.NumberFormat(undefined, {maximumFractionDigits: 6}).format(value)
}
