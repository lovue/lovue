<script setup lang="ts">
import ComponentDemo from './ComponentDemo.vue'
import { Indicator, Dialog, Toast } from '../src/index'
import { ToastType } from '../src/components/LvToast.vue'

function sleep (delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay))
}

function startFetch () {
  Indicator.open()

  setTimeout(() => {
    Indicator.close()
  }, 1000)
}

function showDialog () {
  Dialog({
    title: '标题',
    body: '内容'
  })
}

function showDialog2 () {
  Dialog({
    title: '标题',
    body: '内容',
    noFooter: true
  })
}

function showDialog3 () {
  Dialog({
    title: '标题',
    body: '内容',
    confirm: async () => {
      await sleep(2000)
      return true
    }
  })
}

function showDialog4 () {
  Dialog({
    title: '标题',
    body: '内容',
    simple: true
  })
}

function showDialog5 () {
  Dialog({
    title: '标题',
    body: '内容',
    fixed: true
  })
}

function showToast (type: ToastType) {
  Toast({
    text: 'hello world',
    type
  })
}

function showToast2 (type: ToastType) {
  Toast[type]({
    text: 'hello world'
  })
}

function showClosableToast (type: ToastType) {
  Toast({
    text: 'hello world',
    type,
    showClose: true
  })
}
</script>

<template>
  <ComponentDemo id="toGlobals" title="Globals">
    <div class="usage">
      <pre><code>// call
import { Indicator } from 'lovue'

Indicator.open()
Indicator.close()
      </code></pre>
    </div>

    <div class="controls">
      <LvButton @click="startFetch">Indicator</LvButton>
    </div>

    <div class="usage">
      <pre><code>// call
import { Dialog } from 'lovue'

Dialog({
  title: '标题',
  body: '内容',
  noFooter: true,
  simple: true,
  fixed: true,
  confirm: async () => {
    await sleep(2000)
    return true
  }
})
      </code></pre>
    </div>

    <div class="controls">
      <LvButton @click="showDialog">Dialog</LvButton>
      <LvButton @click="showDialog2">No Footer Dialog</LvButton>
      <LvButton @click="showDialog3">Async Dialog</LvButton>
      <LvButton @click="showDialog4">Simple Dialog</LvButton>
      <LvButton @click="showDialog5">Fixed Dialog</LvButton>
    </div>

    <div class="usage">
      <pre><code>// call
import { Toast } from 'lovue'

Toast({
  text: 'hello world',
  type: 'success',
  showClose: true
})

Toast.success({
  text: 'hello world',
  showClose: true
})
      </code></pre>
    </div>

    <div class="controls">
      <LvButton @click="showToast('success')">Success Toast</LvButton>
      <LvButton @click="showToast2('info')">Info Toast</LvButton>
      <LvButton @click="showToast('warn')">Warn Toast</LvButton>
      <LvButton @click="showToast('error')">Error Toast</LvButton>
      <LvButton @click="showClosableToast('error')">Closable Toast</LvButton>
    </div>
  </ComponentDemo>
</template>
