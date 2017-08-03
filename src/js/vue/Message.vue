<template>
  <transition name="slide-fade">
    <div class="vue-message" v-show="visible">
      <div class="message-icon" :class="`message-${type}`">
        <svg><use :xlink:href="`/img/icons.svg#icon-${iconType}`"></use></svg>
      </div>
      <p>{{message}}</p>
      <svg class="icon-close" v-if="showClose" @click="visible = false"><use xlink:href="/img/icons.svg#icon-close"></use></svg>
    </div>
  </transition>
</template>
<script>
  export default {
    data() {
      return {
        visible: false,
        message: '',
        showClose: document.visibilityState === 'hidden',
        type: 'success',
        duration: 2000,
        timer: null
      }
    },
    computed: {
      iconType() {
        let all = {
          info: 'tip',
          success: 'check',
          error: 'close',
          warn: 'warn'
        }
        return all[this.type]
      }
    },
    methods: {
      destroy() {
        this.$el.removeEventListener('transitionend', this.destroy)
        this.$destroy()
        document.body.removeChild(this.$el)
        clearTimeout(this.timer)
      }
    },
    mounted() {
      if (!this.showClose) {
        this.timer = setTimeout(() => {
          this.visible = false
          this.$el.addEventListener('transitionend', this.destroy)
        }, this.duration)
      }
    }
  }
</script>
