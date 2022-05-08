import get from '@/service/get'

// 手机登录
export const phoneLogin = ({ phone, password }) =>
  get('/login/cellphone', { phone, password })
