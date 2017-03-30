<template>
</template>
<script>
  import nprogress from 'nprogress'

  export default {
    props: {
      parent: String
    },
    created() {
      this.parent && nprogress.configure({
        parent: this.parent,
        showSpinner: false
      })

      this.$router.beforeEach((to, from, next) => {
        if(to.path !== '/login.html' && from.path !== '/login.html') {
          nprogress.start()
        }
        next()
      })
      this.$router.afterEach((to, from) => {
        if(to.path !== '/login.html' && from.path !== '/login.html') {
          nprogress.done()
        }
      })
    }
  }
</script>
