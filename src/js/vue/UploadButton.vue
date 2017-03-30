<template>
  <div class="vue-upload-button">
    <div class="btn-file">
      <button class="btn" type="button">{{text}}</button>
      <input type="file" :name="name" @change="selectFile" :multiple="multi" required>
    </div>
    <div class="span-file-names" v-if="!upload && fileNames.length">
      <span v-for="name of fileNames">{{name}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        fileNames: []
      }
    },
    props: {
      name: String,
      upload: Boolean,
      multi: Boolean,
      text: {
        'type': String,
        'default': '选择文件'
      }
    },
    methods: {
      selectFile(ev) {
        this.fileNames = [];

        [].forEach.call(ev.target.files, file => {
          this.fileNames.push(file.name)
        })
        if (this.upload && !this.multi) {
          this.$emit('select', ev.target.files[0])
        }
      },
      reset() {
        this.$el.querySelector('input[type=file]').value = ''
        this.fileNames = []
      }
    }
  }
</script>
