<template>
  <dl class="v-pure-select" :class="open" @click.stop="showDd">
    <dt>
      <span class="placeholder" v-if="current === undefined">请选择</span>
      <template v-for="(elem, index) of source">
        <input :id="`pure_radio_${_uid}_${index}`" type="radio" :name="name" :value="elem" v-model="current">
        <span>{{elem}}</span>
      </template>
    </dt>
    <dd :class="pos" v-show="bShowDd">
      <label :for="`pure_radio_${_uid}_${index}`" v-for="(elem, index) of source" @click.stop="hideDd">{{elem}}</label>
    </dd>
  </dl>
</template>

<script>
  export default {
    name: 'v-pure-select',
    data() {
      return {
        current: this.value,
        bShowDd: false,
        clickHide: false,
        open: '',
        pos: ''
      }
    },
    props: {
      value: [String, Number],
      name: String,
      source: Array
    },
    computed: {
      ddHeight() {
        return this.source.length * 32 + 16
      }
    },
    watch: {
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
        if (this.clickHide) return

        this.bShowDd = true
        this.updatePos()
        setTimeout(() => this.open = 'open', 40)
      },
      hideDd() {
        this.clickHide = true
        this.open = ''
        setTimeout(() => {
          this.pos = ''
          this.bShowDd = false
          this.clickHide = false
        }, 400)
      }
    },
    mounted() {
      window.addEventListener('click', () => this.hideDd())
    }
  }
</script>
