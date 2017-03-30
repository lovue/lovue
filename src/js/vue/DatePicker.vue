<template>
  <div class="vue-date-picker" @click="handleClick">
    <input class="input" :style="inputStyle" type="text" ref="input" :name="name" v-model="date" readonly>
    <div class="picker-container" ref="container" v-show="bShowPicker">
      <div class="date-picker">
        <div class="picker-filter">
          <div class="month-picker">
            <button class="btn-text" type="button" @click="prevMonth">◀</button>
            <div>{{month}}月</div>
            <button class="btn-text" type="button" @click="nextMonth">▶</button>
          </div>
          <div class="year-picker">
            <select class="select" v-model="year">
              <option v-for="y of years">{{y}}</option>
            </select>
          </div>
        </div>
        <div class="calendar">
          <table>
            <thead>
            <tr>
              <th v-for="week of weeks">{{week}}</th>
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
      <div class="time-picker" v-if="timepicker">
        <ul class="list">
          <li v-for="time of times" :class="time === hour ? 'focus' : ''" @click.stop="selectHour(time)">{{time}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  const today = new Date

  export default {
    data() {
      return {
        years: getArray(this.minYear, this.maxYear),
        months: getArray(1, 12),
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        year: 0,
        month: 0,
        day: 0,
        hour: '00:00',
        times: [],
        bShowPicker: false,
        clicked: false,
        scrolling: false,
        pickerWidth: 0
      }
    },
    props: {
      current: String,
      name: String,
      timepicker: Boolean,
      interval: Number,
      minYear: {
        'type': Number,
        'default': 1950
      },
      maxYear: {
        'type': Number,
        'default': 2050
      }
    },
    computed: {
      inputStyle() {
        return {
          width: this.bShowPicker ? (this.pickerWidth + 'px') : ''
        }
      },
      date() {
        return this.timepicker
          ? this.year + '-' + this.month + '-' + this.day + ' ' + this.hour
          : this.year + '-' + this.month + '-' + this.day
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
      current(val) {
        let t = new Date(val)
        this.year = t.getFullYear()
        this.month = t.getMonth() + 1
        this.day = t.getDate()

        if (this.timepicker) {
          let hour = t.getHours()
          let minute = t.getMinutes()
          this.hour = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)
        }
      },
      date(val) {
        this.$emit('update', val)
      }
    },
    methods: {
      handleClick() {
        this.clicked = true
        this.bShowPicker = true

        if(this.pickerWidth) return
        this.$nextTick(() => {
          this.pickerWidth = this.$refs.container.offsetWidth
        })
      },
      selectDay(i, j) {
        for (let m = 0; m < 42; m++) {
          let day = this.days[m]
          if (day.month === 0 && day.text === this.day) {
            day.status = ''
          }
        }

        let d = this.days[(i - 1) * 7 + (j - 1)]
        d.status = 'focus'
        this.day = d.text
        if (d.month === -1) this.prevMonth()
        if (d.month === 1) this.nextMonth()

        if (!this.timepicker) this.bShowPicker = false
      },
      selectHour(time) {
        this.hour = time
        this.bShowPicker = false
      },
      prevMonth() {
        if (this.month === 1) {
          if (this.year === this.minYear) return;
          this.month = 12
          this.year--
        } else {
          this.month--
        }
      },
      nextMonth() {
        if (this.month === 12) {
          if (this.year === this.maxYear) return
          this.month = 1
          this.year++
        } else {
          this.month++
        }
      }
    },
    created() {
      let t = this.current ? new Date(this.current) : today

      this.year = t.getFullYear()
      this.month = t.getMonth() + 1
      this.day = t.getDate()

      if (this.timepicker) {
        if (this.current) {
          let hour = t.getHours()
          let minute = t.getMinutes()
          this.hour = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)
        }
        this.times = getTimeArray(this.interval)
      }
    },
    mounted() {
      window.addEventListener('click', () => {
        if (!this.clicked) {
          this.bShowPicker = false
        }
        this.clicked = false
      })
    }
  }

  function getArray(min, max) {
    let obj = []
    for (let i = min; i <= max; i++) {
      obj.push(i)
    }
    return obj
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
