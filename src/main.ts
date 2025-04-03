import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import TimerPage from './pages/TimerPage.vue'
import { createPinia } from 'pinia'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: TimerPage },
    { path: '/solves', component: () => import('./pages/SolvesPage.vue') }
  ]
})

router.afterEach((to, from) => {
  const toDepth = to.path.split('/').filter((fragment) => fragment.length !== 0).length
  const fromDepth = from.path.split('/').filter((fragment) => fragment.length !== 0).length
  to.meta.transition =
    toDepth < fromDepth ? 'route-transition-slide-right' : 'route-transition-slide-left'
})

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
