<script setup lang="ts">
import ComponentDemo from './ComponentDemo.vue'
import { DropdownItem } from '../src/components/LvDropdown.vue'

const items = [
  { text: '个人中心', icon: 'home' },
  { type: 'link', url: 'https://www.baidu.com', text: '修改密码', icon: 'guard' },
  { type: 'divider' },
  { text: '退出登录', icon: 'logout' }
]

function clickItem (item: DropdownItem) {
  window.alert(item.text)
}
</script>

<template>
  <ComponentDemo id="toDropdown" title="LvDropdown">
    <div class="usage">
      <pre><code>// Props
  title: string
  icon?: string
  align?: 'right' | 'bottom' | undefined
  items: {
    type?: 'link' | 'divider'
    icon?: string
    text?: string
    url?: string
  }[]

// Emit
  click-item
      </code></pre>
    </div>

    <div class="controls">
      <LvDropdown title="左对齐" icon="tool" :items="items" @click-item="clickItem" />
      <LvDropdown style="margin-left: 100px;" title="右对齐" align="right" :items="items" />
      <LvDropdown style="margin-left: 100px;" title="底部对齐" align="bottom" :items="items" />
      <LvDropdown style="margin-left: 100px;" title="底部右对齐" align="bottom-right" :items="items" />
    </div>
  </ComponentDemo>
</template>

<style lang="less" scoped>
</style>
