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

router.afterEach((to, from) => {
  const toDepth = to.path.split('/').filter((fragment) => fragment.length !== 0).length
  const fromDepth = from.path.split('/').filter((fragment) => fragment.length !== 0).length
  to.meta.transition =
    toDepth < fromDepth ? 'route-transition-slide-right' : 'route-transition-slide-left'
})

createApp(App).use(router).mount('#app')
