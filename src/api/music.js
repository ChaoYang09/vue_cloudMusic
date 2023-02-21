import get from '@/service/get'

// 我的喜欢
export const getLikeList = (uid) =>
  get('/likelist', {
    uid,
    timestamp: Date.now(),
  })

// 喜欢歌曲
export const likeMusic = ({ id, like }) => get('/like', { id, like })

//获取歌曲详情
export const getSongDetail = (ids) => get('/song/detail', { ids })

export const getLyric = (id) => get('/lyric', { id })
