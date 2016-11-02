<template>
    <div class="vue-tab">
        <div class="tabs" ref="tabs">
            <div class="tab" ref="tab" @click="setTab(0)">Tab1</div>
            <div class="tab" @click="setTab(1)">Tab2</div>
            <div class="tab" @click="setTab(2)">Tab3</div>
        </div>
        <div class="focus-line" :style="lineStyle"></div>
    </div>
</template>

<script>
    var totalWidth = 0, tabWidth = 0;

    export default {
        data () {
            return {
                tabs: [],
                lineStyle: "",
                index: 0
            }
        },
        methods: {
            setTab ( i ) {
                if (this.index === i) return;

                this.lineStyle = {
                    left: tabWidth * i + "px",
                    right: (totalWidth - tabWidth * (i + 1)) + "px",
                    transition: this.index < i
                        ? "left .3s ease-out .09s, right .3s ease-out"
                        : "left .3s ease-out, right .3s ease-out .09s"
                };
                this.index = i;
            }
        },
        mounted () {
            totalWidth = this.$refs.tabs.offsetWidth;
            tabWidth = this.$refs.tab.offsetWidth;
            this.lineStyle = {
                left: 0,
                right: (totalWidth - tabWidth) + "px"
            };
        }
    }
</script>