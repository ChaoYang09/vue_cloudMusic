import get from '@/service/get'

// 获取video详情信息
export const getVideoDetail = (id) => get('/video/detail', { id })

// 获取推荐video
export const getRelatedVideo = (id) => get('/related/allvideo', { id })
// 获取video播放地址
export const getVideoUrl = (id) => get('/video/url', { id })
// 收藏mv
export const collectVideo = ({ id, t }) => get('/video/sub', { id, t })

// 获取视频标签
export const getVideoGroup = () => get('/video/group/list')
// 获取视频分类
export const getVideoCategory = () => get('/video/category/list')

// 获取视频
export const getVideos = ({ id }) => get('/video/group', { id })

// 获取全部视频
export const getAllVideos = () => get('/video/timeline/all')
