import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'

import { Cascader } from 'vant'
import { Popup } from 'vant'

const app = createApp(App)

app.use(router)
app.use(Cascader)
app.use(Popup)
app.mount('#app')
