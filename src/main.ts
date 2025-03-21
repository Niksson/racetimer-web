import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import TimerPage from './components/TimerPage.vue'
import SolvesPage from './components/SolvesPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: TimerPage },
    { path: '/solves', component: SolvesPage }
  ]
})

createApp(App).use(router).mount('#app')
