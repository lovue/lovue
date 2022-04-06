<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import LvIcon from './LvIcon.vue'
import LvInput from './LvInput.vue'
import LvSelect from './LvSelect.vue'
import { useClickOutside } from '../hooks/useClickOutside'

interface Day {
  text: number
  month: number
}

const props = withDefaults(defineProps<{
  modelValue: string
  name?: string
  minYear?: number
  maxYear?: number
  weeksText?: string[]
  monthsText?: string[]
}>(), {
  minYear: 1950,
  maxYear: 2050,
  weeksText: () => ['日', '一', '二', '三', '四', '五', '六'],
  monthsText: () => ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
})
const emit = defineEmits(['update:modelValue'])

const yearOptions = new Array(props.maxYear - props.minYear + 1).fill(0).map((item, i) => {
  const _year = props.minYear + i

  return {
    text: '' + _year,
    value: _year
  }
})

const { isComponentClicked } = useClickOutside(hideContainer)

const isShowContainer = ref(false)
const position = ref('bottom')
const year = ref(0)
const month = ref(0)
const day = ref(0)
const rootElem = ref<HTMLDivElement | null>(null)

const days = computed(() => {
  let firstDay, lastDay, _days: Day[] = []
  const _date = new Date(year.value, month.value - 1, 1)

  firstDay = _date.getDay()
  _date.setDate(0) // last day of last month
  lastDay = _date.getDate()

  for (let i = firstDay; i > 0; i--) {
    _days.push({
      text: lastDay - i + 1,
      month: -1
    })
  }

  _date.setMonth(_date.getMonth() + 2, 0) // last day of current month
  lastDay = _date.getDate()

  for (let i = 1; i <= lastDay; i++) {
    _days.push({
      text: i,
      month: 0
    })
  }

  const leftDays = 42 - _days.length
  for (let i = 1; i <= leftDays; i++) {
    _days.push({
      text: i,
      month: 1
    })
  }

  return _days
})
const date = computed(() => {
  return `${year.value}-${fillDateNumber(month.value)}-${fillDateNumber(day.value)}`
})
const containerClass = computed(() => {
  const _class = []

  if (isShowContainer.value) {
    _class.push('status--opened')
  }

  _class.push(`status--${position.value}`)

  return _class
})

watch(() => props.modelValue, init, {
  immediate: true
})
watch(date, value => {
  // const _date = new Date(value)
  // if (_date.getMonth() + 1 !== Number(value.split('-')[1])) return
  emit('update:modelValue', value)
})

onMounted(() => {
  setTimeout(calculateContainerPosition, 200)
})

function init (outerValue: string) {
  const _date = outerValue ? new Date(outerValue) : new Date()

  year.value = _date.getFullYear()
  month.value = _date.getMonth() + 1
  day.value = _date.getDate()
}

function calculateContainerPosition () {
  if (!rootElem.value) return

  const bottomSpace = window.innerHeight - rootElem.value.getBoundingClientRect().bottom
  const containerElem = rootElem.value.querySelector('.lv-date-picker__container')
  if (!(containerElem instanceof HTMLDivElement)) return

  const newPosition = bottomSpace < containerElem.offsetHeight ? 'top' : 'bottom'
  const positionChanged = newPosition !== position.value
  position.value = newPosition

  return positionChanged
}

function showContainer () {
  isComponentClicked.value = true

  const positionChanged = calculateContainerPosition()

  if (positionChanged) {
    setTimeout(() => isShowContainer.value = true, 100)
  } else {
    isShowContainer.value = true
  }
}

function hideContainer () {
  isShowContainer.value = false
}

function fillDateNumber (value: number) {
  return value < 10 ? `0${value}` : `${value}`
}

function getCellIndex (i: number, j: number) {
  return (i - 1) * 7 + (j - 1)
}

function getCellStatus (i: number, j: number) {
  const currentDay = days.value[getCellIndex(i, j)]

  if (currentDay.month === -1) return 'calendar--last-month'

  if (currentDay.month === 0 && currentDay.text === day.value) return 'status--focus'

  if (currentDay.month === 1) return 'calendar--next-month'
}

