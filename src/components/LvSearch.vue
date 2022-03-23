<script setup lang="ts">
import { ref, watch } from 'vue'
import LvInput from './LvInput.vue'
import LvIcon from './LvIcon.vue'

const props = withDefaults(defineProps<{
  placeholder?: string
  auto?: boolean
  delay?: number
}>(), {
  placeholder: '关键词',
  auto: true,
  delay: 500
})
const emit = defineEmits(['search'])

let timer: number
const keywords = ref('')

watch(keywords, value => {
  if (!props.auto) return

  if (timer) window.clearTimeout(timer)

  timer = window.setTimeout(() => {
    emit('search', value)
  }, props.delay)
})
</script>

<template>
  <div class="lv-search">
    <LvInput :placeholder="placeholder" v-model="keywords" />
    <LvIcon icon="search" @click="$emit('search', keywords)" />
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
