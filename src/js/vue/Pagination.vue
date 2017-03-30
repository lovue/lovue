<template>
  <div class="vue-pagination">
    <div class="p-total">共 {{total}} 条</div>
    <div class="p-perpage">
      <span>每页</span>
      <select class="select" v-model.number="per">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      <span>条</span>
    </div>
    <ul class="p-pages">
      <li><a class="link" @click="index = 1">首页</a></li>
      <li><a class="link" @click="prev">上一页</a></li>
      <li v-for="n of showed"><a class="link" :class="{focus: index === n}" @click="index = n">{{n}}</a></li>
      <li><a class="link" @click="next">下一页</a></li>
      <li><a class="link" @click="index = pages">末页</a></li>
    </ul>
    <div class="p-jump">
      <span>前往</span>
      <input class="input" type="number" min="1" :max="pages" required v-model="jumpPage" @change="jump">
      <span>页</span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        per: this.countOfPage,
        index: 1,
        jumpPage: 1
      }
    },
    props: {
      total: Number,
      countOfPage: Number
    },
    computed: {
      pages() {
        let n = Math.ceil(this.total / this.per)
        n = n || 1
        return n
      },
      showed() {
        let start = (this.index - 2) < 1 ? 1 : (this.index - 2)
        let arr = [], i = 0
        while (i < 5) {
          if (start > this.pages) {
            if (arr[0] > 1) {
              arr.unshift(arr[0] - 1)
            }
          } else {
            arr.push(start)
          }
          start++
          i++
        }
        return arr
      },
      slice() {
        return [(this.index - 1) * this.per, this.index * this.per]
      }
    },
    watch: {
      slice(val) {
        this.$emit('update', val)
      },
      pages(val) {
        if (this.index > val) this.index = val
      }
    },
    methods: {
      prev() {
        this.index > 1 && this.index--
      },
      next() {
        this.index < this.pages && this.index++
      },
      jump() {
        let n = Number.parseInt(this.jumpPage)
        if (!Number.isNaN(n)) {
          if (n < 1) {
            n = 1
          } else if (n > this.pages) {
            n = this.pages
          }
          this.index = n
          this.jumpPage = n
        }
      }
    },
    mounted() {
      this.$emit('update', this.slice)
    }
  }
</script>
