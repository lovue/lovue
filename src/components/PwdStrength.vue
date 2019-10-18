<template>
  <div class="v-pwd-strength" v-show="password.length">
    <div class="str-lines">
      <span :class="n" v-for="n of levelClasses"></span>
    </div>
    <div class="str-info">{{strengthInfo}}</div>
  </div>
</template>

<script>
  import '../less/components/PwdStrength.less'

  export default{
    name: 'v-pwd-strength',
    props: {
      password: {
        type: String,
        default: ''
      },
      score: {
        type: Number,
        default: 0,
        validator(value) {
          return value >= 0 && value <= 4
        }
      }
    },
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
    }
  }
</script>
