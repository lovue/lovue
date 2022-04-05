<script setup lang="ts">
import { ref, computed, watch, watchEffect } from 'vue'
import LvInput from './LvInput.vue'
import LvButton from './LvButton.vue'
import LvSelect from './LvSelect.vue'

export interface Pagination {
  index: number
  pageSize: number
}

const props = withDefaults(defineProps<{
  total: number
  pageSize?: number
  sizeOptions?: number[]
  simple?: boolean
  theme?: 'ghost' | 'text' | undefined
}>(), {
  pageSize: 10,
  sizeOptions: () => [10, 20, 50],
  theme: 'ghost'
})
const emit = defineEmits(['update'])

const _sizeOptions = props.sizeOptions.map(option => ({
  text: option,
  value: option
}))

const _pageSize = ref(props.pageSize)
const index = ref(1)

const pagesQuantity = computed(() => Math.ceil(props.total / _pageSize.value) || 1)
const showedPages = computed(() => {
  const _pages: number[] = []
  let _page = (index.value - 2) < 1 ? 1 : (index.value - 2)
  let i = 0

  while (i < 5) {
    if (_page > pagesQuantity.value) {
      if (_pages[0] > 1) _pages.unshift(_pages[0] - 1)
    } else {
      _pages.push(_page)
    }

    _page++
    i++
  }

  return _pages
})

watch(pagesQuantity, value => {
  if (index.value > value) index.value = value
})
watchEffect(() => {
  const _pagination: Pagination = {
    index: index.value,
    pageSize: _pageSize.value
  }
  emit('update', _pagination)
})

function prev () {
  if (index.value > 1) index.value--
}

function next () {
  if (index.value < pagesQuantity.value) index.value++
}

function jumpTo (value: number) {
  if (value < 1) {
    index.value = 1
  } else if (value > pagesQuantity.value) {
    index.value = pagesQuantity.value
  } else {
    index.value = value
  }
}
</script>

<template>
  <div class="lv-pagination">
    <template v-if="simple">
      <span>{{ index }}/{{ pagesQuantity }}页</span>
      <div class="lv-pagination__pages">
        <LvButton icon="left" :theme="theme" @click="prev" />
        <LvButton icon="right" :theme="theme" @click="next" />
      </div>
    </template>
    <template v-else>
      <span>共 {{ total }} 条</span>
      <div class="lv-pagination__select-count">
        <span>每页</span>
        <LvSelect :items="_sizeOptions" v-model="_pageSize" />
        <span>条</span>
      </div>
      <div class="lv-pagination__pages">
        <LvButton :theme="theme" @click="index = 1">首页</LvButton>
        <LvButton :theme="theme" @click="prev">上一页</LvButton>
        <template v-for="num of showedPages">
          <LvButton class="status--focus" theme="text" :key="`page-${num}`" v-if="index === num">{{ num }}</LvButton>
          <LvButton :theme="theme" :key="`page-${num}`" v-else @click="index = num">{{ num }}</LvButton>
        </template>
        <LvButton :theme="theme" @click="next">下一页</LvButton>
        <LvButton :theme="theme" @click="index = pagesQuantity">末页</LvButton>
      </div>
      <div class="lv-pagination__jump">
        <span>前往</span>
        <LvInput type="number" :model-value="index" @enter="jumpTo" @blur="jumpTo" />
        <span>页</span>
      </div>
    </template>
  </div>
</template>

<style lang="less">
@import (reference) "../Mixins";

.lv-pagination {
  .flex-center;

  font-size: var(--small-font);

  > .lv-button {
    margin: 0 4px;
    padding: 0 8px;
    min-width: 32px;
  }
}

.lv-pagination__select-count {
  .flex-start;

  margin-left: var(--unit);

  .lv-select {
    min-width: unset;
    margin: 0 4px;
  }
}

.lv-pagination__pages {
  display: flex;
  align-items: center;
  margin-left: var(--unit);

  .lv-button {
    margin: 0 4px;
    padding: 0 8px;
    min-width: 32px;

    &.status--focus {
      color: var(--pink-color);
      font-weight: bold;
      cursor: default;
    }
  }
}

.lv-pagination__jump {
  margin-left: 10px;

  .lv-input {
    width: 40px;
    min-width: 40px;
    padding: 0;
    margin: 0 4px;

    .native-input {
      padding-left: 0;
      text-align: center;

      &::-webkit-inner-spin-button {
        appearance: none;
      }
    }
  }
}
</style>
