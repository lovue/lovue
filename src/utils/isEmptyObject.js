import getype from './getype'

export default obj => {
  if (getype(obj) !== 'object') {
    throw new TypeError(`${obj} 不是对象字面量`)
  }

  return !Object.keys(obj).length
}
