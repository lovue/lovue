<template>
    <div class="vue-tab">
        <div class="tabs" ref="tabs">
            <div class="tab" ref="tab" @click="setTab(0)">Tab1</div>
            <div class="tab" @click="setTab(1)">Tab2</div>
            <div class="tab" @click="setTab(2)">Tab3</div>
        </div>
        <div class="focus-line" :style="`left:${lineLeft}px;right:${lineRight}px`"></div>
    </div>
</template>

<script>
    var totalWidth = 0, tabWidth = 0;

    export default {
        data () {
            return {
                tabs: [],
                lineLeft: 0,
                lineRight: 0,
                index: 0
            }
        },
        methods: {
            setTab ( i ) {
                this.index = i;
                this.lineLeft = tabWidth * i;
                this.lineRight = totalWidth - tabWidth * (i + 1);
            }
        },
        mounted () {
            totalWidth = this.$refs.tabs.offsetWidth;
            tabWidth = this.$refs.tab.offsetWidth;
            this.lineRight = totalWidth - tabWidth;
        }
    }
</script>