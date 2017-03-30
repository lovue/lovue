<template>
  <transition name="slide-fade">
    <div class="vue-message" v-show="visible">
      <div class="message-icon" :class="`message-${type}`">
        <svg><use :xlink:href="`/static/platform/img/icons.svg#icon-${iconType}`"></use></svg>
      </div>
      <p>{{message}}</p>
      <span class="message-close" v-if="showClose">×</span>
    </div>
  </transition>
</template>
<script>
  export default {
    data() {
      return {
        visible: false,
        message: '',
        showClose: false,
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
        this.$el.parentNode.removeChild(this.$el)
        clearTimeout(this.timer)
      }
    },
    mounted() {
      this.timer = setTimeout(() => {
        this.visible = false
        this.$el.addEventListener('transitionend', this.destroy)
      }, this.duration)
    }
  }
</script>
