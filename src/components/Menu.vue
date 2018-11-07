<template>
  <ul class="v-menu" :class="{vertical}">
    <li class="v-menu-item" v-for="menu of menus">
      <template v-if="vertical">
        <template v-if="menu.children">
          <div class="i-title" :class="{focus: menu._focus}" @click="toggleMenu(menu)">
            <v-icon :icon="menu.icon" size="16" v-if="menu.icon"></v-icon>{{menu.name}} <v-icon icon="down-wide" :class="{up: menu._openIcon}"></v-icon>
          </div>
          <ul class="m-sub" :style="`height: ${menu.height || 0}px;`" v-show="menu._open">
            <li class="s-item" v-for="child of menu.children">
              <a :class="{focus: child._focus}" :href="child.url">{{child.name}}</a>
            </li>
          </ul>
        </template>
        <a class="i-link" :class="{focus: menu._focus}" :href="menu.url" v-else><v-icon :icon="menu.icon" size="16" v-if="menu.icon"></v-icon>{{menu.name}}</a>
      </template>
      <template v-else>
        <div class="v-dropdown-wrap" v-if="menu.children">
          <div class="d-trigger" :class="{focus: menu._focus}">
            <v-icon :icon="menu.icon" size="16" v-if="menu.icon"></v-icon>{{menu.name}} <v-icon icon="down-wide"></v-icon>
          </div>
          <div class="v-dropdown">
            <a class="d-item" :class="{focus: child._focus}" :href="child.url" v-for="child of menu.children">{{child.name}}</a>
          </div>
        </div>
        <a class="i-link" :class="{focus: menu._focus}" :href="menu.url" v-else><v-icon :icon="menu.icon" size="16" v-if="menu.icon"></v-icon>{{menu.name}}</a>
      </template>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'v-menu',
    data() {
      return {
        openedMenu: null
      }
    },
    props: {
      menus: Array,
      vertical: Boolean
    },
    methods: {
      closeMenu(menu) {
        setTimeout(() => {
          this.$set(menu, '_openIcon', false)
          this.$set(menu, 'height', 0)
        }, 60)
        setTimeout(() => this.$set(menu, '_open', false), 400)
      },
      openMenu(menu) {
        this.$set(menu, '_open', true)
        this.$set(menu, '_openIcon', true)
        setTimeout(() => this.$set(menu, 'height', menu.children.length * 48), 60)
      },
      toggleMenu(menu) {
        if (!menu._open) {
          const { openedMenu } = this
          if (openedMenu !== null) {
            this.closeMenu(openedMenu)
          }
          this.openMenu(menu)
          this.openedMenu = menu
        } else {
          this.closeMenu(menu)
          this.openedMenu = null
        }
      }
    }
  }
</script>
