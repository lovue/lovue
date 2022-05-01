<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import LvIcon from './LvIcon.vue'

export type ToastType = 'info' | 'success' | 'error' | 'warn'

export interface Props {
  text: string
  showClose?: boolean
  duration?: number
  type: ToastType
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])

const visible = ref(false)

const iconType = computed(() => {
  const maps = {
    info: 'info',
    success: 'check',
    error: 'close',
    warn: 'warn'
  }

  return maps[props.type]
})

onMounted(() => {
  visible.value = true

  if (!props.showClose) {
    setTimeout(close, props.duration || 2000)
  }
})

function close () {
  visible.value = false

  setTimeout(() => {
    emit('close')
  }, 400)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="toast">
      <div class="lv-toast" v-if="visible">
        <div class="toast-icon" :class="`toast--${type}`">
          <LvIcon :icon="iconType" />
        </div>
        <p class="toast-text">{{ text }}</p>
        <LvIcon icon="close" v-if="showClose" @click="close" />
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="less">
@import (reference) "../Mixins";

.lv-toast {
  .shadow;

  min-width: 300px;
  height: 40px;
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--white);
  border-radius: var(--border-radius);
  overflow: hidden;
  display: flex;
  z-index: 2000;

  .toast-icon {
    width: 40px;
    height: 40px;
    padding-top: 10px;

    .lv-icon {
      width: 40px;
      height: 20px;
      color: var(--white);
      vertical-align: top;
    }

    &.toast--info {
      background-color: var(--blue-color);
      padding-top: 5px;

      svg {
        height: 30px;
      }
    }

    &.toast--success {
      background-color: var(--success-color);
    }

    &.toast--warn {
      background-color: var(--warn-color);
      padding-top: 5px;

      svg {
        height: 30px;
      }
    }

    &.toast--error {
      background-color: var(--error-color);
    }
  }

  .toast-text {
    text-indent: 0;
    margin: 0;
    line-height: 40px;
    padding-left: 12px;
    padding-right: 40px;
    font-size: var(--small-font);
  }

  > .lv-icon-close {
    position: absolute;
    right: 0;
    top: 10px;
    width: 40px;
    height: 20px;
    color: var(--second-color);
    cursor: pointer;

    &:hover {
      color: var(--pink-color);
    }
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.3s, transform 0.4s;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>
