<template>
  <div class="vue-loading">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="25 25 50 50">
      <circle class="path" cx="50" cy="50" r="20" fill="none"></circle>
    </svg>
    <p class="loading-text" v-if="!!text">{{text}}</p>
  </div>
</template>
<script>
  export default {
    props: {
      text: String
    }
  }
</script>
