import get from '@/service/get'

// 收藏者
export const getPlayListSubscribers = (id) =>
  get('/playlist/subscribers', { id })
// 获取获取歌单所有歌曲
export const getPlaylists = (id) => get('/playlist/track/all', { id })
// 歌单详情
export const getPlaylistDetail = (id) => get('/playlist/detail', { id })
// 收藏歌单
export const collectPlaylist = ({ id, t }) =>
  get('/playlist/subscribe', { id, t })
