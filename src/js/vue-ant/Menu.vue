<template>
  <ul class="ant-menu">
    <li class="ant-menu-item" v-for="menu of menus">
      <div class="ant-dropdown-wrap" v-if="menu.children">
        <div class="ant-dropdown-trigger" :class="{focus: menu._focus}">{{menu.name}} <v-icon icon="down-wide"></v-icon></div>
        <div class="ant-dropdown">
          <a class="ant-dropdown-item" :class="{focus: child._focus}" :href="child.url" v-for="child of menu.children">{{child.name}}</a>
        </div>
      </div>
      <a :class="{focus: menu._focus}" :href="menu.url" v-else>{{menu.name}}</a>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'v-menu',
    props: {
      menus: Array
    }
  }
</script>
