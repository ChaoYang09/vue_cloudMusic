import Vue from 'vue'
import Vuex from 'vuex'

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
    // 当前播放歌曲
    currentSong: {},

    keyWords: '', //搜索关键词

    // 播放模式
    // playMode: playModeMap.sequence.code,
    // 播放列表显示
    isPlaylistShow: false,
    // 播放提示显示
    isPlaylistPromptShow: false,

    // 播放列表数据
    playlist: [],
    // 播放历史数据
    // playHistory: storage.get(PLAY_HISTORY_KEY, []),
    // 菜单显示
    isMenuShow: true,
  },
  mutations: {
    setPlayingState(state) {
      state.playing = !state.playing
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
  },
})

export default store
