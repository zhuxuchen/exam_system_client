import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from "axios";
import VueCookies from 'vue-cookies'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(VueCookies)
// axios.defaults.baseURL = 'http://localhost:8080'
app.config.globalProperties.$axios = axios

app.mount('#app')

