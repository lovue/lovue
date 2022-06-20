<script setup lang="ts">
import { computed } from 'vue'
import LvIcon from '../components/LvIcon.vue'
import type { MenuMode, Menu } from './LvMenu.vue'

const props = defineProps<{
  mode?: MenuMode
  menu: Menu
}>()

const emit = defineEmits(['click-item'])

const mode = computed(() => {
  return props.menu.mode || props.mode
})

const isType = computed(() => {
  if (mode.value === 'SPA') return 'router-link'
  return 'a'
})

const attrs = computed(() => {
  if (mode.value === 'SPA') return {
    to: props.menu.url
  }

  if (mode.value === 'link' || mode.value === undefined) return {
    class: { 'status--focus': props.menu._focus },
    href: props.menu.url,
    target: '_blank'
  }

  if (mode.value === 'nonLink') return {
    class: { 'status--focus': props.menu._focus },
  }

  return {}
})

function clickItem () {
  if (mode.value === 'nonLink') emit('click-item', props.menu)
}
</script>

<template>
  <component
    class="lv-menu-item__link"
    :is="isType"
    v-bind="attrs"
    @click="clickItem"
  >
    <LvIcon :icon="menu.icon" :size="16" v-if="menu.icon" />
    <span v-if="menu.title">{{ menu.title }}</span>
  </component>
</template>

<style lang="less">
</style>
