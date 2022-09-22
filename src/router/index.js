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
      {path: '', component: () => import('@/components/student/myExam')},
      {path: '/startexam', component: () => import('@/components/student/startExam')},
      {path: '/manager', component: () => import('@/components/student/manager')}
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 访问控制
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if ((to.path === '/student' || to.path === '/index') && !token) {
    next('/login')
  }else {
    next()
  }
})

export default router
