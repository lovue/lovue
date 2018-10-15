/*
 * 将表格数据转换为csv格式的字符串
 *
 * @access public
 * @param {object} data - 表头：data.headers, head: {title: 'title', prop: 'prop'}；数据：data.rows
 * @returns {string}
 * */

export default data => {
  if (!data.headers || !data.rows) {
    throw new ReferenceError('数据源格式不正确')
  }

  let str = '', body = []

  data.headers.forEach(head => {
    body.push(head.title)
  })
  str += body.join(',') + '\n'
  body = []

  data.rows.forEach(row => {
    data.headers.forEach(head => {
      let x = '' + row[head.prop]
      body.push(x.includes(',') ? `\"${x}\"` : x)
    })
    str += body.join(',') + '\n'
    body = []
  })
  return str
}
