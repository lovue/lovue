import router, {hook as routerHook} from './admin/router'
import store from './admin/store'
import {sync} from 'vuex-router-sync'
import App from './admin/App.vue'
import Message from './lib/message-vue'

sync(store, router)
const userPromise = store.dispatch('initUserInfo')
routerHook(userPromise)

userPromise.then(() => {
  Vue.prototype.$msg = Message

  new Vue({
    router,
    store,
    ...App
  }).$mount('app')
})
