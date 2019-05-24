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

const buildings = function () {
  const base = [
    {
      name: '一公寓',
      layers: 5,
      age: 80
    },
    {
      name: '二公寓',
      layers: 10,
      age: 40
    },
    {
      name: '研究生公寓',
      layers: 6,
      age: 3
    }
  ]

  let result = []

  for (let i = 0; i < 10; i++) {
    result = result.concat(base)
  }

  return result
}

new Vue({
  el: '#app',
  data: {
    columns: [
      { title: '属性', prop: 'prop' },
      { title: '说明', prop: 'desc' },
      { title: '类型', prop: 'type' },
      { title: '默认值', prop: 'deft' },
    ],
    sourceButton: [
      { prop: 'type', desc: '样式，内置：primary, danger, ghost, text，可自定义', type: 'String', deft: 'primary' },
      { prop: 'size', desc: '大小，支持：lg, sm', type: 'String', deft: '无' },
      { prop: 'disabled', desc: '是否禁用', type: 'Boolean', deft: '无' },
      { prop: 'icon', desc: '图标', type: 'String', deft: '无' },
      { prop: 'loading', desc: '是否正在等待，用于异步请求', type: 'Boolean', deft: '无' },
      { prop: 'submit', desc: '是否是提交按钮', type: 'Boolean', deft: '无' }
    ],
    sourceMenu: [
      { prop: 'menus', desc: '菜单数据，菜单项：{name, icon, children}', type: 'Array', deft: '无' },
      { prop: 'vertical', desc: '是否垂直模式', type: 'Boolean', deft: '无' },
      { prop: 'mode', desc: '菜单项模式，支持：link，超链接模式，点击跳转；nonLink，非链接模式，点击时，$emit("click", menu.value || menu.url)；spa，SPA模式，只能在SPA应用中使用', type: 'String', deft: 'link' }
    ],
    sourceInput: [
      { prop: 'v-model', desc: '组件双向绑定的值', type: 'String, Number', deft: '无' },
      { prop: 'effect', desc: '是否特效模式', type: 'Boolean', deft: '无' },
      { prop: 'type', desc: 'input的type值', type: 'String', deft: '无' },
      { prop: 'name', desc: 'input的name值', type: 'String', deft: '无' },
      { prop: 'placeholder', desc: 'input的placeholder值', type: 'String', deft: '无' },
      { prop: 'required', desc: 'input的required值', type: 'Boolean', deft: '无' },
      { prop: 'disabled', desc: '是否禁用', type: 'Boolean', deft: '无' },
      { prop: 'step', desc: 'number类型的input的step值', type: 'String', deft: '无' },
      { prop: 'min', desc: 'number类型的input的min值', type: 'String', deft: '无' },
      { prop: 'max', desc: 'number类型的input的max值', type: 'String', deft: '无' },
      { prop: 'focus', desc: '是否自动获得焦点', type: 'Boolean', deft: '无' },
      { prop: 'resize', desc: '是否自动调整宽度', type: 'Boolean', deft: '无' },
      { prop: 'readonly', desc: 'input的readonly值', type: 'Boolean', deft: '无' },
      { prop: '@enter', desc: '按回车时触发该事件', type: 'Function', deft: '无' }
    ],
    sourceRadio: [
      { prop: 'v-model', desc: '组件双向绑定的值', type: 'String, Number, Boolean', deft: '无' },
      { prop: 'source', desc: '选项数据，单个radio数据支持属性：disabled, name, value', type: 'Array', deft: '无' },
      { prop: 'name', desc: 'radio的name值', type: 'String', deft: '无' },
      { prop: 'vertical', desc: '是否垂直模式', type: 'Boolean', deft: '无' },
      { prop: 'reverse', desc: '是否文本与选择框顺序反转', type: 'Boolean', deft: '无' },
      { prop: 'lnf', desc: 'Look And Feel，支持：button', type: 'String', deft: '无' }
    ],
    sourceCheckbox: [
      { prop: 'v-model', desc: '组件双向绑定的值', type: 'Boolean', deft: '无' },
      { prop: 'label', desc: '显示的文本', type: 'String', deft: '无' },
      { prop: 'name', desc: 'checkbox的name值', type: 'String', deft: '无' },
      { prop: 'disabled', desc: '是否禁用', type: 'Boolean', deft: '无' },
      { prop: 'reverse', desc: '是否文本与选择框顺序反转', type: 'Boolean', deft: '无' },
      { prop: 'lnf', desc: 'Look And Feel，支持：button', type: 'String', deft: '无' }
    ],
    sourceCheckboxGroup: [
      { prop: 'v-model', desc: '组件双向绑定的值', type: 'Array', deft: '无' },
      { prop: 'source', desc: '选项数据，单个checkbox数据支持属性：disabled, name, value', type: 'Array', deft: '无' },
      { prop: 'name', desc: 'checkbox的name值', type: 'String', deft: '无' },
      { prop: 'vertical', desc: '是否垂直模式', type: 'Boolean', deft: '无' },
      { prop: 'reverse', desc: '是否文本与选择框顺序反转', type: 'Boolean', deft: '无' },
      { prop: 'lnf', desc: 'Look And Feel，支持：button', type: 'String', deft: '无' }
    ],
    sourceSwitch: [
      { prop: 'v-model', desc: '组件双向绑定的值', type: 'Boolean', deft: '无' },
      { prop: 'name', desc: 'checkbox的name值', type: 'String', deft: '无' },
      { prop: 'disabled', desc: '是否禁用', type: 'Boolean', deft: '无' }
    ],
    sourceSearch: [
      { prop: 'auto', desc: '是否自动搜索', type: 'Boolean', deft: 'true' },
      { prop: 'placeholder', desc: '占位符', type: 'String', deft: '关键词' },
      { prop: 'delay', desc: '输入搜索内容后自动搜索的延迟时间，单位：ms', type: 'Number', deft: '500' },
      { prop: '@search', desc: '搜索事件，参数：关键词', type: 'Event', deft: '无' }
    ],
    sourceUpload: [
      { prop: 'name', desc: 'input的name值', type: 'String', deft: '' },
      { prop: 'upload', desc: '是否选择文件后立即上传，是，则选择文件后不显示文件名；否，则显示', type: 'Boolean', deft: '无' },
      { prop: 'multi', desc: '是否可多选文件', type: 'Boolean', deft: '无' },
      { prop: 'required', desc: 'input的required值', type: 'Boolean', deft: '无' },
      { prop: 'accept', desc: 'input的accept值', type: 'String', deft: '无' },
      { prop: 'text', desc: '按钮显示的文本', type: 'String', deft: '选择文件' },
      { prop: 'thumbnail', desc: '选择图片后是否显示缩略图', type: 'Boolean', deft: '无' },
      { prop: 'thumbSize', desc: '缩略图的大小', type: 'Number', deft: '100' },
      { prop: 'shape', desc: '样式，支持：button, square', type: 'String', deft: 'button' },
      { prop: '@select', desc: '选择文件事件，参数：shape为button时，ev.target.files；shape为square时，files数组', type: 'Event', deft: '无' }
    ],
    sourceTab: [
      { prop: 'v-model', desc: '组件双向绑定的值', type: 'Number', deft: '无' },
      { prop: 'titles', desc: '选项数据，数据项可以是对象：{name, icon}，也可以是原始值：String/Number', type: 'Array', deft: '无' },
      { prop: 'lock', desc: '是否锁定，锁定时无法切换tab', type: 'Boolean', deft: '无' }
    ],
    sourceTooltip: [
      { prop: 'text', desc: '提示内容', type: 'String', deft: '无' },
      { prop: 'pos', desc: '提示显示的位置，有：right, bottom, left，默认为 top', type: 'String', deft: '无' },
      { prop: 'width', desc: '提示内容的宽度', type: 'String, Number', deft: '无' }
    ],
    sourceSteps: [
      { prop: 'steps', desc: '选项数据，支持属性：title, icon', type: 'Array', deft: '无' },
      { prop: 'cur', desc: '当前选中的索引', type: 'Number', deft: '0' },
    ],
    sourceSelect: [
      { prop: 'v-model', desc: '组件双向绑定的值', type: 'String, Number, Array, Object', deft: '无' },
      { prop: 'source', desc: '选项数据，支持属性：name, value, children', type: 'Array', deft: '无' },
      { prop: 'disabled', desc: '是否禁用', type: 'Boolean', deft: '无' },
      { prop: 'multiple', desc: '是否可多选', type: 'Boolean', deft: '无' },
      { prop: 'searchable', desc: '下拉列表是否可搜索', type: 'Boolean', deft: '无' },
      { prop: 'placeholder', desc: '占位符', type: 'String', deft: '请选择' },
      { prop: 'searchPlaceholder', desc: '搜索占位符', type: 'String', deft: '搜索' },
      { prop: 'steps', desc: '选项数据，支持属性：title, icon', type: 'Array', deft: '无' },
      { prop: 'max', desc: '多选时最多可选择的数量，没有则不限制', type: 'Number', deft: '无' },
      { prop: 'emitItem', desc: '是否emit整个item，是，则v-model绑定的是选中项的整个对象，否，则绑定选中项的value值', type: 'Boolean', deft: '无' },
      { prop: 'clearable', desc: '单选模式下是否可以清除选中', type: 'Boolean', deft: '无' },
    ],
    sourcePureSelect: [
      { prop: 'v-model', desc: '组件双向绑定的值', type: 'String, Number', deft: '无' },
      { prop: 'source', desc: '选项数据，每个选项只能为String/Number的原始值', type: 'Array', deft: '无' },
      { prop: 'name', desc: 'radio的name值', type: 'String', deft: '无' },
      { prop: 'placeholder', desc: '占位符', type: 'String', deft: '请选择' }
    ],
    sourceProgress: [
      { prop: 'value', desc: '传入的值', type: 'Number', deft: '无' },
      { prop: 'decimal', desc: '是否支持小数', type: 'Boolean', deft: '无' },
      { prop: 'width', desc: '宽度', type: 'Boolean', deft: '无' },
      { prop: 'height', desc: '高度', type: 'Boolean', deft: '无' },
      { prop: 'color', desc: '进度条的颜色', type: 'String', deft: 'blue-color' }
    ],
    sourcePagination: [
      { prop: 'total', desc: '总数', type: 'Number', deft: '无' },
      { prop: 'countOfPage', desc: '每页数目', type: 'Number', deft: '10' },
      { prop: 'pageCounts', desc: '可选的每页数目', type: 'Array', deft: '[10, 20, 50]' },
      { prop: 'simple', desc: '是否简易模式', type: 'Boolean', deft: '无' },
      { prop: 'noBorder', desc: '按钮是否有border', type: 'Boolean', deft: '无' }
    ],
    sourceDatePicker: [
      { prop: 'v-model', desc: '组件双向绑定的值', type: 'String', deft: '无' },
      { prop: 'name', desc: 'input的name值', type: 'String', deft: '无' },
      { prop: 'full', desc: '是否可选择时分', type: 'Boolean', deft: '无' },
      { prop: 'interval', desc: '时分列表的间隔，单位：小时，小数只支持0.5', type: 'Number', deft: '无' },
      { prop: 'minYear', desc: '最小年份', type: 'Number', deft: '1950' },
      { prop: 'maxYear', desc: '最大年份', type: 'Number', deft: '2050' },
      { prop: 'weeks', desc: '显示的星期列表', type: 'Array', deft: "['日', '一', '二', '三', '四', '五', '六']" },
      { prop: 'months', desc: '显示的月份列表', type: 'Array', deft: "['1月', '2月', ... '11月', '12月']" },
      { prop: 'fixedWidth', desc: '是否固定宽度不变', type: 'Boolean', deft: "无" },
      { prop: 'yearsDesc', desc: '年份选择列表是否倒序', type: 'Boolean', deft: "无" }
    ],
    sourceModal: [
      { prop: 'title', desc: '标题，没有，则不显示标题栏', type: 'String', deft: '无' },
      { prop: 'content', desc: '正文', type: 'String', deft: '无' },
      { prop: 'noCancel', desc: '是否不显示取消按钮', type: 'Boolean', deft: 'false' },
      { prop: 'fixed', desc: '是否顶部固定，否，则垂直居中', type: 'Boolean', deft: 'false' },
      { prop: 'confirm', desc: '点击确认时执行的异步请求，如果不提供，则点击确认直接关闭', type: 'Function', deft: 'undefined' },
      { prop: 'okText', desc: '确认按钮文本', type: 'String', deft: '确认' },
      { prop: 'cancelText', desc: '取消按钮文本', type: 'String', deft: '取消' }
    ],
    sourcePopup: [
      { prop: 'v-model', desc: '组件双向绑定的值，是否显示弹窗', type: 'Boolean', deft: '无' },
      { prop: 'title', desc: '标题', type: 'String', deft: '无' },
      { prop: 'content', desc: '正文', type: 'String', deft: '无' },
      { prop: 'fixed', desc: '是否顶部固定，否，则垂直居中', type: 'Boolean', deft: 'false' },
      { prop: 'confirm', desc: '点击确认时执行的异步请求，如果不提供，则点击确认直接关闭', type: 'Function', deft: 'undefined' },
      { prop: 'okText', desc: '确认按钮文本', type: 'String', deft: '确认' },
      { prop: 'cancelText', desc: '取消按钮文本', type: 'String', deft: '取消' },
      { prop: 'noFooter', desc: '是否没有底部区域', type: 'Boolean', deft: 'false' }
    ],
    sourceTable: [
      { prop: 'source', desc: '数据源', type: 'Array', deft: '[]' },
      { prop: 'columns', desc: '表格列，支持属性：title, prop, custom, cssClass', type: 'Array', deft: '[]' },
      { prop: 'checkbox', desc: '是否显示复选框', type: 'Boolean', deft: '无' },
      { prop: 'checkboxColumn', desc: '复选框旁边显示哪一列的值', type: 'String', deft: '无' },
      { prop: 'simple', desc: '是否简易模式，是，则没有搜索栏、分页', type: 'Boolean', deft: '无' },
      { prop: 'fixedHead', desc: '是否表头固定', type: 'Boolean', deft: '无' },
      { prop: 'keepSort', desc: '当数据源更新时，是否保持排序不变', type: 'Boolean', deft: '无' },
      { prop: 'pageCounts', desc: '可选的每页数目', type: 'Array', deft: '[10, 20, 50]' },
      { prop: 'countOfPage', desc: '每页数目', type: 'Number', deft: '10' },
      { prop: 'filters', desc: '过滤器数组，用于自定义某一列数据的显示', type: 'Array', deft: '[Intl.NumberFormat]' },
      { prop: 'total', desc: '数据总数量，显示在分页组件上', type: 'Number', deft: '无' },
      { prop: 'emptyText', desc: '没有数据时表格显示的内容', type: 'String', deft: '暂无数据' },
      { prop: 'simplePagination', desc: '分页组件是否简易模式', type: 'Boolean', deft: '无' },
      { prop: 'paginationNoBorder', desc: '分页组件按钮是否有border', type: 'Boolean', deft: '无' },
      { prop: '@check', desc: '勾选复选框时触发该事件', type: '无', deft: '无' },
      { prop: '@click-row', desc: '单击行时触发该事件', type: '无', deft: '无' },
      { prop: '@dbl-click-row', desc: '双击行时触发该事件', type: '无', deft: '无' }
    ],
    sourceCollapse: [
      { prop: 'panels', desc: '数据源', type: 'Array', deft: '无' },
      { prop: 'independent', desc: '各个panel打开关闭是否独立', type: 'Boolean', deft: '无' },
    ],
    provinceCity: ['江西省', '抚州市'],
    diploma: ['初中', '高中', '本科', '硕士', '博士'],
    pureSelectValue: undefined,
    buildings: buildings(),
    buildingColumns: [
      {
        title: '楼栋名称',
        prop: 'name'
      },
      {
        title: '层数',
        prop: 'layers',
        sortable: true
      },
      {
        title: '楼龄',
        prop: 'age'
      },
      {
        title: '操作',
        custom: true,
        prop: 'operation'
      }
    ],
    bShowWindow: false,
    cars: [
      {
        name: '布加迪',
        value: 'Bugatti'
      },
      {
        name: '法拉利',
        value: 'Ferrari'
      },
      {
        name: '兰博基尼',
        value: 'Lamborghini',
        children: [
          { name: 'Aventador', value: 'Aventador' },
          { name: 'Sesto Elemento', value: 'SestoElemento' },
          { name: 'Veneno', value: 'Veneno' },
          { name: 'Urus', value: 'Urus' }
        ]
      },
      {
        name: '迈凯伦',
        value: 'McLaren'
      }],
    bought: [
      {
        name: '布加迪',
        value: 'Bugatti'
      },
      {
        name: '法拉利',
        value: 'Ferrari'
      },
      {
        name: '五菱',
        value: 'fiveLing',
        custom: true
      }
    ],
    bought2: '',
    bought3: [],
    items: {
      name: 'IT',
      children: [
        {
          name: 'Front End',
          children: [
            {
              name: 'Lib',
              children: [
                {
                  name: 'Vue'
                },
                {
                  name: 'React'
                },
                {
                  name: 'Angular'
                }
              ]
            }
          ]
        },
        {
          name: 'Back End'
        }
      ]
    },
    trigger: false,
    password: '',
    loadingSubmit: false,
    loading: false,
    loading2: false,
    menus: [
      {
        name: '交易流水',
        icon: 'setting',
        _focus: true,
        children: [
          { name: 'OTC商品期权', url: '/otc/options.html', _focus: true },
          { name: 'OTC价差期权', url: '/otc/spread.html' }
        ]
      },
      { name: '持仓管理', icon: 'setting', url: '/otc/position.html' },
      {
        name: 'TA管理',
        icon: 'setting',
        children: [
          { name: '申购赎回管理', url: '/otc/purchase.html' },
          { name: '客户信息管理', url: '/otc/information.html' },
          { name: '客户持仓管理', url: '/otc/customer-position.html' },
          { name: '基金返账管理', url: '/otc/vi-settlement.html' }
        ]
      }
    ],
    tabTitles: [
      { name: 'Vue', icon: 'heart' },
      { name: 'React', icon: 'setting' },
      { name: 'Angular', icon: 'home' }
    ],
    tabTitles2: ['Vue','React', 'Angular'],
    currentStep: 0,
    allSteps: [
      { title: '第一步', icon: 'heart' },
      { title: '第二步', icon: 'heart' },
      { title: '第三步', icon: 'heart' }
    ],
    allSteps2: [
      { title: '第一步' },
      { title: '第二步' },
      { title: '第三步' }
    ],
    isShowPopup: false,
    switchValue: true,
    tags: [
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'JavaScript' },
      { name: 'Vue' },
      { name: 'Angular' },
      { name: 'React' },
      { name: 'Node' },
      { name: 'npm' },
    ],
    checkboxValue: true,
    checkboxSource: [
      { name: 'HTML', value: 'html' },
      { name: 'CSS', value: 'css' },
      { name: 'JavaScript', value: 'js', disabled: true },
      { name: 'Vue', value: 'vue', disabled: true },
      { name: 'Angular', value: 'angular' },
      { name: 'React', value: 'react' },
      { name: 'Node', value: 'node' },
      { name: 'npm', value: 'npm' }
    ],
    multiCheckboxValue: ['html', 'css', 'js', 'npm'],
    radioSource: [
      { name: 'Vue', value: 'vue' },
      { name: 'Angular', value: 'angular', disabled: true },
      { name: 'React', value: 'react' }
    ],
    radioValue: 'vue',
    datePickerValue: '2018-11-11',
    tabValue: 1,
    pageCounts: [10, 20, 30, 40, 50],
    collapsePanels: [
      { title: 'First', slot: 'first', show: false },
      { title: 'Second', slot: 'second', show: true },
      { title: 'Third', slot: 'third', show: false }
    ]
  },
  methods: {
    sleep(delay = 1000) {
      return new Promise(resolve => setTimeout(() => resolve(), delay))
    },
    previousStep() {
      if (this.currentStep === 0) return
      this.currentStep--
    },
    nextStep() {
      if (this.currentStep === this.allSteps.length - 1) return
      this.currentStep++
    },
    msgSuccess() {
      this.success('成功')
    },
    msgWarn() {
      this.warn('警告')
    },
    msgInfo() {
      this.info('提示')
    },
    msgError() {
      this.error('错误')
    },
    showModal() {
      this.modal({
        title: '标题',
        content: '内容'
      })
    },
    showSimpleModal() {
      this.modal('内容')
    },
    showFixedModal() {
      this.modal({
        content: '内容',
        fixed: true
      })
    },
    showAsyncModal() {
      this.modal({
        title: '标题',
        content: '内容',
        async: true,
        confirm: async () => {
          await this.sleep()
          return true
        }
      })
    },
    startSearch(text) {
      this.info(`searching ${text}`)
    },
    selectFiles(files) {
      const names = [];
      [].forEach.call(files, file => names.push(file.name))
      this.info(`选择了 ${names.join(',')}`)
    },
    showPopup() {
      this.isShowPopup = true
    },
    checkTableRows(rows) {
      this.warn(rows.map(row => row.name).join(', '))
    },
    selectDate(date) {
      console.log(date)
    },
    clickRow(row) {
      console.log('click', row)
    },
    dblClickRow(row) {
      console.log('dblClick', row)
    },
    clickMenu(link) {
      this.success('click menu ' + link)
    },
    pressenter(value) {
      this.success('input ' + value)
    }
  },
  mounted() {
    setTimeout(() => {
      const offsetTops = createMenu()
      const links = document.querySelectorAll('.aside ul.list a')

      updateLinks(links)
      window.onhashchange = () => updateLinks(links)

      window.addEventListener('scroll', () => {
        for (let i = 0; i < offsetTops.length - 1; i++) {
          if (offsetTops[i] - 100 < pageYOffset && pageYOffset < offsetTops[i + 1] - 100) {
            links.forEach((link, index) => {
              link.classList.remove('focus')
              index === i && link.classList.add('focus')
            })
          }
        }
      })
    }, 400)

    setTimeout(() => {
      // this.bought2 = 'Aventador'
      this.pureSelectValue = '高中'
      this.datePickerValue = '2019-3-15'
      this.tabValue = 2
    }, 2000)

    Prism.highlightAll()
  }
})
