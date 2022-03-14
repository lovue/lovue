<script setup lang="ts">
import { computed } from 'vue'

interface IconStyles {
  cursor?: string
}

const props = defineProps<{
  icon: string
  size: string
  cursor: boolean
}>()

const styles = computed(() => {
  const __styles__: IconStyles = {}

  if (props.cursor) {
    __styles__.cursor = 'pointer'
  }

  return __styles__
})
</script>

<template>
  <svg :class="`v-icon v-icon-${icon}`" :style="styles" :width="size || 20" :height="size || 20" @click="$emit('click')">
    <use :xlink:href="`#icon-${icon}`"></use>
  </svg>
</template>

<style lang="less">
@keyframes rotate-reverse {
  100% {
    transform: rotate(-360deg)
  }
}

.v-icon-refresh {
  &.loading {
    animation: rotate-reverse 2s linear infinite;
  }
}
</style>
