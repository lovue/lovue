<script setup lang="ts">
import { onMounted } from 'vue'

defineProps<{
  title: string
}>()

onMounted(() => {
  setTimeout(() => {
    const offsetTops = createMenu()
    const links = document.querySelectorAll('.aside ul.list a')

    updateLinks(links)
    window.onhashchange = () => updateLinks(links)

    window.addEventListener('scroll', () => {
      for (let i = 0; i < offsetTops.length - 1; i++) {
        if (offsetTops[i] - 100 < window.scrollY && window.scrollY < offsetTops[i + 1] - 100) {
          links.forEach((link, index) => {
            link.classList.remove('focus')
            index === i && link.classList.add('focus')
          })
        }
      }
    })
  }, 400)
})

function createMenu() {
  const panels = document.querySelectorAll('.panel[id]')
  const aside = document.querySelector('.aside')
  const list = document.createElement('ul')
  list.classList.add('list')
  const frag = document.createDocumentFragment()
  const offsetTops = []

  panels.forEach(panel => {
    offsetTops.push(panel.offsetTop)

    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = `#${panel.id}`
    a.innerHTML = panel.firstChild.innerHTML
    li.appendChild(a)
    frag.appendChild(li)
  })
  list.appendChild(frag)
  aside.appendChild(list)
  return offsetTops
}

function updateLinks(links) {
  let hash = location.hash

  links.forEach(link => {
    link.classList.remove('focus')
    if (link.getAttribute('href') === hash) {
      link.classList.add('focus')
    }
  })
}
</script>

<template>
<div class="panel">
  <div class="title">{{ title }}</div>
  <div class="content">
    <slot />
  </div>
</div>
</template>

<style lang="less">
.panel {
  border-bottom: 1px solid #e9e9e9;

  .title {
    font-size: 1.8rem;
    font-weight: 500;
    padding: 12px 16px;
    line-height: 1.25;
    letter-spacing: 1px;
  }

  .content {
    padding: 10px;
  }

  .controls {
    display: flex;
    padding: 20px 10px;
    border-bottom: 1px solid #e9e9e9;

    > * {
      margin-right: 20px;
    }
  }
}
</style>
