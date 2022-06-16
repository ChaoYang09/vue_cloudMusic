import get from '@/service/get'

// 手机登录
export const phoneLogin = ({ phone, password }) =>
  get('/login/cellphone', { phone, password, timestamp: Date.now() })
//退出登录

export const loginOut = () => get('/logout')
