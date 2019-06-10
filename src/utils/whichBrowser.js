export default ua => {
  let vendor, version, browser
  const maps = {
    Edge: 'edge',
    Firefox: 'firefox',
    CriOS: 'chrome',
    Version: 'safari',
    Chrome: 'chrome'
  }
  const orders = ['Edge', 'Firefox', 'CriOS', 'Version', 'Chrome']

  for (let item of orders) {
    const regexp = new RegExp(`(${item})/(\\d+).`, 'i')
    browser = ua.match(regexp)
    if (browser) {
      if (item === 'Version' && /Android/i.test(ua)) continue

      vendor = maps[item]
      version = +browser[2]

      return { vendor, version }
    }
  }

  if (/Trident/i.test(ua)) {
    vendor = 'ie'

    if (ua.includes('rv:11')) {
      version = 11
    } else {
      browser = ua.match(/MSIE\s(\d+)\./i)
      if (browser) {
        version = +browser[1]
      } else {
        version = 6
      }
    }

    return { vendor, version }
  }
}
