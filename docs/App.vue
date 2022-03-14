<script setup lang="ts">
import ComponentIcon from "./ComponentIcon.vue"
</script>

<template>
  <div class="container">
    <aside class="l aside"></aside>
    <div class="r main">
      <ComponentIcon />
    </div>
  </div>
</template>

<style lang="less">
.container {
  > .l {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    width: 300px;
    height: 100vh;
    background-color: #f5f5f5;
    overflow: auto;
  }

  > .r {
    margin-left: 300px;
  }
}

.aside {
  .list {
    margin-top: 80px;

    li {
      border-bottom: 1px solid #e9e9e9;

      a {
        display: block;
        line-height: 42px;
        padding-left: 40px;
        transition: color 0.25s;
        white-space: nowrap;

        &:hover {
          color: #4ad3e8;
        }

        &.focus {
          color: #00c1de;
        }
      }
    }
  }
}

pre {
  box-shadow: 1px 1px 0.5em black inset;
  padding: 1em;
  background: hsl(30, 20%, 25%);
  color: hsl(350, 40%, 70%);
  border-radius: 0.5em;
}
</style>
