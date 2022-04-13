<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  icon: string
  size?: string | number
  cursor?: boolean
  prefix?: string
}>()

const styles = computed(() => {
  const _styles: {
    cursor?: string
  } = {}

  if (props.cursor) {
    _styles.cursor = 'pointer'
  }

  return _styles
})
const componentClass = computed(() => {
  if (!props.prefix) return `lv-icon-${props.icon}`

  return `lv-${props.prefix}-icon-${props.icon}`
})
const iconHref = computed(() => {
  if (!props.prefix) return `#icon-${props.icon}`

  return `#${props.prefix}-icon-${props.icon}`
})
</script>

<template>
  <svg class="lv-icon" :class="componentClass" :style="styles" :width="size || 20" :height="size || 20">
    <use :href="iconHref" />
  </svg>
</template>

<style lang="less">
@keyframes rotate-reverse {
  100% {
    transform: rotate(-360deg);
  }
}

.lv-icon-refresh {
  &.loading {
    animation: rotate-reverse 2s linear infinite;
  }
}
</style>
