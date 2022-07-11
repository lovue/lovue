<script setup lang="ts">
import { ref, computed } from 'vue'
import LvButton from './LvButton.vue'
import LvIcon from './LvIcon.vue'

export interface Props {
  modelValue?: boolean
  title?: string
  body?: string
  okText?: string
  cancelText?: string
  noFooter?: boolean
  simple?: boolean
  fixed?: boolean
  visible?: boolean
  class?: string
  confirm?: () => unknown
}

const props = withDefaults(defineProps<Props>(), {
  okText: '确认',
  cancelText: '取消'
})
const emit = defineEmits(['update:modelValue'])

const loading = ref(false)
const position = ref({
  x: 0,
  y: 0
})
const startX = ref(0)
const startY = ref(0)
const dragFlag = ref(false)
const isStartClickInDialog = ref(false)

const componentClass = computed(() => {
  const _class = []

  if (props.simple) {
    _class.push('status--simple')
  }

  if (props.fixed) {
    _class.push('status--fixed')
  }

  if (props.visible) {
    _class.push('status--visible')
  }

  if (props.class) {
    _class.push(props.class)
  }

  return _class
})
const windowStyle = computed(() => {
  return {
    transform: `translateX(${position.value.x}px) translateY(${position.value.y}px)`
  }
})

function close () {
  emit('update:modelValue', false)
}

function clickDialog () {
  isStartClickInDialog.value = false
  document.documentElement.click()
}

async function clickOK () {
  if (!props.confirm) {
    close()
    return
  }

  if (props.confirm.constructor.name === 'AsyncFunction') {
    if (loading.value) return
    loading.value = true

    const result = await (props.confirm() as Promise<unknown>).finally(() => {
      loading.value = false
    })
    if (result !== false) close()
    return
  }

  const result = props.confirm()
  if (result !== false) close()
}

function dragStart (ev: MouseEvent) {
  startX.value = ev.pageX - position.value.x
  startY.value = ev.pageY - position.value.y
  dragFlag.value = true
}

function dragging(ev: MouseEvent) {
  if (!dragFlag.value) return

  position.value.x = ev.pageX - startX.value
  position.value.y = ev.pageY - startY.value
}

function dragEnd() {
  dragFlag.value = false
}

function startClickInDialog () {
  isStartClickInDialog.value = true
}

function clickOutside () {
  if (isStartClickInDialog.value) {
    isStartClickInDialog.value = false
    return
  }
  close()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div
        class="lv-dialog"
        :class="componentClass"
        v-if="modelValue"
        @click="clickOutside"
        @mousemove="dragging"
        @mouseup="dragEnd"
      >
        <div class="lv-dialog__window" :style="windowStyle" @click.stop="clickDialog" @mousedown="startClickInDialog">
          <div class="lv-dialog__head" @mousedown="dragStart">
            <div class="title-text">{{ title }}</div>
            <div class="lv-dialog__close" @click="close">
              <LvIcon icon="close" :size="18" />
            </div>
          </div>
          <div class="lv-dialog__body">
            <slot>{{ body }}</slot>
          </div>
          <div class="lv-dialog__footer" v-if="!noFooter">
            <slot name="footer">
              <LvButton theme="ghost" @click="close">{{ cancelText }}</LvButton>
              <LvButton :loading="loading" @click="clickOK">{{ okText }}</LvButton>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="less">
@import (reference) "../Mixins";

.lv-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgb(0 0 0 / 25%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  overscroll-behavior: contain;

  &.status--simple {
    .lv-dialog__head {
      display: none;
    }

    .lv-dialog__body {
      padding: var(--4unit) var(--3unit);
    }

    .lv-dialog__footer {
      border-top: none;
    }
  }

  &.status--fixed {
    align-items: flex-start;

    .lv-dialog__window {
      margin-top: 100px;
    }
  }

  &.status--visible {
    .lv-dialog__body {
      overflow-y: visible;
    }
  }
}

.lv-dialog__window {
  .shadow;

  background-color: var(--white);
  border-radius: var(--border-radius);
}

.lv-dialog__head {
  user-select: none;
  cursor: move;
  font-size: var(--normal-font);
  position: relative;
  line-height: var(--bar-height);
  border-bottom: 1px solid var(--border-color);
  padding-left: var(--2unit);
  display: flex;
  justify-content: space-between;
  border-radius: var(--border-radius) var(--border-radius) 0 0;

  .lv-dialog__close {
    padding: 0 var(--2unit);
    cursor: pointer;
    transition: color 0.25s;

    &:hover {
      color: var(--pink-color);
    }
  }
}

.lv-dialog__body {
  max-height: calc(85vh - 2 * var(--bar-height));
  max-width: 80vw;
  min-width: 520px;
  padding: var(--unit) var(--2unit);
  overflow-y: auto;

  @media (max-height: 800px) {
    max-height: calc(95vh - 2 * var(--bar-height));
  }
}

.lv-dialog__footer {
  padding: var(--unit) var(--2unit);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid var(--border-color);

  .lv-button-ghost {
    margin-right: var(--unit);
  }
}

.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}
</style>
