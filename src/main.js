import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import App2 from './App2.vue'
import router from './router'


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// createApp(App)
// 	.use(createPinia())
// 	.use(router)
// 	.use(ElementPlus)
// 	.mount('#app')


createApp(App2)
  .mount('#app2')
