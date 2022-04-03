<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  icon: string
  size?: string | number
  cursor?: boolean
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
</script>

<template>
  <svg :class="`lv-icon lv-icon-${icon}`" :style="styles" :width="size || 20" :height="size || 20">
    <use :href="`#icon-${icon}`" />
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
