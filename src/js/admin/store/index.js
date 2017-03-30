import Vuex from 'vuex'
import user from './modules/user'

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    user
  }
})

export default store
