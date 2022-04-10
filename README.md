<h1 style="text-align: center; margin: 30px 0 35px;">Lovue</h1>

<p style="text-align: center;">
    <img src="https://img.shields.io/npm/dt/lovue.svg?style=flat-square" alt="downloads" />
    <img src="https://img.shields.io/npm/dm/lovue.svg?style=flat-square" alt="downloads" />
    <img src="https://img.badgesize.io/https://unpkg.com/lovue/dist/lovue.umd.js?compression=gzip&style=flat-square&label=JS%20gzip%20size" alt="JS Gzip Size" />
    <img src="https://img.badgesize.io/https://unpkg.com/lovue/dist/style.css?compression=gzip&style=flat-square&label=CSS%20gzip%20size" alt="CSS Gzip Size" />
</p>

- 每个组件都是一个.vue格式的单文件，并且尽量减少代码量，结构简单，方便阅读和理解以及自行修改源码
- 尽量使用最新的技术实现

### 开发

```
pnpm install
pnpm run dev
pnpm run build
```

访问：http://localhost:3000

### 使用方法

- 第一种：引入已编译的js文件，这样可以使用所有的组件

```
<head>
<link href="path/to/style.css" rel="stylesheet">
<script src="https://unpkg.com/vue@3"></script>
<script src="path/to/lovue.umd.js" defer>
</head>
<body>
<div id="app">
  <LvInput />
</div>
<script>
  Vue.createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
</body>
```

- 第二种：通过import导入

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

- 第三种：在js文件中导入单个vue文件，可以按需引用

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
