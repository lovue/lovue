<script setup lang="ts">
import ComponentDemo from './ComponentDemo.vue'
import { LvMenu } from '../src/index'
import type { Menu } from '../src/extension/LvMenu.vue'

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
      { title: '申购赎回管理', url: '/otc/purchase.html', mode: 'nonLink' },
      { title: '客户信息管理', url: '/otc/information.html', mode: 'SPA' },
      { title: '客户持仓管理', url: '/otc/customer-position.html', mode: 'link' },
      { title: '基金返账管理', url: '/otc/vi-settlement.html' }
    ]
  }
]

function clickItem (value: Menu) {
  console.log(value)
}
</script>

<template>
  <ComponentDemo id="toMenu" title="LvMenu">
    <div class="usage">
      <pre><code>// types
export type MenuMode = 'SPA' | 'link' | 'nonLink'
export interface Menu {
  title?: string
  icon?: string
  url?: string
  mode?: MenuMode
  children?: Menu[]
  _focus?: boolean
  _open?: boolean
  _openIcon?: boolean
}

const props = defineProps&lt;{
  items: Menu[]
  vertical?: boolean
  mode?: MenuMode
}&gt;()
const emit = defineEmits(['click-item'])
      </code></pre>
    </div>

    <div class="controls">
      <LvMenu :items="menus" />
    </div>

    <div class="controls">
      <LvMenu :items="menus" vertical @click-item="clickItem" />
    </div>
  </ComponentDemo>
</template>
