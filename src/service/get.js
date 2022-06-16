import axios from 'axios'

axios.defaults.timeout = 10000
/* get请求，封装get方法 */
export default (url, params) =>
  axios
    .get(url, { params })
    .then((res) => res.data)
    .catch((err) => err)

// 配置请求根路径
axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'http://8.142.173.124:3000'
//
// 使用withCredentials属性，当该属性为true时，会携带用户凭证
axios.defaults.withCredentials = true
import Loading from 'element-ui/packages/loading'

// Vue.prototype.$http = axios
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
  // if (config.timeout === 10000) loadingInstance.close()

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
