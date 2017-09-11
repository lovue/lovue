<template>
  <div class="vue-pwd-validity">
    <span v-if="!valid">{{invalidInfo}}</span>
    <vue-pwd-strength :password="password" :minLength="minPwdLength" v-else></vue-pwd-strength>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        minPwdLength: 10,
        valid: false,
        invalidInfo: ''
      }
    },
    props: {
      password: String
    },
    watch: {
      password(val) {
        if (val.length < this.minPwdLength) {
          this.invalidInfo = val === '' ? '' : `密码是至少${this.minPwdLength}位，由字母、数字、符号其中任意两种组成的组合`
          this.valid = false
        } else {
          // 规则2 不可以是纯字母或者纯数字或者纯符号
          const number = /^[\d]+$/
          const alpha = /^[~!@#$%^&*()_+{}\|:"<>?`\-=\\\[\];\',.\/\ ]+$/
          const char = /^[a-zA-Z]+$/

          if (number.test(val) || char.test(val) || alpha.test(val)) {
            // TODO 检验不通过，禁止提交, 显示信息
            this.invalidInfo = '密码必须是字母、数字、符号其中任意两种组成的组合'
            this.valid = false
          } else {
            this.valid = true
          }
        }

        this.$emit('validity', this.valid)
      }
    }
  }
</script>
