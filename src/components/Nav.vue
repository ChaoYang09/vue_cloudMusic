<template>
  <div class="box">
    <div class="left">
      <img
        class="pointer"
        :src="music.picUrl"
        alt=""
        @mouseenter="expandShow"
        @mouseleave="expandHidden"
        ref="imgFilter"
        @click="togglePlayerShow"
        v-show="isCoverShow"
      />

      <div v-show="isCoverShow">
        <div style="width: 150px">
          <span class="overHidden bold font-15">{{ music.name }}</span>
        </div>
        <span
          class="pointer overHidden"
          style="width: 150px"
          @click="toPlayer"
          >{{ music.arName }}</span
        >
      </div>
    </div>

    <!-- 播放控件 -->
    <div class="middle">
      <!-- 上一首 -->
      <svg class="icon red" aria-hidden="true" @click="previousSong">
        <use xlink:href="#icon-iov-pre"></use>
      </svg>

      <!-- 播放控件 -->
      <span class="playBox">
        <svg
          class="icon play"
          aria-hidden="true"
          v-show="!playing"
          @click="playSong"
        >
          <use xlink:href="#icon-play"></use>
        </svg>

        <!-- 暂停控件 -->
        <svg
          class="icon pause"
          aria-hidden="true"
          v-show="playing"
          @click="pauseSong"
        >
          <use xlink:href="#icon-pause"></use>
        </svg>
      </span>
      <!-- 下一首 -->
      <svg class="icon red" aria-hidden="true" @click="nextSong">
        <use xlink:href="#icon-iov-next"></use>
      </svg>
    </div>

    <!-- 右侧控件 -->
    <div class="right">
      <!-- 播放模式 -->
      <span @click="togglePlayMode">
        <el-tooltip
          class="item"
          effect="dark"
          content="顺序播放"
          placement="top"
        >
          <svg
            class="icon play-mode"
            aria-hidden="true"
            v-show="playMode === 1"
          >
            <use xlink:href="#icon-playlist1-copy"></use>
          </svg>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="循环播放"
          placement="top"
        >
          <svg
            class="icon play-mode"
            aria-hidden="true"
            v-show="playMode === 2"
          >
            <use xlink:href="#icon-Loop"></use>
          </svg>
        </el-tooltip>

        <el-tooltip
          class="item"
          effect="dark"
          content="随机播放"
          placement="top"
        >
          <svg
            class="icon play-mode"
            aria-hidden="true"
            v-show="playMode === 3"
          >
            <use xlink:href="#icon-suijibofang"></use>
          </svg> </el-tooltip
      ></span>

      <!-- 音量播放控件 -->
      <svg
        class="icon volume"
        aria-hidden="true"
        ref="volumeRef"
        v-show="volumeIsShow"
        @click="vIsShow"
      >
        <use xlink:href="#icon-volume "></use>
      </svg>
      <!-- 静音控件 -->
      <svg
        class="icon volume"
        aria-hidden="true"
        ref="volumeOffRef"
        v-show="!volumeIsShow"
        @click="vIsShow"
      >
        <use xlink:href="#icon-volume-off "></use>
      </svg>
      <!-- 音量播放控件 -->
      <el-slider
        v-model="sliderVolume"
        class="slider_volume"
        @change="volumeChange"
      ></el-slider>

      <!-- 播放列表 -->
      <el-popover
        placement="bottom"
        width="350"
        trigger="click"
        popper-class="list-popover"
        ref="popoverRef"
      >
        <div class="playlist-box">
          <!-- 头部区域 -->
          <header>
            <div class="mode-history">
              <span
                :class="{ selected: !isHistory, 'pointer-none': !isHistory }"
                @click="isHistory = false"
                >播放列表</span
              ><span
                :class="{ selected: isHistory, 'pointer-none': isHistory }"
                @click="isHistory = true"
                >历史记录</span
              >
            </div>
            <div class="function">
              <span class="light-gray"
                >总共 <span v-if="!isHistory">{{ playlist.length }}</span
                ><span v-else>{{ historyList.length }}</span
                >首</span
              >
              <span class="clear-box" @click="clearList">
                <svg class="icon clear" aria-hidden="true">
                  <use xlink:href="#icon-shanchuDelete"></use>
                </svg>
                <span>清空</span>
              </span>
            </div>
          </header>
          <!-- 底部区域 -->
          <footer>
            <!-- 播放列表 -->
            <el-table
              :data="playlist"
              stripe
              size="mini"
              @row-dblclick="playMusic"
              v-show="!isHistory"
            >
              <el-table-column prop="name" width="180px" show-overflow-tooltip>
              </el-table-column>
              <!-- 歌手名字 -->
              <el-table-column
                prop="ar[0].name"
                width="110px"
                show-overflow-tooltip
              >
                <template v-slot="scope">
                  <router-link
                    class="router-link-active"
                    :to="{
                      path: '/artist',
                      query: {
                        id: scope.row.ar[0].id,
                      },
                    }"
                    ><span @click="closeList">{{ scope.row.ar[0].name }}</span>
                  </router-link>
                </template>
              </el-table-column>
              <!-- 歌曲时间 -->
              <el-table-column>
                <template v-slot="scope">
                  {{ scope.row.dt | timeFormat }}
                </template>
              </el-table-column>
            </el-table>

            <!-- 历史记录 -->
            <el-table
              :data="historyList"
              stripe
              size="mini"
              @row-dblclick="playMusic"
              v-show="isHistory"
            >
              <el-table-column prop="name" width="160px" show-overflow-tooltip>
              </el-table-column>
              <!-- 歌手名字 -->
              <el-table-column
                prop="ar[0].name"
                width="100px"
                show-overflow-tooltip
              >
                <template v-slot="scope">
                  <router-link
                    class="router-link-active"
                    :to="{
                      path: '/artist',
                      query: {
                        id: scope.row.ar[0].id,
                      },
                    }"
                    ><span @click="closeList">{{ scope.row.ar[0].name }}</span>
                  </router-link>
                </template>
              </el-table-column>
              <!-- 歌曲时间 -->
              <el-table-column prop="time" width="90px">
                <!-- <template v-slot="scope">
                  {{ scope.row.dt | timeFormat }}
                </template> -->
              </el-table-column>
              <!-- 播放列表没有数据时显示 -->
            </el-table>
            <!-- 播放列表没有数据时显示 -->
            <svg
              class="icon nothing"
              aria-hidden="true"
              v-show="
                (playlist.length === 0 && isHistory === false) ||
                (historyList.length === 0 && isHistory === true)
              "
            >
              <use xlink:href="#icon-undraw_happy_music_g6wc "></use>
            </svg>
          </footer>
        </div>
        <!-- 播放列表图标 -->
        <svg class="icon pointer" aria-hidden="true" slot="reference">
          <use xlink:href="#icon-zhankaimulu"></use>
        </svg>
      </el-popover>
    </div>
    <!-- 音乐进度控件 -->
    <el-slider
      :max="700"
      :show-tooltip="false"
      v-model="sliderSong"
      class="slider_song"
      @change="songChange"
    ></el-slider>

    <!-- audio标签 -->
    <audio
      :src="musicUrl"
      ref="audioRef"
      @canplay="init"
      @timeupdate="updateTime"
      @ended="ended"
      @play="play"
    ></audio>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      // expand: false,
      sliderVolume: 70, //音量进度条
      sliderSong: 0, //歌曲进度条
      song: {},
      volumeIsShow: true, //音量和静音svg的切换
      volumeRecord: 0,
      // playIsShow: true, //播放和暂停svg的切换
      duration: 0,
      // currentSong: {}, //当前播放的歌曲
      isLoop: false,
      isHistory: false, //是否是历史模式
      historyList: [], //历史歌曲列表
    }
  },
  created() {
    const arr = window.localStorage.getItem('historyList')
    if (arr) {
      this.historyList = JSON.parse(arr)
    }
    // console.log(this.historyList)
  },
  mounted() {
    this.$store.state.audioRef = this.$refs.audioRef
  },
  computed: {
    ...mapState([
      'playing',
      'currentTime',
      'progress',
      'music',
      'playlist',
      'isCoverShow',
      'currentSong',
      'isPlayerShow',
      'playMode',
      'loopPlay',
    ]),
    musicUrl() {
      return `https://music.163.com/song/media/outer/url?id=${this.music.id}.mp3`
    },
  },
  methods: {
    ...mapMutations([
      'setPlayingState',
      'setCurrentTime',
      'setIsPlayerShow',
      'setProgress',
      'setPlaylist',
      'setMusicInfo',
      'toggleCover',
      'setCurrentSong',
      'setPlayMode',
      'setLoopPlay',
    ]),
    init() {
      this.duration = this.$refs.audioRef.duration
    },
    expandShow() {
      this.$refs.imgFilter.style.filter = 'blur(1px)'
      // this.$refs.expand.style.display = 'block'
    },
    expandHidden() {
      this.$refs.imgFilter.style.filter = ''
      // this.$refs.expand.style.display = ''
    },
    async getSong() {
      const { data: res } = await this.$http.get('/song/url', {
        params: {
          id: 1900923198,
        },
      })
      this.song = res.data
      // console.log(this.song)
    },
    // 删除列表歌曲
    clearList() {
      this.toggleCover(false)
      this.setPlayingState(false)
      // this.$refs.audioRef.currentTime = 0
      // this.$refs.audioRef.pause()
      this.setCurrentSong({})
      this.setMusicInfo({})
      if (this.isHistory) {
        // console.log(1111)
        this.historyList = []
        window.localStorage.removeItem('historyList')
      } else {
        this.setPlaylist([])
      }
    },

    // 点击播放按钮
    playSong() {
      if (JSON.stringify(this.currentSong) === '{}') return

      // if (this.playlist.length === 0) return
      // setTimeout(() => {
      this.setPlayingState(true)
      // }, 200)
      // 播放与暂停图标的切换
      // this.playIsShow = !this.playIsShow
      this.$refs.audioRef.play()
      // 留声机杠杆的旋转与动画
      this.$store.state.playBarRef.style.transform = 'rotate(5deg)'
      this.$store.state.playBarRef.style.transition = 'all 0.5s ease'
    },

    // 点击暂停按钮
    pauseSong() {
      // setTimeout(() => {
      this.setPlayingState(false)
      // }, 200)
      // this.playIsShow = !this.playIsShow
      this.$refs.audioRef.pause()
      this.$store.state.playBarRef.style.transform = 'rotate(-30deg)'
    },

    // 音量进度改变触发这个函数
    volumeChange(val) {
      this.$refs.audioRef.volume = val / 100
      // console.log(val)
      if (val === 0) {
        this.vIsShow()
        // this.$refs.audio.volume = 0
      }
      this.volumeIsShow = true
    },
    // 点击音量或者静音svg都会触发这个函数
    vIsShow() {
      // 显示音量svg时记录 volumeRecord
      if (this.volumeIsShow === true) {
        this.volumeRecord = this.sliderVolume
      }

      this.volumeIsShow = !this.volumeIsShow
      if (this.volumeIsShow === false) {
        this.sliderVolume = 0
        this.$refs.audioRef.volume = 0
      } else {
        this.sliderVolume = this.volumeRecord
        this.$refs.audioRef.volume = this.sliderVolume / 100
      }
    },
    // audio的播放进度发生变化时会触发这个函数
    updateTime() {
      this.setCurrentTime(this.$refs.audioRef.currentTime)
      this.sliderSong = Math.round((this.currentTime / this.duration) * 700)
      if ((this, this.playing)) this.setPlayingState(true)
    },

    // 切换播放模式
    togglePlayMode() {
      if (this.playMode === 3) {
        // console.log(this.playMode)
        this.setPlayMode(1)
        return
      }
      let count = this.playMode + 1

      // console.log(count++)
      this.setPlayMode(count)
    },
    // audio  顺序播放 播放下一首
    error() {
      console.log('error')
      // console.log('1');
    },
    // audio结束时的钩子
    ended() {
      if (this.playMode === 1) {
        this.nextSong()
      } else if (this.playMode === 2) {
        this.setLoopPlay()
        this.$refs.audioRef.play()
      } else if (this.playMode === 3) {
        this.randomPlay()
      }
    },
    // 随机播放
    randomPlay() {
      // const history = []
      const index = Math.floor(Math.random() * this.playlist.length)
      // history.push(index)
      this.playMusic(this.playlist[index])
    },
    // audio播放会触发这个函数
    play() {
      const res = this.historyList.some((item) => {
        return this.currentSong.id === item.id
      })
      // console.log(res)
      if (res) return
      const date = new Date()
      const y = date.getFullYear()
      const m = (date.getMonth() + 1 + '').padStart(2, '0')
      const d = (date.getDate() + '').padStart(2, '0')
      let time = `${y}-${m}-${d}`
      let song = this.currentSong
      song.time = time
      // console.log(song)
      this.historyList.unshift(song)
      window.localStorage.setItem(
        'historyList',
        JSON.stringify(this.historyList)
      )
    },
    // 歌曲进度改变触发这个函数
    songChange(val) {
      // console.log(val)
      // this.setCurrentTime()
      this.setProgress((val / 700) * this.duration)
      this.$refs.audioRef.currentTime = this.progress
      if (!this.playing) {
        this.playIsShow = !this.playIsShow

        this.$refs.audioRef.play()
        this.setPlayingState(this.playing)
      }
    },

    // 点击左下图片 控制player的显示与隐藏
    togglePlayerShow() {
      // console.log(this.playing)
      // this.$store.state.playing = !this.$store.state.playing
      // console.log(this.isPlayerShow)
      if (!this.isPlayerShow) {
        this.setIsPlayerShow(true)
      } else {
        this.setIsPlayerShow(false)
      }
    },
    // playlist前往歌手页后关闭popover
    closeList() {
      // this.toPlayer()
      this.$refs.popoverRef.doClose()
    },
    // 前往歌手页面
    toPlayer() {
      this.$router.push({
        path: '/artist',
        query: {
          id: this.$store.state.currentSong.ar[0].id,
        },
      })
      this.$store.commit('setIsPlayerShow', false)
    },

    async checkMusic(id) {
      // console.log(id)
      const { data: res } = await this.$http.get('/check/music', {
        params: {
          id: id,
        },
      })
      // console.log(res)
    },
    //双击播放音乐
    playMusic(song) {
      // this.checkMusic(song.id)
      this.setCurrentSong(song)
      // this.currentSong = song
      // console.log(song)
      const musicObj = {
        id: song.id, //歌曲id
        name: song.name, //歌曲名字
        arName: song.ar[0].name, //歌手名字
        picUrl: song.al.picUrl, //歌曲封面
      }
      this.setMusicInfo(musicObj)
      this.$store.dispatch('getLyric', song.id)
      this.setPlayingState(true)
      this.$nextTick(() => {
        this.$store.state.audioRef.play()
      })
    },
    // 上一首
    previousSong() {
      // if (JSON.stringify(this.currentSong) === '{}') return

      if (this.playlist.length === 0) return
      if (this.playing === false) this.setPlayingState(true)
      if (this.playMode === 3) this.randomPlay()

      if (this.currentSong.index === 0) {
        this.playMusic(this.playlist[this.playlist.length - 1])
        return
      }
      this.playMusic(this.playlist[this.currentSong.index - 1])
    },
    // 下一首
    nextSong() {
      // if (JSON.stringify(this.currentSong) === '{}') return
      if (this.playlist.length === 0) return
      if (this.playing === false) this.setPlayingState(true)
      if (this.playMode === 3) this.randomPlay()

      if (this.currentSong.index === this.playlist.length - 1) {
        this.playMusic(this.playlist[0])
        return
      }
      this.playMusic(this.playlist[this.currentSong.index + 1])
    },
  },
}
</script>
<style>
.list-popover {
  overflow: auto;
  height: 500px;
  /* overflow: hidden; */
  padding: 0 !important;
}
</style>

