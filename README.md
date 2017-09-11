# Vue-components
- .vue单文件形式的组件，可直接导入使用
- 包含一些纯CSS控件
- 优点：几乎每个组件都是一个.vue格式的单文件，并且尽量减少代码量，方便阅读和理解以及自行修改源码

Demo: [https://www.yikeyong.com/ui](https://www.yikeyong.com/spa/vue-components.html)

### 使用方法
- 第一种（推荐）：引入已编译的js文件，这样可以使用所有的组件
```
<head>
<link href="path/to/lovue.css" rel="stylesheet">
<script src="path/to/vue.min.js">
<script src="path/to/lovue.min.js" defer>
</head>
<body>
<div id="app">
  <vue-table></vue-table>
</div>
<script>
  new Vue({
    el: '#app'
  })
</script>
</body>
```
- 第二种：在js文件中导入单个vue文件，可以按需引用
```
import VueTable from './vue/Table.vue'

new Vue({
  el: '#app',
  components: { VueTable }
})
```

### 已完成：
- 搜索框：Search.vue
- 选择文件按钮：UploadButton.vue
- Tab页：Tab.vue
- 弹出提示框：BeautyAlert.vue
- 中国省市选择器：SelectCity.vue
- 日期选择器：DatePicker.vue
- 图片裁剪并上传（简版）：Crop.vue
- HTML5富文本编辑器：HtmlEditor.vue
- 图片倒影：ImgReflex.vue
- 分页：Pagination.vue
- 表格：Table.vue
- 加载：Loading.vue
- 进度条：ProgressBar.vue
- 弹出窗口：PopupWindow.vue
- 高级下拉列表：Select.vue
- 密码强度验证：PwdStrength.vue
- 树形列表：TreeList.vue
- 提交按钮：SubmitButton.vue
- 密码验证：PwdValidity.vue
- 拖拽：DragDrop.vue
- 拖动滑块验证：NoCaptcha.vue
- 带树形结构的表格:TableTree.vue
- 收缩菜单：Collapse.vue


### 开发中：
- 走马灯：Carousel.vue

### CSS控件：
- 左右布局
- 网格布局
- 按钮
- 下拉菜单
- 文本输入框
- 单选框
- 复选框
- 开关
- 文件上传按钮
- 下拉列表
