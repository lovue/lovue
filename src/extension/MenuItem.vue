<script setup lang="ts">
import { computed } from 'vue'
import LvIcon from '../components/LvIcon.vue'

const props = defineProps<{
  mode?: string
  menu: Record<string, string>
}>()

defineEmits(['click-item'])

const isType = computed(() => {
  if (props.mode === 'SPA') return 'router-link'
  return 'a'
})

const attrs = computed(() => {
  if (props.mode === 'SPA') return {
    to: props.menu.url
  }

  if (props.mode === 'link' || props.mode === undefined) return {
    class: { 'status--focus': props.menu._focus },
    href: props.menu.url,
    target: '_blank'
  }

  if (props.mode === 'nonLink') return {
    class: { 'status--focus': props.menu._focus },
  }

  return {}
})
</script>

<template>
  <component
    class="lv-menu-item__link"
    :is="isType"
    v-bind="attrs"
  >
    <LvIcon :icon="menu.icon" :size="16" v-if="menu.icon" />
    <span v-if="menu.title">{{ menu.title }}</span>
  </component>
</template>

<style lang="less">
</style>
