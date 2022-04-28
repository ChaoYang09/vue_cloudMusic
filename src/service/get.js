import axios from 'axios'
import Vue from 'vue'
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
axios.defaults.timeout = 10000
/* 项目大部分为get请求，封装一个统一的处理错误、传递参数和url的get方法 */
export default (url, params) =>
  axios
    .get(url, { params })
    .then((res) => res.data)
    .catch((err) => err)
