import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from "axios";
import VueCookies from 'vue-cookies'
import mitt from 'mitt'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(VueCookies)
// axios.defaults.baseURL = 'http://localhost:8080'
app.config.globalProperties.$axios = axios
app.config.globalProperties.$bus = mitt()

app.mount('#app')

