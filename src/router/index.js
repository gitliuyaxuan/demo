// 配置路由

import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import Users from '@/components/users/Users'

// 安装插件
Vue.use(VueRouter)

// 创建路由实例 并导出
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/home',
      component: Home,
      name: 'home',
      // 子路由
      children: [
        { path: '/users', component: Users }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 登录拦截
  // 1 判断访问的是不是登录页面
  // 2 如果是 直接next() 方形
  // 3 如果不是 就判断没有登录
  // 4 如果没有登录 就跳转到登录页面 让用户登录
  // 5 如果登录了 就直接next() 方形
  if (to.path === '/login') {
    next()
    return
  }
  const token = localStorage.getItem('token')
  if (token) {
    // 登录
    next()
  } else {
    next('/login')
  }
})

export default router
