<template>
  <div class="v-modal overlay" :class="customCls" v-show="visible">
    <transition name="slide-fade">
      <div class="v-window" v-show="visible">
        <div class="title-bar">
          <div class="title-name">{{title}}</div>
          <button class="btn-text btn-close" type="button" @click="close">
            <v-icon icon="close" size="16"></v-icon>
          </button>
        </div>
        <div class="win-content" v-html="content"></div>
        <div class="win-footer">
          <div class="right">
            <v-button pattern="ghost" @click="close">取消</v-button>
            <v-button @click="handleConfirm" :loading="loading">确认</v-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        visible: false,
        title: '',
        content: '',
        loading: false,
        fixed: false,
        async: false,
        confirm() {}
      }
    },
    computed: {
      customCls() {
        let custom = ''
        if (this.title === '') custom = 'simple'
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
        if (!this.async) {
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
