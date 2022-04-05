<script setup lang="ts">
import { onMounted } from 'vue'
import ComponentIcon from './ComponentIcon.vue'
import ComponentButton from './ComponentButton.vue'
import ComponentDropdown from './ComponentDropdown.vue'
import ComponentInput from './ComponentInput.vue'
import ComponentOptions from './ComponentOptions.vue'
import ComponentSearch from './ComponentSearch.vue'
import ComponentUpload from './ComponentUpload.vue'
import ComponentTabs from './ComponentTabs.vue'
import ComponentSelect from './ComponentSelect.vue'
import ComponentDialog from './ComponentDialog.vue'
import ComponentDatePicker from './ComponentDatePicker.vue'
import ComponentTooltip from './ComponentTooltip.vue'
import ComponentPagination from './ComponentPagination.vue'
import ComponentTable from './ComponentTable.vue'

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
  const offsetTops: number[] = []

  panels.forEach(panel => {
    if (!(panel instanceof HTMLElement)) return

    offsetTops.push(panel.offsetTop)

    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = `#${panel.id}`

    if (panel.firstElementChild !== null) {
      a.innerHTML = panel.firstElementChild.innerHTML
    }

    li.appendChild(a)
    frag.appendChild(li)
  })
  list.appendChild(frag)

  if (aside !== null) {
    aside.appendChild(list)
  }

  return offsetTops
}

// eslint-disable-next-line no-undef
function updateLinks(links: NodeListOf<Element>) {
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
  <div class="container">
    <aside class="l aside" />
    <div class="r main">
      <ComponentIcon />
      <ComponentButton />
      <ComponentDropdown />
      <ComponentInput />
      <ComponentOptions />
      <ComponentSearch />
      <ComponentUpload />
      <ComponentTabs />
      <ComponentSelect />
      <ComponentDialog />
      <ComponentDatePicker />
      <ComponentTooltip />
      <ComponentPagination />
      <ComponentTable />
    </div>
  </div>
</template>

<style lang="less">
.container {
  > .l {
    box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%), 0 3px 1px -2px rgb(0 0 0 / 20%);
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
  display: inline-block;
  box-shadow: 1px 1px 0.5em black inset;
  padding: 1em;
  //background: hsl(30deg 20% 25%);
  //color: hsl(350deg 40% 70%);
  background: #282c34;
  color: #66d9ef;
  border-radius: 0.5em;
}
</style>
