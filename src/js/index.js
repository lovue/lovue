new Vue( {
    el: "#app",
    data: {
        diploma: {
            chuzhong: "初中",
            gaozhong: "高中",
            benke: "本科",
            shuoshi: "硕士",
            boshi: "博士"
        }
    },
    methods: {
        alertOne () {
            this.$refs.alert.show('这是提示内容')
        },
        alertTwo () {
            this.$refs.alert.show({
                text: "这是提示内容",
                type: "confirm"
            })
        }
    }
} )
