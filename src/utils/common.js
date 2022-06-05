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
    if (store.state.isPlayerShow) store.commit('setIsPlayerShow', false)
    router.push({
      path: `/userInfo/${id}`,
    })
  },
  // 判断是去往Mv还是视频页面
  // toMediaPlayer(id) {
  //   if (type === 0) this.toMvPlayer(id)
  //   else if (type === 1) this.toVideoPlayer(id)
  //   else return
  // },
  // 播放音乐
  playMusic(song) {
    store.commit('setCurrentSong', song)
    // this.toList()
    var musicObj = {
      id: song.id, //歌曲id
      name: song.name, //歌曲名字
      artists: song.ar, //歌手名字
      picUrl: song.al.picUrl, //歌曲封面
      album: song.al,
      like: store.state.likeIds.includes(song.id),
      djId: song.djId,
      dj: {
        createTime: song.createTime,
        listenerCount: song.listenerCount,
        user: song.user,
        description: song.description,
      },
    }
    // console.log(musicObj)
    store.commit('setMusicInfo', musicObj)
    if (song.djId === 0) store.dispatch('getLyric', song.id)
    store.commit('setPlayingState', true)
    store.commit('toggleCover', true)
    Vue.nextTick(() => {
      store.state.audioRef.play()
    })
  },

  // 加工电台节目
  programFactory(item) {
    return {
      name: item.name,
      id: item.mainSong.id,
      ar: [
        {
          name: item.radio.name,
          id: item.radio.id,
          type: 'dj',
        },
      ],
      al: {
        picUrl: item.coverUrl,
      },
      dt: item.duration,
      picUrl: item.coverUrl, //歌曲封面
      album: item.mainSong.album,
      alia: [],
      mv: 0,
      sq: null,
      djId: item.id,
      createTime: item.createTime,
      listenerCount: item.listenerCount,
      user: {
        nickname: item.dj.nickname,
        userId: item.dj.userId,
      },
      description: item.description,
      serialNum: item.serialNum,
    }
  },
  // 判断去歌手页还是专辑页
  toArtistOrDj(music) {
    if (store.state.isPlayerShow) store.commit('setIsPlayerShow', false)
    // console.log(store.state.navPopoverRef)
    store.state.navPopoverRef.doClose()
    // console.log(item)
    music.type === 'dj' ? this.toDjList(music.id) : this.toArtist(music.id)
  },

  //  动画垂直滚动到页面指定位置

  scrollAnimation(currentY, targetY) {
    // 获取当前位置方法
    // const currentY = document.documentElement.scrollTop || document.body.scrollTop

    // 计算需要移动的距离
    let needScrollTop = targetY - currentY
    let _currentY = currentY
    setTimeout(() => {
      // 一次调用滑动帧数，每次调用会不一样
      const dist = Math.ceil(needScrollTop / 10)
      _currentY += dist
      window.scrollTo(_currentY, currentY)
      // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
      if (needScrollTop > 10 || needScrollTop < -10) {
        this.scrollAnimation(_currentY, targetY)
      } else {
        window.scrollTo(_currentY, targetY)
      }
    }, 1)
  },
}
