import get from '@/service/get'
import axios from 'axios'

// 用户详情
export const getUserDetail = (uid) =>
  get('/user/detail', { uid, timestamp: Date.now() })
export const getAccountInfo = (cookie) => get('/user/account', { cookie })
export const getUserInfo = () => get('/user/subcount')
// 获取用户歌单
export const getUserPlaylist = ({ uid, limit, offset }) =>
  get('/user/playlist', { uid, limit, offset, timestamp: Date.now() })

export const getPlaylist = (uid) => get('/user/playlist', { uid })

// 每日推荐
export const getDailySongs = () => get('/recommend/songs', {})
// 提交个人修改信息
export const editUserInfo = ({
  gender,
  birthday,
  nickname,
  province,
  city,
  signature,
}) =>
  get('/user/update', {
    gender,
    birthday,
    nickname,
    province,
    city,
    signature,
    timestamp: Date.now(),
  })

/* 更新用户头像 */
export const uploadAvatar = ({ data, imgSize }) =>
  axios({
    method: 'post',
    url: `/avatar/upload?imgSize=${imgSize}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  })
    .then((res) => res.data)
    .catch((err) => err)

export const getVisitor = () => get('/register/anonimous')

/* 二维码登录 */
// 获取二维码key
export const getQrKey = () => get('/login/qr/key', { timestamp: Date.now() })
// 生成二维码Base 64
export const createQr = (key, qrimg = true) =>
  get('/login/qr/create', { key, qrimg, timestamp: Date.now() })
// 轮询二维码状态 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
export const checkQr = (key) =>
  get('/login/qr/check', { key, timestamp: Date.now() })
