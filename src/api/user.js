import get from '@/service/get'

// 用户详情
export const getUserDetail = (uid) => get('/user/detail', { uid })
export const getAccountInfo = () => get('/user/account')
export const getUserInfo = () => get('/user/subcount')
// 获取用户歌单
export const getUserPlaylist = ({ uid, limit, offset }) =>
  get('/user/playlist', { uid, limit, offset })

export const getPlaylist = (uid) => get('/user/playlist', { uid })

// 每日推荐
export const getDailySongs = () => get('/recommend/songs', {})
