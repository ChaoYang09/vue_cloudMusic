import get from '@/service/get'
// 获取视频和Mv收藏Id
export const getMediaSubList = () => get('/mv/sublist')
// 获取Mv
export const getNewMv = ({ limit, area }) => get('/mv/first', { limit, area })
