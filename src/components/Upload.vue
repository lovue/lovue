<template>
  <div class="v-upload">
    <div class="u-thumbs" v-if="shape === 'square'">
      <div class="thumb-wrap" :style="`width: ${thumbSize}px;height: ${thumbSize}px;`" v-for="(thumb, i) of fileThumbs">
        <img :src="thumb">
        <div class="del-mask" @click="deleteFile(i)"><v-icon icon="delete"></v-icon></div>
      </div>
      <div class="btn-wrap" :style="`width: ${thumbSize}px;height: ${thumbSize}px;`">
        <v-icon icon="plus" size="30"></v-icon>
        <input type="file" :name="name" @change="selectFile" :multiple="multi" :required="required" :accept="accept">
      </div>
    </div>
    <template v-else>
      <div class="u-above">
        <div class="btn-wrap">
          <v-button icon="upload">{{text || '选择文件'}}</v-button>
          <input type="file" :name="name" @change="selectFile" :multiple="multi" :required="required" :accept="accept">
        </div>
        <div class="u-file-names" v-if="!upload && !thumbnail && fileNames.length">
          <span v-for="name of fileNames">{{name}}</span>
        </div>
      </div>

      <div class="u-below">
        <div class="u-thumbs" v-if="thumbnail">
          <div class="thumb-wrap" :style="`width: ${thumbSize}px;height: ${thumbSize}px;`" v-for="thumb of fileThumbs">
            <img :src="thumb">
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import Button from './Button.vue'
  import Icon from './Icon.vue'

  export default {
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
      accept: String,
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
    components: {
      [Button.name]: Button,
      [Icon.name]: Icon
    },
    methods: {
      selectFile(ev) {
        if (this.shape === 'button') {
          this.fileNames = []
          this.fileThumbs = []
        }

        [].forEach.call(ev.target.files, file => {
          this.fileNames.push(file.name)

          if (this.shape === 'square') this.files.push(file)

          if (!this.thumbnail) return
          if (!file.type.startsWith('image/')) return

          const reader = new FileReader()
          reader.onload = evt => {
            const img = new Image
            img.src = evt.target.result

            setTimeout(() => {
              if (!img.naturalWidth || !img.naturalHeight) {
                ev.target.value = ''
                this.warn('获取图片失败，请重新选择')
                return
              }

              this.fileThumbs.push(img.src)
            })
          }

          reader.readAsDataURL(file)
        })

        if (this.shape === 'button') {
          this.$emit('select', ev.target.files)
        } else {
          this.$emit('select', this.files)
        }
      },
      reset() {
        this.$el.querySelector('input[type=file]').value = null
        this.fileNames = []
        this.fileThumbs = []
      },
      deleteFile(i) {
        this.fileNames.splice(i, 1)
        this.fileThumbs.splice(i, 1)

        if (this.shape === 'square') {
          this.files.splice(i, 1)
          this.$emit('select', this.files)
        }
      }
    }
  }
</script>
