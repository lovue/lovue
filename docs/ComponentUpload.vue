<script setup lang="ts">
import ComponentDemo from './ComponentDemo.vue'

function selectFiles (files: FileList) {
  console.log(files, files[0])
}
</script>

<template>
  <ComponentDemo id="toUpload" title="LvUpload">
    <div class="usage">
      <pre><code>// types
const props = withDefaults(defineProps&lt;{
  name?: string
  auto?: boolean
  multi?: boolean
  required?: boolean
  showThumbnail?: boolean
  loading?: boolean
  thumbSize?: number
  accept?: string
  text?: string
  shape?: 'button' | 'square'
}&gt;(), {
  thumbSize: 100,
  text: '选择文件',
  shape: 'button'
})
const emit = defineEmits(['select'])
      </code></pre>
    </div>

    <div class="controls">
      <LvUpload name="banners" multi accept="*" />
    </div>
    <div class="controls">
      <LvUpload name="banners" multi show-thumbnail text="选择多个文件" />
    </div>
    <div class="controls">
      <LvUpload name="banners" shape="square" :thumb-size="200" show-thumbnail />
    </div>
    <div class="controls">
      <LvUpload
        name="banners"
        shape="square"
        multi
        show-thumbnail
        @select="selectFiles"
      />
    </div>
  </ComponentDemo>
</template>
