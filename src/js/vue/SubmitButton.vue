<template>
  <button class="btn vue-submit-button" :type="type">
    <vue-loading v-if="loading"></vue-loading>
    <span v-else>{{text}}</span>
  </button>
</template>
<script>
  export default {
    data() {
      return {}
    },
    props: {
      text: {
        type: String,
        'default': '确定'
      },
      loading: Boolean,
      type: {
        type: String,
        'default': 'submit'
      }
    }
  }
</script>
