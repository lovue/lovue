# Vue-components
- .vue单文件形式的组件，可直接导入使用
- 包含一些纯CSS控件
- 优点：几乎每个组件都是一个.vue格式的单文件，并且尽量减少代码量，方便阅读和理解以及自行修改源码

[Demo](https://lovue.now.sh)

### 开发
```
npm install
npm run serve
npm run build
```
访问：http://localhost:10001

### 使用方法
- 第一种：引入已编译的js文件，这样可以使用所有的组件
```
<head>
<link href="path/to/lovue.min.css" rel="stylesheet">
<script src="path/to/vue.min.js">
<script src="path/to/lovue.min.js" defer>
</head>
<body>
<div id="app">
  <v-input></v-input>
</div>
<script>
  new Vue({
    el: '#app'
  })
</script>
</body>
```
- 第二种：通过import导入
```
npm install -D lovue

//main.js
import 'lovue'
import 'lovue/dist/lovue.min.css'

new Vue({
  el: '#app'
})
```
- 第三种：在js文件中导入单个vue文件，可以按需引用
```
import Table from './components/Table.vue'

Vue.component(Table.name, Table)

new Vue({
  el: '#app'
})
```

### 已完成：

#### Basic
- 左右布局
- 按钮：Button.vue
- 复选框：Checkbox.vue
- 日期选择器：DatePicker.vue
- 图标：Icon.vue
- 菜单：Menu.vue
- 提示：Message.vue
- 模态框：Modal.vue
- 分页：Pagination.vue
- 弹出窗口：Popup.vue
- 进度条：Progress.vue
- 密码强度验证：PwdStrength.vue
- 单选框：Radio.vue
- 搜索框：Search.vue
- 高级下拉列表：Select.vue
- 开关：Switch.vue
- Tab页：Tab.vue
- 表格：Table.vue
- 选择文件按钮：Upload.vue

#### Extension
- 收缩菜单：Collapse.vue
- 图片倒影：ImgReflex.vue
- HTML5富文本编辑器：HtmlEditor.vue
- 中国省市选择器：SelectCity.vue
- 步骤：Step.vue
- 标签选择：Tag.vue


### 开发中：

- 图片裁剪并上传（简版）：Crop.vue
- 走马灯：Carousel.vue
- 树形列表：TreeList.vue
- 带树形结构的表格:TableTree.vue
