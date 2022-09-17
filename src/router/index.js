import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    // 登录页面
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    // 管理端路由规则
    path: '/index',
    component: () => import('@/views/Index'),
    children: [

    ]
  },
  {
    // 学生端路由规则
    path: '/student',
    // name: 'StudentIndex',
    component: () => import('@/views/StudentIndex'),
    children: [
      {path: '', component: () => import('@/components/student/myExam')}
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
