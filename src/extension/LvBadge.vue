<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  count?: string | number
  color?: string
}>()

const countStyle = computed(() => {
  if (!props.color) return

  return `--badge-bg: ${props.color}`
})
</script>

<template>
  <div class="lv-badge">
    <slot />
    <div class="lv-badge__count" :data-count="count" :style="countStyle">{{ count }}</div>
  </div>
</template>

<style lang="less">
@import (reference) "../Mixins";

.lv-badge {
  --badge-bg: var(--error-color);

  display: flex;
  align-items: flex-start;
}

.lv-badge__count {
  position: relative;
  top: -4px;
  right: 2px;
  width: 8px;
  height: 8px;
  background-color: var(--badge-bg);
  border-radius: 50%;

  &[data-count] {
    top: -8px;
    font-size: var(--tiny-font);
    color: var(--white);
    width: auto;
    height: auto;
    padding: 2px 4px;
    border-radius: 10px;
  }
}
</style>
