import get from '@/service/get'
import axios from 'axios'
// 用户详情
export const getUserDetail = (uid) =>
  get('/user/detail', { uid, timestamp: Date.now() })
export const getAccountInfo = () => get('/user/account')
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
