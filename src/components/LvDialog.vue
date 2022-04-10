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
  confirm?: () => Promise<boolean>
}

const props = withDefaults(defineProps<Props>(), {
  okText: '确认',
  cancelText: '取消'
})
const emit = defineEmits(['update:modelValue'])

const loading = ref(false)

const componentClass = computed(() => {
  const _class = []

  if (props.simple) {
    _class.push('status--simple')
  }

  if (props.fixed) {
    _class.push('status--fixed')
  }

  return _class
})

function close () {
  emit('update:modelValue', false)
}

async function clickOK () {
  if (!props.confirm) {
    close()
    return
  }

  if (loading.value) return
  loading.value = true

  const result = await props.confirm()
  loading.value = false
  if (result) close()
}
</script>

<template>
  <Teleport to="body">
    <div class="lv-dialog" :class="componentClass" v-if="modelValue" @click="close">
      <div class="lv-dialog__window" @click.stop>
        <div class="lv-dialog__head">
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
  z-index: 1000;
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
  overflow-y: visible;

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
</style>