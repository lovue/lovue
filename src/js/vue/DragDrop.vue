<template>
  <div class="vue-drag-drop">
    <div class="vdd-column" v-for="(item, index) of items" @dragover="dragover" @dragenter="enterlist(index)">
      <div v-for="(n,i) of item" :key="n" draggable="true" @dragenter="dragenter($event,i,index)" @dragend="dragend" @dragstart="dragstart($event,i,index)">
        <div class="vdd-cell-blank" :style="`height:${blankHeight}px`" v-if="n === ''" @dragenter.stop>
          拖放到这里
        </div>
        <div class="vdd-cell" v-else>
          <slot :name="n"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        items: [],
        copy: [],
        dragged: null,
        current: 0,
        from: 0,
        to: 0,
        blankHeight: 0
      }
    },
    props: {
      resource: Array
    },
    watch: {
      resource(val) {
        this.items = JSON.parse(JSON.stringify(val))
        this.copy = JSON.parse(JSON.stringify(val))
      }
    },
    methods: {
      dragstart(ev, i, list) {
        console.log('Start')
        //Without this statement, drag and drop will not work in Firefox
        //If set non-blank string, Firefox will open a new tab when dragging
        ev.dataTransfer.setData('text', '')
        ev.dataTransfer.effectAllowed = 'move'
        this.blankHeight = ev.target.offsetHeight
        this.from = list
        this.to = list
        this.current = i
        this.dragged = this.items[list][i]
        this.copy[list] = this.items[list].filter((val, index) => {
          return index !== i
        })
      },
      dragenter(ev, i, list) {
        console.log('Enter')
        //移动到当前列表时，恢复上一个列表的数据
        if (this.to !== list) {
          this.items.splice(this.to, 1, this.copy[this.to])
          this.to = list
        }
        let tmp = this.copy[list].slice()
        tmp.splice(i, 0, '')
        //更新当前列表的数据
        this.items.splice(list, 1, tmp)
        //鼠标所在的索引
        this.current = i
        //防止触发enterList事件
        ev.stopPropagation()
      },
      dragover(ev) {
        //显示拖拽效果
        ev.preventDefault()
      },
      dragend(ev) {
        console.log('End')
        //将拖拽的数据添加到目标列表
        this.copy[this.to].splice(this.current, 0, this.dragged)
        this.items.splice(this.to, 1, this.copy[this.to])
        this.$emit('update', this.items)
      },
      enterlist(list) {
        //移到空列表
        console.log('Enter list')
        if (!this.items[list].length) {
          this.items.splice(this.to, 1, this.copy[this.to])
          this.to = list
          this.items.splice(list, 1, [''])
          this.current = 0
        }
      }
    },
    created() {
      this.items = JSON.parse(JSON.stringify(this.resource))
      this.copy = JSON.parse(JSON.stringify(this.items))
    }
  }
</script>
