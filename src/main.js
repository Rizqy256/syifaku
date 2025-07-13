import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const pinia = createPinia()

// ✅ Sinkronisasi ulang user dari localStorage
pinia.use(({ store }) => {
  if (store.$id === 'user') {
    const userData = localStorage.getItem('user')
    if (userData) {
      store.currentUser = JSON.parse(userData)
    }
  }
})

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
