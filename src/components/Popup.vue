<template>
  <div class="v-popup overlay" :class="{fixed: fixed}" v-if="value" @mousemove="dragging" @mouseup="dragEnd">
    <div class="v-window" :style="transform">
      <div class="title-bar" @mousedown="dragStart">
        <div class="title-name">{{title}}</div>
        <v-button type="text" @click="close"><v-icon icon="close" size="18"></v-icon></v-button>
      </div>
      <div class="win-content">
        <slot></slot>
      </div>
      <div class="win-footer" v-if="!noFooter">
        <div class="right">
          <slot name="footer">
            <v-button type="ghost" @click="close">{{cancelText || '取消'}}</v-button>
            <v-button @click="handleConfirm" :loading="loading">{{okText || '确认'}}</v-button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Button from './Button.vue'
  import Icon from './Icon.vue'

  export default {
    name: 'v-popup',
    data() {
      return {
        pos: { x: 0, y: 0 },
        startX: 0,
        startY: 0,
        flag: false,
        loading: false
      }
    },
    props: {
      title: String,
      value: Boolean,
      confirm: Function,
      fixed: Boolean,
      okText: String,
      cancelText: String,
      noFooter: Boolean
    },
    components: {
      [Button.name]: Button,
      [Icon.name]: Icon
    },
    computed: {
      transform() {
        return {
          transform: `translateX(${this.pos.x}px) translateY(${this.pos.y}px)`
        }
      }
    },
    methods: {
      close() {
        this.$emit('input', false)
      },
      dragStart(ev) {
        this.startX = ev.pageX - this.pos.x
        this.startY = ev.pageY - this.pos.y
        this.flag = true
      },
      dragging(ev) {
        if (!this.flag) return

        this.pos.x = ev.pageX - this.startX
        this.pos.y = ev.pageY - this.startY
      },
      dragEnd() {
        this.flag = false
      },
      async handleConfirm() {
        if (!this.confirm) {
          this.close()
          return
        }

        if (this.loading) return

        this.loading = true
        if (await this.confirm()) {
          this.close()
        }
        this.loading = false
      }
    }
  }
</script>
