<script setup lang="ts">
import ComponentDemo from './ComponentDemo.vue'
import { DropdownItem } from '../src/index'

const items = [
  { type: 'SPA', url: '/home', text: '个人中心', icon: 'home' },
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
      <pre><code>// types
export interface DropdownItem {
  type?: 'link' | 'divider'
  icon?: string
  text?: string
  url?: string
}

defineProps&lt;{
  title?: string
  icon?: string
  align?: 'right' | 'bottom' | 'bottom-right'
  items: DropdownItem[]
}&gt;()
const emit = defineEmits(['clickItem'])
      </code></pre>
    </div>

    <div class="controls">
      <LvDropdown title="左对齐" icon="tool" :items="items" @click-item="clickItem" />
      <LvDropdown style="margin-left: 100px;" title="右对齐" align="right" :items="items" />
      <LvDropdown style="margin-left: 100px;" title="底部对齐" align="bottom" :items="items" />
      <LvDropdown style="margin-left: 100px;" title="底部右对齐" align="bottom-right" :items="items" />
    </div>

    <div class="controls">
      <LvDropdown :items="items" align="right">
        <template #default>
          <div class="custom-trigger" style="padding: 16px 24px;">Custom Trigger</div>
        </template>
      </LvDropdown>
    </div>
  </ComponentDemo>
</template>
