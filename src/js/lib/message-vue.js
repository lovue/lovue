import VueMessage from '../../components/Message.vue'
const MessageConstructor = Vue.extend(VueMessage)

const Message = function (option) {
  let instance
  option = option || {}

  if(typeof option === 'string') {
    option = {
      message: option
    }
  }

  instance = new MessageConstructor({
    data: option
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true
}

export default Message
