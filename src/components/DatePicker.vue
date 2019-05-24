<template>
  <div class="v-date-picker" @click="showPicker">
    <input class="input" :style="inputStyle" :name="name" v-model="date" readonly>
    <div class="picker-container" :class="`${pos} ${open}`" ref="container" v-show="bShowPicker">
      <div class="date-picker">
        <div class="picker-filter">
          <div class="month-picker">
            <button class="btn-text" type="button" @click="prevMonth"><v-icon icon="left" size="16"></v-icon></button>
            <div>{{localeMonths[month - 1]}}</div>
            <button class="btn-text" type="button" @click="nextMonth"><v-icon icon="right" size="16"></v-icon></button>
          </div>
          <div class="year-picker">
            <v-pure-select :source="years" v-model="year"></v-pure-select>
          </div>
        </div>
        <div class="calendar">
          <table>
            <thead>
            <tr>
              <th v-for="week of localeWeeks">{{week}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="i of 6">
              <td v-for="j of 7" :class="days[(i-1)*7+(j-1)].status" @click.stop="selectDay(i,j)">
                <div>{{days[(i-1)*7+(j-1)].text}}</div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="time-picker" v-if="full">
        <ul class="list">
          <li v-for="time of times" :class="time === hour ? 'focus' : ''" @click.stop="selectHour(time)">{{time}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from './Icon.vue'
  import PureSelect from './PureSelect.vue'
  import fillDateNumber from '../utils/fillDateNumber'

  export default {
    name: 'v-date-picker',
    data() {
      const years = new Array(this.maxYear - this.minYear + 1).fill(0).map((item, i) => this.minYear + i)
      if (this.yearsDesc) years.reverse()

      return {
        selfClicked: false,
        years,
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
      months: Array,
      fixedWidth: Boolean,
      yearsDesc: Boolean
    },
    components: {
      [PureSelect.name]: PureSelect,
      [Icon.name]: Icon
    },
    computed: {
      inputStyle() {
        return {
          width: !this.fixedWidth && this.open ? (this.pickerWidth + 'px') : ''
        }
      },
      date() {
        const month = fillDateNumber(this.month), day = fillDateNumber(this.day)
        let result = `${this.year}-${month}-${day}`
        this.full && (result += ` ${this.hour}`)
        return result
      },
      days() {
        let firstDay, lastDay, arr = []
        let time = new Date(this.year, this.month - 1, 1)

        firstDay = time.getDay()
        time.setDate(0)
        lastDay = time.getDate()
        for (let i = firstDay; i > 0; i--) {
          arr.push({
            text: lastDay - i + 1,
            status: 'calendar-last-month',
            month: -1
          })
        }

        time.setMonth(time.getMonth() + 2, 0)
        lastDay = time.getDate()

        if (this.day > lastDay) this.day = lastDay

        for (let i = 1; i <= lastDay; i++) {
          arr.push({
            text: i,
            status: i === this.day ? 'focus' : '',
            month: 0
          })
        }

        let left = 42 - arr.length
        for (let i = 1; i <= left; i++) {
          arr.push({
            text: i,
            status: 'calendar-next-month',
            month: 1
          })
        }
        return arr
      }
    },
    watch: {
      value(val) {
        if (this.innerUpdate) return this.innerUpdate = false
        this.init(val)
      },
      date(val) {
        const date = new Date(val)
        if (date.getMonth() + 1 !== Number(val.split('-')[1])) return
        this.$emit('input', val)
      }
    },
    methods: {
      normalizeDateString(str) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str
        return str.split('-').map(i => fillDateNumber(+i)).join('-')
      },
      init(str) {
        const date = str ? new Date(this.normalizeDateString(str)) : new Date

        this.year = date.getFullYear()
        this.month = date.getMonth() + 1
        this.day = date.getDate()

        if (this.full) {
          let hour = date.getHours()
          let minute = date.getMinutes()
          this.hour = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)
        }
      },
      showPicker() {
        this.selfClicked = true
        if (this.bShowPicker) return
        this.bShowPicker = true

        const bottomSpace = window.innerHeight - this.$el.getBoundingClientRect().bottom
        this.pos = bottomSpace < 316 ? 'top' : 'bottom'

        this.$nextTick(() => {
          this.open = 'open'
          this.pickerWidth = this.$refs.container.offsetWidth
        })
      },
      hidePicker() {
        this.open = ''

        setTimeout(() => {
          this.pos = ''
          this.bShowPicker = false
        }, 400)
      },
      selectDay(i, j) {
        let d = this.days[(i - 1) * 7 + (j - 1)]
        if (d.month === 0 && d.text === this.day) return

        for (let m = 0; m < 42; m++) {
          let day = this.days[m]
          if (day.month === 0 && day.text === this.day) {
            day.status = ''
          }
        }

        d.status = 'focus'
        this.day = d.text
        if (d.month === -1) this.prevMonth()
        if (d.month === 1) this.nextMonth()

        this.innerUpdate = true
        if (!this.full) this.hidePicker()
      },
      selectHour(time) {
        if (this.hour === time) return

        this.hour = time
        this.innerUpdate = true
        this.hidePicker()
      },
      prevMonth() {
        if (this.month === 1) {
          if (this.year === this.minYear) return;
          this.month = 12
          this.year--
        } else {
          this.month--
        }
        this.innerUpdate = true
      },
      nextMonth() {
        if (this.month === 12) {
          if (this.year === this.maxYear) return
          this.month = 1
          this.year++
        } else {
          this.month++
        }
        this.innerUpdate = true
      }
    },
    created() {
      this.init(this.value ? this.value : undefined)

      if (this.full) {
        this.times = getTimeArray(this.interval)
      }
    },
    mounted() {
      window.addEventListener('click', () => {
        // 当点击组件之外的区域（包括其他DatePicker组件）时，隐藏日期选择框；点击组件自身时不做任何处理
        if (!this.selfClicked) this.hidePicker()
        this.selfClicked = false
      })
    }
  }

  function getTimeArray(interval) {
    interval = interval < 1 ? 0.5 : Math.floor(interval)
    let num = 24 / interval
    let hour = 0, minute = 0
    let arr = []

    for (let i = 0; i < num; i++) {
      arr.push((hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute))

      minute += 60 * interval
      if (minute >= 60) {
        minute = 0
        hour++
      }
    }
    return arr
  }
</script>
