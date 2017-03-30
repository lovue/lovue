import utils from '../js/lib/utils'
import BeautyAlert from '../components/BeautyAlert.vue'
import Navbar from '../components/Navbar.vue'

utils.init().then(user => {
  new Vue({
    el: '#app',
    data: {
      user: user
    },
    components: { BeautyAlert, Navbar },
    methods: {
      getInitData() {
      }
    },
    created() {
      this.getInitData()
    }
  })
})
