<template>
  <div class="view-login">
    <header class="title">茂源资本后台管理系统</header>
    <form class="form" @submit.prevent="login">
      <div class="row">
        <div class="input-effect">
          <input class="input" type="text" name="username" required autocomplete="off" placeholder="用户名">
          <hr>
        </div>
      </div>
      <div class="row">
        <div class="input-effect">
          <input class="input" type="password" name="password" required placeholder="密码">
          <hr>
        </div>
      </div>
      <div class="row">
        <button class="btn" type="submit">登录</button>
      </div>
    </form>
  </div>
</template>
<script>
  import {mapMutations, mapGetters} from 'vuex'
  import utils from '../../lib/utils'

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['isAdmin'])
    },
    methods: {
      ...mapMutations({ setUserInfo: 'SET_USER_INFO' }),
      login(ev) {
        utils.fetch({
          type: 'form',
          url: 'session',
          data: new FormData(ev.target)
        }, body => {
          this.setUserInfo(body)
          sessionStorage.csrf = body.csrf

          if(this.isAdmin) {
            this.$router.replace('/index.html')
          } else {
            this.$root.$refs.alert.show('该用户无权限', () => location.reload())
          }
        }, error => {
          this.$root.$refs.alert.show(error.error)
        })
      }
    },
    mounted() {
      utils.fetch({
        type: 'get',
        url: 'csrf'
      }, body => {
        sessionStorage.csrf = body
      })
    }
  }
</script>
