import VueSelectCity from "./vue/selectCity.vue"
import VueDatePicker from "./vue/datePicker.vue"
import VueBeautyAlert from "./vue/beautyAlert.vue"

new Vue( {
    el: "#app",
    components: { VueSelectCity, VueDatePicker, VueBeautyAlert },
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
