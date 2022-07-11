<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import LvIcon from './LvIcon.vue'
import LvSearch from './LvSearch.vue'
import { useClickOutside } from '../hooks/useClickOutside'

type valueType = string | number | null
type modelValueType = valueType | valueType[]

export interface SelectItem {
  text: string
  value: valueType
  disabled?: boolean
  children?: SelectItem[]
  _selected?: boolean
}

const props = withDefaults(defineProps<{
  modelValue: modelValueType
  items: SelectItem[]
  name?: string
  disabled?: boolean
  searchable?: boolean
  placeholder?: string
  searchPlaceholder?: string
  max?: number
  clearable?: boolean
  required?: boolean
}>(), {
  placeholder: '请选择',
  searchPlaceholder: '搜索'
})
const emit = defineEmits(['update:modelValue', 'selected-items'])

const { isComponentClicked } = useClickOutside(hideDropdown)

const selected = ref<SelectItem[] | SelectItem | null>(null)
const searchKeywords = ref('')
const position = ref('bottom')
const isShowDropdown = ref(false)
const originalOptions = ref<SelectItem[]>([])
const rootElem = ref<HTMLDivElement | null>(null)
const innerUpdate = ref(false)

const isMultiple = computed(() => Array.isArray(props.modelValue))
const filteredOptions = computed(() => {
  if (searchKeywords.value === '') return originalOptions.value
  return originalOptions.value.filter(option => option.text.toLowerCase().includes(searchKeywords.value.toLowerCase()))
})
const dropdownClass = computed(() => {
  const _class = []

  if (isShowDropdown.value) {
    _class.push('status--opened')
  }

  _class.push(`status--${position.value}`)

  return _class
})

watch(() => props.items, items => {
  originalOptions.value = cloneItems(items)
  updateSelected(props.modelValue)
}, {
  immediate: true
})
watch(() => props.modelValue, updateSelected, {
  immediate: true
})

onMounted(() => {
  setTimeout(calculateDropdownPosition, 200)
})

function updateSelected (outerValue: modelValueType) {
  if (innerUpdate.value) return innerUpdate.value = false

  if (Array.isArray(outerValue)) {
    selected.value = []
    originalOptions.value.forEach(option => {
      option._selected = false

      if (outerValue.includes(option.value)) {
        option._selected = true

        if (Array.isArray(selected.value)) {
          selected.value.push(option)
        }
      }

      if (option.children) {
        option.children.forEach(child => {
          child._selected = false

          if (outerValue.includes(child.value)) {
            child._selected = true

            if (Array.isArray(selected.value)) {
              selected.value.push(child)
            }
          }
        })
      }
    })
    return
  }

  originalOptions.value.forEach(option => {
    option._selected = false

    if (option.value === outerValue) {
      option._selected = true
      selected.value = option
    }

    if (option.children) {
      option.children.forEach(child => {
        child._selected = false

        if (child.value === outerValue) {
          child._selected = true
          selected.value = child
        }
      })
    }
  })
}

function updateScrollbar () {
  if (!rootElem.value) return

  const optionsElem = rootElem.value.querySelector('.lv-select__options') as HTMLUListElement
  const focusElem = rootElem.value.querySelector('.lv-select__option.status--focus') as HTMLDivElement

  const y = focusElem.offsetTop - optionsElem.offsetHeight / 2
  optionsElem.scrollTop = Math.max(y, 0)
}

function calculateDropdownPosition () {
  if (!rootElem.value) return

  const bottomSpace = window.innerHeight - rootElem.value.getBoundingClientRect().bottom
  const dropdownElem = rootElem.value.querySelector('.lv-select__dropdown') as HTMLDivElement

  const newPosition = bottomSpace < dropdownElem.offsetHeight ? 'top' : 'bottom'
  const positionChanged = newPosition !== position.value
  position.value = newPosition

  return positionChanged
}

