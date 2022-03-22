<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface RadioItem {
  text: string
  value: number | string
  disabled?: boolean
}

const props = defineProps<{
  modelValue: number | string
  items: RadioItem[]
  name?: string,
  reverse?: boolean
  vertical?: boolean
  shape?: 'button' | undefined
}>()
const emit = defineEmits(['update:modelValue'])

const innerValue = ref(props.modelValue)

const componentClass = computed(() => {
  if (props.vertical) return 'lv-radios--vertical'
  return ''
})

watch(() => props.modelValue, value => {
  innerValue.value = value
})
watch(innerValue, value => {
  emit('update:modelValue', value)
})

function getItemClass (item: RadioItem) {
  const classes = []

  if (props.shape) {
    classes.push(`lv-radio--${props.shape}`)
  } else {
    classes.push('lv-radio')
  }

  if (props.reverse) {
    classes.push('lv-radio--reverse')
  }

  if (item.disabled) {
    classes.push('lv-radio--disabled')
  }

  return classes
}
</script>

<template>
  <div class="lv-radios" :class="componentClass">
    <label
      class="lv-radios__item"
      v-for="(item, i) of items"
      :key="`radio-item-${i}`"
      :class="getItemClass(item)"
    >
      <input
        class="lv-radio__input"
        type="radio"
        :value="item.value"
        :name="name"
        :disabled="item.disabled"
        v-model="innerValue"
      >
      <span class="lv-radio__text">{{ item.text }}</span>
    </label>
  </div>
</template>

<style lang="less" scoped>
@import (reference) "../Mixins";

.lv-radios {
  display: flex;
  align-items: center;

  &__item {
    &:not(:first-child) {
      margin-left: var(--2unit);
    }
  }

  &--vertical {
    flex-direction: column;
    align-items: flex-start;

    .lv-radios__item {
      width: 100%;

      &:not(:first-child) {
        margin-left: 0;
        margin-top: var(--2unit);
      }
    }
  }
}

.lv-radio {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  font-size: var(--small-font);
  height: var(--2unit);
  cursor: pointer;

  &__input {
    appearance: none;
    width: var(--2unit);
    height: var(--2unit);
    box-shadow: none;
    border: 1px solid var(--second-color);
    border-radius: 50%;
    margin: 0;
    margin-right: var(--unit);

    &:checked {
      border-color: var(--blue-color);

      & + .lv-radio__text::after {
        transform: scale(0.5);
      }
    }
  }

  &__text::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: var(--2unit);
    height: var(--2unit);
    border-radius: 50%;
    background-color: var(--blue-color);
    transform: scale(0);
    transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &.lv-radio--reverse {
    flex-direction: row-reverse;

    .lv-radio__input {
      margin-right: 0;
      margin-left: var(--unit);
    }

    .lv-radio__text::after {
      left: inherit;
      right: 0;
    }
  }

  &.lv-radio--disabled {
    cursor: not-allowed;
    color: var(--disabled-color);

    .lv-radio__input {
      border-color: var(--disabled-color);

      &:checked {
        background-color: var(--disabled-color);
      }
    }
  }
}

.lv-radio--button {
  .lv-radio__input {
    display: none;

    &:checked + .lv-radio__text {
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

  .lv-radio__text {
    .btn;
    .btn-ghost;
    .flex-start;
  }

  &.lv-radio--disabled {
    .lv-radio__text {
      cursor: not-allowed;
      color: var(--disabled-color);
      border-color: var(--disabled-color);
    }

    .lv-radio__input {
      &:checked + .lv-radio__text {
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
