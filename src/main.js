// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 导入路由配置
import router from './router'

// 导入element-ui
import ElementUI from 'element-ui'
// 导入element-ui的样式文件
import 'element-ui/lib/theme-chalk/index.css'
// 导入自己的样式
import './assets/css/index.css'
// 导入axios
import axios from 'axios'
// 将axios添加到vue的原型上
Vue.prototype.$http = axios
// 配置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'

// 请求拦截器
// 说明:因为只要是axios发送的请求 都会执行请求拦截器中的代码
// 所以 可以在请求拦截器中 一次性添加请求头
axios.interceptors.request.use(config => {
  // 同意添加Authorization请求头
  config.headers.Authorization = localStorage.getItem('token')
  return config
})

// 安装插件
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 关联
  router,
  components: { App },
  template: '<App/>'
})
