<script setup lang="ts">
import LvIcon from './LvIcon.vue'
import type { DropdownItem } from '../types'

defineProps<{
  title?: string
  icon?: string
  align?: 'right' | 'bottom' | 'bottom-right'
  items: DropdownItem[]
}>()
const emit = defineEmits(['click-item'])

function isType (type?: string) {
  if (type === 'link') return 'a'
  if (type === 'SPA') return 'router-link'
  return 'div'
}

function getAttrs (item: DropdownItem) {
  if (item.type === 'link') return {
    href: item.url,
    target: '_blank',
  }

  if (item.type === 'SPA') return {
    to: item.url,
  }

  return {}
}

function clickItem (item: DropdownItem) {
  if (item.type === undefined) emit('click-item', item)
}
</script>

<template>
  <div class="lv-dropdown">
    <div class="lv-dropdown__trigger">
      <slot>
        <LvIcon :icon="icon" v-if="icon" />
        <span v-if="title">{{ title }}</span>
      </slot>
    </div>
    <div class="lv-dropdown__items" :class="align ? `align-${align}` : ''">
      <template v-for="(item, i) of items">
        <div class="lv-dropdown__divider" :key="`item${i}`" v-if="item.type === 'divider'" />
        <component
          class="lv-dropdown__item"
          :key="`item${i}`"
          :is="isType(item.type)"
          v-bind="getAttrs(item)"
          v-else
          @click="clickItem(item)"
        >
          <LvIcon :icon="item.icon" v-if="item.icon" />
          <span v-if="item.text">{{ item.text }}</span>
        </component>
      </template>
    </div>
  </div>
</template>

<style lang="less">
.lv-dropdown {
  position: relative;

  &__trigger {
    display: flex;
    align-items: center;
    font-size: var(--small-font);
    cursor: pointer;

    .lv-icon {
      width: 14px;
      height: 14px;
      margin-right: var(--unit);
    }
  }

  &__items {
    font-size: var(--small-font);
    line-height: 1.5;
    color: var(--light-black);
    box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
    background-clip: padding-box;
    border-radius: var(--border-radius);
    padding: 4px 0;
    background-color: var(--white);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    position: absolute;
    z-index: 5;

    &.align-right {
      left: auto;
      right: 0;
    }

    &.align-bottom {
      top: auto;
      bottom: 100%;
    }

    &.align-bottom-right {
      top: auto;
      right: 0;
      bottom: 100%;
      left: auto;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding: 5px 12px;
    line-height: 22px;
    transition: all 0.3s;
    cursor: pointer;

    .lv-icon {
      width: 14px;
      height: 14px;
      margin-right: var(--unit);
    }

    &:hover {
      color: var(--blue-color);
    }
  }

  &__divider {
    height: 1px;
    line-height: 0;
    margin: 4px 0;
    background-color: #e8e8e8;
  }

  &:hover {
    .lv-dropdown__items {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
