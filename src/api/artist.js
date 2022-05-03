import get from '@/service/get'

export const getArtistSubList = () => get('/artist/sublist')

// 获取歌手Mv
export const getArtistMv = (id) => get('/artist/mv', { id })

// 获取歌手详情
export const getArtistDetail = (id) => get('/artist/detail', { id })
//获取相似歌手
export const getSimiArtists = (id) => get('/simi/artist', { id })
// 获取歌手50首热歌
export const getTopSongs = (id) => get('/artist/top/song', { id })
// 收藏歌手
export const collectArtist = ({ id, t }) => get('/artist/sub', { id, t })
