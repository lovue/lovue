<template>
  <ul class="v-menu" :class="{vertical}">
    <li class="v-menu-item" v-for="menu of menus">
      <template v-if="vertical">
        <template v-if="menu.children">
          <div class="i-title" :class="{focus: menu._focus}" @click="toggleMenu(menu)">
            <v-icon :icon="menu.icon" size="16" v-if="menu.icon"></v-icon><span>{{menu.name}}</span> <v-icon icon="down-wide" :class="{up: menu._openIcon}"></v-icon>
          </div>
          <ul class="m-sub" :style="`height: ${menu.height || 0}px;`" v-show="menu._open">
            <li class="s-item" v-for="child of menu.children">
              <router-link :to="child.url" v-if="mode === 'spa'">{{child.name}}</router-link>
              <a :class="{focus: child._focus}" :href="child.url" v-if="mode === 'link'">{{child.name}}</a>
              <a :class="{focus: child._focus}" v-if="mode === 'nonLink'" @click="clickItem(child, menu)">{{child.name}}</a>
            </li>
          </ul>
        </template>
        <template v-else>
          <router-link class="i-link" :to="menu.url" v-if="mode === 'spa'">
            <v-icon :icon="menu.icon" size="16" v-if="menu.icon"></v-icon><span>{{menu.name}}</span>
          </router-link>
          <a class="i-link" :class="{focus: menu._focus}" :href="menu.url" v-if="mode === 'link'">
            <v-icon :icon="menu.icon" size="16" v-if="menu.icon"></v-icon><span>{{menu.name}}</span>
          </a>
          <a class="i-link" :class="{focus: menu._focus}" v-if="mode === 'nonLink'" @click="clickItem(menu)">
            <v-icon :icon="menu.icon" size="16" v-if="menu.icon"></v-icon><span>{{menu.name}}</span>
          </a>
        </template>
      </template>
      <template v-else>
        <div class="v-dropdown-wrap" v-if="menu.children">
          <div class="d-trigger" :class="{focus: menu._focus}">
            <v-icon :icon="menu.icon" size="16" v-if="menu.icon"></v-icon><span>{{menu.name}}</span> <v-icon icon="down-wide"></v-icon>
          </div>
          <div class="v-dropdown">
            <template v-if="mode === 'spa'">
              <router-link class="d-item" :to="child.url" v-for="(child, i) of menu.children" :key="i">{{child.name}}</router-link>
            </template>
            <template v-if="mode === 'link'">
              <a class="d-item" :class="{focus: child._focus}" :href="child.url" v-for="child of menu.children">{{child.name}}</a>
            </template>
            <template v-if="mode === 'nonLink'">
              <a class="d-item" @click="clickItem(child, menu)" v-for="child of menu.children">{{child.name}}</a>
            </template>
          </div>
        </div>
        <template v-else>
          <router-link class="i-link" :to="menu.url" v-if="mode === 'spa'">
            <v-icon :icon="menu.icon" size="16" v-if="menu.icon"></v-icon><span>{{menu.name}}</span>
          </router-link>
          <a class="i-link" :class="{focus: menu._focus}" :href="menu.url" v-if="mode === 'link'">
            <v-icon :icon="menu.icon" size="16" v-if="menu.icon"></v-icon><span>{{menu.name}}</span>
          </a>
          <a class="i-link" :class="{focus: menu._focus}" v-if="mode === 'nonLink'" @click="clickItem(menu)">
            <v-icon :icon="menu.icon" size="16" v-if="menu.icon"></v-icon><span>{{menu.name}}</span>
          </a>
        </template>
      </template>
    </li>
  </ul>
</template>

<script>
  import Icon from './Icon.vue'

  export default {
    name: 'v-menu',
    data() {
      return {
        openedMenu: null
      }
    },
    props: {
      menus: Array,
      vertical: Boolean,
      mode: {
        type: String,
        'default': 'link'
      }
    },
    components: {
      [Icon.name]: Icon
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
      },
      clearFocus() {
        this.menus.forEach(menu => {
          menu._focus = false
          if (menu.children) {
            menu.children.forEach(child => {
              child._focus = false
            })
          }
        })
      },
      clickItem(child, menu) {
        this.clearFocus()
        menu && (menu._focus = true)
        child._focus = true
        this.$forceUpdate()
        this.$emit('click', child.value || child.url)
      }
    }
  }
</script>
