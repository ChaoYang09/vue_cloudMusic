import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* 引入公共js*/
import common from '@/utils/common'
Vue.prototype.common = common

Vue.prototype.$bus = new Vue()

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

import Scroll from './components/Scroll.vue'
Vue.component('Scroll', Scroll)

// import './plugins/element.js'
// 引入全局样式
import './css/global.css'
import './css/customize.css'
import './css/magic_element.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 注册全局组件
import Collect from './components/button/Collect.vue'
Vue.component('CollectButton', Collect)
import Comment from './components/comment/Comment_item.vue'
Vue.component(Comment)

// import playMusic from './utils/playMusic.js'
// Vue.prototype.$play = playMusic
import { Message } from 'element-ui'
Vue.prototype.$message = Message

import './assets/icons/iconfont.js'

// 配置全局axios
import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL = 'http://localhost:3000'
// 使用withCredentials属性，当该属性为true时，会携带用户凭证
axios.defaults.withCredentials = true
import { Loading } from 'element-ui'

Vue.prototype.$http = axios
let loadingInstance
// NProgress.start()
// console.log(config)
// config.headers.Authorization = window.sessionStorage.getItem('token')
axios.interceptors.request.use((config) => {
  loadingInstance = Loading.service({
    lock: true,
    text: '载入中...',
    spinner: 'el-icon-loading',
    background: 'rgba(255,255,255,0)',
  })
  return config
})
//   NProgress.done()
axios.interceptors.response.use((config) => {
  // $nextTick(() => {
  // 以服务的方式调用的 Loading 需要异步关闭
  // setTimeout(() => {
  loadingInstance.close()
  // }, 1000)
  // })
  return config
})

// 媒体时间格式化
Vue.filter('timeFormat', function (originVal) {
  const date = new Date(originVal)
  const mm = (date.getMinutes() + '').padStart(2, '0')
  const ss = (date.getSeconds() + '').padStart(2, '0')
  return `${mm}:${ss}`
})
//媒体播放量格式化
Vue.filter('playCountFormat', function (originVal) {
  if (originVal > 10000) {
    return Math.floor(originVal / 10000) + '万'
  }
  return originVal
})
// 媒体时间格式化
Vue.filter('dateFormat', function (originVal) {
  const date = new Date(originVal)
  const yy = date.getFullYear()
  const mm = (date.getMonth() + '').padStart(2, '0')
  const dd = (date.getDate() + '').padStart(2, '0')
  return `${yy}-${mm}-${dd}`
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
// export default Vue
