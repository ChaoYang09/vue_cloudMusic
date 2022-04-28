import get from '@/service/get'

// 用户详情
export const getUserDetail = (uid) => get('/user/detail', { uid })
export const getAccountInfo = () => get('/user/account')
export const getUserInfo = () => get('/user/subcount')
export const getPlaylist = (uid) => get('/user/playlist', { uid })
