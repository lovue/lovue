<template>
  <nav class="navbar">
    <div class="left">
      <div class="logo">
        <a href="/"><img src="/static/platform/img/logo-3.png">BSS</a>
      </div>
    </div>
    <div class="right">
      <div class="menu"></div>
      <div class="user">
        <div class="user-avatar">
          <img class="avatar" :src="user.avatar">
          <div class="user-name">{{ user.username }}</div>
        </div>
        <div class="user-op">
          <div class="above">
            <a class="op-btn" href="/accounts/changepasswd/">修改密码</a>
          </div>
          <div class="below">
            <a class="btn-text" @click="logout">注销登录</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
  import {mapState, mapMutations} from 'vuex'
  import utils from '../../../lib/utils'

  export default {
    data() {
      return {}
    },
    computed: mapState(['user']) ,
    methods: {
      ...mapMutations({
        clearUserInfo: 'LOGOUT'
      }),
      logout() {
        utils.fetch({
          type: 'delete',
          url: 'session'
        }, () => {
          this.clearUserInfo()
          this.$router.replace('/login.html')
        })
      }
    }
  }
</script>
