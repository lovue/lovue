import VueSelectCity from "./vue/selectCity.vue"
import VueDatePicker from "./vue/datePicker.vue"
import VueBeautyAlert from "./vue/beautyAlert.vue"
import VueCrop from "./vue/crop.vue"
import VueHtmlEditor from "./vue/htmlEditor.vue"
import VuePureSelect from "./vue/pureSelect.vue"

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
    components: { VueSelectCity, VueDatePicker, VueBeautyAlert, VueCrop, VueHtmlEditor, VuePureSelect },
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
