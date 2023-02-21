import axios from 'axios'
import store from '../store'
// 配置请求根路径

const baseURL = 'http://43.139.26.63:3000'
// process.env.NODE_ENV === 'production'
//   ? 'http://43.139.26.63:3000'
// : 'http://localhost:3000'
//   http://43.139.26.63:3000
//   :

const instance = axios.create({
  baseURL,
  withCredentials: true,
  // headers: {
  //   Cookie: window.localStorage.getItem('Music_Cookie'),
  // },
})
instance.defaults.withCredentials = true

//
// 使用withCredentials属性，当该属性为true时，会携带用户凭证

// instance.defaults.timeout = 10000
/* get请求，封装get方法 */
export default (url, params = {}) => {
  params.cookie =
    'MUSIC_A_T=1467271603699; Max-Age=2147483647; Expires=Sat, 10 Mar 2091 17:23:17 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_SNS=; Max-Age=0; Expires=Mon, 20 Feb 2023 14:09:10 GMT; Path=/;MUSIC_R_T=1467281041467; Max-Age=2147483647; Expires=Sat, 10 Mar 2091 17:23:17 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_A_T=1467271603699; Max-Age=2147483647; Expires=Sat, 10 Mar 2091 17:23:17 GMT; Path=/wapi/clientlog; HTTPOnly;__csrf=62a21fd095a11fbfb4fc71c1e62eb293; Max-Age=1296010; Expires=Tue, 07 Mar 2023 14:09:20 GMT; Path=/;;MUSIC_R_T=1467281041467; Max-Age=2147483647; Expires=Sat, 10 Mar 2091 17:23:17 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_R_T=1467281041467; Max-Age=2147483647; Expires=Sat, 10 Mar 2091 17:23:17 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_R_T=1467281041467; Max-Age=2147483647; Expires=Sat, 10 Mar 2091 17:23:17 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_A_T=1467271603699; Max-Age=2147483647; Expires=Sat, 10 Mar 2091 17:23:17 GMT; Path=/api/feedback; HTTPOnly;MUSIC_R_T=1467281041467; Max-Age=2147483647; Expires=Sat, 10 Mar 2091 17:23:17 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_R_T=1467281041467; Max-Age=2147483647; Expires=Sat, 10 Mar 2091 17:23:17 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_A_T=1467271603699; Max-Age=2147483647; Expires=Sat, 10 Mar 2091 17:23:17 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_A_T=1467271603699; Max-Age=2147483647; Expires=Sat, 10 Mar 2091 17:23:17 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_A_T=1467271603699; Max-Age=2147483647; Expires=Sat, 10 Mar 2091 17:23:17 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_R_T=1467281041467; Max-Age=2147483647; Expires=Sat, 10 Mar 2091 17:23:17 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_A_T=1467271603699; Max-Age=2147483647; Expires=Sat, 10 Mar 2091 17:23:17 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_A_T=1467271603699; Max-Age=2147483647; Expires=Sat, 10 Mar 2091 17:23:17 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_R_T=1467281041467; Max-Age=2147483647; Expires=Sat, 10 Mar 2091 17:23:17 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_U=b59633638115012f5bbd76f486c4a7b0f2b715628f9f5641a8f6944de4dcd0021e8907c67206e1ed13fda9aa5d2be63ec87ba775283ab5177f3e69c309eb53bfba342ff811a16dcba0d2166338885bd7; Max-Age=15552000; Expires=Sat, 19 Aug 2023 14:09:10 GMT; Path=/; HTTPOnly;MUSIC_A_T=1467271603699; Max-Age=2147483647; Expires=Sat, 10 Mar 2091 17:23:17 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_A_T=1467271603699; Max-Age=2147483647; Expires=Sat, 10 Mar 2091 17:23:17 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_A_T=1467271603699; Max-Age=2147483647; Expires=Sat, 10 Mar 2091 17:23:17 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_R_T=1467281041467; Max-Age=2147483647; Expires=Sat, 10 Mar 2091 17:23:17 GMT; Path=/api/feedback; HTTPOnly;MUSIC_R_T=1467281041467; Max-Age=2147483647; Expires=Sat, 10 Mar 2091 17:23:17 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_R_T=1467281041467; Max-Age=2147483647; Expires=Sat, 10 Mar 2091 17:23:17 GMT; Path=/openapi/clientlog; HTTPOnly'

  // if (store.state.ip)
  // params.realIP = '116.25.146.177'
  return instance
    .get(url, {
      params,
    })
    .then((res) => res.data)
    .catch((err) => err)
}
// export const getIp = () => axios.get('http://43.139.26.63:3000/real')
