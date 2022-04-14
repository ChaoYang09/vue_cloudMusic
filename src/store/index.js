import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
  state: {
    currentTime: 0, // 当前播放时长
    playing: false, // 播放状态
    clickPlayCount: 0, //点击播放次数

    isPlayerShow: false, // 歌曲详情页显示
    progress: 0, //歌曲进度

    currentSong: {}, // 当前播放歌曲

    keyWords: '', //搜索关键词
    music: {
      id: 0, //歌曲id
      name: '', //歌曲名字
      arName: '', //歌手名字
      picUrl: '', //歌曲封面
    }, //歌曲id
    lyric: '', //歌词
    // 播放列表数据
    playlist: [],

    isCoverShow: false, //导航栏中左下角的img显示和隐藏
    // 播放模式
    // playMode: playModeMap.sequence.code,
    // 播放列表显示
    isPlaylistShow: false,
    // 播放提示显示
    isPlaylistPromptShow: false,

    // 播放历史数据
    // playHistory: storage.get(PLAY_HISTORY_KEY, []),
    // 菜单显示
    isMenuShow: true,
  },
  mutations: {
    setPlayingState(state, boolean) {
      state.playing = boolean
    },
    setCurrentTime(state, time) {
      state.currentTime = time
    },
    setClickPlayCount(state) {
      state.clickPlayCount += 1
    },
    setIsPlayerShow(state) {
      state.isPlayerShow = !state.isPlayerShow
    },
    setProgress(state, progress) {
      state.progress = progress
    },
    setMusicInfo(state, musicObj) {
      state.music = musicObj
    },
    setLyric(state, lrc) {
      state.lyric = lrc
    },
    setPlaylist(state, arr) {
      state.playlist = arr
      // console.log(arr)
    },
    toggleCover(state, boolean) {
      state.isCoverShow = boolean
      // console.log(arr)
    },
    setCurrentSong(state, SongObj) {
      state.currentSong = SongObj
    },
  },
  actions: {
    // 获取歌词
    async getLyric(context, id) {
      const { data: res } = await axios({
        method: 'get',
        url: '/lyric',
        params: {
          id: id,
        },
      })
      context.commit('setLyric', res.lrc.lyric)
      // state.lyric =
      // this.mv = res.data
      // console.log(state.lyric)
    },
  },
  getters: {},
})

export default store
