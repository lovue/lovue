export default {
  methods: {
    error(error) {
      this.$msg({
        type: 'error',
        message: error
      })
    }
  }
}
