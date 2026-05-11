import { createApp } from 'vue'
import App from './App.vue'
import router from './route.js' // Импортируем из твоего файла

const app = createApp(App)
app.use(router)
app.mount('#app')