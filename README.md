<h1 style="text-align: center; margin: 30px 0 35px;">Lovue</h1>

<p style="text-align: center;">
    <img src="https://img.shields.io/npm/dt/lovue.svg?style=flat-square" alt="downloads" />
    <img src="https://img.shields.io/npm/dm/lovue.svg?style=flat-square" alt="downloads" />
    <img src="https://img.badgesize.io/https://unpkg.com/lovue/dist/lovue.umd.js?compression=gzip&style=flat-square&label=JS%20gzip%20size" alt="JS Gzip Size" />
    <img src="https://img.badgesize.io/https://unpkg.com/lovue/dist/style.css?compression=gzip&style=flat-square&label=CSS%20gzip%20size" alt="CSS Gzip Size" />
</p>

### Develop

```
pnpm install
pnpm run dev
pnpm run build
```

### Usage

- import from npm to use all components directly.

```
npm install -D lovue

//main.js
import lovue from 'lovue'
import { createApp } from 'vue'

const app = createApp({
  data() {
    return {
      count: 0
    }
  }
})
app.use(lovue)
app.mount('#app')
```

- import single component on-demand.

```
import { LvTable } from 'lovue'

const app = createApp({
  data() {
    return {
      count: 0
    }
  }
})
app.component('LvTable', LvTable)
app.mount('#app')
```

- some components must be imported
