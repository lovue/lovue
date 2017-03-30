<template>
    <div class="vue-html-editor">
        <div class="overlay" v-show="bShowOverlay">
            <div class="box-normal window">
                <div class="title-bar">
                    <div class="btn-close" @click="bShowOverlay = false"><span>×</span></div>
                </div>
                <article class="article">
                    <div class="content-text" v-html="contentHTML"></div>
                </article>
            </div>
        </div>
        <div class="e-toolbar">
            <ul>
                <!--<li>
                    <button class="btn" type="button" ref="printDoc" @click="formatDoc('printDoc')">
                        <svg>
                            <use xlink:href="/img/icons.svg#icon-fa-print"></use>
                        </svg>
                    </button>
                </li>-->
                <li>
                    <button class="btn-text" type="button" @click="formatDoc('undo')" title="撤销">
                        <svg>
                            <use xlink:href="/public/img/icons.svg#icon-fa-undo"></use>
                        </svg>
                    </button>
                </li>
                <li>
                    <button class="btn-text" type="button" @click="formatDoc('redo')" title="重做">
                        <svg>
                            <use xlink:href="/public/img/icons.svg#icon-fa-redo"></use>
                        </svg>
                    </button>
                </li>
                <li>
                    <button class="btn-text" type="button" @click="removeFormat" title="清除格式">
                        <svg>
                            <use xlink:href="/public/img/icons.svg#icon-fa-eraser"></use>
                        </svg>
                    </button>
                </li>
                <li>
                    <button class="btn-text" type="button" ref="bold" @click="formatDoc('bold')" title="加粗">
                        <svg>
                            <use xlink:href="/public/img/icons.svg#icon-fa-bold"></use>
                        </svg>
                    </button>
                </li>
                <li>
                    <button class="btn-text" type="button" ref="italic" @click="formatDoc('italic')" title="斜体">
                        <svg>
                            <use xlink:href="/public/img/icons.svg#icon-fa-italic"></use>
                        </svg>
                    </button>
                </li>
                <li>
                    <button class="btn-text" type="button" ref="underline" @click="formatDoc('underline')" title="下划线">
                        <svg>
                            <use xlink:href="/public/img/icons.svg#icon-fa-underline"></use>
                        </svg>
                    </button>
                </li>
                <li>
                    <button class="btn-text" type="button" ref="strikeThrough" @click="formatDoc('strikeThrough')" title="删除线">
                        <del>abc</del>
                    </button>
                </li>
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
                <li>
                    <button class="btn-text" type="button" @click="formatDoc('outdent')" title="缩退">
                        <svg>
                            <use xlink:href="/public/img/icons.svg#icon-fa-outdent"></use>
                        </svg>
                    </button>
                </li>
                <li>
                    <button class="btn-text" type="button" @click="formatDoc('indent')" title="缩进">
                        <svg>
                            <use xlink:href="/public/img/icons.svg#icon-fa-indent"></use>
                        </svg>
                    </button>
                </li>
                <li>
                    <button class="btn-text" type="button" @click="insertLink" title="超链接">
                        <svg>
                            <use xlink:href="/public/img/icons.svg#icon-fa-link"></use>
                        </svg>
                    </button>
                </li>
                <li>
                    <button class="btn-text" type="button" @click="formatDoc('insertHorizontalRule')" title="分隔线">—</button>
                </li>
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
                <li>
                    <button class="btn-text" type="button" title="图片" @click="insertImage">
                        <svg>
                            <use xlink:href="/public/img/icons.svg#icon-fa-picture"></use>
                        </svg>
                    </button>
                </li>
                <li class="item-width">
                    <select class="select" @change="formatDoc('formatBlock',$event.target.value)">
                        <option value="p">p</option>
                        <option value="h1">h1</option>
                        <option value="h2">h2</option>
                        <option value="h3">h3</option>
                        <option value="h4">h4</option>
                        <option value="h5">h5</option>
                        <option value="h6">h6</option>
                        <option value="pre">pre</option>
                    </select>
                </li>
                <li class="item-width">
                    <button class="btn-text" type="button" title="源码" @click="toggleSource">HTML</button>
                </li>
                <li class="item-width">
                    <button class="btn-text" type="button" title="预览" @click="preview">预览</button>
                </li>
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
        <div v-show="!sourceMode" class="e-content" id="editor" contenteditable @click="checkStatus" @paste="removeFormat"
             @keyup.up="checkStatus" @keyup.down="checkStatus" @keyup.left="checkStatus" @keyup.right="checkStatus" @keyup.enter="checkStatus"></div>
        <div v-show="sourceMode" class="e-source" id="source">
            <pre><code>{{sourceCode}}</code></pre>
        </div>
    </div>
</template>

<script>
    var toggleCmds = [ "bold", "italic", "underline", "strikeThrough" ];

    export default {
        data () {
            return {
                sourceMode: false,
                sourceCode: "",
                contentHTML: "",
                bShowOverlay: false
            }
        },
        props: {
            html: String
        },
        watch: {
            bShowOverlay ( val ) {
                document.body.classList.toggle( 'overhidden', val );
            },
            html ( val ) {
                editor.innerHTML = val;
            }
        },
        methods: {
            formatDoc ( cmd, value ) {
                if ( toggleCmds.indexOf( cmd ) !== -1 ) {
                    this.$refs[ cmd ].classList.toggle( 'active' );
                }
                document.execCommand( cmd, false, value );
                editor.focus();
            },
            removeFormat () {
                setTimeout( () => {
                    document.execCommand( "removeFormat", false, null );

                    let elems = editor.querySelectorAll( "*" );
                    [].forEach.call( elems, elem => {
                        elem.removeAttribute( 'style' );
                        elem.removeAttribute( 'class' );
                    } );

                    editor.focus();
                }, 0 );
            },
            insertLink () {
                /*var link = prompt( "输入链接地址", "http://" );
                 if ( link ) {
                 this.formatDoc( 'createLink', link );
                 }*/
                this.$root.$refs.alert.show( {
                    text: "输入链接地址",
                    type: "input",
                    inputs: "http://"
                }, ( url ) => {
                    this.formatDoc( 'createLink', url );
                } );
            },
            insertImage () {
                /*var sel = getSelection();
                console.log( sel );
                console.log( sel.rangeCount );
                console.log( sel.getRangeAt(0) );
                return;*/
                var src = prompt( '图片地址', '' );
                if ( src ) {
                    this.formatDoc( 'insertImage', src );
                }
            },
            checkStatus () {
                toggleCmds.forEach( cmd => {
                    this.$refs[ cmd ].classList.toggle( 'active', document.queryCommandState( cmd ) );
                } );
            },
            toggleSource () {
                this.sourceMode = !this.sourceMode;
                if ( this.sourceMode ) {
                    this.sourceCode = html_beautify( editor.innerHTML );
                }
            },
            preview () {
                this.bShowOverlay = true;
                this.contentHTML = editor.innerHTML;
            }
        },
        mounted () {
            this.html && (editor.innerHTML = this.html);
        }
    }
</script>