<style lang="less" scoped>
.nothing {
  margin: 40px 0 0 80px;
  width: 200px;
  height: 200px;
}
.playlist-box {
  position: absolute;
  font-size: 13px;
  header {
    width: 350px;
    z-index: 2;
    position: fixed;
    padding: 20px 20px 10px 20px;
    border-bottom: 1px solid rgb(237, 237, 237);
    background-color: #ffffff;
    .mode-history {
      margin: 0 auto;
      height: 30px;
      width: 200px;
      border: 1px solid #ccc;
      border-radius: 20px;
      display: flex;
      // justify-content: space-around;
      // overflow: hidden;
      justify-items: center;
      // align-items: center;
      span {
        cursor: pointer;
        line-height: 28px;
        height: 28px;
        width: 100px;
        border-radius: 20px;
        text-align: center;
      }
      span:hover {
        background-color: #f4f4f4;
        color: black;
      }
      .selected {
        background-color: #bbbbbb;
        color: #ffffff;
      }
      .pointer-none {
        pointer-events: none;
      }
    }
    .function {
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      .clear-box {
        cursor: pointer;
        .clear {
          font-size: 12px;
          margin-right: 5px;
        }
        .clear:hover {
          color: black;
        }
      }
    }
  }
  footer {
    // font-size: 10px;
    // position: absolute;
    margin-top: 70px;
  }
}
.box {
  min-width: 750px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left {
  width: 200px;
  display: flex;
  position: relative;
  img:nth-child(1) {
    position: relative;
    width: 45px;
    height: 45px;
    display: block;
    // width: 100%;
    // height: 100%;
    border-radius: 5px;
  }
  .expand {
    display: none;
    position: absolute;
    width: 40px;
    height: 40px;

    top: 3px;
    left: 3px;
  }

  // img:hover {

  //   filter: blur(1.3px);
  // }
  span {
    display: block;
    margin-left: 20px;
  }
  span:nth-child(2) {
    margin-top: 10px;
    font-size: 12px;
  }
}
.middle {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
  // background-color: aquamarine;
  .playBox {
    box-sizing: border-box;
    // padding-left: 5px;
    margin: 0 30px;
    display: inline-block;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: #ebebed;
  }
  .playBox:hover {
    background-color: #ddddde;
  }
  .red:hover {
    color: #ed6566;
  }
}
.right {
  display: flex;
  justify-content: end;
  align-items: center;
  width: 250px;
  .play-mode {
    cursor: pointer;
    // font-size: 12px;
    margin-right: 15px;
  }
  .play-mode:hover {
    color: #ed6566;
  }

  // background-color: bisque;
  .volume:hover {
    cursor: pointer;
    color: black;
    // background-color: black;
  }
  /deep/.el-slider__bar {
    background-color: #ff4e4e;
  }
  /deep/.el-slider__button {
    width: 10px;
    height: 10px;
    border: 2px solid #ff4e4e;
  }
}
.icon-open_in_full {
  display: none;
  position: absolute;
  margin: 5px;
  font-weight: lighter;
  color: #d4dddf;
  font-size: 25px;
}
.slider_volume {
  margin: 0 30px;
  display: inline-block;
  width: 100px;
}
.slider_song {
  width: 100%;
  position: absolute;
  top: -20px;
  left: 0;
  /deep/.el-slider__bar {
    height: 3px;
    background-color: #ff4e4e;
  }
  /deep/.el-slider__button {
    width: 7px;
    height: 7px;
    border: 2px solid #ff4e4e;
  }
  /deep/.el-slider__runway {
    height: 3px;
    margin: 18px 0;
  }
  /deep/.el-slider__button-wrapper {
    height: 34px;
  }
  /deep/.el-slider__button-wrapper {
    display: none;
  }
}
.pause {
  padding-top: 8px;
  font-size: 18px;
}
.play {
  padding-left: 5px;
}
</style>
