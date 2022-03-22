<script setup lang="ts">
import { computed, ref, watch } from 'vue'

export interface OptionItem {
  text: string
  value: number | string | undefined
  disabled?: boolean
}

const props = defineProps<{
  type: 'radio' | 'checkbox'
  modelValue: number | string | boolean | []
  items: OptionItem[]
  name?: string,
  reverse?: boolean
  vertical?: boolean
  shape?: 'button' | undefined
}>()
const emit = defineEmits(['update:modelValue'])

const innerValue = ref(props.modelValue)

const componentClass = computed(() => {
  if (props.vertical) return 'lv-options--vertical'
  return ''
})

watch(() => props.modelValue, value => {
  innerValue.value = value
})
watch(innerValue, value => {
  emit('update:modelValue', value)
})

function getItemClass (item: OptionItem) {
  const classes = []

  if (props.shape) {
    classes.push(`lv-option--${props.shape}`)
  } else {
    classes.push('lv-option--default')
    classes.push(`lv-option__${props.type}`)
  }

  if (props.reverse) {
    classes.push('lv-option--reverse')
  }

  if (item.disabled) {
    classes.push('lv-option--disabled')
  }

  return classes
}
</script>

<template>
  <div class="lv-options" :class="componentClass">
    <label
      class="lv-option"
      v-for="(item, i) of items"
      :key="`option-item-${i}`"
      :class="getItemClass(item)"
    >
      <input
        class="lv-option__input"
        :type="type"
        :value="item.value"
        :name="name"
        :disabled="item.disabled"
        v-model="innerValue"
      >
      <span class="lv-option__text">{{ item.text }}</span>
    </label>
  </div>
</template>

<style lang="less" scoped>
@import (reference) "../Mixins";

.lv-options {
  display: flex;
  align-items: center;

  .lv-option {
    &:not(:first-child) {
      margin-left: var(--2unit);
    }
  }

  &--vertical {
    flex-direction: column;
    align-items: flex-start;

    .lv-option {
      width: 100%;

      &:not(:first-child) {
        margin-left: 0;
        margin-top: var(--2unit);
      }
    }
  }
}

.lv-option--default {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  font-size: var(--small-font);
  height: var(--2unit);
  cursor: pointer;

  .lv-option__input {
    appearance: none;
    width: var(--2unit);
    height: var(--2unit);
    box-shadow: none;
    border: 1px solid var(--second-color);
    margin: 0;
    margin-right: var(--unit);
  }

  .lv-option__text::after {
    content: "";
    position: absolute;
    left: 0;
    transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &.lv-option--reverse {
    flex-direction: row-reverse;

    .lv-option__input {
      margin-right: 0;
      margin-left: var(--unit);
    }

    .lv-option__text::after {
      left: inherit;
    }
  }

  &.lv-option--disabled {
    cursor: not-allowed;
    color: var(--disabled-color);

    .lv-option__input {
      border-color: var(--disabled-color);

      &:checked {
        background-color: var(--disabled-color);
      }
    }
  }
}

.lv-option__radio {
  .lv-option__input {
    border-radius: 50%;

    &:checked {
      border-color: var(--blue-color);

      & + .lv-option__text::after {
        transform: scale(0.5);
      }
    }
  }

  .lv-option__text::after {
    top: 0;
    width: var(--2unit);
    height: var(--2unit);
    border-radius: 50%;
    background-color: var(--blue-color);
    transform: scale(0);
  }

  &.lv-option--reverse {
    .lv-option__text::after {
      right: 0;
    }
  }
}

.lv-option__checkbox {
  .lv-option__input {
    border-radius: 2px;

    &:checked {
      border: none;
      background-color: var(--blue-color);

      & + .lv-option__text::after {
        transform: scale(1) rotateZ(37deg);
      }
    }
  }

  .lv-option__text::after {
    top: 2px;
    width: 7px;
    height: 12px;
    border: 2px solid var(--white);
    border-top-color: transparent;
    border-left-color: transparent;
    transform-origin: 120% 90%;
    transform: scale(0) rotateZ(37deg);
  }

  &.lv-option--reverse {
    .lv-option__text::after {
      right: 9px;
    }
  }
}

.lv-option--button {
  .lv-option__input {
    display: none;

    &:checked + .lv-option__text {
      background-color: var(--blue-color);
      color: var(--white);
      border-color: transparent;

      &:hover {
        background-color: var(--hover-blue);
      }

      &:active {
        background-color: var(--active-blue);
      }
    }
  }

  .lv-option__text {
    .btn;
    .btn-ghost;
    .flex-start;
  }

  &.lv-option--disabled {
    .lv-option__text {
      cursor: not-allowed;
      color: var(--disabled-color);
      border-color: var(--disabled-color);
    }

    .lv-option__input {
      &:checked + .lv-option__text {
        opacity: 0.5;
        cursor: not-allowed;

        &:hover {
          background-color: var(--blue-color);
        }
      }
    }
  }
}
</style>
