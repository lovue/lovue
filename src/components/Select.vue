<template>
  <div class="v-select" @click="showCandidates">
    <div class="s-selected" :disabled="disabled">
      <div class="s-disabled" v-if="disabled"></div>
      <div class="s-l">
        <template v-if="multiple">
          <input type="hidden" :value="selected.map(s => s.value).join(',')" :name="name" :required="required">
          <span class="s-tag" v-for="(s,i) of selected">
            <span class="tag-name">{{s.name}}</span>
            <v-icon icon="close" @click.native.stop="remove(s,i)"></v-icon>
          </span>
          <span class="s-placeholder" v-if="!selected.length">{{placeholder || '请选择'}}</span>
        </template>
        <template v-else>
          <input type="hidden" :value="selected.value" :name="name" :required="required">
          <span class="s-value" v-if="selected.name !== undefined">{{selected.name}}</span>
          <span class="s-placeholder" v-else>{{placeholder || '请选择'}}</span>
          <v-icon class="icon-clear" icon="close" size="16" @click.native.stop="clearSelected" v-if="clearable && selected.name"></v-icon>
        </template>
      </div>
      <div class="s-r">
        <v-icon icon="down-wide" :class="{reverse: !open}"></v-icon>
      </div>
    </div>
    <div :class="`candidates ${pos} ${open}`" v-show="isShowCandidates">
      <div class="item-search" v-if="searchable"><input class="input" :placeholder="searchPlaceholder || '搜索'" v-model="filterText"></div>
      <ul class="list">
        <li v-for="i of filteredItems" :title="i.name" @click.stop="toggle(i)">
          <div class="i-title" :class="{focus: i.selected_}"><span class="t-name">{{i.name}}</span><v-icon icon="check" v-if="i.selected_"></v-icon></div>
          <ul class="sub-list" v-if="i.children && i.children.length">
            <li v-for="child of i.children" :title="child.name" @click.stop="toggle(child)">
              <div class="i-title" :class="{focus: child.selected_}"><span class="t-name">{{child.name}}</span><v-icon icon="check" v-if="child.selected_"></v-icon></div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import '../less/components/Select.less'
  import Icon from './Icon.vue'

  export default {
    name: 'v-select',
    data() {
      return {
        selfClicked: false,
        selected: this.multiple ? [] : {},
        items: JSON.parse(JSON.stringify(this.source)),
        filterText: '',
        isShowCandidates: false,
        candidatesHeight: 0,
        innerUpdate: false,
        pos: '',
        open: '',
        listElem: null
      }
    },
    components: {
      [Icon.name]: Icon
    },
    computed: {
      filteredItems() {
        if (this.filterText === '') return this.items
        return this.items.filter(item => item.name.toLowerCase().includes(this.filterText.toLowerCase()))
      }
    },
    props: {
      value: [String, Number, Array, Object],
      source: Array,
      disabled: Boolean,
      multiple: Boolean,
      searchable: Boolean,
      placeholder: String,
      searchPlaceholder: String,
      max: Number,
      emitItem: Boolean,
      clearable: Boolean,
      name: String,
      required: Boolean
    },
    watch: {
      source(val) {
        //Watch source for requesting data from server asynchronously
        this.items = JSON.parse(JSON.stringify(val))
        this.updateSelected(this.value)
      },
      value: {
        handler: 'updateSelected',
        immediate: true
      },
      filterText() {
        setTimeout(() => {
          this.calcCandidatesHeight()
        }, 100)
      }
    },
    methods: {
      updateSelected(val) {
        if (this.innerUpdate) return this.innerUpdate = false

        if (this.multiple && val === undefined) val = []

        let selected
        if (Array.isArray(val)) {
          const externalValue = this.emitItem ? val.map(row => row.value) : val

          selected = []
          this.items.forEach(item => {
            item.selected_ = false
            if (externalValue.includes(item.value)) {
              item.selected_ = true
              selected.push({
                name: item.name,
                value: item.value
              })
            }

            if (item.children) {
              item.children.forEach(child => {
                child.selected_ = false
                if (externalValue.includes(child.value)) {
                  child.selected_ = true
                  selected.push({
                    name: child.name,
                    value: child.value
                  })
                }
              })
            }
          })
        } else {
          const externalValue = this.emitItem ? val.value : val

          selected = {}
          this.items.forEach(item => {
            item.selected_ = false
            if (item.value === externalValue) {
              item.selected_ = true
              selected = { name: item.name, value: item.value }
            }

            if (item.children) {
              item.children.forEach(child => {
                child.selected_ = false
                if (child.value === externalValue) {
                  child.selected_ = true
                  selected = { name: child.name, value: child.value }
                }
              })
            }
          })
        }
        this.selected = selected
      },
      calcCandidatesHeight () {
        const el = this.$el.querySelector('.candidates')
        const notShowed = el.style.display === 'none'
        if (notShowed) el.style.display = 'block'
        const elHeight = el.offsetHeight
        if (notShowed) el.style.display = 'none'

        this.candidatesHeight = elHeight
      },
      showCandidates() {
        this.selfClicked = true
        if (this.disabled) return
        if (this.isShowCandidates) return

        const bottomSpace = window.innerHeight - this.$el.getBoundingClientRect().bottom
        this.pos = bottomSpace < this.candidatesHeight ? 'top' : 'bottom'

        this.isShowCandidates = true
        this.updateScrollbar()
        setTimeout(() => this.open = 'open', 40)
      },
      hideCandidates() {
        this.open = ''
        setTimeout(() => {
          this.pos = ''
          this.isShowCandidates = false
        }, 400)
      },
      clickHandler() {
        // 当点击组件之外的区域（包括其他Select组件）时，隐藏下拉列表；点击组件自身时不做任何处理
        if (!this.selfClicked) this.hideCandidates()
        this.selfClicked = false
      },
      async updateScrollbar() {
        await this.$nextTick()
        const focusElem = this.$el.querySelector('.candidates .i-title.focus')
        if (focusElem === null) return

        const y = focusElem.offsetTop - this.candidatesHeight / 2
        this.listElem.scrollTop = Math.max(y, 0)
      },
      toggle(item) {
        if (this.multiple) {
          item.selected_ = !item.selected_

          if (item.selected_) {
            if (this.max && this.selected.length >= this.max) {
              this.warn(`最多只能选择${this.max}个`)
              item.selected_ = false
            } else {
              this.selected.push(item)
            }
          } else {
            this.selected = this.selected.filter(val => {
              return val.value !== item.value
            })
          }
          this.innerUpdate = true
          this.$emit('input', this.emitItem ? this.selected : this.selected.map(s => s.value))
        } else {
          this.items.forEach(current => {
            current.selected_ = false

            if (current.children) {
              current.children.forEach(child => child.selected_ = false)
            }
          })
          item.selected_ = true
          this.selected = item
          this.hideCandidates()
          this.innerUpdate = true
          this.$emit('input', this.emitItem ? this.selected : this.selected.value)
        }
      },
      clearSelected() {
        this.selected = {}
        this.$emit('input', this.emitItem ? this.selected : this.selected.value)
      },
      remove(select, index) {
        this.selected.splice(index, 1)

        this.items.forEach(item => {
          if (item.value === select.value) {
            item.selected_ = false
          } else if (item.children) {
            item.children.forEach(child => {
              if (child.value === select.value) {
                child.selected_ = false
              }
            })
          }
        })

        this.innerUpdate = true
        this.$emit('input', this.emitItem ? this.selected : this.selected.map(s => s.value))
      }
    },
    mounted() {
      window.addEventListener('click', this.clickHandler)

      this.listElem = this.$el.querySelector('.candidates .list')
      this.calcCandidatesHeight()
    },
    beforeDestroy() {
      window.removeEventListener('click', this.clickHandler)
    }
  }
</script>
