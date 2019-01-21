<template>
  <div class="v-html-editor">
    <editor-svg></editor-svg>
    <v-popup title="预览结果" v-model="bShowOverlay" v-if="bShowOverlay">
      <div class="content" slot="content" v-html="contentHTML"></div>
    </v-popup>

    <div class="e-toolbar">
      <v-button type="text" title="撤销" icon="fa-undo" @click="formatDoc('undo')"></v-button>
      <v-button type="text" title="重做" icon="fa-redo" @click="formatDoc('redo')"></v-button>
      <v-button type="text" title="清除格式" icon="fa-eraser" @click="removeFormat"></v-button>
      <v-button type="text" title="加粗" ref="bold" icon="fa-bold" @click="formatDoc('bold')"></v-button>
      <v-button type="text" title="斜体" ref="italic" icon="fa-italic" @click="formatDoc('italic')"></v-button>
      <v-button type="text" title="下划线" ref="underline" icon="fa-underline" @click="formatDoc('underline')"></v-button>
      <v-button type="text" title="删除线" ref="strikeThrough" @click="formatDoc('strikeThrough')"><del>abc</del></v-button>
      <v-button type="text" title="缩退" icon="fa-outdent" @click="formatDoc('outdent')"></v-button>
      <v-button type="text" title="缩进" icon="fa-indent" @click="formatDoc('indent')"></v-button>
      <v-button type="text" title="超链接" icon="fa-link" @click="insertLink"></v-button>
      <v-button type="text" title="分隔线" @click="formatDoc('insertHorizontalRule')">—</v-button>
      <v-button type="text" title="图片" icon="fa-picture" @click="insertImage"></v-button>
      <select class="select" v-model="currentBlock" @change="formatDoc('formatBlock',$event.target.value)">
        <option :value="head" v-for="head of headList">{{head}}</option>
      </select>
      <v-button type="text" title="源码" @click="toggleSource">HTML</v-button>
      <v-button type="text" title="预览" @click="preview">预览</v-button>
      <ul>
        <!--<li>
            <button class="btn" type="button" ref="justifyleft" @click="formatDoc('justifyleft')">
                <svg>
                    <use xlink:href="/img/icons.svg#icon-fa-align-left"></use>
                </svg>
            </button>
        </li>
        <li>
            <button class="btn" type="button" ref="justifycenter" @click="formatDoc('justifycenter')">
                <svg>
                    <use xlink:href="/img/icons.svg#icon-fa-align-center"></use>
                </svg>
            </button>
        </li>
        <li>
            <button class="btn" type="button" ref="justifyright" @click="formatDoc('justifyright')">
                <svg>
                    <use xlink:href="/img/icons.svg#icon-fa-align-right"></use>
                </svg>
            </button>
        </li>
        <li>
            <button class="btn" type="button" ref="insertorderedlist" @click="formatDoc('insertorderedlist')">
                <svg>
                    <use xlink:href="/img/icons.svg#icon-fa-list-ol"></use>
                </svg>
            </button>
        </li>
        <li>
            <button class="btn" type="button" ref="insertunorderedlist" @click="formatDoc('insertunorderedlist')">
                <svg>
                    <use xlink:href="/img/icons.svg#icon-fa-list-ul"></use>
                </svg>
            </button>
        </li>-->
        <!--<li>
            <button class="btn" type="button" ref="cut" @click="formatDoc('cut')">
                <svg>
                    <use xlink:href="/img/icons.svg#icon-fa-cut"></use>
                </svg>
            </button>
        </li>-->
        <!--<li>
            <button class="btn" type="button" ref="copy" @click="formatDoc('copy')">
                <svg>
                    <use xlink:href="/img/icons.svg#icon-fa-copy"></use>
                </svg>
            </button>
        </li>
        <li>
            <button class="btn" type="button" ref="paste" @click="formatDoc('paste')">
                <svg>
                    <use xlink:href="/img/icons.svg#icon-fa-paste"></use>
                </svg>
            </button>
        </li>-->

        <!--<li class="item-width">
            <select class="select" @change="formatDoc('backcolor',$event.target.value)">
                <option value="- background -">- 背景颜色 -</option>
                <option value="white">White</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="black">Black</option>
            </select>
        </li>-->
      </ul>
    </div>
    <div id="editorContent" v-show="!sourceMode" class="e-content" contenteditable @click="checkStatus" @paste="removeFormat"
         @keyup.up="checkStatus" @keyup.down="checkStatus" @keyup.left="checkStatus" @keyup.right="checkStatus" @keyup.enter="checkStatus"></div>
    <div v-show="sourceMode" class="e-source">
      <pre><code>{{sourceCode}}</code></pre>
    </div>
  </div>
</template>

<script>
  import EditorSvg from './EditorSvg.vue'
  import Button from '../components/Button.vue'
  import Popup from '../components/Popup.vue'

  export default {
    name: 'v-html-editor',
    data() {
      return {
        toggleCmds: ['bold', 'italic', 'underline', 'strikeThrough'],
        headList: ['div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre'],
        currentBlock: 'div',
        sourceMode: false,
        sourceCode: '',
        contentHTML: '',
        bShowOverlay: false,
        domEditor: null,
        domSource: null
      }
    },
    props: {
      html: String
    },
    components: {
      [EditorSvg.name]: EditorSvg,
      [Button.name]: Button,
      [Popup.name]: Popup
    },
    watch: {
      bShowOverlay(val) {
        document.body.classList.toggle('overhidden', val)
      },
      html(val) {
        editorContent.innerHTML = val
      }
    },
    methods: {
      formatDoc(cmd, value) {
        if (this.toggleCmds.includes(cmd)) {
          this.$refs[cmd].$el.classList.toggle('active')
        }
        document.execCommand(cmd, false, value)
        editorContent.focus()
      },
      removeFormat() {
        setTimeout(() => {
          document.execCommand('removeFormat', false, null)

          let elems = this.domEditor.querySelectorAll('*');
          [].forEach.call(elems, elem => {
            elem.removeAttribute('style')
            elem.removeAttribute('class')
          })

          editorContent.focus()
        }, 0)
      },
      insertLink() {
        const link = prompt('输入链接地址', 'http://')
        if (link) {
          this.formatDoc('createLink', link)
        }
      },
      insertImage() {
        var src = prompt('图片地址', '')
        if (src) {
          this.formatDoc('insertImage', src)
        }
      },
      checkStatus() {
        this.currentBlock = document.queryCommandValue('formatBlock')
        this.toggleCmds.forEach(cmd => {
          this.$refs[cmd].$el.classList.toggle('active', document.queryCommandState(cmd))
        })
      },
      toggleSource() {
        this.sourceMode = !this.sourceMode
        if (this.sourceMode) {
          this.sourceCode = html_beautify(editorContent.innerHTML)
        }
      },
      preview() {
        this.bShowOverlay = true
        this.contentHTML = editorContent.innerHTML
      }
    },
    mounted() {
      this.html && (editorContent.innerHTML = this.html)
    }
  }
</script>
