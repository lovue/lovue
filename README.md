# Vue-components
.vue单文件形式的组件，可直接导入使用；也包含一些纯CSS控件

Demo: [https://www.yikeyong.com/ui](https://www.yikeyong.com/ui)

### 使用方法
- 第一种（推荐）：引入已编译得到js文件，这样可以使用所有的组件
```
<head>
<link href="path/to/global.css" rel="stylesheet">
<script src="path/to/vue.min.js">
<script src="path/to/yikeyong.min.js" defer>
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
- 日期选择器：DatePicker.vue
- 中国省市选择器：SelectCity.vue
- 弹出提示框：BeautyAlert.vue
- 图片裁剪并上传（简版）：Crop.vue
- HTML5富文本编辑器：HtmlEditor.vue
- Tab页：Tab.vue
- 收缩菜单：Collapse.vue
- 表格：Table.vue
- 拖拽：DragDrop.vue
- 分页：Pagination.vue
- 弹出窗口：PopupWindow.vue
- 进度条：ProgressBar.vue
- 选择文件按钮：UploadButton.vue
- 高级下拉列表：Select.vue
- 拖动滑块验证：NoCaptcha.vue
- 加载：Loading.vue
- 搜索框：Search.vue


### 开发中：
- 走马灯：Carousel.vue

### CSS控件：
- 按钮
- 下拉菜单
- 文本输入框
- 单选框
- 复选框
- 开关
- 文件上传按钮
- 下拉列表
- 图片倒影
