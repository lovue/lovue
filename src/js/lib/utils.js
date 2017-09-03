import config from './config'

module.exports = {
  init() {
    return new Promise((resolve, reject) => {
      this.fetch('user').then(body => {
        resolve(body)
        sessionStorage.csrf = body.csrf
      }).catch(error => {
        if (error === config.errorMsg[105]) {
          location.href = '/login.html'
        } else {
          console.log(error)
        }
      })
    })
  },
  fetch(option) {
    if (typeof option === 'string') {
      option = {
        type: 'get',
        url: option
      }
    } else {
      option.type = option.type || 'get'
    }

    let allOptions = {
      get: {},
      post: {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(option.data)
      },
      form: {
        method: 'post',
        body: option.data
      },
      put: {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(option.data)
      },
      putForm: {
        method: 'put',
        body: option.data
      },
      delete: {
        method: 'delete'
      }
    }

    let requestOption = allOptions[option.type]

    requestOption.credentials = 'same-origin'
    requestOption.headers = requestOption.headers || {}
    requestOption.headers['Accept'] = 'application/json'
    if (option.type !== 'get') {
      requestOption.headers['X-CSRFToken'] = sessionStorage.csrf
    }

    let url
    if (option.url.startsWith('/') || option.url.startsWith('http')) {
      url = option.url
    } else {
      url = `/api/${option.url}`
    }
    let request = new Request(url, requestOption)

    return new Promise((resolve, reject) => {
      fetch(request).then(res => {
        if (res.ok) return res.json()
        throw config.errorStatusMsg[res.status] || res
      }).then(body => {
        if (!body.code) {
          resolve(body)
        } else if (body.code === 0) {
          resolve(body.data)
        } else {
          throw config.errorMsg[body.code] || body.msg || body
        }
      }).catch(err => reject(err))
    })
  },
  formatDate(date, type) {
    let year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      hour = date.getHours(),
      minute = date.getMinutes(),
      second = date.getSeconds()

    hour = hour < 10 ? `0${hour}` : hour
    minute = minute < 10 ? `0${minute}` : minute
    second = second < 10 ? `0${second}` : second

    if (type === 1) {
      return `${year}-${month}-${day}`
    }
    if (type === 2) {
      month = month < 10 ? `0${month}` : month
      day = day < 10 ? `0${day}` : day
      return Number(`${year}${month}${day}`)
    }
    if (type === 3) {
      return `${year}年${month}月${day}日 ${hour}:${minute}:${second}`
    }

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  },
  connectWS(option) {
    console.log(`Connecting to ${option.uri} ...`)

    const ws = new WebSocket(option.uri)

    ws.onopen = ev => {
      console.log('RTServer Connection Created!')

      option.type && ws.send(JSON.stringify({
        type: option.type,
        data: 'Set Request Type'
      }))

      option.host && ws.send(JSON.stringify({
        type: option.type,
        data: option.host
      }))
    }

    ws.onmessage = ev => {
      option.receive(ev.data)
    }

    ws.onclose = ev => {
      console.log('RTServer Connection Closed!')
    }

    ws.onerror = ev => {
      console.log('RTServer Connection Broken!')
      throw new Error(ev)
    }

    return ws
  },
  getJSONKeyByValue(obj, value) {
    for (let key in obj) {
      if (obj[key] === value) {
        return key
      }
    }
  },
  getAverageRGB(imgEl) {
    let blockSize = 5, // only visit every 5 pixels
      defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
      canvas = document.createElement('canvas'),
      context = canvas.getContext && canvas.getContext('2d'),
      data, width, height,
      i = -4,
      length,
      rgb = { r: 0, g: 0, b: 0 },
      count = 0;
    if (!context) {
      return defaultRGB;
    }
    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
    context.drawImage(imgEl, 0, 0);
    try {
      data = context.getImageData(0, 0, width, height);
    } catch (e) {
      return defaultRGB;
    }
    length = data.data.length;
    while ((i += blockSize * 4) < length) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i + 1];
      rgb.b += data.data[i + 2];
      // rgb.a += data.data[i+3];
    }
    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);
    // rgb.a = ~~(rgb.a/count);
    return rgb;
  },
  isIE() {
    return /Trident/i.test(navigator.userAgent);
  },
  isFirefox() {
    return /Firefox/i.test(navigator.userAgent)
  },
  isWeixin() {
    let userAgent = navigator.userAgent.toLowerCase()
    return userAgent.match(/micromessenger/)
  },
  isWeixinInIphone() {
    let userAgent = navigator.userAgent.toLowerCase()
    return userAgent.match(/iphone os/) && userAgent.match(/micromessenger/)
  },
  isMobile() {
    return /Mobi/i.test(navigator.userAgent)
  },
  isMobile2() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  },
  adjustImgShape(container, ratio) {
    let imgs = document.querySelectorAll(container + ' .img-wrap img');
    [].forEach.call(imgs, function (img) {
      img.onload = function () {
        img.parentNode.classList.add(img.naturalWidth / img.naturalHeight >= ratio ? 'img-w' : 'img-h');
      };
    });
  },
  getScrollTop() {
    if (document.documentElement.scrollTop) {
      return document.documentElement.scrollTop
    }
    return document.body.scrollTop
  },
  goToTop() {
    pageYOffset > 500 && scroll(0, 500)
    let y = -pageYOffset / 15,
      t = setInterval(() => {
        pageYOffset !== 0 ? scrollBy(0, y) : clearInterval(t)
      }, 15)
  },
  getTimeDiff(time) {
    let d = new Date()
    let diff = Math.floor(d.getTime() / 1000) - time

    let thisDate = new Date(time * 1000),
      thisYear = thisDate.getFullYear(),
      thisMonth = thisDate.getMonth() + 1,
      thisDay = thisDate.getDate(),
      thisHour = thisDate.getHours(),
      thisMinute = thisDate.getMinutes()

    thisHour = thisHour === 0 ? '00' : thisHour
    thisMinute = thisMinute === 0 ? '00' : thisMinute

    if (diff < 60) {
      return ( diff < 1 ? 1 : diff ) + '秒前'
    }
    if (diff >= 60 && diff < 60 * 60) {
      return Math.floor(diff / 60) + '分钟前'
    }
    if (thisDate.toDateString() === d.toDateString()) {
      return '今天 ' + thisHour + ':' + thisMinute
    }
    if (thisYear === d.getFullYear()) {
      return thisMonth + '月' + thisDay + '日 ' + thisHour + ':' + thisMinute
    }
    return thisYear + '-' + thisMonth + '-' + thisDay + ' ' + thisHour + ':' + thisMinute
  },
  reload() {
    if (this.isWeixin()) {
      location.href = location.href + '?v=' + 10000 * Math.random()
    } else {
      location.reload()
    }
  },
  isEmptyObject(obj) {
    if (this.getype(obj) !== 'object') {
      throw new TypeError(`${obj} 不是对象字面量`)
    }

    return !Object.keys(obj).length
  },
  /*
  * 将表格数据转换为csv格式的字符串
  * 表头：data.headers, head: {title: 'title', prop: 'prop'}
  * 数据：data.rows
  * */
  convertTableDataToString(data) {
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
  },
  saveDataToFile(data, filename, ext) {
    let blob = new Blob(['\ufeff' + data], { type: `text/${ext};charset=utf-8` }),
      url = URL.createObjectURL(blob)

    let link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}.${ext}`)

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  },
  sortDesc(arr, column) {
    arr.sort((a, b) => {
      if (typeof a[column] === 'number') return b[column] - a[column]

      return new Intl.Collator(/*'zh-Hans-CN', */{
        sensitivity: 'base'
      }).compare(b[column], a[column])
    })
    return arr
  },
  getype(value) {
    let type = Object.prototype.toString.call(value)

    if (type === '[object Undefined]') {
      return 'undefined'
    }

    if (type === '[object Null]') {
      return 'null'
    }

    if (type === '[object Number]') {
      return 'number'
    }

    if (type === '[object String]') {
      return 'string'
    }

    if (type === '[object Array]') {
      return 'array'
    }

    if (type === '[object Object]') {
      return 'object'
    }

    if (type === '[object Function]') {
      return 'function'
    }

    if (type === '[object Boolean]') {
      return 'boolean'
    }

    if (type === '[object Date]') {
      return 'date'
    }

    if (type === '[object Error]') {
      return 'error'
    }

    if (type === '[object RegExp]') {
      return 'regexp'
    }
  },
  getSearchParam(name) {
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
  },
  isSupportWebGL() {
    const canvas = document.createElement('canvas')
    const supports = 'probablySupportsContext' in canvas ? 'probablySupportsContext' : 'supportsContext'

    if (supports in canvas) {
      return canvas[supports]('webgl') || canvas[supports]('experimental-webgl')
    }
    return 'WebGLRenderingContext' in window
  }
}
