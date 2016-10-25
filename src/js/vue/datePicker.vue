<template>
    <div class="vue-date-picker">
        <input class="input" type="text" :name="name" v-model="date" @mousedown="init" readonly>
        <div class="picker-container" v-show="bShowPicker">
            <div class="date-picker">
                <div class="month-picker">
                    <a class="arrow" @click="prevMonth">◀</a>
                    <div class="custom-select">
                        <div class="selected" @click="bShowYears = !bShowYears"><span>{{year}}</span>▼</div>
                        <ul class="list" v-show="bShowYears">
                            <li v-for="y of years" :class="y === year ? 'focus' : ''" @click="selectYear(y)">{{y}}</li>
                        </ul>
                    </div>
                    <div class="custom-select">
                        <div class="selected" @click="bShowMonths = !bShowMonths"><span>{{month}}</span>▼</div>
                        <ul class="list" v-show="bShowMonths">
                            <li v-for="m of months" :class="m === month ? 'focus' : ''" @click="selectMonth(m)">{{m}}</li>
                        </ul>
                    </div>
                    <a class="arrow" @click="nextMonth">▶</a>
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
                            <td v-for="j of 7" :class="days[(i-1)*7+(j-1)].status" @click="selectDay(i,j)">{{days[(i-1)*7+(j-1)].text}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="time-picker" v-if="timepicker">
                <ul class="list">
                    <li v-for="time of times" :class="time === hour ? 'focus' : ''" @click="selectHour(time)">{{time}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    function getArray( min, max ) {
        var obj = [];
        for ( var i = min; i <= max; i++ ) {
            obj.push( i );
        }
        return obj;
    }

    function getTimeArray( interval ) {
        interval = interval < 1 ? 0.5 : Math.floor( interval );
        var num = 24 / interval;
        var hour = 0, minute = 0;
        var arr = [];

        for ( var i = 0; i < num; i++ ) {
            arr.push( (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute) );

            minute += 60 * interval;
            if ( minute >= 60 ) {
                minute = 0;
                hour++;
            }
        }
        return arr;
    }

    var today = new Date;
    var minYear = 1950, maxYear = 2050;

    export default {
        data () {
            return {
                years: getArray( minYear, maxYear ),
                months: getArray( 1, 12 ),
                weeks: [ "日", "一", "二", "三", "四", "五", "六" ],
                year: 0,
                month: 0,
                day: 0,
                hour: "00:00",
                times: [],
                bShowYears: false,
                bShowMonths: false,
                bShowPicker: false
            }
        },
        props: {
            current: String,
            name: String,
            timepicker: Boolean,
            interval: Number
        },
        computed: {
            date () {
                return this.timepicker
                    ? this.year + "-" + this.month + "-" + this.day + " " + this.hour
                    : this.year + "-" + this.month + "-" + this.day;
            },
            days () {
                var i, firstDay, lastDay, arr = [];
                var time = new Date( this.year, this.month - 1, 1 );

                firstDay = time.getDay();
                time.setDate( 0 );
                lastDay = time.getDate();
                for ( i = firstDay; i > 0; i-- ) {
                    arr.push( {
                        text: lastDay - i + 1,
                        status: "calendar-last-month",
                        month: -1
                    } );
                }

                time.setMonth( time.getMonth() + 2, 0 );
                lastDay = time.getDate();

                if ( this.day > lastDay ) this.day = lastDay;

                for ( i = 1; i <= lastDay; i++ ) {
                    arr.push( {
                        text: i,
                        status: i === this.day ? "focus" : "",
                        month: 0
                    } );
                }

                var left = 42 - arr.length;
                for ( i = 1; i <= left; i++ ) {
                    arr.push( {
                        text: i,
                        status: "calendar-next-month",
                        month: 1
                    } );
                }
                return arr;
            }
        },
        watch: {
            current ( val ) {
                let t = new Date( val );
                this.year = t.getFullYear();
                this.month = t.getMonth() + 1;
                this.day = t.getDate();

                if ( this.timepicker ) {
                    var hour = t.getHours();
                    var minute = t.getMinutes();
                    this.hour = (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute);
                }
            }
        },
        methods: {
            init () {
                this.bShowPicker = true;
            },
            selectYear ( y ) {
                this.year = y;
                this.bShowYears = false;
            },
            selectMonth ( m ){
                this.month = m;
                this.bShowMonths = false;
            },
            selectDay ( i, j ) {
                for ( var m = 0; m < 42; m++ ) {
                    var day = this.days[ m ];
                    if ( day.month === 0 && day.text === this.day ) {
                        day.status = "";
                    }
                }

                var d = this.days[ (i - 1) * 7 + (j - 1) ];
                d.status = "focus";
                this.day = d.text;
                if ( d.month === -1 ) this.prevMonth();
                if ( d.month === 1 ) this.nextMonth();

                if ( !this.timepicker ) this.bShowPicker = false;
            },
            selectHour ( time ) {
                this.hour = time;
                this.bShowPicker = false;
            },
            prevMonth () {
                if ( this.month === 1 ) {
                    if ( this.year === minYear ) return;
                    this.month = 12;
                    this.year--;
                } else {
                    this.month--;
                }
            },
            nextMonth () {
                if ( this.month === 12 ) {
                    if ( this.year === maxYear ) return;
                    this.month = 1;
                    this.year++;
                } else {
                    this.month++;
                }
            }
        },
        created () {
            var t = this.current ? new Date( this.current ) : today;

            this.interval = this.interval || 1;
            this.year = t.getFullYear();
            this.month = t.getMonth() + 1;
            this.day = t.getDate();

            if ( this.timepicker ) {
                if ( this.current ) {
                    var hour = t.getHours();
                    var minute = t.getMinutes();
                    this.hour = (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute);
                }
                this.times = getTimeArray( this.interval );
            }
        }
    }
</script>
