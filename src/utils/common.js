import Vue from 'vue'
import router from '../router'
import store from '../store'
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
  // 前往歌单页面
  toSongsList(id) {
    router.push({
      path: `/songLists/${id}`,
    })
  },
  // 前往专辑页面
  toAlbumList(id) {
    router.push({
      path: `/albumList/${id}`,
    })
  },
  // 前往用户页面
  toUser(id) {
    router.push({
      path: `/userInfo/${id}`,
    })
  },
  // 判断是去往Mv还是视频页面
  toMediaPlayer(type, id) {
    if (type === 0) this.toMvPlayer(id)
    else if (type === 1) this.toVideoPlayer(id)
    else return
  },
  // 播放音乐
  playMusic(song) {
    store.commit('setCurrentSong', song)
    // this.toList()
    store.state.playBarRef.style.transform = 'rotate(5deg)'
    store.state.playBarRef.style.transition = 'all 0.5s ease'
    const musicObj = {
      id: song.id, //歌曲id
      name: song.name, //歌曲名字
      arName: song.ar[0].name, //歌手名字
      picUrl: song.al.picUrl, //歌曲封面
    }
    store.commit('setMusicInfo', musicObj)
    store.dispatch('getLyric', song.id)
    store.commit('setPlayingState', true)
    store.commit('toggleCover', true)
    Vue.nextTick(() => {
      store.state.audioRef.play()
    })
    // console.log(store.state.music)
  },
  text() {
    console.log('测试，测试！！！')
  },
}
