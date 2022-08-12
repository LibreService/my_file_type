import { createRouter, createWebHistory } from 'vue-router'
import MainView from './views/MainView.vue'
import ResultView from './views/ResultView.vue'

const routes = [
  { path: '/', name: 'Main', component: MainView },
  { path: '/result', name: 'Result', component: ResultView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
