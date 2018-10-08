<template>
  <ul class="v-menu">
    <li class="v-menu-item" v-for="menu of menus">
      <div class="v-dropdown-wrap" v-if="menu.children">
        <div class="v-dropdown-trigger" :class="{focus: menu._focus}">{{menu.name}} <v-icon icon="down-wide"></v-icon></div>
        <div class="v-dropdown">
          <a class="v-dropdown-item" :class="{focus: child._focus}" :href="child.url" v-for="child of menu.children">{{child.name}}</a>
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
