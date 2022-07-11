<script setup lang="ts">
import { ref } from 'vue'
import ComponentDemo from './ComponentDemo.vue'

const rows = [
  { prop: 'v-model', desc: '组件双向绑定的值', type: 'String, Number', deft: '无', value: 120313, checked: 1 },
  { prop: 'effect', desc: '是否特效模式', type: 'Boolean', deft: '无', value: 92381234.3234, checked: 0 },
  { prop: 'type', desc: 'input的type值', type: 'String', deft: '无', value: 120313, checked: 1 },
  { prop: 'name', desc: 'input的name值', type: 'String', deft: '无', value: 120313, checked: 1 },
  { prop: 'placeholder', desc: 'input的placeholder值', type: 'String', deft: '无', value: 120313, checked: 1 },
  { prop: 'required', desc: 'input的required值', type: 'Boolean', deft: '无', value: 120313, checked: 1 },
  { prop: 'pattern', desc: 'input的pattern值', type: 'String', deft: '无', value: 120313, checked: 1 },
  { prop: 'disabled', desc: '是否禁用', type: 'Boolean', deft: '无', value: 120313, checked: 1 },
  { prop: 'step', desc: 'number类型的input的step值', type: 'String', deft: '无', value: 923812.343234, checked: 0 },
  { prop: 'min', desc: 'number类型的input的min值', type: 'String, Number', deft: '无', value: 9238.12343234, checked: 0 },
  { prop: 'max', desc: 'number类型的input的max值', type: 'String, Number', deft: '无', value: 923812343234, checked: 0 },
  { prop: 'minlength', desc: 'input的minlength值', type: 'String, Number', deft: '无', value: 9238123432.34, checked: 0 },
  { prop: 'maxlength', desc: 'input的minlength值', type: 'String, Number', deft: '无', value: 9238123.43234, checked: 0 },
  { prop: 'focus', desc: '是否自动获得焦点', type: 'Boolean', deft: '无', value: 923812343234, checked: 0 },
  { prop: 'resize', desc: '是否自动调整宽度', type: 'Boolean', deft: '无', value: 923812343234, checked: 0 },
  { prop: 'readonly', desc: 'input的readonly值', type: 'Boolean', deft: '无', value: 92381234323.4, checked: 0 },
  { prop: '@enter', desc: '按回车时触发该事件', type: 'Function', deft: '无', value: 923812343234, checked: 0 }
]

const columns = [
  { title: '属性', prop: 'prop', sortable: true },
  { title: '说明', prop: 'desc' },
  { title: '类型', prop: 'type' },
  { title: '默认值', prop: 'deft' },
  { title: '价值', prop: 'value', formatter: 'thousands' },
  { title: '是否选中', prop: 'checked', formatter: (value: number) => Boolean(value) }
]

const loading = ref(false)

function showSelected (_rows: []) {
  console.log(_rows)
}

function startLoading () {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <ComponentDemo id="toTable" title="LvTable">
    <div class="usage">
      <pre><code>// types
interface Column {
  title?: string
  prop?: string
  sortable?: boolean
  cssClass?: string
  formatter?: 'thousands' | 'numberToBoolean' | (&lt;T&gt;(x: T) => T)
}

const props = withDefaults(defineProps&lt;{
  rows: []
  columns: Column[]
  simple?: boolean
  simplePagination?: boolean
  fixedHead?: boolean
  checkbox?: boolean
  emptyText?: string
  total?: number
}&gt;(), {
  emptyText: '暂无数据'
})
const emit = defineEmits(['click-row', 'checked'])
      </code></pre>
    </div>

    <LvButton @click="startLoading">Start Loading</LvButton>

    <div>
      <LvTable :rows="rows" :columns="columns" :loading="loading" checkbox @checked="showSelected" />
    </div>
    <div style="margin-top: 32px;">
      <LvTable :rows="rows" :columns="columns" :loading="loading" simple fixed-head />
    </div>
    <div style="margin-top: 32px;">
      <LvTable :rows="rows" :columns="columns" :loading="loading" simple checkbox />
    </div>
  </ComponentDemo>
</template>
