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
    /*歌曲*/ case 0:
      return get('/comment/music', { id, type, limit, offset })
    /*mv*/ case 1:
      return get('/comment/mv', { id, type, limit, offset })
    /*歌单*/ case 2:
      return get('/comment/playlist', { id, type, limit, offset })
    /*专辑*/ case 3:
      return get('/comment/album', { id, type, limit, offset })
    /*电台*/ case 4:
      return get('/comment/dj', { id, type, limit, offset })
    /*视频*/ case 5:
      return get('/comment/video', { id, type, limit, offset })
  }
}
// 评论点赞
export const likeComment = ({ id, cid, type, t }) =>
  get('/comment/like', { id, cid, type, t })

// 发送/删除评论

/* t:0 删除 1 发送, 2 回复*/
export const comment = ({ t, type, id, content, commentId }) =>
  get('/comment', { t, type, id, content, commentId })
