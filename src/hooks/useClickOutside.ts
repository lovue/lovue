import { ref, onMounted, onUnmounted } from 'vue'

export function useClickOutside (clickOutside: () => void) {
  const isComponentClicked = ref(false)


  function clickHandler () {
    if (!isComponentClicked.value) clickOutside()
    isComponentClicked.value = false
  }

  onMounted(() => {
    window.addEventListener('click', clickHandler)
  })
  onUnmounted(() => {
    window.removeEventListener('click', clickHandler)
  })

  return {
    isComponentClicked
  }
}
