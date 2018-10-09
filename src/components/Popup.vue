<template>
  <div class="ant-popup overlay" :class="{fixed: fixed}" v-if="value" @mousemove="dragging" @mouseup="dragEnd">
    <div class="ant-window" :style="transform">
      <div class="title-bar" @mousedown="dragStart">
        <div class="title-name">{{title}}</div>
        <button class="btn-text btn-close" type="button" @click="$emit('input', false)">
          <v-icon icon="close" size="18"></v-icon>
        </button>
      </div>
      <div class="win-content">
        <slot name="content"></slot>
      </div>
      <div class="win-footer">
        <div class="right">
          <v-button pattern="ghost" @click="$emit('input', false)">取消</v-button>
          <v-button @click="handleConfirm" :loading="loading">确认</v-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
      async: Boolean,
      confirm: Function,
      fixed: Boolean
    },
    computed: {
      transform() {
        return {
          transform: `translateX(${this.pos.x}px) translateY(${this.pos.y}px)`
        }
      }
    },
    watch: {
      value(val) {
        document.body.classList.toggle('overhidden', val)
      }
    },
    methods: {
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
        if (!this.async) {
          this.$emit('input', false)
          return
        }

        if (this.loading) return

        this.loading = true
        if (await this.confirm()) {
          this.$emit('input', false)
        }
        this.loading = false
      }
    }
  }
</script>
