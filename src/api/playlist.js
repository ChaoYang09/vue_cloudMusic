import get from '@/service/get'

// 收藏者
export const getSubscribers = (id) => get('/playlist/subscribers', { id })
