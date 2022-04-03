<script setup lang="ts">
import { ref, watch } from 'vue'
import LvInput from './LvInput.vue'
import LvIcon from './LvIcon.vue'

const props = withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
  auto?: boolean
  delay?: number
}>(), {
  placeholder: '关键词',
  auto: true,
  delay: 300
})
const emit = defineEmits(['search', 'update:modelValue'])

let timer: number
const keywords = ref(props.modelValue || '')

watch(keywords, value => {
  if (!props.auto) return

  if (timer) window.clearTimeout(timer)

  timer = window.setTimeout(() => {
    search(value)
  }, props.delay)
})
watch(() => props.modelValue, value => {
  keywords.value = value || ''
})

function search (value: string) {
  emit('search', value)

  if (props.modelValue !== undefined) {
    emit('update:modelValue', value)
  }
}
</script>

<template>
  <div class="lv-search">
    <LvInput :placeholder="placeholder" v-model="keywords" />
    <LvIcon icon="search" @click="search(keywords)" />
  </div>
</template>

<style lang="less">
.lv-search {
  position: relative;
  min-width: 200px;

  .lv-input {
    width: 100%;

    .native-input {
      padding-right: calc(var(--unit) + 20px);
    }
  }

  .lv-icon-search {
    position: absolute;
    top: 6px;
    right: 6px;
    color: var(--second-color);
    cursor: pointer;
  }
}
</style>
