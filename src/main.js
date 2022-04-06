import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Scroll from './components/Scroll.vue'
Vue.component('Scroll', Scroll)

// import './plugins/element.js'
// 引入全局样式
import './css/global.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import { Message } from 'element-ui'
Vue.prototype.$message = Message

import './assets/icons/iconfont.js'

// 配置全局axios
import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL = 'http://localhost:3000'
// 使用withCredentials属性，当该属性为true时，会携带用户凭证
axios.defaults.withCredentials = true
Vue.prototype.$http = axios
// axios.interceptors.request.use((config) => {
// NProgress.start()
// console.log(config)
// config.headers.Authorization = window.sessionStorage.getItem('token')
// return config
// })

// axios.interceptors.response.use((config) => {
//   NProgress.done()
//   return config
// })

// 媒体时间格式化
Vue.filter('timeFormat', function (originVal) {
  const date = new Date(originVal)
  const mm = (date.getMinutes() + '').padStart(2, '0')
  const ss = (date.getSeconds() + '').padStart(2, '0')
  return `${mm}:${ss}`
})
//媒体播放量格式化
Vue.filter('playCountFormat', function (originVal) {
  if (originVal > 100000) {
    return Math.floor(originVal / 10000) + '万'
  }
  return originVal
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
