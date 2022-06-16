import get from '@/service/get'

// 收藏者
export const getPlayListSubscribers = (id) =>
  get('/playlist/subscribers', { id })
// 获取获取歌单所有歌曲
export const getPlaylists = (id) =>
  get('/playlist/track/all', { id, timestamp: Date.now() })
// 歌单详情
export const getPlaylistDetail = (id) => get('/playlist/detail', { id })
// 收藏歌单
export const collectPlaylist = ({ id, t }) =>
  get('/playlist/subscribe', { id, t, timestamp: Date.now() })

// 获取精选歌单 ( 网友精选碟 )
export const getTopPlayList = ({ cat }) => get('/top/playlist', { cat })

// 获取banner
export const getBanners = () => get('/banner')

// 获取推荐歌单
export const getPersonalized = () => get('/personalized')
// 获取推荐歌单
export const getRecommendPlaylist = () => get('/recommend/resource')

// 获取精品歌单
export const getHighPlayList = ({ cat }) =>
  get('/top/playlist/highquality', { cat })

// 获取歌单tag
export const getTags = () => get('/playlist/catlist')
