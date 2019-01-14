<template>
  <transition name="message">
    <div class="v-message" v-show="visible">
      <div class="m-icon" :class="`m-${type}`">
        <v-icon :icon="iconType"></v-icon>
      </div>
      <p>{{message}}</p>
      <v-icon icon="close" v-if="showClose" @click.native="close"></v-icon>
    </div>
  </transition>
</template>
<script>
  import Icon from './Icon.vue'

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
    components: {
      [Icon.name]: Icon
    },
    computed: {
      iconType() {
        let all = {
          info: 'info',
          success: 'check',
          error: 'close',
          warn: 'warn'
        }
        return all[this.type]
      }
    },
    methods: {
      close() {
        this.visible = false
        this.$el.addEventListener('transitionend', this.destroy)
      },
      destroy() {
        this.$el.removeEventListener('transitionend', this.destroy)
        this.$destroy()
        document.body.removeChild(this.$el)
        clearTimeout(this.timer)
      }
    },
    mounted() {
      if (!this.showClose) {
        this.timer = setTimeout(() => this.close(), this.duration)
      }
    }
  }
</script>
