import router from '../router'

export default {
  // 前往视频页面
  toVideoPlayer(id) {
    router.push({
      path: `/videoPlayer/${id}`,
    })
  },
  // 前往Mv页面
  toMvPlayer(id) {
    router.push({
      path: `/mvPlayer/${id}`,
    })
  },
  // 前往歌手页面
  toArtist(id) {
    router.push({
      path: '/artist',
      query: {
        id,
      },
    })
  },
  text() {
    console.log('测试，测试！！！')
  },
}
