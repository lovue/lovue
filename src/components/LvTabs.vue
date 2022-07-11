<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import LvIcon from './LvIcon.vue'

interface IconItem {
  text?: string
  icon?: string
}

export type TabItem = IconItem | string | number

const props = defineProps<{
  modelValue: number
  items: TabItem[]
  locked?: boolean
}>()
const emit = defineEmits(['update:modelValue'])

const tabsElem = ref<HTMLElement | null>(null)
const currentIndex = ref(-1)
const componentWidth = ref(0)
const tabsWidth = ref<number[]>([])
const lineStyle = ref<{
  left?: string
  right?: string
  transition?: string
}>({})

watch(() => props.modelValue, setTab)

onMounted(() => {
  calculateTabsWidth()
  setTab(props.modelValue || 0)

  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler)
})

function calculateTabsWidth () {
  if (!tabsElem.value) return

  tabsWidth.value = []
  componentWidth.value = tabsElem.value.offsetWidth

  tabsElem.value.querySelectorAll('.lv-tabs__item').forEach(elem => {
    if (!(elem instanceof HTMLElement)) return

    if (props.locked) {
      elem.style.pointerEvents = 'none'
    }

    tabsWidth.value.push(elem.offsetWidth)
  })
}

function refreshLinePosition (index?: number) {
  const _index = index === undefined ? currentIndex.value : index

  let leftWidth = 0

  for (let i = 0; i < _index; i++) {
    leftWidth += tabsWidth.value[i]
  }

  const rightWidth = componentWidth.value - leftWidth - tabsWidth.value[_index]

  lineStyle.value = {
    left: `${leftWidth}px`,
    right: `${rightWidth}px`,
  }
}

function setTab (index: number) {
  if (currentIndex.value === index) return

  refreshLinePosition(index)

  if (currentIndex.value < index) {
    lineStyle.value.transition = 'left .3s ease-out .09s, right .3s ease-out'
  } else {
    lineStyle.value.transition = 'left .3s ease-out, right .3s ease-out .09s'
  }

  currentIndex.value = index

  emit('update:modelValue', index)
}

function clickTab (index: number) {
  if (currentIndex.value === index) return

  setTab(index)
}

function resizeHandler () {
  calculateTabsWidth()
  refreshLinePosition()
}
</script>

<template>
  <div class="lv-tabs" ref="tabsElem">
    <div
      class="lv-tabs__item"
      v-for="(item, i) of items"
      :key="`item-${i}`"
      @click="clickTab(i)"
    >
      <LvIcon :icon="item.icon" :size="16" v-if="item.icon" />
      <span>{{ item.text || item }}</span>
    </div>
    <div class="lv-tabs__line" :style="lineStyle" />
  </div>
</template>

<style lang="less">
@import (reference) "../Mixins";

.lv-tabs {
  position: relative;
  display: inline-flex;
  border-bottom: 1px solid var(--border-color);

  &__item {
    line-height: 48px;
    height: 48px;
    white-space: nowrap;
    flex: 1;
    padding: 0 10px;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;

    .lv-icon {
      margin-right: 4px;
    }
  }

  &__line {
    position: absolute;
    bottom: -1px;
    height: 2px;
    background-color: var(--blue-color);
    will-change: left, right;
  }
}

</style>
