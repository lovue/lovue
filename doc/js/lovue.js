
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (Vue) {
  'use strict';

  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
    data() {
      return {
        visible: false,
        message: '',
        showClose: document.visibilityState === 'hidden',
        type: 'success',
        duration: 2000,
        timer: null
      }
    },
    computed: {
      iconType() {
        let all = {
          info: 'info',
          success: 'check',
          error: 'close',
          warn: 'warn'
        };
        return all[this.type]
      }
    },
    methods: {
      close() {
        this.visible = false;
        this.$el.addEventListener('transitionend', this.destroy);
      },
      destroy() {
        this.$el.removeEventListener('transitionend', this.destroy);
        this.$destroy();
        document.body.removeChild(this.$el);
        clearTimeout(this.timer);
      }
    },
    mounted() {
      if (!this.showClose) {
        this.timer = setTimeout(() => this.close(), this.duration);
      }
    }
  };

  /* script */
              const __vue_script__ = script;
              
  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"slide-fade2"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],staticClass:"v-message"},[_c('div',{staticClass:"m-icon",class:("m-" + _vm.type)},[_c('v-icon',{attrs:{"icon":_vm.iconType}})],1),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.message))]),_vm._v(" "),(_vm.showClose)?_c('v-icon',{attrs:{"icon":"close"},nativeOn:{"click":function($event){return _vm.close($event)}}}):_vm._e()],1)])};
  var __vue_staticRenderFns__ = [];

    /* style */
    const __vue_inject_styles__ = undefined;
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* component normalizer */
    function __vue_normalize__(
      template, style, script$$1,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "Message.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var Message = __vue_normalize__(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$1 = {
    data() {
      return {
        visible: false,
        title: '',
        content: '',
        loading: false,
        noCancel: false,
        fixed: false,
        confirm: undefined,
        okText: '确认',
        cancelText: '取消'
      }
    },
    computed: {
      customCls() {
        let custom = '';
        if (this.title === '') custom = 'no-title';
        if (this.fixed) custom += ' fixed';
        return custom
      }
    },
    methods: {
      close() {
        this.visible = false;
        this.$destroy();
        document.body.removeChild(this.$el);
      },
      async handleConfirm() {
        if (!this.confirm) {
          this.close();
          return
        }

        if (this.loading) return

        this.loading = true;
        if (await this.confirm()) {
          this.close();
        }
        this.loading = false;
      }
    }
  };

  /* script */
              const __vue_script__$1 = script$1;
              
  /* template */
  var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],staticClass:"v-modal overlay",class:_vm.customCls},[_c('transition',{attrs:{"name":"slide-fade"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],staticClass:"v-window"},[_c('div',{staticClass:"title-bar"},[_c('div',{staticClass:"title-name"},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_c('v-button',{attrs:{"type":"text"},on:{"click":_vm.close}},[_c('v-icon',{attrs:{"icon":"close","size":"18"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"win-content",domProps:{"innerHTML":_vm._s(_vm.content)}}),_vm._v(" "),_c('div',{staticClass:"win-footer"},[_c('div',{staticClass:"right"},[(!_vm.noCancel)?_c('v-button',{attrs:{"type":"ghost"},on:{"click":_vm.close}},[_vm._v(_vm._s(_vm.cancelText))]):_vm._e(),_vm._v(" "),_c('v-button',{attrs:{"loading":_vm.loading},on:{"click":_vm.handleConfirm}},[_vm._v(_vm._s(_vm.okText))])],1)])])])],1)};
  var __vue_staticRenderFns__$1 = [];

    /* style */
    const __vue_inject_styles__$1 = undefined;
    /* scoped */
    const __vue_scope_id__$1 = undefined;
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = false;
    /* component normalizer */
    function __vue_normalize__$1(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "Modal.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var Modal = __vue_normalize__$1(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //

  var script$2 = {
    name: 'v-button',
    props: {
      type: String,
      size: String,
      disabled: Boolean,
      icon: String,
      loading: Boolean,
      submit: Boolean
    },
    computed: {
      customClass() {
        let classes = `v-btn-${this.type || 'primary'}`;
        this.size && (classes += ` v-btn-${this.size}`);
        return classes
      }
    },
    methods: {
      click() {
        if (this.loading) return
        this.$emit('click');
      }
    }
  };

  /* script */
              const __vue_script__$2 = script$2;
              
  /* template */
  var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"v-btn",class:_vm.customClass,attrs:{"type":_vm.submit || 'button',"disabled":_vm.disabled},on:{"click":_vm.click}},[(!!_vm.icon && !_vm.loading)?_c('v-icon',{attrs:{"icon":_vm.icon}}):_vm._e(),_vm._v(" "),(_vm.loading)?_c('v-icon',{class:{loading: _vm.loading},attrs:{"icon":"refresh"}}):_vm._e(),_vm._v(" "),_vm._t("default")],2)};
  var __vue_staticRenderFns__$2 = [];

    /* style */
    const __vue_inject_styles__$2 = undefined;
    /* scoped */
    const __vue_scope_id__$2 = undefined;
    /* module identifier */
    const __vue_module_identifier__$2 = undefined;
    /* functional template */
    const __vue_is_functional_template__$2 = false;
    /* component normalizer */
    function __vue_normalize__$2(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "Button.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var Button = __vue_normalize__$2(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //

  var script$3 = {
    name: 'v-button-group'
  };

  /* script */
              const __vue_script__$3 = script$3;
              
  /* template */
  var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-btn-group"},[_vm._t("default")],2)};
  var __vue_staticRenderFns__$3 = [];

    /* style */
    const __vue_inject_styles__$3 = undefined;
    /* scoped */
    const __vue_scope_id__$3 = undefined;
    /* module identifier */
    const __vue_module_identifier__$3 = undefined;
    /* functional template */
    const __vue_is_functional_template__$3 = false;
    /* component normalizer */
    function __vue_normalize__$3(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "ButtonGroup.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var ButtonGroup = __vue_normalize__$3(
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      undefined,
      undefined
    );

  //
  //
  //

  var script$4 = {
    name: 'v-button-send',
    data() {
      return {
        text: '发送验证码',
        loading: false,
        canSend: true
      }
    },
    props: {
      method: {
        type: String,
        'default': 'sms'
      },
      target: String,
      action: String,
      url: String
    },
    methods: {
      async send() {
        if (!this.target) {
          this.warn(`请输入${this.method === 'sms' ? '手机号' : '邮箱'}`);
          return
        }

        if (!this.canSend) return

        this.canSend = false;
        this.loading = true;
        const body = await $fetch.post(this.url, {
          method: this.method,
          target: this.target,
          action: this.action
        }).catch(this.error);
        this.loading = false;

        if (body === undefined) {
          this.canSend = true;
          return
        }

        this.success('验证码已发送');

        let timer, count = 60;
        this.text = count;
        timer = setInterval(() => {
          count--;
          if (count <= 0) {
            this.text = '发送验证码';
            this.canSend = true;
            clearInterval(timer);
          } else {
            this.text = count;
          }
        }, 1000);
      }
    }
  };

  /* script */
              const __vue_script__$4 = script$4;
              
  /* template */
  var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-button',{attrs:{"loading":_vm.loading,"disabled":!_vm.canSend},on:{"click":_vm.send}},[_vm._v(_vm._s(_vm.text))])};
  var __vue_staticRenderFns__$4 = [];

    /* style */
    const __vue_inject_styles__$4 = undefined;
    /* scoped */
    const __vue_scope_id__$4 = undefined;
    /* module identifier */
    const __vue_module_identifier__$4 = undefined;
    /* functional template */
    const __vue_is_functional_template__$4 = false;
    /* component normalizer */
    function __vue_normalize__$4(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "ButtonSend.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var ButtonSend = __vue_normalize__$4(
      { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
      __vue_inject_styles__$4,
      __vue_script__$4,
      __vue_scope_id__$4,
      __vue_is_functional_template__$4,
      __vue_module_identifier__$4,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //

  var script$5 = {
    name: 'v-checkbox',
    data() {
      return {
        checked: this.value
      }
    },
    props: {
      value: Boolean,
      label: String,
      name: String,
      disabled: Boolean,
      reverse: Boolean,
      lnf: String
    },
    computed: {
      lnfClass() {
        return this.lnf === undefined ? 'v-checkbox' : `v-checkbox-${this.lnf}`
      }
    },
    watch: {
      value(val) {
        this.checked = val;
      }
    }
  };

  /* script */
              const __vue_script__$5 = script$5;
              
  /* template */
  var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{class:( _obj = { reverse: _vm.reverse, disabled: _vm.disabled}, _obj[_vm.lnfClass] = true, _obj )},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.checked),expression:"checked"}],attrs:{"type":"checkbox","name":_vm.name,"disabled":_vm.disabled},domProps:{"checked":Array.isArray(_vm.checked)?_vm._i(_vm.checked,null)>-1:(_vm.checked)},on:{"change":[function($event){var $$a=_vm.checked,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.checked=$$a.concat([$$v]));}else{$$i>-1&&(_vm.checked=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.checked=$$c;}},function($event){_vm.$emit('input', _vm.checked);}]}}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.label))])])
  var _obj;};
  var __vue_staticRenderFns__$5 = [];

    /* style */
    const __vue_inject_styles__$5 = undefined;
    /* scoped */
    const __vue_scope_id__$5 = undefined;
    /* module identifier */
    const __vue_module_identifier__$5 = undefined;
    /* functional template */
    const __vue_is_functional_template__$5 = false;
    /* component normalizer */
    function __vue_normalize__$5(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "Checkbox.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var Checkbox = __vue_normalize__$5(
      { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
      __vue_inject_styles__$5,
      __vue_script__$5,
      __vue_scope_id__$5,
      __vue_is_functional_template__$5,
      __vue_module_identifier__$5,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$6 = {
    name: 'v-checkbox-group',
    data() {
      return {
        checked: this.value
      }
    },
    props: {
      value: Array,
      source: Array,
      name: String,
      reverse: Boolean,
      vertical: Boolean,
      lnf: String
    },
    computed: {
      lnfClass() {
        return this.lnf === undefined ? 'v-checkbox' : `v-checkbox-${this.lnf}`
      }
    },
    watch: {
      value(val) {
        this.checked = val;
      },
      checked(val) {
        this.$emit('input', val);
      }
    }
  };

  /* script */
              const __vue_script__$6 = script$6;
              
  /* template */
  var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-checkbox-group",class:{vertical: _vm.vertical}},_vm._l((_vm.source),function(item){return _c('div',{staticClass:"g-item"},[_c('label',{class:( _obj = { reverse: _vm.reverse, disabled: item.disabled}, _obj[_vm.lnfClass] = true, _obj )},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.checked),expression:"checked"}],attrs:{"type":"checkbox","name":_vm.name,"disabled":item.disabled},domProps:{"value":item.value,"checked":Array.isArray(_vm.checked)?_vm._i(_vm.checked,item.value)>-1:(_vm.checked)},on:{"change":function($event){var $$a=_vm.checked,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=item.value,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.checked=$$a.concat([$$v]));}else{$$i>-1&&(_vm.checked=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.checked=$$c;}}}}),_vm._v(" "),_c('span',[_vm._v(_vm._s(item.name))])])])
  var _obj;}))};
  var __vue_staticRenderFns__$6 = [];

    /* style */
    const __vue_inject_styles__$6 = undefined;
    /* scoped */
    const __vue_scope_id__$6 = undefined;
    /* module identifier */
    const __vue_module_identifier__$6 = undefined;
    /* functional template */
    const __vue_is_functional_template__$6 = false;
    /* component normalizer */
    function __vue_normalize__$6(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "CheckboxGroup.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var CheckboxGroup = __vue_normalize__$6(
      { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
      __vue_inject_styles__$6,
      __vue_script__$6,
      __vue_scope_id__$6,
      __vue_is_functional_template__$6,
      __vue_module_identifier__$6,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //

  var script$7 = {
    name: 'v-col',
    props: {
      span: Number
    }
  };

  /* script */
              const __vue_script__$7 = script$7;
              
  /* template */
  var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-col",class:("col-" + _vm.span)},[_vm._t("default")],2)};
  var __vue_staticRenderFns__$7 = [];

    /* style */
    const __vue_inject_styles__$7 = undefined;
    /* scoped */
    const __vue_scope_id__$7 = undefined;
    /* module identifier */
    const __vue_module_identifier__$7 = undefined;
    /* functional template */
    const __vue_is_functional_template__$7 = false;
    /* component normalizer */
    function __vue_normalize__$7(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "Col.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var Col = __vue_normalize__$7(
      { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
      __vue_inject_styles__$7,
      __vue_script__$7,
      __vue_scope_id__$7,
      __vue_is_functional_template__$7,
      __vue_module_identifier__$7,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$8 = {
    name: 'v-date-picker',
    data() {
      return {
        selfClicked: false,
        years: new Array(this.maxYear - this.minYear + 1).fill(0).map((item, i) => this.minYear + i),
        localeWeeks: this.weeks || ['日', '一', '二', '三', '四', '五', '六'],
        localeMonths: this.months || ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        year: 0,
        month: 0,
        day: 0,
        hour: '00:00',
        times: [],
        bShowPicker: false,
        scrolling: false,
        pickerWidth: 0,
        pos: '',
        open: '',
        innerUpdate: false // 防止$emit input事件时触发value的watch事件导致执行init函数
      }
    },
    props: {
      value: String,
      name: String,
      full: Boolean,
      interval: Number,
      minYear: {
        type: Number,
        'default': 1950
      },
      maxYear: {
        type: Number,
        'default': 2050
      },
      weeks: Array,
      months: Array
    },
    computed: {
      inputStyle() {
        return {
          width: this.open ? (this.pickerWidth + 'px') : ''
        }
      },
      date() {
        return this.timepicker
          ? this.year + '-' + this.month + '-' + this.day + ' ' + this.hour
          : this.year + '-' + this.month + '-' + this.day
      },
      days() {
        let firstDay, lastDay, arr = [];
        let time = new Date(this.year, this.month - 1, 1);

        firstDay = time.getDay();
        time.setDate(0);
        lastDay = time.getDate();
        for (let i = firstDay; i > 0; i--) {
          arr.push({
            text: lastDay - i + 1,
            status: 'calendar-last-month',
            month: -1
          });
        }

        time.setMonth(time.getMonth() + 2, 0);
        lastDay = time.getDate();

        if (this.day > lastDay) this.day = lastDay;

        for (let i = 1; i <= lastDay; i++) {
          arr.push({
            text: i,
            status: i === this.day ? 'focus' : '',
            month: 0
          });
        }

        let left = 42 - arr.length;
        for (let i = 1; i <= left; i++) {
          arr.push({
            text: i,
            status: 'calendar-next-month',
            month: 1
          });
        }
        return arr
      }
    },
    watch: {
      value(val) {
        if (this.innerUpdate) {
          this.innerUpdate = false;
          return
        }
        this.init(new Date(val));
      },
      date(val) {
        const date = new Date(val);
        if (date.getMonth() + 1 !== Number(val.split('-')[1])) return
        this.$emit('input', val);
      }
    },
    methods: {
      init(date) {
        console.log('init');
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.day = date.getDate();

        if (this.full) {
          let hour = date.getHours();
          let minute = date.getMinutes();
          this.hour = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute);
        }
      },
      showPicker() {
        this.selfClicked = true;
        if (this.bShowPicker) return
        this.bShowPicker = true;

        const bottomSpace = window.innerHeight - this.$el.getBoundingClientRect().bottom;
        this.pos = bottomSpace < 316 ? 'top' : 'bottom';

        this.$nextTick(() => {
          this.open = 'open';
          this.pickerWidth = this.$refs.container.offsetWidth;
        });
      },
      hidePicker() {
        this.open = '';

        setTimeout(() => {
          this.pos = '';
          this.bShowPicker = false;
        }, 400);
      },
      selectDay(i, j) {
        let d = this.days[(i - 1) * 7 + (j - 1)];
        if (d.month === 0 && d.text === this.day) return

        for (let m = 0; m < 42; m++) {
          let day = this.days[m];
          if (day.month === 0 && day.text === this.day) {
            day.status = '';
          }
        }

        d.status = 'focus';
        this.day = d.text;
        if (d.month === -1) this.prevMonth();
        if (d.month === 1) this.nextMonth();

        this.innerUpdate = true;
        if (!this.timepicker) this.hidePicker();
      },
      selectHour(time) {
        if (this.hour === time) return

        this.hour = time;
        this.innerUpdate = true;
        this.hidePicker();
      },
      prevMonth() {
        if (this.month === 1) {
          if (this.year === this.minYear) return;
          this.month = 12;
          this.year--;
        } else {
          this.month--;
        }
        this.innerUpdate = true;
      },
      nextMonth() {
        if (this.month === 12) {
          if (this.year === this.maxYear) return
          this.month = 1;
          this.year++;
        } else {
          this.month++;
        }
        this.innerUpdate = true;
      }
    },
    created() {
      this.init(this.value ? new Date(this.value) : new Date);

      if (this.full) {
        this.times = getTimeArray(this.interval);
      }
    },
    mounted() {
      window.addEventListener('click', () => {
        // 当点击组件之外的区域（包括其他DatePicker组件）时，隐藏日期选择框；点击组件自身时不做任何处理
        if (!this.selfClicked) this.hidePicker();
        this.selfClicked = false;
      });
    }
  };

  function getTimeArray(interval) {
    interval = interval < 1 ? 0.5 : Math.floor(interval);
    let num = 24 / interval;
    let hour = 0, minute = 0;
    let arr = [];

    for (let i = 0; i < num; i++) {
      arr.push((hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute));

      minute += 60 * interval;
      if (minute >= 60) {
        minute = 0;
        hour++;
      }
    }
    return arr
  }

  /* script */
              const __vue_script__$8 = script$8;
              
  /* template */
  var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-date-picker",on:{"click":_vm.showPicker}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.date),expression:"date"}],staticClass:"input",style:(_vm.inputStyle),attrs:{"name":_vm.name,"readonly":""},domProps:{"value":(_vm.date)},on:{"input":function($event){if($event.target.composing){ return; }_vm.date=$event.target.value;}}}),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.bShowPicker),expression:"bShowPicker"}],ref:"container",staticClass:"picker-container",class:(_vm.pos + " " + _vm.open)},[_c('div',{staticClass:"date-picker"},[_c('div',{staticClass:"picker-filter"},[_c('div',{staticClass:"month-picker"},[_c('button',{staticClass:"btn-text",attrs:{"type":"button"},on:{"click":_vm.prevMonth}},[_vm._v("◀")]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm.localeMonths[_vm.month - 1]))]),_vm._v(" "),_c('button',{staticClass:"btn-text",attrs:{"type":"button"},on:{"click":_vm.nextMonth}},[_vm._v("▶")])]),_vm._v(" "),_c('div',{staticClass:"year-picker"},[_c('v-pure-select',{attrs:{"source":_vm.years},model:{value:(_vm.year),callback:function ($$v) {_vm.year=$$v;},expression:"year"}})],1)]),_vm._v(" "),_c('div',{staticClass:"calendar"},[_c('table',[_c('thead',[_c('tr',_vm._l((_vm.localeWeeks),function(week){return _c('th',[_vm._v(_vm._s(week))])}))]),_vm._v(" "),_c('tbody',_vm._l((6),function(i){return _c('tr',_vm._l((7),function(j){return _c('td',{class:_vm.days[(i-1)*7+(j-1)].status,on:{"click":function($event){$event.stopPropagation();_vm.selectDay(i,j);}}},[_c('div',[_vm._v(_vm._s(_vm.days[(i-1)*7+(j-1)].text))])])}))}))])])]),_vm._v(" "),(_vm.timepicker)?_c('div',{staticClass:"time-picker"},[_c('ul',{staticClass:"list"},_vm._l((_vm.times),function(time){return _c('li',{class:time === _vm.hour ? 'focus' : '',on:{"click":function($event){$event.stopPropagation();_vm.selectHour(time);}}},[_vm._v(_vm._s(time))])}))]):_vm._e()])])};
  var __vue_staticRenderFns__$8 = [];

    /* style */
    const __vue_inject_styles__$8 = undefined;
    /* scoped */
    const __vue_scope_id__$8 = undefined;
    /* module identifier */
    const __vue_module_identifier__$8 = undefined;
    /* functional template */
    const __vue_is_functional_template__$8 = false;
    /* component normalizer */
    function __vue_normalize__$8(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "DatePicker.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var DatePicker = __vue_normalize__$8(
      { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
      __vue_inject_styles__$8,
      __vue_script__$8,
      __vue_scope_id__$8,
      __vue_is_functional_template__$8,
      __vue_module_identifier__$8,
      undefined,
      undefined
    );

  //
  //
  //

  var script$9 = {
    name: 'v-icon',
    props: {
      icon: String,
      size: String
    }
  };

  /* script */
              const __vue_script__$9 = script$9;
              
  /* template */
  var __vue_render__$9 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{class:("icon icon-" + _vm.icon),attrs:{"width":_vm.size || 20,"height":_vm.size || 20},on:{"click":function($event){_vm.$emit('click');}}},[_c('use',{attrs:{"xlink:href":("#icon-" + _vm.icon)}})])};
  var __vue_staticRenderFns__$9 = [];

    /* style */
    const __vue_inject_styles__$9 = undefined;
    /* scoped */
    const __vue_scope_id__$9 = undefined;
    /* module identifier */
    const __vue_module_identifier__$9 = undefined;
    /* functional template */
    const __vue_is_functional_template__$9 = false;
    /* component normalizer */
    function __vue_normalize__$9(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "Icon.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var Icon = __vue_normalize__$9(
      { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
      __vue_inject_styles__$9,
      __vue_script__$9,
      __vue_scope_id__$9,
      __vue_is_functional_template__$9,
      __vue_module_identifier__$9,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$a = {
    name: 'v-input',
    data() {
      return {
        width: this.resize ? 0 : undefined,
        content: this.value
      }
    },
    props: {
      value: [String, Number],
      effect: Boolean,
      type: String,
      name: String,
      placeholder: String,
      required: Boolean,
      disabled: Boolean,
      step: String,
      min: String,
      max: String,
      focus: Boolean,
      resize: Boolean
    },
    watch: {
      value(val) {
        this.content = val;
      },
      content(val) {
        this.resize && this.updateSize();
        this.$emit('input', val);
      }
    },
    methods: {
      async updateSize() {
        await this.$nextTick();
        this.width = this.$el.querySelector('.hidden-value').offsetWidth;
      }
    },
    mounted() {
      this.focus && this.$el.querySelector('input').focus();
    }
  };

  /* script */
              const __vue_script__$a = script$a;
              
  /* template */
  var __vue_render__$a = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-input",class:{effect: _vm.effect}},[(_vm.resize)?_c('div',{staticClass:"hidden-value"},[_vm._v(_vm._s(_vm.content))]):_vm._e(),_vm._v(" "),((_vm.type)==='checkbox')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.content),expression:"content"}],staticClass:"input",style:(("min-width: " + _vm.width + "px;")),attrs:{"name":_vm.name,"step":_vm.step,"min":_vm.min,"max":_vm.max,"placeholder":_vm.placeholder,"required":_vm.required,"autocomplete":"off","disabled":_vm.disabled,"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.content)?_vm._i(_vm.content,null)>-1:(_vm.content)},on:{"change":function($event){var $$a=_vm.content,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.content=$$a.concat([$$v]));}else{$$i>-1&&(_vm.content=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.content=$$c;}}}}):((_vm.type)==='radio')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.content),expression:"content"}],staticClass:"input",style:(("min-width: " + _vm.width + "px;")),attrs:{"name":_vm.name,"step":_vm.step,"min":_vm.min,"max":_vm.max,"placeholder":_vm.placeholder,"required":_vm.required,"autocomplete":"off","disabled":_vm.disabled,"type":"radio"},domProps:{"checked":_vm._q(_vm.content,null)},on:{"change":function($event){_vm.content=null;}}}):_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.content),expression:"content"}],staticClass:"input",style:(("min-width: " + _vm.width + "px;")),attrs:{"name":_vm.name,"step":_vm.step,"min":_vm.min,"max":_vm.max,"placeholder":_vm.placeholder,"required":_vm.required,"autocomplete":"off","disabled":_vm.disabled,"type":_vm.type},domProps:{"value":(_vm.content)},on:{"input":function($event){if($event.target.composing){ return; }_vm.content=$event.target.value;}}}),_vm._v(" "),(_vm.effect)?_c('hr'):_vm._e()])};
  var __vue_staticRenderFns__$a = [];

    /* style */
    const __vue_inject_styles__$a = undefined;
    /* scoped */
    const __vue_scope_id__$a = undefined;
    /* module identifier */
    const __vue_module_identifier__$a = undefined;
    /* functional template */
    const __vue_is_functional_template__$a = false;
    /* component normalizer */
    function __vue_normalize__$a(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "Input.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var Input = __vue_normalize__$a(
      { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
      __vue_inject_styles__$a,
      __vue_script__$a,
      __vue_scope_id__$a,
      __vue_is_functional_template__$a,
      __vue_module_identifier__$a,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$b = {
    name: 'v-menu',
    data() {
      return {
        openedMenu: null
      }
    },
    props: {
      menus: Array,
      vertical: Boolean,
      mode: {
        type: String,
        'default': 'link'
      }
    },
    methods: {
      closeMenu(menu) {
        setTimeout(() => {
          this.$set(menu, '_openIcon', false);
          this.$set(menu, 'height', 0);
        }, 60);
        setTimeout(() => this.$set(menu, '_open', false), 400);
      },
      openMenu(menu) {
        this.$set(menu, '_open', true);
        this.$set(menu, '_openIcon', true);
        setTimeout(() => this.$set(menu, 'height', menu.children.length * 48), 60);
      },
      toggleMenu(menu) {
        if (!menu._open) {
          const { openedMenu } = this;
          if (openedMenu !== null) {
            this.closeMenu(openedMenu);
          }
          this.openMenu(menu);
          this.openedMenu = menu;
        } else {
          this.closeMenu(menu);
          this.openedMenu = null;
        }
      },
      clearFocus() {
        this.menus.forEach(menu => {
          menu._focus = false;
          if (menu.children) {
            menu.children.forEach(child => {
              child._focus = false;
            });
          }
        });
      },
      clickItem(child, menu) {
        this.clearFocus();
        menu && (menu._focus = true);
        child._focus = true;
        this.$forceUpdate();
        this.$emit('click', child.value || child.url);
      }
    }
  };

  /* script */
              const __vue_script__$b = script$b;
              
  /* template */
  var __vue_render__$b = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"v-menu",class:{vertical: _vm.vertical}},_vm._l((_vm.menus),function(menu){return _c('li',{staticClass:"v-menu-item"},[(_vm.vertical)?[(menu.children)?[_c('div',{staticClass:"i-title",class:{focus: menu._focus},on:{"click":function($event){_vm.toggleMenu(menu);}}},[(menu.icon)?_c('v-icon',{attrs:{"icon":menu.icon,"size":"16"}}):_vm._e(),_c('span',[_vm._v(_vm._s(menu.name))]),_vm._v(" "),_c('v-icon',{class:{up: menu._openIcon},attrs:{"icon":"down-wide"}})],1),_vm._v(" "),_c('ul',{directives:[{name:"show",rawName:"v-show",value:(menu._open),expression:"menu._open"}],staticClass:"m-sub",style:(("height: " + (menu.height || 0) + "px;"))},_vm._l((menu.children),function(child){return _c('li',{staticClass:"s-item"},[(_vm.mode === 'spa')?_c('router-link',{attrs:{"to":child.url}},[_vm._v(_vm._s(child.name))]):_vm._e(),_vm._v(" "),(_vm.mode === 'link')?_c('a',{class:{focus: child._focus},attrs:{"href":child.url}},[_vm._v(_vm._s(child.name))]):_vm._e(),_vm._v(" "),(_vm.mode === 'nonLink')?_c('a',{class:{focus: child._focus},on:{"click":function($event){_vm.clickItem(child, menu);}}},[_vm._v(_vm._s(child.name))]):_vm._e()],1)}))]:[(_vm.mode === 'spa')?_c('router-link',{staticClass:"i-link",attrs:{"to":menu.url}},[(menu.icon)?_c('v-icon',{attrs:{"icon":menu.icon,"size":"16"}}):_vm._e(),_c('span',[_vm._v(_vm._s(menu.name))])],1):_vm._e(),_vm._v(" "),(_vm.mode === 'link')?_c('a',{staticClass:"i-link",class:{focus: menu._focus},attrs:{"href":menu.url}},[(menu.icon)?_c('v-icon',{attrs:{"icon":menu.icon,"size":"16"}}):_vm._e(),_c('span',[_vm._v(_vm._s(menu.name))])],1):_vm._e(),_vm._v(" "),(_vm.mode === 'nonLink')?_c('a',{staticClass:"i-link",class:{focus: menu._focus},on:{"click":function($event){_vm.clickItem(menu);}}},[(menu.icon)?_c('v-icon',{attrs:{"icon":menu.icon,"size":"16"}}):_vm._e(),_c('span',[_vm._v(_vm._s(menu.name))])],1):_vm._e()]]:[(menu.children)?_c('div',{staticClass:"v-dropdown-wrap"},[_c('div',{staticClass:"d-trigger",class:{focus: menu._focus}},[(menu.icon)?_c('v-icon',{attrs:{"icon":menu.icon,"size":"16"}}):_vm._e(),_c('span',[_vm._v(_vm._s(menu.name))]),_vm._v(" "),_c('v-icon',{attrs:{"icon":"down-wide"}})],1),_vm._v(" "),_c('div',{staticClass:"v-dropdown"},[(_vm.mode === 'spa')?_vm._l((menu.children),function(child,i){return _c('router-link',{key:i,staticClass:"d-item",attrs:{"to":child.url}},[_vm._v(_vm._s(child.name))])}):_vm._e(),_vm._v(" "),(_vm.mode === 'link')?_vm._l((menu.children),function(child){return _c('a',{staticClass:"d-item",class:{focus: child._focus},attrs:{"href":child.url}},[_vm._v(_vm._s(child.name))])}):_vm._e(),_vm._v(" "),(_vm.mode === 'nonLink')?_vm._l((menu.children),function(child){return _c('a',{staticClass:"d-item",on:{"click":function($event){_vm.clickItem(child, menu);}}},[_vm._v(_vm._s(child.name))])}):_vm._e()],2)]):[(_vm.mode === 'spa')?_c('router-link',{staticClass:"i-link",attrs:{"to":menu.url}},[(menu.icon)?_c('v-icon',{attrs:{"icon":menu.icon,"size":"16"}}):_vm._e(),_c('span',[_vm._v(_vm._s(menu.name))])],1):_vm._e(),_vm._v(" "),(_vm.mode === 'link')?_c('a',{staticClass:"i-link",class:{focus: menu._focus},attrs:{"href":menu.url}},[(menu.icon)?_c('v-icon',{attrs:{"icon":menu.icon,"size":"16"}}):_vm._e(),_c('span',[_vm._v(_vm._s(menu.name))])],1):_vm._e(),_vm._v(" "),(_vm.mode === 'nonLink')?_c('a',{staticClass:"i-link",class:{focus: menu._focus},on:{"click":function($event){_vm.clickItem(menu);}}},[(menu.icon)?_c('v-icon',{attrs:{"icon":menu.icon,"size":"16"}}):_vm._e(),_c('span',[_vm._v(_vm._s(menu.name))])],1):_vm._e()]]],2)}))};
  var __vue_staticRenderFns__$b = [];

    /* style */
    const __vue_inject_styles__$b = undefined;
    /* scoped */
    const __vue_scope_id__$b = undefined;
    /* module identifier */
    const __vue_module_identifier__$b = undefined;
    /* functional template */
    const __vue_is_functional_template__$b = false;
    /* component normalizer */
    function __vue_normalize__$b(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "Menu.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var Menu = __vue_normalize__$b(
      { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
      __vue_inject_styles__$b,
      __vue_script__$b,
      __vue_scope_id__$b,
      __vue_is_functional_template__$b,
      __vue_module_identifier__$b,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$c = {
    name: 'v-pagination',
    data() {
      return {
        per: this.countOfPage,
        index: 1,
        jumpPage: 1
      }
    },
    props: {
      total: Number,
      countOfPage: {
        type: Number,
        'default': 10
      },
      pageCounts: {
        type: Array,
        'default': () => [10, 20, 50]
      },
      simple: Boolean
    },
    computed: {
      pages() {
        let n = Math.ceil(this.total / this.per);
        n = n || 1;
        return n
      },
      showed() {
        let start = (this.index - 2) < 1 ? 1 : (this.index - 2);
        let arr = [], i = 0;
        while (i < 5) {
          if (start > this.pages) {
            if (arr[0] > 1) {
              arr.unshift(arr[0] - 1);
            }
          } else {
            arr.push(start);
          }
          start++;
          i++;
        }
        return arr
      },
      slice() {
        return [(this.index - 1) * this.per, this.index * this.per]
      }
    },
    watch: {
      slice(val) {
        this.$emit('update', val);
      },
      pages(val) {
        if (this.index > val) this.index = val;
      }
    },
    methods: {
      prev() {
        this.index > 1 && this.index--;
      },
      next() {
        this.index < this.pages && this.index++;
      },
      jump() {
        let n = Number.parseInt(this.jumpPage);
        if (!Number.isNaN(n)) {
          if (n < 1) {
            n = 1;
          } else if (n > this.pages) {
            n = this.pages;
          }
          this.index = n;
          this.jumpPage = n;
        }
      }
    },
    mounted() {
      this.$emit('update', this.slice);
    }
  };

  /* script */
              const __vue_script__$c = script$c;
              
  /* template */
  var __vue_render__$c = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-pagination"},[(_vm.simple)?[_c('span',[_vm._v(_vm._s(_vm.index)+"/"+_vm._s(_vm.pages)+"页")]),_vm._v(" "),_c('ul',{staticClass:"p-pages"},[_c('li',[_c('a',{staticClass:"link",on:{"click":_vm.prev}},[_c('v-icon',{attrs:{"icon":"left","size":"16"}})],1)]),_vm._v(" "),_c('li',[_c('a',{staticClass:"link",on:{"click":_vm.next}},[_c('v-icon',{attrs:{"icon":"right","size":"16"}})],1)])])]:[_c('div',{staticClass:"p-total"},[_vm._v("共 "+_vm._s(_vm.total)+" 条")]),_vm._v(" "),_c('div',{staticClass:"p-one"},[_c('span',[_vm._v("每页")]),_vm._v(" "),_c('v-pure-select',{attrs:{"source":_vm.pageCounts},model:{value:(_vm.per),callback:function ($$v) {_vm.per=$$v;},expression:"per"}}),_vm._v(" "),_c('span',[_vm._v("条")])],1),_vm._v(" "),_c('ul',{staticClass:"p-pages"},[_c('li',[_c('a',{staticClass:"link",on:{"click":function($event){_vm.index = 1;}}},[_vm._v("首页")])]),_vm._v(" "),_c('li',[_c('a',{staticClass:"link",on:{"click":_vm.prev}},[_vm._v("上一页")])]),_vm._v(" "),_vm._l((_vm.showed),function(n){return _c('li',[_c('a',{staticClass:"link",class:{focus: _vm.index === n},on:{"click":function($event){_vm.index = n;}}},[_vm._v(_vm._s(n))])])}),_vm._v(" "),_c('li',[_c('a',{staticClass:"link",on:{"click":_vm.next}},[_vm._v("下一页")])]),_vm._v(" "),_c('li',[_c('a',{staticClass:"link",on:{"click":function($event){_vm.index = _vm.pages;}}},[_vm._v("末页")])])],2),_vm._v(" "),_c('div',{staticClass:"p-jump"},[_c('span',[_vm._v("前往")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.jumpPage),expression:"jumpPage"}],staticClass:"input",attrs:{"type":"number","min":"1","max":_vm.pages,"required":""},domProps:{"value":(_vm.jumpPage)},on:{"change":_vm.jump,"input":function($event){if($event.target.composing){ return; }_vm.jumpPage=$event.target.value;}}}),_vm._v(" "),_c('span',[_vm._v("页")])])]],2)};
  var __vue_staticRenderFns__$c = [];

    /* style */
    const __vue_inject_styles__$c = undefined;
    /* scoped */
    const __vue_scope_id__$c = undefined;
    /* module identifier */
    const __vue_module_identifier__$c = undefined;
    /* functional template */
    const __vue_is_functional_template__$c = false;
    /* component normalizer */
    function __vue_normalize__$c(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "Pagination.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var Pagination = __vue_normalize__$c(
      { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
      __vue_inject_styles__$c,
      __vue_script__$c,
      __vue_scope_id__$c,
      __vue_is_functional_template__$c,
      __vue_module_identifier__$c,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$d = {
    name: 'v-popup',
    data() {
      return {
        pos: { x: 0, y: 0 },
        startX: 0,
        startY: 0,
        flag: false,
        loading: false
      }
    },
    props: {
      title: String,
      value: Boolean,
      confirm: Function,
      fixed: Boolean,
      okText: String,
      cancelText: String
    },
    computed: {
      transform() {
        return {
          transform: `translateX(${this.pos.x}px) translateY(${this.pos.y}px)`
        }
      }
    },
    methods: {
      close() {
        this.$emit('input', false);
      },
      dragStart(ev) {
        this.startX = ev.pageX - this.pos.x;
        this.startY = ev.pageY - this.pos.y;
        this.flag = true;
      },
      dragging(ev) {
        if (!this.flag) return

        this.pos.x = ev.pageX - this.startX;
        this.pos.y = ev.pageY - this.startY;
      },
      dragEnd() {
        this.flag = false;
      },
      async handleConfirm() {
        if (!this.confirm) {
          this.close();
          return
        }

        if (this.loading) return

        this.loading = true;
        if (await this.confirm()) {
          this.close();
        }
        this.loading = false;
      }
    }
  };

  /* script */
              const __vue_script__$d = script$d;
              
  /* template */
  var __vue_render__$d = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.value)?_c('div',{staticClass:"v-popup overlay",class:{fixed: _vm.fixed},on:{"mousemove":_vm.dragging,"mouseup":_vm.dragEnd}},[_c('div',{staticClass:"v-window",style:(_vm.transform)},[_c('div',{staticClass:"title-bar",on:{"mousedown":_vm.dragStart}},[_c('div',{staticClass:"title-name"},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_c('v-button',{attrs:{"type":"text"},on:{"click":_vm.close}},[_c('v-icon',{attrs:{"icon":"close","size":"18"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"win-content"},[_vm._t("content")],2),_vm._v(" "),_c('div',{staticClass:"win-footer"},[_c('div',{staticClass:"right"},[_vm._t("footer",[_c('v-button',{attrs:{"type":"ghost"},on:{"click":_vm.close}},[_vm._v(_vm._s(_vm.cancelText || '取消'))]),_vm._v(" "),_c('v-button',{attrs:{"loading":_vm.loading},on:{"click":_vm.handleConfirm}},[_vm._v(_vm._s(_vm.okText || '确认'))])])],2)])])]):_vm._e()};
  var __vue_staticRenderFns__$d = [];

    /* style */
    const __vue_inject_styles__$d = undefined;
    /* scoped */
    const __vue_scope_id__$d = undefined;
    /* module identifier */
    const __vue_module_identifier__$d = undefined;
    /* functional template */
    const __vue_is_functional_template__$d = false;
    /* component normalizer */
    function __vue_normalize__$d(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "Popup.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var Popup = __vue_normalize__$d(
      { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
      __vue_inject_styles__$d,
      __vue_script__$d,
      __vue_scope_id__$d,
      __vue_is_functional_template__$d,
      __vue_module_identifier__$d,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //

  var script$e = {
    name: 'v-progress',
    data() {
      let style = {};
      this.width && (style.width = `${this.width}px`);
      if (this.height) {
        style.height = `${this.height}px`;
        style.lineHeight = `${this.height}px`;
      }

      return {
        style
      }
    },
    props: {
      value: Number,
      decimal: Boolean,
      type: String,
      width: Number,
      height: Number,
      color: String
    },
    computed: {
      progress() {
        if (this.decimal) {
          return Math.trunc(this.value * 10000) / 100
        } else {
          return this.value * 100 | 0
        }
      }
    }
  };

  /* script */
              const __vue_script__$e = script$e;
              
  /* template */
  var __vue_render__$e = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-progress",style:(_vm.style)},[_c('div',{staticClass:"layer-1"}),_vm._v(" "),_c('div',{staticClass:"layer-2",style:(("width:" + _vm.progress + "%; background-color: " + _vm.color))}),_vm._v(" "),_c('div',{staticClass:"layer-3"},[_vm._v(_vm._s(_vm.progress)+"%")])])};
  var __vue_staticRenderFns__$e = [];

    /* style */
    const __vue_inject_styles__$e = undefined;
    /* scoped */
    const __vue_scope_id__$e = undefined;
    /* module identifier */
    const __vue_module_identifier__$e = undefined;
    /* functional template */
    const __vue_is_functional_template__$e = false;
    /* component normalizer */
    function __vue_normalize__$e(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "Progress.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var Progress = __vue_normalize__$e(
      { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
      __vue_inject_styles__$e,
      __vue_script__$e,
      __vue_scope_id__$e,
      __vue_is_functional_template__$e,
      __vue_module_identifier__$e,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$f = {
    name: 'v-pure-select',
    data() {
      return {
        selfClicked: false,
        current: this.value,
        bShowDd: false,
        open: '',
        pos: ''
      }
    },
    props: {
      value: [String, Number],
      name: String,
      source: Array,
      placeholder: String
    },
    computed: {
      ddHeight() {
        return Math.min(this.source.length * 32 + 16, 200)
      }
    },
    watch: {
      value(val) {
        this.current = val;
      },
      current(val) {
        this.$emit('input', val);
      }
    },
    methods: {
      updatePos() {
        const bottomSpace = window.innerHeight - this.$el.getBoundingClientRect().bottom;
        this.pos = bottomSpace < this.ddHeight ? 'top' : 'bottom';
      },
      showDd() {
        this.selfClicked = true;
        if (this.bShowDd) return

        this.bShowDd = true;
        this.updatePos();
        setTimeout(() => this.open = 'open', 40);
      },
      hideDd() {
        this.open = '';
        setTimeout(() => {
          this.pos = '';
          this.bShowDd = false;
        }, 400);
      }
    },
    mounted() {
      window.addEventListener('click', () => {
        if (!this.selfClicked) this.hideDd();
        this.selfClicked = false;
      });
    }
  };

  /* script */
              const __vue_script__$f = script$f;
              
  /* template */
  var __vue_render__$f = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('dl',{staticClass:"v-pure-select",class:_vm.open,on:{"click":_vm.showDd}},[_c('dt',[(_vm.current === undefined)?_c('span',{staticClass:"placeholder"},[_vm._v(_vm._s(_vm.placeholder || '请选择'))]):_vm._e(),_vm._v(" "),_vm._l((_vm.source),function(elem,index){return [_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.current),expression:"current"}],attrs:{"id":("pure_radio_" + _vm._uid + "_" + index),"type":"radio","name":_vm.name},domProps:{"value":elem,"checked":_vm._q(_vm.current,elem)},on:{"change":function($event){_vm.current=elem;}}}),_vm._v(" "),_c('span',[_vm._v(_vm._s(elem))])]})],2),_vm._v(" "),_c('dd',{directives:[{name:"show",rawName:"v-show",value:(_vm.bShowDd),expression:"bShowDd"}],class:_vm.pos},_vm._l((_vm.source),function(elem,index){return _c('label',{class:{focus: _vm.current === elem},attrs:{"for":("pure_radio_" + _vm._uid + "_" + index)},on:{"click":_vm.hideDd}},[_vm._v(_vm._s(elem))])}))])};
  var __vue_staticRenderFns__$f = [];

    /* style */
    const __vue_inject_styles__$f = undefined;
    /* scoped */
    const __vue_scope_id__$f = undefined;
    /* module identifier */
    const __vue_module_identifier__$f = undefined;
    /* functional template */
    const __vue_is_functional_template__$f = false;
    /* component normalizer */
    function __vue_normalize__$f(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "PureSelect.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var PureSelect = __vue_normalize__$f(
      { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
      __vue_inject_styles__$f,
      __vue_script__$f,
      __vue_scope_id__$f,
      __vue_is_functional_template__$f,
      __vue_module_identifier__$f,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$g = {
    name: 'v-pwd-strength',
    data() {
      return {
        score: 0
      }
    },
    props: {
      password: {
        type: String,
        default: ''
      }
    },
    /*watch: {
      password(val) {
        if (val === '') return
        this.score = zxcvbn(val).score
      }
    },*/
    computed: {
      strengthInfo() {
        let words = ['极弱', '弱', '中', '强', '极强'];
        return words[this.score]
      },
      levelClasses() {
        let classes = [
          ['str-0', '', '', '', ''],
          ['str-1', 'str-1', '', '', ''],
          ['str-2', 'str-2', 'str-2', '', ''],
          ['str-3', 'str-3', 'str-3', 'str-3', ''],
          ['str-4', 'str-4', 'str-4', 'str-4', 'str-4']
        ];
        return classes[this.score]
      }
    },
    created() {
      // if (this.password === '') return

      // const zxcvbn = () => import('zxcvbn')
      // this.score = zxcvbn(this.password).score
    }
  };

  /* script */
              const __vue_script__$g = script$g;
              
  /* template */
  var __vue_render__$g = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.password.length),expression:"password.length"}],staticClass:"v-pwd-strength"},[_c('div',{staticClass:"str-lines"},_vm._l((_vm.levelClasses),function(n){return _c('span',{class:n})})),_vm._v(" "),_c('div',{staticClass:"str-info"},[_vm._v(_vm._s(_vm.strengthInfo))])])};
  var __vue_staticRenderFns__$g = [];

    /* style */
    const __vue_inject_styles__$g = undefined;
    /* scoped */
    const __vue_scope_id__$g = undefined;
    /* module identifier */
    const __vue_module_identifier__$g = undefined;
    /* functional template */
    const __vue_is_functional_template__$g = false;
    /* component normalizer */
    function __vue_normalize__$g(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "PwdStrength.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var PwdStrength = __vue_normalize__$g(
      { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
      __vue_inject_styles__$g,
      __vue_script__$g,
      __vue_scope_id__$g,
      __vue_is_functional_template__$g,
      __vue_module_identifier__$g,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //

  var script$h = {
    name: 'v-radio',
    props: {
      value: [String, Number],
      label: String,
      name: String,
      disabled: Boolean,
      reverse: Boolean
    }
  };

  /* script */
              const __vue_script__$h = script$h;
              
  /* template */
  var __vue_render__$h = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{staticClass:"v-radio",class:{reverse: _vm.reverse, disabled: _vm.disabled}},[_c('input',{attrs:{"type":"radio","name":_vm.name,"disabled":_vm.disabled},domProps:{"value":_vm.value}}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.label))])])};
  var __vue_staticRenderFns__$h = [];

    /* style */
    const __vue_inject_styles__$h = undefined;
    /* scoped */
    const __vue_scope_id__$h = undefined;
    /* module identifier */
    const __vue_module_identifier__$h = undefined;
    /* functional template */
    const __vue_is_functional_template__$h = false;
    /* component normalizer */
    function __vue_normalize__$h(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "Radio.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var Radio = __vue_normalize__$h(
      { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$h },
      __vue_inject_styles__$h,
      __vue_script__$h,
      __vue_scope_id__$h,
      __vue_is_functional_template__$h,
      __vue_module_identifier__$h,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$i = {
    name: 'v-radio-group',
    data() {
      return {
        checked: this.value
      }
    },
    props: {
      value: [Number, String, Boolean],
      source: Array,
      name: String,
      reverse: Boolean,
      vertical: Boolean,
      lnf: String
    },
    computed: {
      lnfClass() {
        return this.lnf === undefined ? 'v-radio' : `v-radio-${this.lnf}`
      }
    },
    watch: {
      value(val) {
        this.checked = val;
      },
      checked(val) {
        this.$emit('input', val);
      }
    }
  };

  /* script */
              const __vue_script__$i = script$i;
              
  /* template */
  var __vue_render__$i = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-radio-group",class:{vertical: _vm.vertical}},_vm._l((_vm.source),function(item){return _c('div',{staticClass:"g-item"},[_c('label',{class:( _obj = { reverse: _vm.reverse, disabled: item.disabled}, _obj[_vm.lnfClass] = true, _obj )},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.checked),expression:"checked"}],attrs:{"type":"radio","name":_vm.name,"disabled":item.disabled},domProps:{"value":item.value,"checked":_vm._q(_vm.checked,item.value)},on:{"change":function($event){_vm.checked=item.value;}}}),_vm._v(" "),_c('span',[_vm._v(_vm._s(item.name))])])])
  var _obj;}))};
  var __vue_staticRenderFns__$i = [];

    /* style */
    const __vue_inject_styles__$i = undefined;
    /* scoped */
    const __vue_scope_id__$i = undefined;
    /* module identifier */
    const __vue_module_identifier__$i = undefined;
    /* functional template */
    const __vue_is_functional_template__$i = false;
    /* component normalizer */
    function __vue_normalize__$i(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "RadioGroup.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var RadioGroup = __vue_normalize__$i(
      { render: __vue_render__$i, staticRenderFns: __vue_staticRenderFns__$i },
      __vue_inject_styles__$i,
      __vue_script__$i,
      __vue_scope_id__$i,
      __vue_is_functional_template__$i,
      __vue_module_identifier__$i,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //

  var script$j = {
    name: 'v-row'
  };

  /* script */
              const __vue_script__$j = script$j;
              
  /* template */
  var __vue_render__$j = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-row"},[_vm._t("default")],2)};
  var __vue_staticRenderFns__$j = [];

    /* style */
    const __vue_inject_styles__$j = undefined;
    /* scoped */
    const __vue_scope_id__$j = undefined;
    /* module identifier */
    const __vue_module_identifier__$j = undefined;
    /* functional template */
    const __vue_is_functional_template__$j = false;
    /* component normalizer */
    function __vue_normalize__$j(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "Row.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var Row = __vue_normalize__$j(
      { render: __vue_render__$j, staticRenderFns: __vue_staticRenderFns__$j },
      __vue_inject_styles__$j,
      __vue_script__$j,
      __vue_scope_id__$j,
      __vue_is_functional_template__$j,
      __vue_module_identifier__$j,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //

  let timer;

  var script$k = {
    name: 'v-search',
    props: {
      auto: {
        type: Boolean,
        'default': true
      },
      placeholder: String,
      delay: {
        type: Number,
        'default': 500
      }
    },
    methods: {
      inputHandler(text) {
        if (!this.auto) return

        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          this.$emit('search', text);
        }, this.delay);
      }
    }
  };

  /* script */
              const __vue_script__$k = script$k;
              
  /* template */
  var __vue_render__$k = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-search"},[_c('v-input',{attrs:{"placeholder":_vm.placeholder || '关键词'},on:{"input":_vm.inputHandler}}),_vm._v(" "),_c('v-icon',{attrs:{"icon":"search"},nativeOn:{"click":function($event){_vm.$emit('search', _vm.keywords);}}})],1)};
  var __vue_staticRenderFns__$k = [];

    /* style */
    const __vue_inject_styles__$k = undefined;
    /* scoped */
    const __vue_scope_id__$k = undefined;
    /* module identifier */
    const __vue_module_identifier__$k = undefined;
    /* functional template */
    const __vue_is_functional_template__$k = false;
    /* component normalizer */
    function __vue_normalize__$k(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "Search.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var Search = __vue_normalize__$k(
      { render: __vue_render__$k, staticRenderFns: __vue_staticRenderFns__$k },
      __vue_inject_styles__$k,
      __vue_script__$k,
      __vue_scope_id__$k,
      __vue_is_functional_template__$k,
      __vue_module_identifier__$k,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$l = {
    name: 'v-select',
    data() {
      return {
        selfClicked: false,
        selected: this.multiple ? [] : {},
        items: JSON.parse(JSON.stringify(this.source)),
        filterText: '',
        bShowCandidates: false,
        innerUpdate: false,
        pos: '',
        open: ''
      }
    },
    computed: {
      filteredItems() {
        if (this.filterText === '') return this.items
        return this.items.filter(item => item.name.toLowerCase().includes(this.filterText.toLowerCase()))
      }
    },
    props: {
      value: [String, Number, Array, Object],
      source: Array,
      disabled: Boolean,
      multiple: Boolean,
      searchable: Boolean,
      placeholder: String,
      searchPlaceholder: String,
      max: Number,
      emitItem: Boolean
    },
    watch: {
      source(val) {
        //Watch source for requesting data from server asynchronously
        this.items = JSON.parse(JSON.stringify(val));
        this.updateSelected(this.value);
      },
      value: {
        handler: 'updateSelected',
        immediate: true
      }
    },
    methods: {
      updateSelected(val) {
        if (this.innerUpdate) {
          this.innerUpdate = false;
          return
        }

        let match;
        if (Array.isArray(val)) {
          match = [];
          this.items.forEach(item => {
            item.selected = false;
            if (val.includes(item.value)) {
              item.selected = true;
              match.push({
                name: item.name,
                value: item.value
              });
            }

            if (item.children) {
              item.children.forEach(child => {
                child.selected = false;
                if (val.includes(child.value)) {
                  child.selected = true;
                  match.push({
                    name: child.name,
                    value: child.value
                  });
                }
              });
            }
          });
        } else {
          match = {};
          this.items.forEach(item => {
            item.selected = false;
            if (item.value === val) {
              item.selected = true;
              match = { name: item.name, value: item.value };
            }

            if (item.children) {
              item.children.forEach(child => {
                child.selected = false;
                if (child.value === val) {
                  child.selected = true;
                  match = { name: child.name, value: child.value };
                }
              });
            }
          });
        }
        this.selected = JSON.parse(JSON.stringify(match));
      },
      showCandidates() {
        this.selfClicked = true;
        if (this.disabled) return
        if (this.bShowCandidates) return
        this.bShowCandidates = true;

        let items = 0;
        this.filteredItems.forEach(item => {
          items += item.children ? (item.children.length + 1) : 1;
        });
        const candidatesHeight = Math.min((this.searchable ? (items + 1) : items) * 32, 320);
        const bottomSpace = window.innerHeight - this.$el.getBoundingClientRect().bottom;
        this.pos = bottomSpace < candidatesHeight ? 'top' : 'bottom';

        setTimeout(() => this.open = 'open', 40);
      },
      hideCandidates() {
        this.open = '';
        setTimeout(() => {
          this.pos = '';
          this.bShowCandidates = false;
        }, 400);
      },
      toggle(item) {
        if (this.multiple) {
          item.selected = !item.selected;

          if (item.selected) {
            if (this.max && this.selected.length >= this.max) {
              this.warn(`最多只能选择${this.max}个`);
              item.selected = false;
            } else {
              this.selected.push(item);
            }
          } else {
            this.selected = this.selected.filter(val => {
              return val.value !== item.value
            });
          }
          this.innerUpdate = true;
          this.$emit('input', this.emitItem ? this.selected : this.selected.map(s => s.value));
        } else {
          this.items.forEach(current => {
            current.selected = false;

            if (current.children) {
              current.children.forEach(child => child.selected = false);
            }
          });
          item.selected = true;
          this.selected = item;
          this.hideCandidates();
          this.innerUpdate = true;
          this.$emit('input', this.emitItem ? this.selected : this.selected.value);
        }
      },
      remove(select, index) {
        this.selected.splice(index, 1);

        this.items.forEach(item => {
          if (item.value === select.value) {
            item.selected = false;
          } else if (item.children) {
            item.children.forEach(child => {
              if (child.value === select.value) {
                child.selected = false;
              }
            });
          }
        });

        this.innerUpdate = true;
        this.$emit('input', this.emitItem ? this.selected : this.selected.map(s => s.value));
      }
    },
    mounted() {
      window.addEventListener('click', () => {
        // 当点击组件之外的区域（包括其他Select组件）时，隐藏下拉列表；点击组件自身时不做任何处理
        if (!this.selfClicked) this.hideCandidates();
        this.selfClicked = false;
      });
    }
  };

  /* script */
              const __vue_script__$l = script$l;
              
  /* template */
  var __vue_render__$l = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-select",on:{"click":_vm.showCandidates}},[_c('div',{staticClass:"selected layout-lr",attrs:{"disabled":_vm.disabled}},[(_vm.disabled)?_c('div',{staticClass:"layer-disabled"}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"l"},[(_vm.multiple)?_vm._l((_vm.selected),function(s,i){return _c('span',{staticClass:"s-tag"},[_c('span',{staticClass:"tag-name"},[_vm._v(_vm._s(s.name))]),_vm._v(" "),_c('v-icon',{attrs:{"icon":"close"},nativeOn:{"click":function($event){$event.stopPropagation();_vm.remove(s,i);}}})],1)}):_c('input',{staticClass:"input",attrs:{"placeholder":_vm.placeholder || '请选择',"readonly":""},domProps:{"value":_vm.selected.name}})],2),_vm._v(" "),_c('div',{staticClass:"r"},[_c('v-icon',{class:{reverse: !_vm.open},attrs:{"icon":"down-wide"}})],1)]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.bShowCandidates),expression:"bShowCandidates"}],class:("candidates " + _vm.pos + " " + _vm.open)},[(_vm.searchable)?_c('div',{staticClass:"item-search"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.filterText),expression:"filterText"}],staticClass:"input",attrs:{"placeholder":_vm.searchPlaceholder || '搜索'},domProps:{"value":(_vm.filterText)},on:{"input":function($event){if($event.target.composing){ return; }_vm.filterText=$event.target.value;}}})]):_vm._e(),_vm._v(" "),_c('ul',{staticClass:"list"},_vm._l((_vm.filteredItems),function(i){return _c('li',{attrs:{"title":i.name},on:{"click":function($event){$event.stopPropagation();_vm.toggle(i);}}},[_c('div',{staticClass:"i-title",class:{focus: i.selected}},[_c('span',{staticClass:"t-name"},[_vm._v(_vm._s(i.name))]),(i.selected)?_c('v-icon',{attrs:{"icon":"check"}}):_vm._e()],1),_vm._v(" "),(i.children && i.children.length)?_c('ul',{staticClass:"sub-list"},_vm._l((i.children),function(child){return _c('li',{attrs:{"title":child.name},on:{"click":function($event){$event.stopPropagation();_vm.toggle(child);}}},[_c('div',{staticClass:"i-title",class:{focus: child.selected}},[_c('span',{staticClass:"t-name"},[_vm._v(_vm._s(child.name))]),(child.selected)?_c('v-icon',{attrs:{"icon":"check"}}):_vm._e()],1)])})):_vm._e()])}))])])};
  var __vue_staticRenderFns__$l = [];

    /* style */
    const __vue_inject_styles__$l = undefined;
    /* scoped */
    const __vue_scope_id__$l = undefined;
    /* module identifier */
    const __vue_module_identifier__$l = undefined;
    /* functional template */
    const __vue_is_functional_template__$l = false;
    /* component normalizer */
    function __vue_normalize__$l(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "Select.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var Select = __vue_normalize__$l(
      { render: __vue_render__$l, staticRenderFns: __vue_staticRenderFns__$l },
      __vue_inject_styles__$l,
      __vue_script__$l,
      __vue_scope_id__$l,
      __vue_is_functional_template__$l,
      __vue_module_identifier__$l,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //

  var script$m = {
    name: 'v-switch',
    props: {
      value: Boolean,
      name: String,
      disabled: Boolean
    }
  };

  /* script */
              const __vue_script__$m = script$m;
              
  /* template */
  var __vue_render__$m = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{staticClass:"v-switch",class:{disabled: _vm.disabled}},[_c('input',{attrs:{"type":"checkbox","name":_vm.name,"disabled":_vm.disabled},domProps:{"checked":_vm.value},on:{"change":function($event){_vm.$emit('input', $event.target.checked);}}}),_vm._v(" "),_c('span')])};
  var __vue_staticRenderFns__$m = [];

    /* style */
    const __vue_inject_styles__$m = undefined;
    /* scoped */
    const __vue_scope_id__$m = undefined;
    /* module identifier */
    const __vue_module_identifier__$m = undefined;
    /* functional template */
    const __vue_is_functional_template__$m = false;
    /* component normalizer */
    function __vue_normalize__$m(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "Switch.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var Switch = __vue_normalize__$m(
      { render: __vue_render__$m, staticRenderFns: __vue_staticRenderFns__$m },
      __vue_inject_styles__$m,
      __vue_script__$m,
      __vue_scope_id__$m,
      __vue_is_functional_template__$m,
      __vue_module_identifier__$m,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$n = {
    name: 'v-tab',
    data() {
      return {
        titles_: [],
        tabs: [],
        lineStyle: {},
        index: -1,
        totalWidth: 0,
        tabWidth: 0,
        tabWidths: [],
        innerUpdate: false
      }
    },
    props: {
      value: Number,
      titles: Array,
      lock: Boolean
    },
    watch: {
      value(val) {
        if (this.innerUpdate) {
          this.innerUpdate = false;
          return
        }
        this.setTab(val);
      }
    },
    methods: {
      setTab(i) {
        if (this.index === i) return

        this.refreshLinePosition(i);
        this.lineStyle.transition = this.index < i
          ? 'left .3s ease-out .09s, right .3s ease-out'
          : 'left .3s ease-out, right .3s ease-out .09s';
        this.index = i;

        this.$emit('input', i);
      },
      clickTab(i) {
        if (this.lock) return
        if (this.index === i) return

        this.setTab(i);
        this.innerUpdate = true;
      },
      calculateWidth() {
        this.tabWidths = [];
        this.totalWidth = this.$refs.tabs.offsetWidth;
        this.$refs.tabs.querySelectorAll('.tab').forEach(el => {
          this.tabWidths.push(el.offsetWidth);
        });
      },
      refreshLinePosition(index) {
        if (index === undefined) {
          index = this.index;
        }

        let leftWidth = 0, rightWidth = 0;
        for (let i = 0; i < index; i++) {
          leftWidth += this.tabWidths[i];
        }
        rightWidth = this.totalWidth - leftWidth - this.tabWidths[index];

        this.lineStyle = {
          left: `${leftWidth}px`,
          right: `${rightWidth}px`
        };
      },
      resize() {
        this.calculateWidth();
        this.refreshLinePosition();
      }
    },
    created() {
      if (['string', 'number'].includes(typeof this.titles[0])) {
        this.titles_ = this.titles.map(title => ({ name: title }));
      } else {
        this.titles_ = this.titles;
      }
    },
    mounted() {
      this.calculateWidth();
      this.setTab(this.value || 0);

      window.addEventListener('resize', this.resize);
    },
    destroyed() {
      window.removeEventListener('resize', this.resize);
    }
  };

  /* script */
              const __vue_script__$n = script$n;
              
  /* template */
  var __vue_render__$n = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-tab"},[_c('div',{ref:"tabs",staticClass:"tabs"},[_vm._l((_vm.titles_),function(title,i){return _c('div',{staticClass:"tab",on:{"click":function($event){_vm.clickTab(i);}}},[(title.icon)?_c('v-icon',{attrs:{"icon":title.icon,"size":"16"}}):_vm._e(),_vm._v(_vm._s(title.name))],1)}),_vm._v(" "),_c('div',{staticClass:"focus-line",style:(_vm.lineStyle)})],2)])};
  var __vue_staticRenderFns__$n = [];

    /* style */
    const __vue_inject_styles__$n = undefined;
    /* scoped */
    const __vue_scope_id__$n = undefined;
    /* module identifier */
    const __vue_module_identifier__$n = undefined;
    /* functional template */
    const __vue_is_functional_template__$n = false;
    /* component normalizer */
    function __vue_normalize__$n(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "Tab.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var Tab = __vue_normalize__$n(
      { render: __vue_render__$n, staticRenderFns: __vue_staticRenderFns__$n },
      __vue_inject_styles__$n,
      __vue_script__$n,
      __vue_scope_id__$n,
      __vue_is_functional_template__$n,
      __vue_module_identifier__$n,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$o = {
    name: 'v-table',
    data() {
      return {
        filterText: '',
        //过滤后的结果
        filtered: [],
        //显示在页面上的结果
        showed: [],
        slice: [0, 0],
        selected: [],
        selectAll: false,
        sortType: [],
        sortIndex: 0
      }
    },
    props: {
      source: {
        type: Array,
        default() {
          return []
        }
      },
      columns: {
        type: Array,
        default() {
          return []
        }
      },
      checkbox: Boolean,
      checkboxColumn: String,
      simple: Boolean,
      fixedHead: Boolean,
      countOfPage: {
        type: Number,
        'default': 10
      },
      keepSort: Boolean,
      filters: {
        type: Array,
        'default'() {
          return [
            function (value) {
              if (typeof Intl === 'undefined') return value
              if (value === undefined) return 0

              return new Intl.NumberFormat(undefined, { maximumFractionDigits: 6 }).format(value)
            },
            function (value) {
              return Boolean(value)
            }
          ]
        }
      },
      total: Number,
      emptyText: String,
      simplePagination: Boolean
    },
    computed: {
      columnProps() {
        let arr = [];
        this.columns.forEach(column => column.custom || arr.push(column.prop));
        return arr
      }
    },
    watch: {
      source() {
        this.initTable();
      },
      filtered() {
        if (this.checkbox) {
          this.selectAll = false;
          this.selected = [];
        }
      },
      slice() {
        this.checkbox && (this.selectAll = false);
      },
      selectAll(val) {
        if (!val) {
          this.selected = [];
          return
        }

        if (this.simple) {
          this.selected = this.showed.map((value, key) => key);
          return
        }

        let [start, end] = this.slice;
        let arr = [];
        while (start < end) {
          arr.push(start);
          start++;
        }
        this.selected = arr;
      },
      selected(val, oldVal) {
        if (val.length === 0 && oldVal.length === 0) return
        this.updateChecked(val);
      }
    },
    methods: {
      filterSlot(row, column) {
        if (column.custom) return undefined

        if (column.filter !== undefined) return this.filters[column.filter](row[column.prop])

        return row[column.prop]
      },
      initTable() {
        this.keepSort || (this.sortType = []);
        this.filter(this.filterText);
      },
      filter(words) {
        let result = [];
        if (words === '') {
          result = this.source.slice();
        } else {
          result = this.source.filter(row => {
            return this.columnProps.some(prop => {
              let value = row[prop] || '';

              return value.toString().toLowerCase().includes(words.toLowerCase())
            })
          });
        }
        this.filtered = result;
        this.sort();
        this.filterText = words;
      },
      updateTable(slice) {
        this.slice = slice;
        this.$emit('flip', this.slice);
      },
      handleSortClick(index) {
        this.sortIndex = index;
        if (this.sortType[index] === 1) {
          this.sortType.splice(index, 1, -1);
        } else if (this.sortType[index] === -1) {
          this.sortType = [];
        } else {
          this.sortType = [];
          this.sortType[index] = 1;
        }

        this.sort();
      },
      sort() {
        if (this.sortType.length) {
          let sortColumn = this.columnProps[this.sortIndex],
            sortType = this.sortType[this.sortIndex];

          this.showed = this.sortArray(this.filtered.slice(), sortColumn, sortType);
        } else {
          this.showed = this.filtered;
        }
        this.updateChecked();
      },
      updateChecked(val) {
        const selected = val || this.selected;
        this.$emit('check', this.showed.filter((row, index) => selected.includes(index)));
      },
      sortArray(arr, column, dir = 1) {
        arr.sort((a, b) => {
          if (typeof a[column] === 'number') return dir > 0 ? (a[column] - b[column]) : (b[column] - a[column])

          return new Intl.Collator(/*'zh-Hans-CN', */{
            sensitivity: 'base'
          }).compare(dir > 0 ? a[column] : b[column], dir > 0 ? b[column] : a[column])
        });
        return arr
      }
    },
    created() {
      this.initTable();
    }
  };

  /* script */
              const __vue_script__$o = script$o;
              
  /* template */
  var __vue_render__$o = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-table"},[(!_vm.simple)?_c('header',{staticClass:"t-tools"},[_c('div',{staticClass:"l"},[_vm._t("tools-l")],2),_vm._v(" "),_c('div',{staticClass:"m"},[_vm._t("tools-m")],2),_vm._v(" "),_c('div',{staticClass:"r"},[_c('v-search',{attrs:{"delay":300},on:{"search":_vm.filter}})],1)]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"t-table",class:{'fixed-head': _vm.fixedHead}},[_c('div',{staticClass:"table-wrap"},[_c('table',{staticClass:"table"},[_c('colgroup',[(_vm.checkbox)?_c('col'):_vm._e(),_vm._v(" "),_vm._l((_vm.columns),function(col){return _c('col',{class:("col-" + (col.prop))})})],2),_vm._v(" "),_c('thead',[_c('tr',[(_vm.checkbox && _vm.source.length)?_c('th',[_c('div',{staticClass:"t-title"},[_c('v-checkbox',{attrs:{"label":"全选"},model:{value:(_vm.selectAll),callback:function ($$v) {_vm.selectAll=$$v;},expression:"selectAll"}})],1)]):_vm._e(),_vm._v(" "),_vm._l((_vm.columns),function(column,i){return _c('th',{class:column.cssClass},[_c('div',{staticClass:"t-title",class:column.cssClass},[_vm._v("\n              "+_vm._s(column.title)+"\n              "),(column.sortable)?_c('span',{staticClass:"sort-arrows",on:{"click":function($event){_vm.handleSortClick(i);}}},[_c('v-icon',{class:{'dir-up': true, focus: _vm.sortType[i] === 1},attrs:{"icon":"down-wide"}}),_vm._v(" "),_c('v-icon',{class:{focus: _vm.sortType[i] === -1},attrs:{"icon":"down-wide"}})],1):_vm._e()])])})],2)]),_vm._v(" "),_c('tbody',[(!_vm.source.length)?_c('tr',{staticClass:"no-data-row"},[_c('td',{attrs:{"colspan":_vm.columns.length}},[_vm._v(_vm._s(_vm.emptyText || '暂无数据'))])]):_vm._e(),_vm._v(" "),_vm._l((_vm.showed),function(row,i){return (_vm.simple || (i >= _vm.slice[0] && i < _vm.slice[1]))?_c('tr',{class:{focus: row.focused},on:{"click":function($event){_vm.$emit('click-row', row);},"dblclick":function($event){_vm.$emit('dbl-click-row', row);}}},[(_vm.checkbox)?_c('td',{on:{"click":function($event){$event.stopPropagation();}}},[_c('label',{staticClass:"v-checkbox"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected),expression:"selected"}],attrs:{"type":"checkbox"},domProps:{"value":i,"checked":Array.isArray(_vm.selected)?_vm._i(_vm.selected,i)>-1:(_vm.selected)},on:{"change":function($event){var $$a=_vm.selected,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=i,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.selected=$$a.concat([$$v]));}else{$$i>-1&&(_vm.selected=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.selected=$$c;}}}}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.checkboxColumn ? row[_vm.checkboxColumn] : (i + 1)))])])]):_vm._e(),_vm._v(" "),_vm._l((_vm.columns),function(column){return _c('td',{class:column.cssClass},[_vm._t(column.prop,[_vm._v(_vm._s(_vm.filterSlot(row, column)))],{value:row})],2)})],2):_vm._e()})],2)])])]),_vm._v(" "),(!_vm.simple && _vm.source.length)?_c('div',{staticClass:"t-footer"},[_c('v-pagination',{attrs:{"total":_vm.total || _vm.showed.length,"count-of-page":_vm.countOfPage,"simple":_vm.simplePagination},on:{"update":_vm.updateTable}})],1):_vm._e()])};
  var __vue_staticRenderFns__$o = [];

    /* style */
    const __vue_inject_styles__$o = undefined;
    /* scoped */
    const __vue_scope_id__$o = undefined;
    /* module identifier */
    const __vue_module_identifier__$o = undefined;
    /* functional template */
    const __vue_is_functional_template__$o = false;
    /* component normalizer */
    function __vue_normalize__$o(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "Table.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var Table = __vue_normalize__$o(
      { render: __vue_render__$o, staticRenderFns: __vue_staticRenderFns__$o },
      __vue_inject_styles__$o,
      __vue_script__$o,
      __vue_scope_id__$o,
      __vue_is_functional_template__$o,
      __vue_module_identifier__$o,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$p = {
    name: 'v-upload',
    data() {
      return {
        fileNames: [],
        fileThumbs: [],
        files: []
      }
    },
    props: {
      name: String,
      upload: Boolean,
      multi: Boolean,
      required: Boolean,
      text: String,
      thumbnail: Boolean,
      thumbSize: {
        type: Number,
        'default': 100
      },
      shape: {
        type: String,
        'default': 'button'
      }
    },
    methods: {
      selectFile(ev) {
        if (this.shape === 'button') {
          this.fileNames = [];
          this.fileThumbs = [];
        }

        [].forEach.call(ev.target.files, file => {
          this.fileNames.push(file.name);

          if (this.shape === 'square') this.files.push(file);

          if (!this.thumbnail) return
          if (!file.type.startsWith('image/')) return

          const reader = new FileReader();
          reader.onload = evt => {
            const img = new Image;
            img.src = evt.target.result;

            setTimeout(() => {
              if (!img.naturalWidth || !img.naturalHeight) {
                ev.target.value = '';
                this.warn('获取图片失败，请重新选择');
                return
              }

              this.fileThumbs.push(img.src);
            });
          };

          reader.readAsDataURL(file);
        });

        if (this.shape === 'button') {
          this.$emit('select', ev.target.files);
        } else {
          this.$emit('select', this.files);
        }
      },
      reset() {
        this.$el.querySelector('input[type=file]').value = null;
        this.fileNames = [];
        this.fileThumbs = [];
      },
      deleteFile(i) {
        this.fileNames.splice(i, 1);
        this.fileThumbs.splice(i, 1);

        if (this.shape === 'square') {
          this.files.splice(i, 1);
          this.$emit('select', this.files);
        }
      }
    }
  };

  /* script */
              const __vue_script__$p = script$p;
              
  /* template */
  var __vue_render__$p = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-upload"},[(_vm.shape === 'square')?_c('div',{staticClass:"u-thumbs"},[_vm._l((_vm.fileThumbs),function(thumb,i){return _c('div',{staticClass:"thumb-wrap",style:(("width: " + _vm.thumbSize + "px;height: " + _vm.thumbSize + "px;"))},[_c('img',{attrs:{"src":thumb}}),_vm._v(" "),_c('div',{staticClass:"del-mask",on:{"click":function($event){_vm.deleteFile(i);}}},[_c('v-icon',{attrs:{"icon":"delete"}})],1)])}),_vm._v(" "),_c('div',{staticClass:"btn-wrap",style:(("width: " + _vm.thumbSize + "px;height: " + _vm.thumbSize + "px;"))},[_c('v-icon',{attrs:{"icon":"plus","size":"30"}}),_vm._v(" "),_c('input',{attrs:{"type":"file","name":_vm.name,"multiple":_vm.multi,"required":_vm.required},on:{"change":_vm.selectFile}})],1)],2):[_c('div',{staticClass:"u-above"},[_c('div',{staticClass:"btn-wrap"},[_c('v-button',{attrs:{"icon":"upload"}},[_vm._v(_vm._s(_vm.text || '选择文件'))]),_vm._v(" "),_c('input',{attrs:{"type":"file","name":_vm.name,"multiple":_vm.multi,"required":_vm.required},on:{"change":_vm.selectFile}})],1),_vm._v(" "),(!_vm.upload && !_vm.thumbnail && _vm.fileNames.length)?_c('div',{staticClass:"u-file-names"},_vm._l((_vm.fileNames),function(name){return _c('span',[_vm._v(_vm._s(name))])})):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"u-below"},[(_vm.thumbnail)?_c('div',{staticClass:"u-thumbs"},_vm._l((_vm.fileThumbs),function(thumb){return _c('div',{staticClass:"thumb-wrap",style:(("width: " + _vm.thumbSize + "px;height: " + _vm.thumbSize + "px;"))},[_c('img',{attrs:{"src":thumb}})])})):_vm._e()])]],2)};
  var __vue_staticRenderFns__$p = [];

    /* style */
    const __vue_inject_styles__$p = undefined;
    /* scoped */
    const __vue_scope_id__$p = "data-v-6db64ba9";
    /* module identifier */
    const __vue_module_identifier__$p = undefined;
    /* functional template */
    const __vue_is_functional_template__$p = false;
    /* component normalizer */
    function __vue_normalize__$p(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "Upload.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    
    /* style inject SSR */
    

    
    var Upload = __vue_normalize__$p(
      { render: __vue_render__$p, staticRenderFns: __vue_staticRenderFns__$p },
      __vue_inject_styles__$p,
      __vue_script__$p,
      __vue_scope_id__$p,
      __vue_is_functional_template__$p,
      __vue_module_identifier__$p,
      undefined,
      undefined
    );

  if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  const Components = [
    Button,
    ButtonGroup,
    ButtonSend,
    Checkbox,
    CheckboxGroup,
    Col,
    DatePicker,
    Icon,
    Input,
    Menu,
    Pagination,
    Popup,
    Progress,
    PureSelect,
    PwdStrength,
    Radio,
    RadioGroup,
    Row,
    Search,
    Select,
    Switch,
    Tab,
    Table,
    Upload
  ];
  Components.forEach(a => {
    Vue.component(a.name, a);
  });

  const MessageConstructor = Vue.extend(Message);

  const Msg = function (option) {
    let instance;
    option = option || {};

    if (typeof option === 'string') {
      option = {
        message: option
      };
    }

    instance = new MessageConstructor({
      data: option
    });
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    instance.vm.visible = true;
  };

  Object.defineProperties(Vue.prototype, {
    $msg: {
      value: Msg
    },
    success: {
      value: msg => Msg(msg)
    },
    info: {
      value: msg => {
        Msg({
          type: 'info',
          message: msg
        });
      }
    },
    warn: {
      value: msg => {
        Msg({
          type: 'warn',
          message: msg
        });
      }
    },
    error: {
      value: (msg, close) => {
        if (close === undefined) close = true;

        Msg({
          type: 'error',
          message: msg.msg || msg,
          showClose: close
        });
      }
    },
    $modal: {
      value: function (option = {}) {
        let instance;
        if (typeof option === 'string') {
          option = {
            content: option
          };
        }

        const Constructor = Vue.extend(Modal);
        instance = new Constructor({
          data: option
        });
        instance.vm = instance.$mount();
        document.body.appendChild(instance.vm.$el);
        instance.vm.visible = true;
      }
    }
  });

}(Vue));
