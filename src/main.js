import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'

import { Cascader, Popup, List, Loading, Sticky } from 'vant'

const app = createApp(App)

app.use(router)
app.use(Cascader)
app.use(Popup)
app.use(List)
app.use(Sticky)
app.use(Loading)
app.mount('#app')
