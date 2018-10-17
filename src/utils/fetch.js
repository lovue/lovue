import config from './config'

const wrapFetch = function (request) {
  let status = 200
  return new Promise((resolve, reject) => {
    fetch(request).then(res => {
      if (res.ok) return res.json()
      status = res.status
      throw {
        status,
        msg: config.errorStatusMsg[res.status] || res
      }
      // return res.text()
    }).then(body => {
      if (body.code === 0) {
        resolve(body.data)
      } else {
        throw {
          status,
          code: body.code,
          msg: config.errorMsg[body.code] || body.msg || 'Unknown Error'
        }
      }
    }).catch(reject)
  })
}
let urlPrefix = '/api'
const requestUrl = function (url) {
  if (url.startsWith('/') || url.startsWith('http')) return url
  return `${urlPrefix}/${url}`
}

export default {
  prefix(prefix) {
    urlPrefix = prefix
  },
  get(url) {
    return wrapFetch(new Request(requestUrl(url), {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'x-access-token': localStorage.token
      }
    }))
  },
  post(url, params) {
    return wrapFetch(new Request(requestUrl(url), {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'X-CSRFToken': sessionStorage.csrf
      },
      body: JSON.stringify(params)
    }))
  },
  form(url, params) {
    return wrapFetch(new Request(requestUrl(url), {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'x-access-token': localStorage.token,
        'X-CSRFToken': sessionStorage.csrf
      },
      body: params
    }))
  },
  put(url, params) {
    return wrapFetch(new Request(requestUrl(url), {
      method: 'put',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'X-CSRFToken': sessionStorage.csrf
      },
      body: JSON.stringify(params)
    }))
  },
  delete(url) {
    return wrapFetch(new Request(requestUrl(url), {
      method: 'delete',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'x-access-token': localStorage.token,
        'X-CSRFToken': sessionStorage.csrf
      }
    }))
  }
}
