<template>
  <div class="v-pwd-strength" v-show="password.length">
    <div class="str-lines">
      <span :class="n" v-for="n of levelClasses"></span>
    </div>
    <div class="str-info">{{strengthInfo}}</div>
  </div>
</template>

<script>
  export default{
    name: 'v-pwd-strength',
    data() {
      return {
        score: 0
      }
    },
    props: {
      password: {
        type: String,
        default: ''
      }
    },
    /*watch: {
      password(val) {
        if (val === '') return
        this.score = zxcvbn(val).score
      }
    },*/
    computed: {
      strengthInfo() {
        let words = ['极弱', '弱', '中', '强', '极强']
        return words[this.score]
      },
      levelClasses() {
        let classes = [
          ['str-0', '', '', '', ''],
          ['str-1', 'str-1', '', '', ''],
          ['str-2', 'str-2', 'str-2', '', ''],
          ['str-3', 'str-3', 'str-3', 'str-3', ''],
          ['str-4', 'str-4', 'str-4', 'str-4', 'str-4']
        ]
        return classes[this.score]
      }
    },
    created() {
      // if (this.password === '') return

      // const zxcvbn = () => import('zxcvbn')
      // this.score = zxcvbn(this.password).score
    }
  }
</script>
