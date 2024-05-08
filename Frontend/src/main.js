import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import router from './router/router'
import App from './App.vue'


const app = createApp(App)
const pinia = createPinia()

pinia.use(({store}) => {
    store.$router = markRaw(router)
})

app
.use(bootstrap)
.use(pinia)
.use(router)
.mount('#app')



