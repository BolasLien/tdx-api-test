import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


const vue = createApp(App)
vue.use(VueAxios, axios)

vue.mount('#app')