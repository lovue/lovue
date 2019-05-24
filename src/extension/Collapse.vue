<template>
  <div class="v-collapse">
    <div class="c-item" :class="{open: item.open_}" v-for="(item, i) of items">
      <div class="c-head" @click="toggle(i)">
        <v-icon icon="down-wide" size="14"></v-icon>
        <span>{{item.title}}</span>
      </div>
      <div class="c-body" v-show="item.show_">
        <slot :name="item.slot"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import getElemHeight from '../utils/getElemHeight'

  export default {
    name: 'v-collapse',
    data() {
      return {
        items: [],
        index: -1
      }
    },
    props: {
      panels: Array,
      independent: Boolean
    },
    methods: {
      calculateElementsHeight() {
        this.$el.querySelectorAll('.c-body').forEach((elem, i) => {
          const height = getElemHeight(elem)
          this.items[i].height = height
          this.items[i].elem = elem
          elem.style.height = this.items[i].show_ ? `${height}px` : '0px'
        })
      },
      toggle(i) {
        const item = this.items[i]

        if (this.independent) {
          item.show_ ? this.close(i) : this.open(i)
        } else {
          if (item.show_) return this.close(i)

          this.items.forEach(($item, i) => {
            $item.show_ && this.close(i)
          })
          this.open(i)
        }
      },
      open(i) {
        if (i < 0) return

        const item = this.items[i]
        item.show_ = true
        item.open_ = true
        setTimeout(() => {
          item.elem.style.height = `${item.height}px`
        }, 0)
      },
      close(i) {
        if (i < 0) return

        const item = this.items[i]
        item.elem.style.height = '0px'
        item.open_ = false
        setTimeout(() => {
          item.show_ = false
        }, 500)
      }
    },
    created() {
      if (!this.panels) return this.items = []

      this.items = this.panels.map(panel => {
        const $panel = Object.assign({}, panel)
        $panel.show_ = panel.show || false
        $panel.open_ = panel.show || false
        delete $panel.show
        return $panel
      })
    },
    mounted() {
      this.calculateElementsHeight()
    }
  }
</script>
