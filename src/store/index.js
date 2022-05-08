import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { getLikeList } from '@/api/music'

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
      artists: '', //歌手名字
      picUrl: '', //歌曲封面
      album: '', //专辑
      like: '', //收藏歌曲
    },
    lyric: '', //歌词
    playlist: [], // 播放列表数据
    isCoverShow: false, //导航栏中左下角的img显示和隐藏
    playMode: 1, // 播放模式
    loopPlay: false, //循环播放
    offset: 0, //分页
    likeIds: [], //我喜欢的音乐id
    uid: null, //用户id
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
    setIsPlayerShow(state, boolean) {
      state.isPlayerShow = boolean
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
    setPlayMode(state, mode) {
      state.playMode = mode
    },
    setLoopPlay(state) {
      state.loopPlay = !state.loopPlay
    },
    setOffset(state, offset) {
      state.offset = offset
    },
    setLikeIds(state, ids) {
      state.likeIds = ids
    },
    setUserId(state, id) {
      state.uid = id
    },
    upDataLikeState(state, boolean) {
      state.music.like = boolean
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
    },
    // 获取我的喜欢歌曲id
    async getLikeIds(context, uid) {
      const res = await getLikeIds(uid)
      context.commit('setLikeIds', res.ids)
      // this.likeList = res.ids
    },
  },
  getters: {},
})

export default store
