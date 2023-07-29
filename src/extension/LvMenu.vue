<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import LvIcon from '../components/LvIcon.vue'
import MenuItem from './MenuItem.vue'
import type { Menu, MenuMode } from '../types'

const props = defineProps<{
  items: Menu[]
  vertical?: boolean
  mode?: MenuMode
}>()
const emit = defineEmits(['click-item'])

const menus = ref(props.items)
const openedMenu = ref<Menu | null>(null)

const componentClass = computed(() => {
  if (!props.vertical) return ''

  return 'status--vertical'
})

watch(() => props.items, value => menus.value = value)

function openMenu (menu: Menu) {
  menu._height = (menu.children?.length || 0) * 48
}

function closeMenu (menu: Menu) {
  menu._height = 0
}

function toggleMenu (menu: Menu) {
  if (!menu._height) {
    if (openedMenu.value !== null) {
      closeMenu(openedMenu.value)
    }
    openMenu(menu)
    openedMenu.value = menu
  } else {
    closeMenu(menu)
    openedMenu.value = null
  }
}

function clearStatus () {
  menus.value.forEach((_item: Menu) => {
    _item._focus = false;

    (_item?.children || []).forEach((_child: Menu) => {
      _child._focus = false
    })
  })
}

function clickItem (menu: Menu, parent: Menu) {
  clearStatus()

  parent && (parent._focus = true)
  menu._focus = true

  emit('click-item', menu)
}
</script>

<template>
  <ul class="lv-menu" :class="componentClass">
    <li class="lv-menu__item" v-for="(menu, i) of menus" :key="`item-${i}`">
      <template v-if="vertical">
        <template v-if="menu.children">
          <div class="lv-menu__title" @click="toggleMenu(menu)">
            <LvIcon :icon="menu.icon" :size="16" v-if="menu.icon" />
            <span v-if="menu.title">{{ menu.title }}</span>
            <LvIcon icon="down-wide" :size="20" :class="{ 'status--up': menu._height > 0 }" />
          </div>
          <ul class="lv-menu__sub-list" :style="`height: ${menu._height || 0}px;`">
            <li class="lv-menu__item" v-for="(child, j) of menu.children" :key="`child-item-${j}`">
              <MenuItem :menu="child" :mode="mode" @click-item="clickItem(child, menu)" />
            </li>
          </ul>
        </template>
        <template v-else>
          <MenuItem :menu="menu" :mode="mode" @click-item="clickItem(menu)" />
        </template>
      </template>
      <template v-else>
        <div class="lv-menu__dropdown" v-if="menu.children">
          <div class="lv-menu__dropdown__trigger" :class="{ 'status--focus': menu._focus }">
            <LvIcon :icon="menu.icon" :size="16" v-if="menu.icon" />
            <span v-if="menu.title">{{ menu.title }}</span>
            <LvIcon icon="down-wide" />
          </div>
          <div class="lv-menu__dropdown__items">
            <MenuItem
              :menu="child"
              :mode="mode"
              v-for="(child, j) of menu.children"
              :key="`child-item-${j}`"
              @click-item="clickItem(child, menu)"
            />
          </div>
        </div>
        <MenuItem class="lv-menu__title" :menu="menu" :mode="mode" @click-item="clickItem(menu)" v-else />
      </template>
    </li>
  </ul>
</template>

<style lang="less">
@import (reference) "../Mixins";

.lv-menu {
  .flex-start;

  height: 50px;
  line-height: 48px;
  border-bottom: 1px solid var(--border-color);
  font-size: var(--small-font);

  .status--focus {
    color: var(--blue-color);
  }
}

.lv-menu__title,
.lv-menu__dropdown {
  padding: 0 var(--2unit);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  border-bottom: 2px solid transparent;

  &:hover {
    border-color: var(--blue-color);
    color: var(--blue-color);
  }
}

.lv-menu-item__link {
  .flex-start;

  padding: 0 var(--2unit);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:hover {
    color: var(--blue-color);
  }

  .lv-icon:first-child {
    margin-right: 4px;
  }
}

.lv-menu.status--vertical {
  width: 300px;
  height: auto;
  flex-direction: column;
  align-items: flex-start;
  border-bottom: none;

  .lv-menu__item {
    width: 100%;
  }

  .lv-menu__title {
    .truncate;
    .flex-start;

    cursor: pointer;

    .lv-icon:first-child {
      margin-right: 4px;
    }

    .lv-icon-down-wide {
      flex-shrink: 0;
      margin-left: auto;
      transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-style: preserve-3d;

      &.status--up {
        transform: rotateX(180deg);
      }
    }
  }

  .lv-menu__sub-list {
    background-color: var(--bg-color);
    overflow: hidden;
    transition: height 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

    .lv-menu-item__link {
      .truncate;

      display: block;
      padding: 0 var(--4unit);
      height: 100%;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

      &:hover {
        color: var(--blue-color);
      }
    }
  }
}

.lv-menu__dropdown {
  position: relative;

  &__trigger {
    display: flex;
    align-items: center;
    font-size: var(--small-font);
    cursor: pointer;

    .lv-icon:first-child {
      margin-right: 4px;
    }

    .lv-icon-down-wide {
      margin-left: var(--unit);
    }
  }

  &__items {
    font-size: var(--small-font);
    line-height: 1.5;
    color: var(--light-black);
    box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
    background-clip: padding-box;
    border-radius: var(--border-radius);
    padding: 4px 0;
    background-color: var(--white);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    position: absolute;
    left: 0;
    top: calc(100% + 5px);
    min-width: 160px;
    z-index: 5;
  }

  .lv-menu-item__link {
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding: 5px 12px;
    line-height: 22px;
    transition: all 0.3s;
    cursor: pointer;

    .lv-icon {
      margin-right: var(--unit);
    }

    &:hover {
      color: var(--blue-color);
    }
  }

  &:hover {
    .lv-menu__dropdown__items {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
