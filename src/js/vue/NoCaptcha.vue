<template>
  <div class="vue-no-captcha" :style="`width:${width}px`">
    <div class="fore-bg" :class="{success: success, transition: !drag}" :style="`width:${fgWidth}px`"></div>
    <span class="text" :class="{success: success}">{{text}}</span>
    <button class="btn-text" type="button" @mousedown="dragStart">
      <svg class="icon-arrow-down">
        <use xlink:href="/static/platform/img/icons.svg#icon-arrow-down"></use>
      </svg>
    </button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        fgWidth: 0,
        startX: 0,
        drag: false,
        success: false
      }
    },
    props: {
      width: {
        type: Number,
        'default': 300
      }
    },
    computed: {
      text() {
        return this.success ? '验证通过' : '请按住滑块，拖动到最右边'
      }
    },
    methods: {
      dragStart(ev) {
        this.drag = true
        this.startX = ev.clientX
      }
    },
    mounted() {
      window.addEventListener('mousemove', ev => {
        if (this.drag) {
          if (this.fgWidth < this.width - 40) {
            this.fgWidth = ev.clientX - this.startX
          } else {
            this.fgWidth = this.width - 40
            this.success = true
            this.$emit('success')
          }
        }
      })
      window.addEventListener('mouseup', () => {
        this.drag && (this.drag = false)
        if (!this.success) {
          this.fgWidth = 0
        }
      })
    }
  }
</script>
