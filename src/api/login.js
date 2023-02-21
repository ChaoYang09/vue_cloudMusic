import get from '@/service/get'

// 手机登录
export const phoneLogin = ({ phone, password }) =>
  get('/login/cellphone', {
    phone,
    password,
    timestamp: Date.now(),
  })
export const getLoginState = (cookie) => get('/login/status', { cookie })
//获取验证码

export const getCaptcha = ({ phone }) => get('/captcha/sent')
//退出登录

export const loginOut = () => get('/logout')

//生成key
export const getQrKey = () => get('/login/qr/key', { timestamp: Date.now() })
//生成二维码图片
export const getQrImg = (key) =>
  get('/login/qr/create', { key, qrimg: true, timestamp: Date.now() })
// 检查扫码状态
export const getQrCheck = (key) =>
  get('/login/qr/check', { key, timestamp: Date.now() })
