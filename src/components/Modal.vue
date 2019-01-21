<template>
  <div class="v-modal overlay" :class="customCls" v-show="visible">
    <transition name="modal">
      <div class="v-window" v-show="visible">
        <div class="title-bar">
          <div class="title-name">{{title}}</div>
          <v-button type="text" @click="close"><v-icon icon="close" size="18"></v-icon></v-button>
        </div>
        <div class="win-content" v-html="content"></div>
        <div class="win-footer">
          <div class="right">
            <v-button type="ghost" @click="close" v-if="!noCancel">{{cancelText}}</v-button>
            <v-button @click="handleConfirm" :loading="loading">{{okText}}</v-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import Button from './Button.vue'
  import Icon from './Icon.vue'

  export default {
    data() {
      return {
        visible: false,
        title: '',
        content: '',
        loading: false,
        noCancel: false,
        fixed: false,
        confirm: undefined,
        okText: '确认',
        cancelText: '取消'
      }
    },
    components: {
      [Button.name]: Button,
      [Icon.name]: Icon
    },
    computed: {
      customCls() {
        let custom = ''
        if (this.title === '') custom = 'no-title'
        if (this.fixed) custom += ' fixed'
        return custom
      }
    },
    methods: {
      close() {
        this.visible = false
        this.$destroy()
        document.body.removeChild(this.$el)
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
