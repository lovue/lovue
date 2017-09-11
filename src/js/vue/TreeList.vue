<template>
  <li class="vue-tree-list">
    <input type="hidden" v-if="update">
    <template>
      <div class="t-title">
        <div class="css-icon-plus-minus" :class="{minus: open}" @click="toggleTitle" v-if="source.children"></div>
        <div class="block-placeholder" v-else></div>
        <div class="input-checkbox">
          <input type="checkbox" :id="`${_uid}_Select_Tree_Item`" v-model="source.selected" @click="toggleItem(source)">
          <label :for="`${_uid}_Select_Tree_Item`">{{source.name}}</label>
        </div>
      </div>
      <ul v-show="open">
        <vue-tree-list v-for="(child, i) of source.children" :source="child" :key="i" @select="select" @unselect="unselect" :trigger="update"></vue-tree-list>
      </ul>
    </template>
  </li>
</template>
<script>
  export default {
    name: 'vue-tree-list',
    data() {
      return {
        open: true,
        update: false,
        //所有发生变更的子节点
        changed: []
      }
    },
    props: {
      source: Object,
      trigger: Boolean
    },
    watch: {
      trigger() {
        this.triggerViewUpdate()
      }
    },
    methods: {
      triggerViewUpdate() {
        this.update = !this.update
      },
      toggleTitle() {
        this.open = !this.open
      },
      toggleItem(item) {
        if(item.disabled) return

        this.changed = []

        this.updateChildren(item, item.selected)

        this.$emit(item.selected ? 'select' : 'unselect', this.changed)
      },
      updateChildren(item, selected) {
        if(item.children) {
          item.children.forEach(child => {
            if(child.children) {
              child.selected = selected
              this.updateChildren(child, selected)
            } else {
              if (selected && !child.selected) {
                this.changed.push(child)
              }
              if (!selected) {
                this.changed.push(child)
              }
              child.selected = selected
            }
          })
        } else {
          this.changed.push(item)
        }
      },
      select(items) {
        this.source.selected = this.source.children.every(child => child.selected)
        this.$emit('select', items)
      },
      unselect(items) {
        this.source.selected = false
        this.$emit('unselect', items)
      }
    }
  }
</script>
