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

      <div v-show="isCoverShow" class="ml-10" style="width: 150px">
        <div class="flex pointer">
          <div class="hidden-1 pointer font-15 mr-20" @click="togglePlayerShow">
            {{ music.name }}
          </div>
          <Love v-if="music.djId === 0" :scope="music"></Love>
        </div>

        <div class="hidden-1 mt-5">
          <span
            class="artist-list font-12"
            v-for="(item, i) in music.artists"
            :key="i"
          >
            <span class="pointer black" @click="common.toArtistOrDj(item)">{{
              item.name
            }}</span>
          </span>
        </div>
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
        width="400"
        trigger="click"
        popper-class="nav-popover"
        ref="navPopoverRef"
      >
        <div class="playlist-box">
          <!-- 头部区域 -->
          <header>
            <div class="mode-history border-line">
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
              highlight-current-row
              :data="playlist"
              stripe
              size="mini"
              :show-header="false"
              @row-dblclick="common.playMusic"
              v-show="!isHistory"
            >
              <!-- icon -->
              <el-table-column min-width="17">
                <template v-slot="scope">
                  <span v-if="scope.row.id === music.id">
                    <svg
                      class="icon netEase-red position"
                      aria-hidden="true"
                      style="font-size: 8px; top: 1px; right: 3px"
                      v-if="!playing"
                    >
                      <use xlink:href="#icon-pause1"></use>
                    </svg>
                    <svg
                      class="icon netEase-red position"
                      aria-hidden="true"
                      style="font-size: 6px; right: 2px"
                      v-else
                    >
                      <use xlink:href="#icon-triangle1"></use>
                    </svg>
                  </span>
                </template>
              </el-table-column>
              <!-- 标题 -->
              <el-table-column min-width="195" show-overflow-tooltip>
                <template v-slot="scope">
                  <List-title :scope="scope"></List-title>
                </template>
              </el-table-column>
              <!-- 歌手 -->
              <el-table-column
                min-width="120"
                label="歌手"
                show-overflow-tooltip
              >
                <template v-slot="scope">
                  <List-Artist :scope="scope"></List-Artist>
                </template>
              </el-table-column>

              <!-- 时长 -->
              <el-table-column
                label="时长"
                min-width="60"
                class-name="color-gray "
              >
                <template v-slot="scope">
                  <List-duration :scope="scope"></List-duration>
                </template>
              </el-table-column>
            </el-table>

            <!-- 历史记录 -->
            <el-table
              highlight-current-row
              :data="historyList"
              stripe
              size="mini"
              :show-header="false"
              @row-dblclick="common.playMusic"
              v-show="isHistory"
            >
              <!-- 标题 -->
              <el-table-column min-width="192" show-overflow-tooltip>
                <template v-slot="scope">
                  <List-title :scope="scope"></List-title>
                </template>
              </el-table-column>
              <!-- 歌手 -->
              <el-table-column
                min-width="120"
                label="歌手"
                show-overflow-tooltip
              >
                <template v-slot="scope">
                  <List-Artist :scope="scope"></List-Artist>
                </template>
              </el-table-column>

              <!-- 歌曲时间 -->
              <el-table-column min-width="90">
                <template v-slot="scope">
                  <span class="gray default">{{ scope.row.time }}</span>
                </template>
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
      :disabled="JSON.stringify(currentSong) === '{}' ? true : false"
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
import ListTitle from '@/components/musicList/List-title.vue'
import ListArtist from '@/components/musicList/List-artist.vue'
import ListDuration from '@/components/musicList/List-duration.vue'
import Love from '@/components/musicList/List-love.vue'
export default {
  components: { ListTitle, ListArtist, ListDuration, Love },
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
  watch: {
    likeIds() {
      this.upDataLikeState(this.likeIds.includes(this.music.id))
    },
    playing(newVal) {
      // console.log(newVal)
      if (newVal) {
        // this.$nextTick(() => {
        // this.$refs.audioRef.play()
        let playPromise = this.$refs.audioRef.play()
        if (playPromise) {
          playPromise
            .then(() => {
              this.$refs.audioRef.play()
            })
            .catch(() => {})
        }

        // 留声机杠杆的旋转与动画
        this.$store.state.playBarRef.style.transform = 'rotate(5deg)'
        this.$store.state.playBarRef.style.transition = 'all 0.5s ease'
      } else {
        this.$refs.audioRef.pause()

        this.$store.state.playBarRef.style.transform = 'rotate(-30deg)'
      }
    },
  },
  mounted() {
    this.$store.state.navPopoverRef = this.$refs.navPopoverRef
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
      'likeIds',
      'isProgram',
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
      'upDataLikeState',
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
      // this.setMusicInfo({})
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
    },

    // 点击暂停按钮
    pauseSong() {
      // setTimeout(() => {
      this.setPlayingState(false)
      // }, 200)
      // this.playIsShow = !this.playIsShow
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
    error(err) {
      // console.log(err)
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
      this.common.playMusic(this.playlist[index])
    },
    // audio播放会触发这个函数
    play() {
      const res = this.historyList.some((item) => {
        return this.currentSong.id === item.id
      })
      if (res) return
      const date = new Date()
      const y = date.getFullYear()
      const m = (date.getMonth() + 1 + '').padStart(2, '0')
      const d = (date.getDate() + '').padStart(2, '0')
      let time = `${y}-${m}-${d}`
      let song = this.currentSong
      song.time = time
      this.historyList.unshift(song)
      window.localStorage.setItem(
        'historyList',
        JSON.stringify(this.historyList)
      )
    },
    // 歌曲进度改变触发这个函数
    songChange(val) {
      this.setProgress((val / 700) * this.duration)
      this.$refs.audioRef.currentTime = this.progress
      if (!this.playing) {
        this.playIsShow = !this.playIsShow
        // this.$refs.audioRef.play()
        this.setPlayingState(true)
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
      this.$refs.Nav.doClose()
    },

    async checkMusic(id) {
      // console.log(id)
      const { data: res } = await this.$http.get('/check/music', {
        params: {
          id: id,
        },
      })
    },
    // 上一首
    previousSong() {
      // if (JSON.stringify(this.currentSong) === '{}') return

      if (this.playlist.length === 0) return
      if (this.playing === false) this.setPlayingState(true)
      if (this.playMode === 3) this.randomPlay()

      if (this.currentSong.index === 0) {
        this.common.playMusic(this.playlist[this.playlist.length - 1])
        return
      }
      this.common.playMusic(this.playlist[this.currentSong.index - 1])
    },
    // 下一首
    nextSong() {
      // if (JSON.stringify(this.currentSong) === '{}') return
      if (this.playlist.length === 0) return
      if (this.playing === false) this.setPlayingState(true)
      if (this.playMode === 3) this.randomPlay()

      if (this.currentSong.index === this.playlist.length - 1) {
        this.common.playMusic(this.playlist[0])
        return
      }
      this.common.playMusic(this.playlist[this.currentSong.index + 1])
    },
  },
}
</script>
<style>
.nav-popover {
  top: -10px !important;
  /* right: 10px !important; */
  /* overflow: auto; */
  height: calc(100% - 60px);
  overflow: hidden;
  padding: 0 !important;
  /* overflow-x: hidden; */
}
</style>

<style lang="less" scoped>
.nothing {
  margin: 40px 0 0 80px;
  width: 200px;
  height: 200px;
}
.playlist-box {
  height: 100%;
  position: absolute;
  font-size: 13px;
  header {
    width: 400px;
    z-index: 2;
    position: fixed;
    padding: 20px 20px 10px 20px;
    border-bottom: 1px solid rgb(237, 237, 237);
    background-color: #ffffff;
    .mode-history {
      margin: 0 auto;
      height: 30px;
      width: 200px;
      // border: 1px solid #ccc;
      border-radius: 20px;
      display: flex;
      justify-items: center;
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
    margin-top: 102px;
    height: calc(100% - 102px);
    overflow-y: scroll;
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
  align-items: center;
  img {
    width: 45px;
    height: 45px;
    display: block;
    border-radius: 5px;
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
  /deep/.el-slider__runway {
    height: 4px;
  }
  /deep/.el-slider__bar {
    height: 3px;
  }
  /deep/.el-slider__button-wrapper {
    top: -16px;
  }
}
.slider_song {
  height: 0;
  width: 100%;
  position: absolute;
  top: -19px;
  left: 0;
  /deep/.el-slider__bar {
    height: 2px;
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

.artist-list {
  &::after {
    display: inline;
    margin: 5px;
    content: '/';
  }
  &:last-child::after {
    content: '';
  }
}
.el-table {
  font-size: 12px !important;
}
</style>
