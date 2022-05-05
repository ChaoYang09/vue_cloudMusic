import get from '@/service/get'

export const getAlbumDetail = (id) => get('/album', { id })

// 获取歌手Mv
export const getArtistMv = (id) => get('/artist/mv', { id })
