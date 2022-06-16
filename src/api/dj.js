import get from '@/service/get'

// 收藏者
export const getDjSubscribers = (id) => get('/dj/subscriber', { id })
// 获取获取歌单所有歌曲
export const getDjLists = ({ rid, limit, offset, asc }) =>
  get('/dj/program', { rid, limit, offset, asc })
// 电台详情
export const getDjDetail = (rid) => get('/dj/detail', { rid })
// 收藏的电台
export const getDjSubList = () => get('dj/sublist', { timestamp: Date.now() })
// 收藏电台
export const collectDj = ({ rid, t }) => get('/dj/sub', { rid, t })
