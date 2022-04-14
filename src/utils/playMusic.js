// import store from './store'
// import Vue from '../main.js'
import store from '@/store/index.js'
export default {
  playMusic(song) {
    // console.log(song)
    const musicObj = {
      id: song.id, //歌曲id
      name: song.name, //歌曲名字
      arName: song.ar[0].name, //歌手名字
      picUrl: song.al.picUrl, //歌曲封面
    }
    store.commit('setMusicInfo', musicObj)
    store.dispatch('getLyric', song.id)
    store.commit('setPlayingState', true)
    this.$nextTick(() => {
      // console.log('1')
      store.state.audioRef.play()
    })

    // console.log(musicObj)
  },
}
