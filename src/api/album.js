import get from '@/service/get'
// 获取专辑信息
export const getAlbumDetail = (id) => get('/album', { id })

// 获取专辑动态信息
export const getAlbumDetailDynamic = (id) =>
  get('/album/detail/dynamic', { id })
// 获取已收藏专辑列表
export const getAlbumSubList = () =>
  get('/album/sublist', { timestamp: Date.now() })
// 收藏专辑
export const collectAlbum = ({ id, t }) => get('/album/sub', { id, t })
