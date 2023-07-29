<h1 style="text-align: center; margin: 30px 0 35px;">Lovue</h1>

<p style="text-align: center;">
    <img src="https://img.shields.io/npm/dt/lovue.svg?style=flat-square" alt="downloads" />
    <img src="https://img.shields.io/npm/dm/lovue.svg?style=flat-square" alt="downloads" />
</p>

- Each component is just a single `.vue` file.
- Implemented by modern syntax and features.
- Better performance with nearly 60 FPS.

[Docs](https://lovue.vercel.app/)

### Note

For Vue 2, please install lovue@^3.0.0

### Develop

```shell
pnpm install
pnpm run dev
pnpm run build
```

### Usage

- import from npm to use all components directly.

```
npm install -D lovue
```

```js
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

```js
import { LvTable } from 'lovue'
```

- some components must be imported explicitly.

```js
import { Indicator, Dialog, Toast } from 'lovue'
// extension components
import { LvBadge, LvMenu, LvSteps } from 'lovue'
```
