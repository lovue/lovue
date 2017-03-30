const state = {
  id: '',
  admin: false,
  username: '',
  nickname: '',
  avatar: '',
  csrf: ''
}

const mutations = {
  SET_USER_INFO(state, userInfo) {
    for (let key in userInfo) {
      if (userInfo.hasOwnProperty(key)) {
        state[key] = userInfo[key]
      }
    }
  },
  LOGOUT(state) {
    state.id = ''
    state.admin = false
    state.username = ''
    state.nickname = ''
    state.avatar = ''
    state.csrf = ''
  }
}

const actions = {
  initUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      fetch(new Request('/api/v1/user', {
        headers: {
          'Accept': 'application/json'
        },
        credentials: 'same-origin'
      })).then(res => {
        if (res.ok) return res.json()
      }).then(body => {
        if (body.code === 0) {
          commit('SET_USER_INFO', body.data)
          sessionStorage.csrf = body.data.csrf
        }
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  }
}

const getters = {
  isAdmin(state) {
    return state.admin
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
