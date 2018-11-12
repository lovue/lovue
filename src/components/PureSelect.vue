<template>
  <dl class="v-pure-select" :class="open" @click="showDd">
    <dt>
      <span class="placeholder" v-if="current === undefined">{{placeholder || '请选择'}}</span>
      <template v-for="(elem, index) of source">
        <input :id="`pure_radio_${_uid}_${index}`" type="radio" :name="name" :value="elem" v-model="current">
        <span>{{elem}}</span>
      </template>
    </dt>
    <dd :class="pos" v-show="bShowDd">
      <label :class="{focus: current === elem}" :for="`pure_radio_${_uid}_${index}`" v-for="(elem, index) of source" @click="hideDd">{{elem}}</label>
    </dd>
  </dl>
</template>

<script>
  export default {
    name: 'v-pure-select',
    data() {
      return {
        selfClicked: false,
        current: this.value,
        bShowDd: false,
        open: '',
        pos: ''
      }
    },
    props: {
      value: [String, Number],
      name: String,
      source: Array,
      placeholder: String
    },
    computed: {
      ddHeight() {
        return Math.min(this.source.length * 32 + 16, 200)
      }
    },
    watch: {
      value(val) {
        this.current = val
      },
      current(val) {
        this.$emit('input', val)
      }
    },
    methods: {
      updatePos() {
        const bottomSpace = window.innerHeight - this.$el.getBoundingClientRect().bottom
        this.pos = bottomSpace < this.ddHeight ? 'top' : 'bottom'
      },
      showDd() {
        this.selfClicked = true
        if (this.bShowDd) return

        this.bShowDd = true
        this.updatePos()
        setTimeout(() => this.open = 'open', 40)
      },
      hideDd() {
        this.open = ''
        setTimeout(() => {
          this.pos = ''
          this.bShowDd = false
        }, 400)
      }
    },
    mounted() {
      window.addEventListener('click', () => {
        if (!this.selfClicked) this.hideDd()
        this.selfClicked = false
      })
    }
  }
</script>
