import utils from './utils'

export default {
  created() {
    utils.init().then(user => {
      this.user = user
      this.getInitData()
    })
  }
}
