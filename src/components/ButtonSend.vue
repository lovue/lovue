<template>
  <v-button :loading="loading" @click="send" :disabled="!canSend">{{text}}</v-button>
</template>
<script>
  import Button from './Button.vue'

  export default {
    name: 'v-button-send',
    data() {
      return {
        text: '发送验证码',
        loading: false,
        canSend: true
      }
    },
    props: {
      method: {
        type: String,
        'default': 'sms'
      },
      target: String,
      action: String,
      url: String
    },
    components: {
      [Button.name]: Button
    },
    methods: {
      async send() {
        if (!this.target) {
          this.warn(`请输入${this.method === 'sms' ? '手机号' : '邮箱'}`)
          return
        }

        if (!this.canSend) return

        this.canSend = false
        this.loading = true
        const body = await $fetch.post(this.url, {
          method: this.method,
          target: this.target,
          action: this.action
        }).catch(this.error)
        this.loading = false

        if (body === undefined) {
          this.canSend = true
          return
        }

        this.success('验证码已发送')

        let timer, count = 60
        this.text = count
        timer = setInterval(() => {
          count--
          if (count <= 0) {
            this.text = '发送验证码'
            this.canSend = true
            clearInterval(timer)
          } else {
            this.text = count
          }
        }, 1000)
      }
    }
  }
</script>
