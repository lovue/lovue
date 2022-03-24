<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  icon: string
  size?: string | number
  cursor?: boolean
}>()
defineEmits(['click'])

const styles = computed(() => {
  const __styles__: {
    cursor?: string
  } = {}

  if (props.cursor) {
    __styles__.cursor = 'pointer'
  }

  return __styles__
})
</script>

<template>
  <svg :class="`lv-icon lv-icon-${icon}`" :style="styles" :width="size || 20" :height="size || 20" @click="$emit('click')">
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
