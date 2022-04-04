<script setup lang="ts">
import { ref, nextTick, computed, onMounted, watch } from 'vue'

const props = defineProps<{
  modelValue: string | number | null
  label?: string
  type?: string
  name?: string
  placeholder?: string
  pattern?: string
  required?: boolean
  disabled?: boolean
  focus?: boolean
  resize?: boolean
  readonly?: boolean
  vertical?: boolean
  step?: number
  min?: number
  max?: number
  minlength?: number
  maxlength?: number
}>()
const emit = defineEmits(['update:modelValue', 'enter', 'blur'])

const hiddenValueElem = ref<HTMLDivElement | null>(null)
const inputElem = ref<HTMLInputElement | null>(null)
const width = ref(0)
const innerValue = ref<string | number | null>(props.modelValue)

const componentClass = computed(() => {
  if (props.vertical) return 'lv-input--vertical'
  return ''
})
const inputStyle = computed(() => {
  if (props.resize) {
    return {
      minWidth: width.value + 'px'
    }
  }

  return {}
})

watch(() => props.modelValue, value => {
  innerValue.value = value

  if (props.resize) {
    nextTick(() => {
      width.value = hiddenValueElem.value?.offsetWidth || 0
    })
  }
})
watch(innerValue, value => {
  emit('update:modelValue', value)
})

onMounted(() => {
  if (props.focus) {
    inputElem.value?.focus()
  }
})
</script>

<template>
  <div class="lv-input" :class="componentClass">
    <div class="hidden-value" ref="hiddenValueElem" v-if="resize">{{ innerValue }}</div>
    <label class="lv-input__label" v-if="label">{{ label }}</label>
    <input
      class="native-input"
      autocomplete="off"
      ref="inputElem"
      :style="inputStyle"
      :type="type"
      :name="name"
      :step="step"
      :min="min"
      :max="max"
      :placeholder="placeholder"
      :pattern="pattern"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :minlength="minlength"
      :maxlength="maxlength"
      v-model="innerValue"
      @keypress.enter="$emit('enter', innerValue)"
      @blur="$emit('blur', innerValue)"
    >
  </div>
</template>

<style lang="less">
.native-input, .native-textarea, .native-select {
  font-size: var(--small-font);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  transition: border-color 0.2s;

  &:not([disabled]):not([readonly]):hover {
    border-color: var(--hover-blue);
  }

  &[disabled] {
    cursor: not-allowed;
  }

  &[readonly] {
    cursor: default;
  }
}

.lv-input {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-width: 200px;
  font-size: var(--small-font);

  &__label {
    color: var(--second-color);
    margin-right: var(--unit);
  }

  .hidden-value {
    position: absolute;
    left: 0;
    padding: 4px 10px;
    white-space: nowrap;
    z-index: -1;
    opacity: 0;
  }

  .native-input {
    width: 100%;
    height: var(--4unit);
    line-height: var(--4unit);
    padding: 0 var(--unit);

    &:focus {
      border-color: var(--blue-color);
    }

    &[type="number"] {
      padding-right: 0;
    }
  }

  &--vertical {
    flex-direction: column;
    align-items: flex-start;

    .lv-input__label {
      margin-right: 0;
      margin-bottom: var(--unit);
    }
  }
}
</style>
