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
              <router-link :class="{focus: child._focus}" :to="child.url" v-if="mode === 'spa'">{{child.name}}</router-link>
              <a :class="{focus: child._focus}" :href="child.url" v-if="mode === 'link'">{{child.name}}</a>
              <a class="link" v-if="mode === 'nonLink'" @click="$emit('click', child.value || child.url)">{{child.name}}</a>
            </li>
          </ul>
        </template>
        <template v-else>
          <router-link class="i-link" :class="{focus: menu._focus}" :to="menu.url" v-if="mode === 'spa'">
            <v-icon :icon="menu.icon" size="16" v-if="menu.icon"></v-icon>{{menu.name}}
          </router-link>
          <a class="i-link" :class="{focus: menu._focus}" :href="menu.url" v-if="mode === 'link'">
            <v-icon :icon="menu.icon" size="16" v-if="menu.icon"></v-icon>{{menu.name}}
          </a>
          <a class="i-link" :class="{focus: menu._focus}" v-if="mode === 'nonLink'" @click="$emit('click', menu.value || menu.url)">
            <v-icon :icon="menu.icon" size="16" v-if="menu.icon"></v-icon>{{menu.name}}
          </a>
        </template>
      </template>
      <template v-else>
        <div class="v-dropdown-wrap" v-if="menu.children">
          <div class="d-trigger" :class="{focus: menu._focus}">
            <v-icon :icon="menu.icon" size="16" v-if="menu.icon"></v-icon>{{menu.name}} <v-icon icon="down-wide"></v-icon>
          </div>
          <div class="v-dropdown">
            <template v-if="mode === 'spa'">
              <router-link class="d-item" :class="{focus: child._focus}" :to="child.url" v-for="(child, i) of menu.children" :key="i">{{child.name}}</router-link>
            </template>
            <template v-if="mode === 'link'">
              <a class="d-item" :class="{focus: child._focus}" :href="child.url" v-for="child of menu.children">{{child.name}}</a>
            </template>
            <template v-if="mode === 'nonLink'">
              <a class="d-item" @click="$emit('click', child.value || child.url)" v-for="child of menu.children">{{child.name}}</a>
            </template>
          </div>
        </div>
        <template v-else>
          <router-link class="i-link" :class="{focus: menu._focus}" :to="menu.url" v-if="mode === 'spa'">
            <v-icon :icon="menu.icon" size="16" v-if="menu.icon"></v-icon>{{menu.name}}
          </router-link>
          <a class="i-link" :class="{focus: menu._focus}" :href="menu.url" v-if="mode === 'link'">
            <v-icon :icon="menu.icon" size="16" v-if="menu.icon"></v-icon>{{menu.name}}
          </a>
          <a class="i-link" :class="{focus: menu._focus}" v-if="mode === 'nonLink'" @click="$emit('click', menu.value || menu.url)">
            <v-icon :icon="menu.icon" size="16" v-if="menu.icon"></v-icon>{{menu.name}}
          </a>
        </template>
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
      vertical: Boolean,
      mode: {
        type: String,
        'default': 'link'
      }
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
