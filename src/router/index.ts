import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/components/layout/index.vue'
import Dashboard from '@/views/Dashboard.vue'
import LoginPage from '@/views/LoginPage.vue'

const routes = [
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router