<template>
  <div class="v-collapse">
    <div class="c-item" :class="{open: item.open_}" v-for="(item, i) of items">
      <div class="c-head" @click="select(i)">{{item.title}}</div>
      <div class="c-body" v-show="item.show_">
        <div class="b-content" :style="`height: ${100 * (i + 1)}px`">{{item.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  function getElemHeight(el) {
    const elStyle = getComputedStyle(el)
    const elDisplay = elStyle.display
    const elPosition = elStyle.position
    const elVisibility = elStyle.visibility

    if (elDisplay !== 'none') return el.offsetHeight

    el.style.position = 'absolute'
    el.style.visibility = 'hidden'
    el.style.display = 'block'

    const elHeight = el.offsetHeight

    el.style.display = elDisplay
    el.style.position = elPosition
    el.style.visibility = elVisibility

    return elHeight
  }

  export default {
    name: 'v-collapse',
    data() {
      return {
        items: [
          {
            title: 'First',
            content: 'First',
            show_: false
          },
          {
            title: 'Second',
            content: 'Second',
            show_: false
          },
          {
            title: 'Third',
            content: 'Third',
            show_: false
          }
        ],
        index: -1,
        itemIndex: -1
      }
    },
    methods: {
      calculateElementsHeight() {
        this.$el.querySelectorAll('.c-body').forEach((elem, i) => {
          this.items[i].height = getElemHeight(elem)
          this.items[i].elem = elem
          elem.style.height = '0px'
        })
      },
      select(i) {
        if (this.index === i) return

        this.close(this.index)
        this.open(i)
        this.index = i
      },
      open(i) {
        if (i < 0) return

        const item = this.items[i]
        item.show_ = true
        setTimeout(() => {
          item.elem.style.height = `${item.height}px`
        }, 0)
      },
      close(i) {
        if (i < 0) return

        const item = this.items[i]
        item.elem.style.height = '0px'
        setTimeout(() => {
          item.show_ = false
        }, 500)
      }
    },
    mounted() {
      this.calculateElementsHeight()
    }
  }
</script>
