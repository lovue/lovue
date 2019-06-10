import {
  getNumberArray,
  getype,
  fillDateNumber,
  formatDate,
  generateQueryString,
  isEmptyObject,
  intlNumber,
  isMobile,
  isWeixin,
  isWeixinInIphone,
  secondsToDuration,
  whichBrowser
} from '../../../src/utils'

test('getype', () => {
  expect(getype(null)).toBe('null')
  expect(getype(undefined)).toBe('undefined')
  expect(getype(1)).toBe('number')
  expect(getype(NaN)).toBe('number')
  expect(getype('hello')).toBe('string')
  expect(getype(false)).toBe('boolean')
  expect(getype(true)).toBe('boolean')
  expect(getype(function () {})).toBe('function')
  expect(getype(/^123.+\d{4}/)).toBe('regexp')
  expect(getype({})).toBe('object')
  expect(getype([])).toBe('array')
  expect(getype(new Date())).toBe('date')
  expect(getype(new Error('error'))).toBe('error')
})

test('fillDateNumber', () => {
  expect(fillDateNumber(0)).toBe('00')
  expect(fillDateNumber(2)).toBe('02')
  expect(fillDateNumber(12)).toBe('12')
  expect(fillDateNumber(300)).toBe('300')
})

test('formatDate', () => {
  const date = new Date(2019, 5, 6, 2, 34, 56)
  const date2 = new Date('2019-06-06T15:34:56')

  expect(formatDate(date)).toBe('2019-06-06')
  expect(formatDate(date, 1)).toBe('2019-6-6')
  expect(formatDate(date, 'YYYY-M-D')).toBe('2019-6-6')
  expect(formatDate(date, 'YYYYMMDD')).toBe(20190606)
  expect(formatDate(date, 2)).toBe(20190606)
  expect(formatDate(date, 3)).toBe('2019年6月6日 2:34:56')
  expect(formatDate(date, 'YYYY-MM-DD')).toBe('2019-06-06')
  expect(formatDate(date, 4)).toBe('2019-06-06')
  expect(formatDate(date, 'YYYY-M-D h:m:s')).toBe('2019-6-6 2:34:56')
  expect(formatDate(date2, 'YYYY-M-D H:m:s')).toBe('2019-6-6 15:34:56')
  expect(formatDate(date2, 'YYYY-M-D h:m:s')).toBe('2019-6-6 3:34:56')
  expect(formatDate(date, 'YYYY-MM-DD HH:mm:ss')).toBe('2019-06-06 02:34:56')
  expect(formatDate(date2, 'YYYY-MM-DD HH:mm:ss')).toBe('2019-06-06 15:34:56')
  expect(formatDate(date2, 'YYYY-MM-DD hh:mm:ss')).toBe('2019-06-06 03:34:56')
})

test('generateQueryString', () => {
  const obj = {
    a: 1,
    b: 'hello',
    c: '中文'
  }

  expect(generateQueryString(obj)).toBe('a=1&b=hello&c=中文')
})

test('isEmptyObject', () => {
  expect(isEmptyObject({})).toBeTruthy()
  expect(isEmptyObject({ a: 1 })).toBeFalsy()
  expect(() => {
    isEmptyObject(100)
  }).toThrow()
})

test('intlNumber', () => {
  expect(intlNumber()).toBe(0)
  expect(intlNumber(1234)).toBe('1,234')
  expect(intlNumber(1234.56789123)).toBe('1,234.567891')
})

test('userAgent', () => {
  navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
  expect(isMobile()).toBeFalsy()
  expect(isWeixin()).toBeFalsy()
  expect(whichBrowser(navigator.userAgent)).toEqual({
    vendor: 'chrome',
    version: 74
  })

  navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:67.0) Gecko/20100101 Firefox/67.0'
  expect(whichBrowser(navigator.userAgent)).toEqual({
    vendor: 'firefox',
    version: 67
  })

  navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18362'
  expect(whichBrowser(navigator.userAgent)).toEqual({
    vendor: 'edge',
    version: 18
  })

  navigator.userAgent = 'Mozilla/5.0 (Linux; Android 7.1.1; NX595J Build/NMF26X; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044307 Mobile Safari/537.36 MicroMessenger/6.7.3.1360(0x26070333) NetType/WIFI Language/zh_CN Process/tools'
  expect(isMobile()).toBeTruthy()
  expect(isWeixin()).toBeTruthy()
  expect(isWeixinInIphone()).toBeFalsy()
  expect(whichBrowser(navigator.userAgent)).toEqual({
    vendor: 'chrome',
    version: 57
  })

  navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko'
  expect(whichBrowser(navigator.userAgent)).toEqual({
    vendor: 'ie',
    version: 11
  })

  navigator.userAgent = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729)'
  expect(whichBrowser(navigator.userAgent)).toEqual({
    vendor: 'ie',
    version: 10
  })
})

test('secondsToDuration', () => {
  expect(secondsToDuration(1)).toBe('00:00:01')
  expect(secondsToDuration(1, 1)).toBe('00:00:01')
  expect(secondsToDuration(1, 2)).toBe('1s')
  expect(secondsToDuration(1, 3)).toBe('1秒')
  expect(secondsToDuration(61)).toBe('00:01:01')
  expect(secondsToDuration(3661)).toBe('01:01:01')
  expect(secondsToDuration(90061)).toBe('1天 01:01:01')
})

test('getNumberArray', () => {
  expect(getNumberArray(1, 4)).toEqual([1, 2, 3, 4])
})
