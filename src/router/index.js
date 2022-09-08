import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    // 学生端路由规则
    path: '/student',
    name: 'StudentIndex',
    component: () => import('@/views/StudentIndex')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