function selectDay (i: number, j: number) {
  const currentDay = days.value[getCellIndex(i, j)]
  if (currentDay.month === 0 && currentDay.text === day.value) return

  day.value = currentDay.text

  if (currentDay.month === -1) prevMonth()
  if (currentDay.month === 1) nextMonth()

  hideContainer()
}

function prevMonth () {
  if (month.value === 1) {
    if (year.value === props.minYear) return

    month.value = 12
    year.value--
  } else {
    month.value--
  }
}

function nextMonth () {
  if (month.value === 12) {
    if (year.value === props.maxYear) return

    month.value = 1
    year.value++
  } else {
    month.value++
  }
}
</script>

<template>
  <div class="lv-date-picker" ref="rootElem" @click="showContainer">
    <LvInput :model-value="date" :name="name" readonly />
    <div class="lv-date-picker__container" :class="containerClass">
      <div class="lv-date-picker__date-picker">
        <div class="picker-filter">
          <div class="month-picker">
            <div class="icon-wrap" @click="prevMonth">
              <LvIcon icon="left" :size="16" />
            </div>
            <div>{{ monthsText[month - 1] }}</div>
            <div class="icon-wrap" @click="nextMonth">
              <LvIcon icon="right" :size="16" />
            </div>
          </div>
          <div class="year-picker">
            <LvSelect v-model="year" :items="yearOptions" />
          </div>
        </div>
        <div class="lv-date-picker__calendar">
          <div class="calendar-title" v-for="(week, i) of weeksText" :key="`week-${i}`">{{ week }}</div>
          <template v-for="i of 6">
            <template v-for="j of 7" :key="`cell-${i}-${j}`">
              <div
                class="calendar-cell"
                :class="getCellStatus(i, j)"
                @click.stop="selectDay(i, j)"
              >{{ days[getCellIndex(i, j)].text }}</div>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import (reference) "../Mixins";

.lv-date-picker {
  position: relative;
  display: inline-block;
  font-size: var(--small-font);

  > .lv-input {
    .native-input {
      cursor: pointer;
    }
  }
}

.lv-date-picker__container {
  .shadow-light;

  position: absolute;
  background-color: var(--white);
  border-top: 1px solid var(--border-color);
  margin-top: 2px;
  display: flex;
  user-select: none;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
  z-index: 100;

  &.status--top {
    bottom: calc(100% + 4px);
    transform: translateY(1em);
  }

  &.status--bottom {
    top: calc(100% - 1px);
    transform: translateY(-1em);
  }

  &.status--opened {
    transform: translateY(0);
    visibility: visible;
    opacity: 1;
  }
}

.lv-date-picker__date-picker {
  .picker-filter {
    display: flex;
    padding: 4px;
  }

  .month-picker {
    .flex-between;

    flex-grow: 1;
    margin-right: 4px;
    height: 30px;

    .icon-wrap {
      width: 30px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
    }
  }

  .year-picker {
    width: 100px;

    .lv-select {
      min-width: unset;
    }
  }
}

.lv-date-picker__calendar {
  display: grid;
  grid-template: repeat(7, 32px) / repeat(7, 32px);
  gap: 8px;
  padding: 4px;

  .calendar-title,
  .calendar-cell {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .calendar-cell {
    cursor: pointer;

    &.status--focus,
    &:hover {
      background-color: var(--blue-color);
      border-radius: 50%;
    }

    &.calendar--last-month,
    &.calendar--next-month {
      color: var(--disabled-color);
    }
  }
}

.lv-date-picker__time-picker {
  margin-left: var(--2unit);
  //min-width: 62px;
  height: 320px;
  line-height: 24px;
  border-left: 1px solid var(--border-color);
  overflow-y: auto;
  overscroll-behavior: contain;

  .picker-list {
    li {
      padding: 0 5px;
      white-space: nowrap;
      cursor: pointer;

      &:hover {
        background-color: var(--hover-blue);
      }
    }

    li.focus {
      background-color: var(--blue-color);
    }
  }
}
</style>
