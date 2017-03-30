import VueSelectCity from "./vue/SelectCity.vue"
import VueDatePicker from "./vue/DatePicker.vue"
import VueBeautyAlert from "./vue/BeautyAlert.vue"
import VueCrop from "./vue/Crop.vue"
import VueHtmlEditor from "./vue/HtmlEditor.vue"
import VuePureSelect from "./vue/PureSelect.vue"
import VueSearch from "./vue/Search.vue"
import VueTab from "./vue/Tab.vue"
import VueCarousel from "./vue/Carousel.vue"
import VueCollapse from "./vue/Collapse.vue"

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
    components: { VueSelectCity, VueDatePicker, VueBeautyAlert,
        VueCrop, VueHtmlEditor, VuePureSelect, VueSearch, VueTab,
        VueCarousel, VueCollapse },
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