function showDropdown () {
  isComponentClicked.value = true

  const positionChanged = calculateDropdownPosition()

  if (Array.isArray(selected.value)) {
    if (selected.value.length) {
      updateScrollbar()
    }
  } else if (selected.value !== null) {
    updateScrollbar()
  }

  if (positionChanged) {
    setTimeout(() => isShowDropdown.value = true, 100)
  } else {
    isShowDropdown.value = true
  }
}

function hideDropdown () {
  isShowDropdown.value = false
  searchKeywords.value = ''
}

function removeSelected (option: SelectItem, index: number) {
  if (!Array.isArray(selected.value)) return

  selected.value.splice(index, 1)
  option._selected = false

  innerUpdate.value = true
  emit('update:modelValue', selected.value.map(_option => _option.value))
  emit('selected-items', selected.value)
}

function clearSelected () {
  selected.value = null
  emit('update:modelValue', null)
  emit('selected-items', null)
}

function clickOption (option: SelectItem) {
  if (isMultiple.value) {
    toggleOption(option)
  } else {
    selectOption(option)
  }
}

function selectOption (option: SelectItem) {
  if (Array.isArray(selected.value)) return

  if (selected.value !== null) selected.value._selected = false

  option._selected = true
  selected.value = option

  hideDropdown()
  innerUpdate.value = true
  emit('update:modelValue', selected.value.value)
  emit('selected-items', selected.value)
}

function toggleOption (option: SelectItem) {
  if (!Array.isArray(selected.value)) return

  option._selected = !option._selected

  if (option._selected) {
    if (props.max && selected.value.length >= props.max) {
      option._selected = false
    } else {
      const currentSelected = props.modelValue
      if (Array.isArray(currentSelected)) currentSelected.push(option.value)
      updateSelected(currentSelected)
    }
  } else {
    selected.value = selected.value.filter(_option => _option.value !== option.value)
  }

  innerUpdate.value = true
  emit('update:modelValue', selected.value.map(_option => _option.value))
  emit('selected-items', selected.value)
}

function cloneItems (items: SelectItem[]) {
  return items.map(item => {
    const option: SelectItem = {
      text: item.text,
      value: item.value,
      disabled: item.disabled
    }

    if (item.children) {
      option.children = item.children.map(child => ({
        text: child.text,
        value: child.value,
        disabled: child.disabled
      }))
    }

    return option
  })
}
</script>

<template>
  <div class="lv-select" @click="showDropdown" ref="rootElem">
    <div class="lv-select__selected">
      <div class="lv-select__disabled-mask" v-if="disabled" />
      <div class="lv-select__selected__content">
        <template v-if="isMultiple && selected !== null">
          <input
            type="hidden"
            :value="selected.map(s => s.value).join(',')"
            :name="name"
            :required="required"
          >
          <div class="lv-select__selected__tag" v-for="(option, i) of selected" :key="`selected-${i}`">
            <div class="tag-name">{{ option.text }}</div>
            <LvIcon icon="close" @click.stop="removeSelected(option, i)" />
          </div>
          <span class="lv-select__selected__placeholder" v-if="!selected.length">{{ placeholder }}</span>
        </template>
        <template v-else>
          <input type="hidden" :value="selected?.value" :name="name" :required="required">
          <div class="lv-select__selected__value" v-if="selected?.text !== undefined">{{ selected?.text }}</div>
          <div class="lv-select__selected__placeholder" v-else>{{ placeholder }}</div>
          <LvIcon class="lv-select__selected__clear-icon" icon="close" :size="16" @click.stop="clearSelected" v-if="clearable && selected?.text" />
        </template>
      </div>
      <div class="lv-select__selected__icon">
        <LvIcon icon="down-wide" :class="{ 'status--reversed': !isShowDropdown }" />
      </div>
    </div>
    <div class="lv-select__dropdown" :class="dropdownClass">
      <div class="lv-select__search" v-if="searchable">
        <LvSearch v-model="searchKeywords" :placeholder="searchPlaceholder" :delay="100" />
      </div>
      <ul class="lv-select__options">
        <li v-for="option of filteredOptions" :key="option.value" :title="option.text" @click.stop="clickOption(option)">
          <div class="lv-select__option" :class="{'status--focus': option._selected}">
            <span class="lv-select__option--text">{{ option.text }}</span>
            <LvIcon icon="check" v-if="option._selected" />
          </div>
          <ul class="lv-select__sub-options" v-if="option.children?.length">
            <li v-for="child of option.children" :key="child.value" :title="child.text" @click.stop="clickOption(child)">
              <div class="lv-select__option" :class="{'status--focus': child._selected}">
                <span class="lv-select__option--text">{{ child.text }}</span>
                <LvIcon icon="check" v-if="child._selected" />
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less">
@import (reference) "../Mixins";

