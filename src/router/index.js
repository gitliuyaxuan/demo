// 配置路由

import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件
import Login from '@/components/login/Login'

// 安装插件
Vue.use(VueRouter)

// 创建路由实例 并导出
export default new VueRouter({
  routes: [{ path: '/login', component: Login }]
})
