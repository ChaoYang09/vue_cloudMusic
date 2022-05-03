import get from '@/service/get'
/*
0: 歌曲

1: mv

2: 歌单

3: 专辑

4: 电台

5: 视频*/

// 获取最热评论
export const getHotComment = ({ id, limit, type }) =>
  get('/comment/hot', { id, limit, type })

// 获取最新评论
export const getNewComment = ({ id, limit, type, offset }) => {
  switch (type) {
    case 0:
      return get('/comment/music', { id, type, limit })
    case 1:
      return get('/comment/mv', { id, type, limit })
    case 2:
      return get('/comment/playlist', { id, type, limit, offset })
    case 3:
      return get('/comment/album', { id, type, limit })
    case 4:
      return get('/comment/dj', { id, type, limit })
    case 5:
      return get('/comment/video', { id, type, limit })
  }
}
