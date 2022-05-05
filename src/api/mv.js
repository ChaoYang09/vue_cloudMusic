import get from '@/service/get'
// 获取视频和Mv收藏Id
export const getMediaSubList = () => get('/mv/sublist')
// 获取Mv
export const getNewMv = ({ limit, area }) => get('/mv/first', { limit, area })
// 获取Mv详情信息
export const getMvDetail = (mvid) => get('/mv/detail', { mvid })
// 获取推荐Mv
export const getSimiMv = (mvid) => get('/simi/mv', { mvid })
// 获取Mv播放地址
export const getMvUrl = (id) => get('/mv/url', { id })
