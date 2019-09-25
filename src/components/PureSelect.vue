<template>
  <div class="v-pure-select" @click="showCandidates">
    <div class="ps-selected" :disabled="disabled">
      <div class="ss-disabled" v-if="disabled"></div>
      <div class="ss-l">
        <span class="ss-value" v-if="current !== undefined">{{current}}</span>
        <span class="placeholder" v-else>{{placeholder || '请选择'}}</span>
      </div>
      <div class="ss-r">
        <v-icon icon="down-wide" :class="{reverse: !open}"></v-icon>
      </div>
    </div>
    <div :class="`candidates ${pos} ${open}`" v-show="isShowCandidates">
      <label class="c-item" :class="{focus: current === item}" v-for="item of source">
        <input type="radio" :value="item" v-model="current" :name="name" :required="required">
        <span class="i-label">{{item}}</span>
      </label>
    </div>
  </div>
</template>

<script>
  import '../less/components/PureSelect.less'

  export default {
    name: 'v-pure-select',
    data() {
      return {
        selfClicked: false,
        current: this.value,
        isShowCandidates: false,
        open: '',
        pos: '',
        candidatesHeight: 0,
        candidatesElem: null
      }
    },
    props: {
      value: [String, Number],
      name: String,
      source: Array,
      placeholder: String,
      disabled: Boolean,
      required: Boolean
    },
    computed: {
      ddHeight() {
        return Math.min(this.source.length * 32 + 16, 320)
      }
    },
    watch: {
      value(val) {
        this.current = val
      },
      current(val) {
        this.hideCandidates()
        this.$emit('input', val)
      }
    },
    methods: {
      calcCandidatesHeight() {
        const el = this.candidatesElem
        const notShowed = el.style.display === 'none'
        if (notShowed) el.style.display = 'block'
        const elHeight = el.offsetHeight
        if (notShowed) el.style.display = 'none'

        this.candidatesHeight = elHeight
      },
      updatePos() {
        const bottomSpace = window.innerHeight - this.$el.getBoundingClientRect().bottom
        this.pos = bottomSpace < this.ddHeight ? 'top' : 'bottom'
      },
      showCandidates() {
        this.selfClicked = true
        if (this.isShowCandidates) return

        this.updatePos()
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
      async updateScrollbar() {
        await this.$nextTick()
        const focusElem = this.$el.querySelector('.candidates .c-item.focus')
        if (focusElem === null) return

        const y = focusElem.offsetTop - this.candidatesHeight / 2
        this.candidatesElem.scrollTop = Math.max(y, 0)
      },
    },
    mounted() {
      window.addEventListener('click', () => {
        if (!this.selfClicked) this.hideCandidates()
        this.selfClicked = false
      })

      this.candidatesElem = this.$el.querySelector('.candidates')
      this.calcCandidatesHeight()
    }
  }
</script>
