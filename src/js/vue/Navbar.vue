<template>
  <nav class="navbar">
    <div class="left">
      <div class="logo"><a href="/"><img src="/static/platform/img/logo-3.png">BSS</a></div>
    </div>
    <div class="right">
      <ul class="menu">
        <template v-for="menu of user.menu">
          <li class="item" v-if="menu.url">
            <a class="item-link" :href="menu.url">{{ menu.name }}</a>
          </li>
          <li class="item" v-else>
            <a class="item-btn" href="javascript:void(0)">{{ menu.name }}
              <svg>
                <use xlink:href="/static/platform/img/icons.svg#icon-arrow-down"></use>
              </svg>
            </a>
            <ul :class="['sub-menu', {'multi-column': menu.submenu.length >= 10}]">
              <li class="sub-item" v-for="item of menu.submenu">
                <a class="sub-link" :href="item.url">{{ item.name }}</a>
              </li>
            </ul>
          </li>
        </template>
      </ul>
      <div class="user">
        <div class="user-avatar">
          <img class="avatar" :src="user.avatar">
          <div class="user-name">{{ user.username }}</div>
        </div>
        <div class="user-op">
          <div class="above">
            <a class="op-btn" href="">定制主页</a>
            <!-- <a class="op-btn" href="">定制功能</a> -->
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
  import utils from '../js/lib/utils'

  export default {
    props: {
      user: Object
    },
    methods: {
      logout() {
        utils.fetch({
          type: 'delete',
          url: 'session'
        }, () => location.href = '/login.html')
      }
    }
  }
</script>
