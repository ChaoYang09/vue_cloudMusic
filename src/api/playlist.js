import get from '@/service/get'

// 收藏者
export const getSubscribers = (id) => get('/playlist/subscribers', { id })
// 获取获取歌单所有歌曲
export const getPlaylists = (id) => get('/playlist/track/all', { id })
