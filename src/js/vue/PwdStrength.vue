<template>
  <div class="vue-pwd-strength">
    <div class="pwd-col">
      <span class="info-text">密码强度</span>
    </div>
    <div class="pwd-col">
      <div class="pwd-base" :class="levelClass" v-for="levelClass of levelClasses"></div>
    </div>
    <div class="pwd-col">
      <span :class="`${levelClasses[0]}-text`" v-if="level">{{strengthInfo}}</span>
    </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        level: 0
      }
    },
    props: {
      password: {
        type: String,
        default: ''
      },
      // 密码最小长度，低于此则为弱密码
      minLength: {
        type: Number,
        default: 6
      }
    },
    watch: {
      password() {
        this.pwdStrengthCheck()
      }
    },
    computed: {
      strengthInfo() {
        let words = ['', '弱', '中', '强']
        return words[this.level]
      },
      levelClasses() {
        let classes = [
          ['', '', ''],
          ['pwd-weak', '', ''],
          ['pwd-medium', 'pwd-medium', ''],
          ['pwd-strong', 'pwd-strong', 'pwd-strong']
        ]
        return classes[this.level]
      },
    },
    methods: {
      pwdStrengthCheck() {
        this.level = 0
        // 空密码不检测
        if (!this.password) {
          return
        }

        if (this.password.length < this.minLength) {
          this.level = 1
          return
        }

        let char = /[a-zA-Z]/
        let number = /[0-9]/
        let alpha = /[~!@#$%^&*()_+{}\|:"<>?`\-=\\\[\];\',.\/\ ]/

        // 有字母
        if (char.test(this.password)) {
          this.level++
        }
        // 有数字
        if (number.test(this.password)) {
          this.level++
        }

        // 有符号
        if (alpha.test(this.password)) {
          this.level++
        }
      }
    },
    created() {
      this.pwdStrengthCheck()
    }
  }
</script>
