<script setup lang="ts">
import ComponentDemo from './ComponentDemo.vue'
import { LvMenu } from '../src/index'

const menus = [
  {
    title: '交易流水',
    icon: 'setting',
    _focus: true,
    _open: false,
    _openIcon: false,
    _height: 0,
    children: [
      { title: 'OTC商品期权', url: '/otc/options.html', _focus: true },
      { title: 'OTC价差期权', url: '/otc/spread.html' }
    ]
  },
  { title: '持仓管理', icon: 'setting', url: '/otc/position.html' },
  {
    title: 'TA管理',
    icon: 'setting',
    children: [
      { title: '申购赎回管理', url: '/otc/purchase.html' },
      { title: '客户信息管理', url: '/otc/information.html' },
      { title: '客户持仓管理', url: '/otc/customer-position.html' },
      { title: '基金返账管理', url: '/otc/vi-settlement.html' }
    ]
  }
]
</script>

<template>
  <ComponentDemo id="toMenu" title="LvMenu">
    <div class="usage">
      <pre><code>// types
export interface Menu {
  title?: string
  icon?: string
  url?: string
  children?: Menu[]
  _focus?: boolean
  _open?: boolean
  _openIcon?: boolean
}

const props = defineProps&lt;{
  items: Menu[]
  vertical?: boolean
  mode?: string
}&gt;()
const emit = defineEmits(['click-item'])
      </code></pre>
    </div>

    <div class="controls">
      <LvMenu :items="menus" />
    </div>

    <div class="controls" @click="add">
      <LvMenu :items="menus" vertical />
    </div>
  </ComponentDemo>
</template>
