import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { getLikeList } from '@/api/music'
import createPersistedState from 'vuex-persistedstate'
import { getUserPlaylist } from '@/api/user'
import { getArtistSubList } from '@/api/artist'
import { getMediaSubList } from '@/api/mv'
import { getAlbumSubList } from '@/api/album'
import { getDjSubList } from '@/api/dj'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
  state: {
    isLogin: false, //登陆状态
    uid: null, //
    userInfo: {
      nickname: '',
      avatarUrl: '',
    }, //用户名和头像
    loginVisible: false, //登录对话框
    currentTime: 0, // 当前播放时长
    playing: false, // 播放状态
    clickPlayCount: 0, //点击播放次数
    isPlayerShow: null, // 歌曲详情页显示
    isAnimation: 0, //歌曲详情页显示才会触发结束动画
    progress: 0, //歌曲进度
    currentSong: {}, // 当前播放歌曲
    keyWords: '', //搜索关键词
    isProgram: false, //节目
    music: {
      id: 0, //歌曲id
      name: '', //歌曲名字
      artists: [
        {
          name: '',
          id: null,
        },
      ], //歌手信息

      picUrl: '', //歌曲封面
      album: '', //专辑
      like: '', //收藏歌曲
      djId: 0, //0 不是电台节目
      dj: {},
    },
    lyric: '', //歌词
    playlist: [], // 播放列表数据
    isCoverShow: false, //导航栏中左下角的img显示和隐藏
    playMode: 1, // 播放模式
    loopPlay: false, //循环播放
    offset: 0, //分页
    likeIds: [], //我喜欢的音乐id
    uid: null, //用户id
    page: 1,
    userPlaylists: [], //用户收藏歌单
    userCreatedLists: [], //用户创建歌单
    artists: [], //用户收藏的歌手
    videos: [], //用户收藏的视频
    albums: [], //用户收藏的专辑
    djRadios: [], //用户收藏的电台
  },
  mutations: {
    setLoginState(state, boolean) {
      state.isLogin = boolean
    },
    setUid(state, uid) {
      state.uid = uid
    },
    setUserInfo(state, obj) {
      state.userInfo = obj
    },
    setLoginVisible(state, boolean) {
      state.loginVisible = boolean
    },
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
    setIsProgram(state, boolean) {
      state.isProgram = boolean
    },
    setPageNum(state, page) {
      state.page = page
    },
    setUserPlaylists(state, lists) {
      state.userPlaylists = lists
    },
    setUserCreatedLists(state, lists) {
      state.userCreatedLists = lists
    },
    setUserAlbums(state, albums) {
      state.albums = albums
    },
    setUserArtists(state, artists) {
      state.artists = artists
    },
    setUserVideos(state, videos) {
      state.videos = videos
    },
    setUserDjRadios(state, djRadios) {
      state.djRadios = djRadios
    },
  },
  actions: {
    // 获取歌词
    async getLyric({ commit }, id) {
      const { data: res } = await axios({
        method: 'get',
        url: '/lyric',
        params: {
          id: id,
        },
      })
      if (res.code !== 200)
        return this.$message({
          dangerouslyUseHTMLString: true,
          message:
            ' <svg class="icon font-23 mr-15"><use xlink:href="#icon-roundclosefill" /></svg>获取歌词失败 !',
          center: true,
          duration: 1500,
        })
      commit('setLyric', res.lrc.lyric)
    },
    // 获取我的喜欢歌曲id
    async getLikeIds({ state, commit }) {
      const res = await getLikeIds(state.uid)
      if (res.code !== 200)
        return this.$message({
          dangerouslyUseHTMLString: true,
          message:
            ' <svg class="icon font-23 mr-15"><use xlink:href="#icon-roundclosefill" /></svg>获取喜欢ID失败 !',
          center: true,
          duration: 1500,
        })
      commit('setLikeIds', res.ids)
      // this.likeList = res.ids
    },
    // 获取User音乐列表
    async getPlaylist({ state, commit }) {
      if (!state.isLogin) return
      let count = 0
      const res = await getUserPlaylist({
        uid: state.uid,
        limit: 999,
        offset: 0,
      })
      if (res.code !== 200) return
      // console.log(res)
      res.playlist.forEach((item) => {
        if (item.creator.userId == state.uid) count++
      })
      // this.createdList =
      // this.createdList[0].name = this.createdList[0].name.replace(
      //   this.nickName,
      //   '我'
      // )
      // console.log(this.createdList)
      commit('setUserCreatedLists', res.playlist.splice(0, count))

      commit('setUserPlaylists', res.playlist)
      // this.playlist = res.playlist
      count = 0
    },
    async getArtist({ commit }) {
      const res = await getArtistSubList()
      if (res.code !== 200) return
      commit('setUserArtists', res.data)
      // this.artists = res.data
      // console.log(this.artists)
    },
    async getMv({ commit }) {
      const res = await getMediaSubList()
      if (res.code !== 200) return
      commit('setUserVideos', res.data)
      // this.videos = res.data
      // console.log(this.videos)
    },
    async getAlbum({ commit }) {
      const res = await getAlbumSubList()
      if (res.code !== 200) return
      commit('setUserAlbums', res.data)
      // this.albums = res.data
    },
    async getDjRadios({ commit }) {
      const res = await getDjSubList()
      if (res.code !== 200) return
      commit('setUserDjRadios', res.djRadios)
      // this.djRadios = res.djRadios
    },
  },
  getters: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      // 只存储state中的部分数据

      reducer(val) {
        return {
          isLogin: val.isLogin,
          uid: val.uid,
          userInfo: val.userInfo,
          userPlaylists: val.userPlaylists,
          userCreatedLists: val.userCreatedLists,
          likeIds: val.likeIds,
        }
      },
    }),
  ],
})

export default store
