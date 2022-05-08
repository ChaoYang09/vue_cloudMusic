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
    if (store.state.isPlayerShow === true)
      store.commit('setIsPlayerShow', false)
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
    // console.log(store.isPlayerShow)
    if (store.state.isPlayerShow === true)
      store.commit('setIsPlayerShow', false)
  },
  // 前往电台页面
  toDjList(id) {
    router.push({
      path: `/djList/${id}`,
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
      artists: song.ar, //歌手名字
      picUrl: song.al.picUrl, //歌曲封面
      album: song.al,
      like: store.state.likeIds.includes(song.id),
    }
    store.commit('setMusicInfo', musicObj)
    store.dispatch('getLyric', song.id)
    store.commit('setPlayingState', true)
    store.commit('toggleCover', true)
    Vue.nextTick(() => {
      store.state.audioRef.play()
    })
  },
  // 播放电台节目
  playProgram(song) {
    store.commit('setCurrentSong', song)
    // this.toList()
    store.state.playBarRef.style.transform = 'rotate(5deg)'
    store.state.playBarRef.style.transition = 'all 0.5s ease'
    const musicObj = {
      id: song.mainSong.id, //歌曲id
      name: song.mainSong.name, //歌曲名字
      artists: song.mainSong.ar, //歌手名字
      picUrl: song.coverUrl, //歌曲封面
      album: song.mainSong.album,
    }
    store.commit('setMusicInfo', musicObj)
    // store.dispatch('getLyric', song.id)
    store.commit('setPlayingState', true)
    store.commit('toggleCover', true)
    Vue.nextTick(() => {
      store.state.audioRef.play()
    })
  },
}
