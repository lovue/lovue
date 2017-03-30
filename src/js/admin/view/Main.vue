<template>
  <div class="view-main">
    <navbar></navbar>
    <div class="container left-right">
      <div class="left">
        <sidebar></sidebar>
      </div>
      <div class="right content-wrapper">
        <n-progress parent=".content-wrapper"></n-progress>
        <transition name="router" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import Navbar from './components/Navbar.vue'
  import Sidebar from './components/Sidebar.vue'
  import NProgress from './components/NProgress.vue'

  export default {
    components: { Navbar, Sidebar, NProgress }
  }
</script>
