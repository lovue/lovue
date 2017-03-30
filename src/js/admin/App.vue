<template>
  <div id="app">
    <vue-beauty-alert ref="alert"></vue-beauty-alert>
    <router-view></router-view>
  </div>
</template>
<script>
  import VueBeautyAlert from '../../components/BeautyAlert.vue'

  export default {
    data() {
      return {}
    },
    components: { VueBeautyAlert }
  }
</script>
