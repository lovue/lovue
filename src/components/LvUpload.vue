<script setup lang="ts">
import { computed, ref } from 'vue'
import LvIcon from './LvIcon.vue'
import LvButton from './LvButton.vue'

// TODO: hover issue.

const props = withDefaults(defineProps<{
  name?: string
  auto?: boolean
  multi?: boolean
  required?: boolean
  showThumbnail?: boolean
  loading?: boolean
  thumbSize?: number
  accept?: string
  text?: string
  shape?: 'button' | 'square'
}>(), {
  text: '选择文件',
  shape: 'button'
})
const emit = defineEmits(['select'])

const files = ref<File[]>([])
const thumbnails = ref<string[]>([])

const filenames = computed(() => files.value.map(file => file.name))
const thumbnailStyle = computed(() => {
  if (!props.thumbSize) return {}

  return {
    width: `${props.thumbSize}px`,
    height: `${props.thumbSize}px`
  }
})

function selectFiles (ev: InputEvent) {
  if (props.shape === 'button') {
    files.value = []
    thumbnails.value = []
  }

  const inputElement = ev.target as HTMLInputElement
  Array.from(inputElement?.files || []).forEach(file => {
    files.value.push(file)

    if (!props.showThumbnail) return
    if (!file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = evt => {
      const img = new Image
      img.src = evt.target?.result as string

      setTimeout(() => {
        if (!img.naturalWidth || !img.naturalHeight) {
          inputElement.value = ''
          return
        }

        thumbnails.value.push(img.src)
      })
    }

    reader.readAsDataURL(file)
  })

  emit('select', files.value)
}

function deleteFile (index: number) {
  files.value.splice(index, 1)
  thumbnails.value.splice(index, 1)

  emit('select', files.value)
}
</script>

<template>
  <div class="lv-upload" :class="`lv-upload__${shape}`">
    <div class="lv-upload__button--above" v-if="shape === 'button'">
      <div class="lv-upload__button__control">
        <LvButton icon="upload" :loading="loading">{{ text }}</LvButton>
        <input
          class="lv-upload__input"
          type="file"
          :name="name"
          :multiple="multi"
          :required="required"
          :accept="accept"
          @change="selectFiles"
        >
      </div>
      <div class="lv-upload__button__names">
        <div class="lv-upload__button__filename" v-for="(filename, i) of filenames" :key="`filename-${i}`">{{ filename }}</div>
      </div>
    </div>

    <div class="lv-upload__preview" v-if="files.length">
      <div
        class="lv-upload__thumbnail"
        :style="thumbnailStyle"
        v-for="(thumbnail, i) of thumbnails"
        :key="`thumbnail-${i}`"
      >
        <img :src="thumbnail" alt="">
        <div class="thumbnail-deleter" @click="deleteFile(i)">
          <LvIcon icon="delete" />
        </div>
      </div>
    </div>

    <div class="lv-upload__square__control" :style="thumbnailStyle" v-if="shape === 'square'">
      <LvIcon icon="plus" size="30" />
      <input
        class="lv-upload__input"
        type="file"
        :name="name"
        :multiple="multi"
        :required="required"
        :accept="accept"
        @change="selectFiles"
      >
    </div>
  </div>
</template>

<style lang="less">
@import (reference) "../Mixins";

.lv-upload {
  &__button {
    &--above {
      .flex-start;

      flex-wrap: wrap;
    }

    &__control {
      position: relative;

      &:hover {
        .lv-button {
          background-color: var(--hover-blue);
          border-color: var(--hover-blue);
        }
      }

      &:active {
        .lv-button {
          background-color: var(--active-blue);
          border-color: var(--active-blue);
        }
      }
    }

    &__names {
      .flex-start;
    }

    &__filename {
      padding: 4px 8px;
      background-color: var(--bg-color);
      border-radius: var(--border-radius);
      margin-left: 6px;
    }

    .lv-upload__preview {
      margin-top: var(--unit);
    }
  }

  &__square {
    display: flex;
    flex-wrap: wrap;
    // TODO: compatibility
    gap: var(--unit);

    &__control {
      position: relative;
      width: 100px;
      height: 100px;
      border: 1px dashed var(--border-color);
      border-radius: var(--border-radius);
      background-color: var(--bg-color);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: border-color 0.3s ease;

      .lv-icon-plus {
        color: var(--second-color);
      }

      &:hover {
        border-color: var(--blue-color);
      }
    }
  }

  &__input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    font-size: 0;
    opacity: 0;
    cursor: pointer;
  }

  &__preview {
    display: flex;
    flex-wrap: wrap;
    // TODO: compatibility
    gap: var(--unit);
  }

  &__thumbnail {
    position: relative;
    width: 100px;
    height: 100px;
    line-height: 98px;
    text-align: center;
    overflow: hidden;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: center;

    .thumbnail-deleter {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: none;
      justify-content: center;
      align-items: center;
      background-color: rgb(0 0 0 / 65%);
      cursor: pointer;

      .lv-icon-delete {
        color: var(--white);
      }
    }

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      .thumbnail-deleter {
        display: flex;
      }
    }
  }
}
</style>
