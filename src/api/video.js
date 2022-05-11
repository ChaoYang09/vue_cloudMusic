import get from '@/service/get'

// 获取video详情信息
export const getVideoDetail = (id) => get('/video/detail', { id })

// 获取推荐video
export const getRelatedVideo = (id) => get('/related/allvideo', { id })
// 获取video播放地址
export const getVideoUrl = (id) => get('/video/url', { id })
// 收藏mv
export const collectVideo = ({ id, t }) => get('/video/sub', { id, t })
