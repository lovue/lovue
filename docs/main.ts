import { createApp } from 'vue'
import App from './App.vue'
import lovue from '../src/index'

const app = createApp(App)
app.use(lovue)
app.mount('#app')
