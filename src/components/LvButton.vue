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
.lv-button {
  touch-action: manipulation;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 0 var(--2unit);
  font-size: var(--small-font);
  border-radius: var(--border-radius);
  height: var(--4unit);
  user-select: none;
  transition: all .3s cubic-bezier(.645, .045, .355, 1);
  cursor: pointer;

  .lv-icon {
    width: 14px;
    height: 14px;
    margin-top: -2px;
    margin-right: 4px;
  }

  &.lv-button-ghost {
    border-color: var(--border-color);
    background-color: var(--white);

    &:hover {
      color: var(--hover-blue);
      border-color: var(--hover-blue);
    }

    &:active {
      color: var(--active-blue);
      border-color: var(--active-blue);
    }
  }

  &.lv-button-primary {
    color: var(--white);
    background-color: var(--blue-color);

    &:hover {
      background-color: var(--hover-blue);
    }

    &:active {
      background-color: var(--active-blue);
    }
  }

  &.lv-button-danger {
    color: var(--white);
    background-color: var(--error-color);
    border-color: var(--error-color);

    &:hover {
      background-color: var(--hover-error);
      border-color: var(--hover-error);
    }

    &:active {
      background-color: var(--active-error);
      border-color: var(--active-error);
    }
  }

  &.lv-button-text {
    background-color: transparent;
    border: none;

    &:hover {
      color: var(--hover-blue);
    }

    &:active {
      color: var(--active-blue);
    }
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

  &[disabled] {
    opacity: .5;
    cursor: not-allowed;
  }
}
</style>