.lv-select {
  position: relative;
  min-width: 200px;
  display: inline-block;
  font-size: var(--small-font);
}

.lv-select__selected {
  .flex-between;

  padding: 0 4px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: var(--white);
  min-height: 32px;
  transition: border-color 0.2s;
  cursor: pointer;

  &:hover {
    border-color: var(--blue-color);

    .lv-select__selected__clear-icon {
      display: block;
    }
  }
}

.lv-select__selected__content {
  .flex-start;

  flex-wrap: wrap;
  margin-right: 0;
  padding-left: 4px;
  padding-right: 20px;
}

.lv-select__selected__icon {
  .flex-start;

  font-size: 0;

  .lv-icon {
    width: 24px;
    height: 16px;
    will-change: transform;
    transition: transform 0.25s ease-out;

    &.status--reversed {
      transform: rotateX(180deg);
    }
  }
}

.lv-select__selected__tag {
  .flex-between;

  padding-left: 4px;
  margin: 4px 4px 4px 0;
  background-color: var(--blue-color);
  color: var(--white);
  font-size: var(--tiny-font);
  height: 20px;
  border-radius: var(--border-radius);

  .tag-name {
    .truncate;
  }

  .lv-icon-close {
    .transition(@property: color);

    flex-shrink: 0;
    width: 28px;
    height: 14px;
    cursor: pointer;

    &:hover {
      color: var(--pink-color);
    }
  }
}

.lv-select__selected__value {
  white-space: nowrap;
}

.lv-select__selected__placeholder {
  color: var(--placeholder-color);
}

.lv-select__selected__clear-icon {
  position: absolute;
  top: 7px;
  right: 28px;
  color: var(--white);
  transition: background-color 0.2s;
  display: none;
  background-color: #b2b2b2;
  padding: 2px;
  border-radius: 50%;

  &:hover {
    background-color: #999;
  }
}

.lv-select__disabled {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
  opacity: 0.8;
  z-index: 2;
  cursor: not-allowed;
}

.lv-select__dropdown {
  position: absolute;
  min-width: 100%;
  background-color: var(--white);
  border: 1px solid var(--border-color);
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
  z-index: 5;

  &.status--top {
    margin-bottom: -1px;
    bottom: 100%;
    transform: translateY(1em);
  }

  &.status--bottom {
    margin-top: -1px;
    transform: translateY(-1em);
  }

  &.status--opened {
    transform: translateY(0);
    visibility: visible;
    opacity: 1;
  }
}

.lv-select__search {
  padding: var(--unit) var(--unit) 0;
}

.lv-select__options {
  .light-scrollbar;

  padding: var(--unit) 0;
  max-height: 320px;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.lv-select__option {
  .flex-between;

  padding: 0 4px 0 var(--unit);
  line-height: 32px;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: var(--bg-color);
  }

  &.status--focus {
    color: var(--blue-color);
  }

  > .lv-icon {
    width: 24px;
    height: 16px;
    flex-shrink: 0;
  }
}

.lv-select__option--text {
  white-space: nowrap;
}

.lv-select__sub-options {
  .lv-select__option--text {
    position: relative;
    padding-left: var(--4unit);

    &::before {
      content: "";
      display: block;
      width: 18px;
      position: absolute;
      left: var(--unit);
      top: 16px;
      border-top: 1px dashed var(--second-color);
    }
  }
}
</style>
