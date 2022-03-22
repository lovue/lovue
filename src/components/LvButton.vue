<script setup lang="ts">
import { computed } from 'vue'
import LvIcon from './LvIcon.vue'

type ButtonType = 'button' | 'submit' | 'reset' | undefined

const props = defineProps<{
  type?: ButtonType
  theme?: string
  size?: string
  disabled?: boolean
  icon?: string
  loading?: boolean
  submit?: boolean
}>()
const emit = defineEmits(['click'])

const customClass = computed(() => {
  const theme = props.theme || 'primary'
  const classes = [`lv-button-${theme}`]

  if (props.size) classes.push(`lv-button-${props.size}`)

  return classes
})

function click () {
  if (props.loading) return

  emit('click')
}
</script>

<template>
  <button class="lv-button" :class="customClass" :type="type" :disabled="disabled" @click="click">
    <LvIcon :icon="icon" v-if="!!icon && !loading" />
    <LvIcon icon="refresh" :class="{loading: loading}" v-if="loading" />
    <slot />
  </button>
</template>

<style lang="less">
@import (reference) "../Mixins";

.lv-button {
  .btn;

  .lv-icon {
    width: 14px;
    height: 14px;
    margin-top: -2px;
    margin-right: 4px;
  }

  &.lv-button-ghost {
    .btn-ghost;
  }

  &.lv-button-primary {
    .btn-primary;
  }

  &.lv-button-danger {
    .btn-danger;
  }

  &.lv-button-text {
    .btn-text
  }

  &.lv-button-lg {
    font-size: var(--normal-font);
    height: var(--5unit);
    padding: 0 var(--3unit);

    .lv-icon {
      width: var(--2unit);
      height: var(--2unit);
    }
  }

  &.lv-button-sm {
    font-size: var(--tiny-font);
    padding: 0 var(--unit);
    height: var(--3unit);
  }
}
</style>
