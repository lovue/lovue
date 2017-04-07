import Message from 'lib/message-vue'
import BeautyAlert from 'vue/BeautyAlert.vue'
import VueDatePicker from 'vue/DatePicker.vue'
import VueLoading from 'vue/Loading.vue'
import Navbar from 'vue/Navbar.vue'
import VueNoCaptcha from 'vue/NoCaptcha.vue'
import VuePagination from 'vue/Pagination.vue'
import VuePopupWindow from 'vue/PopupWindow.vue'
import VueProgressBar from 'vue/ProgressBar.vue'
import VueSearch from 'vue/Search.vue'
import VueSelect2 from 'vue/Select2.vue'
import VueTab from 'vue/Tab.vue'
import VueTable from 'vue/Table.vue'
import VueUploadButton from 'vue/UploadButton.vue'

if(typeof window !== 'undefined' && window.Vue) {
  Vue.component('beauty-alert', BeautyAlert)
  Vue.component('vue-date-picker', VueDatePicker)
  Vue.component('vue-loading', VueLoading)
  Vue.component('navbar', Navbar)
  Vue.component('vue-no-captcha', VueNoCaptcha)
  Vue.component('vue-pagination', VuePagination)
  Vue.component('vue-popup-window', VuePopupWindow)
  Vue.component('vue-progress-bar', VueProgressBar)
  Vue.component('vue-search', VueSearch)
  Vue.component('vue-select2', VueSelect2)
  Vue.component('vue-tab', VueTab)
  Vue.component('vue-table', VueTable)
  Vue.component('vue-upload-button', VueUploadButton)

  Vue.prototype.$msg = Message
}
