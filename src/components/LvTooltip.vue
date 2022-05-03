<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = defineProps<{
  text: string
  width?: string | number
  position?: 'left' | 'right' | 'bottom'
}>()

const rootElem = ref<HTMLDivElement | null>(null)

const componentClass = computed(() => {
  const _class = []

  if (props.position) _class.push(`status--${props.position}`)
  if (props.width) _class.push('status--width-limited')

  return _class
})

onMounted(() => {
  if (props.width && rootElem.value) {
    rootElem.value.style.setProperty('--content-width', `${props.width}px`)
  }
})
</script>

<template>
  <div class="lv-tooltip" :class="componentClass" :aria-label="text" ref="rootElem">
    <slot />
  </div>
</template>

<style lang="less">
@import (reference) "../Mixins";

.lv-tooltip {
  --theme-color: #383838;

  position: relative;
  cursor: pointer;

  &::before, &::after {
    position: absolute;
    left: 50%;
    bottom: 100%;
    z-index: 10;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s ease;
  }

  &::before {
    content: "";
    display: block;
    transform: translate(-50%, 10px);
    border: 5px solid transparent;
    border-top-color: var(--theme-color);
  }

  &::after {
    content: attr(aria-label);
    display: block;
    line-height: 1em;
    background: var(--theme-color);
    color: var(--white);
    border-radius: var(--border-radius);
    padding: 0.5em 1em;
    font-size: var(--tiny-font);
    white-space: nowrap;
    transform: translate(-50%, 0);
  }

  &:hover {
    &::before, &::after {
      opacity: 1;
      visibility: visible;
    }

    &::before {
      transform: translate(-50%, 0);
    }

    &::after {
      transform: translate(-50%, -10px);
    }
  }

  &.status--bottom {
    &::before, &::after {
      top: 100%;
      bottom: initial;
    }

    &::before {
      transform: translate(-50%, -10px);
      border-top-color: transparent;
      border-bottom-color: var(--theme-color);
    }

    &:hover {
      &::before {
        transform: translate(-50%, 0);
      }

      &::after {
        transform: translate(-50%, 10px);
      }
    }
  }

  &.status--left {
    &::before, &::after {
      top: 50%;
      left: initial;
      bottom: initial;
      right: 100%;
    }

    &::before {
      transform: translate(10px, -50%);
      border-top-color: transparent;
      border-left-color: var(--theme-color);
    }

    &::after {
      transform: translate(0, -50%);
    }

    &:hover {
      &::before {
        transform: translate(0, -50%);
      }

      &::after {
        transform: translate(-10px, -50%);
      }
    }
  }

  &.status--right {
    &::before, &::after {
      top: 50%;
      left: 100%;
      bottom: initial;
      right: initial;
    }

    &::before {
      transform: translate(-10px, -50%);
      border-top-color: transparent;
      border-right-color: var(--theme-color);
    }

    &::after {
      transform: translate(0, -50%);
    }

    &:hover {
      &::before {
        transform: translate(0, -50%);
      }

      &::after {
        transform: translate(10px, -50%);
      }
    }
  }

  &.status--width-limited {
    &::after {
      white-space: normal;
      width: var(--content-width);
    }
  }
}

</style>
