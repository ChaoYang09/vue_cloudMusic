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
        @click="isPlayerShow"
        v-show="isCoverShow"
      />

      <div v-show="isCoverShow">
        <span class="overHidden">{{ music.name }}</span
        ><span>{{ music.arName }}</span>
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
      <el-tooltip class="item" effect="dark" content="顺序播放" placement="top">
        <svg class="icon play-mode" aria-hidden="true">
          <use xlink:href="#icon-playlist1-copy"></use>
        </svg>
      </el-tooltip>

      <!-- <svg class="icon play-mode" aria-hidden="true">
        <use xlink:href="#icon-Loop"></use>
      </svg>
      <svg class="icon play-mode" aria-hidden="true">
        <use xlink:href="#icon-suijibofang"></use>
      </svg> -->
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
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
        popper-class="list-popover"
      >
        <div class="playlist-box">
          <!-- 头部区域 -->
          <header>
            <div class="mode-history">
              <span class="selected">播放列表</span><span>历史记录</span>
            </div>
            <div class="function">
              <span class="light-gray">总共{{ playlist.length }}首</span>
              <span class="clear-box" @click="clearPlaylist">
                <svg class="icon clear" aria-hidden="true">
                  <use xlink:href="#icon-shanchuDelete"></use>
                </svg>
                <span>清空</span>
              </span>
            </div>
          </header>
          <!-- 底部区域 -->
          <footer>
            <el-table
              :data="playlist"
              stripe
              size="mini"
              @row-dblclick="playMusic"
            >
              <el-table-column prop="name" width="180px" show-overflow-tooltip>
              </el-table-column>
              <!-- 歌手名字 -->
              <el-table-column
                prop="ar[0].name"
                width="110px"
                @click="toPlayer(val)"
                show-overflow-tooltip
              >
                <template v-slot="scope">
                  <router-link
                    class="router-link-active"
                    :to="{
                      path: '/player',
                      query: {
                        id: scope.row.ar[0].id,
                      },
                    }"
                    >{{ scope.row.ar[0].name }}</router-link
                  >
                </template>
              </el-table-column>
              <!-- 歌曲时间 -->
              <el-table-column>
                <template v-slot="scope">
                  {{ scope.row.dt | timeFormat }}
                </template>
              </el-table-column>
            </el-table>
            <!-- 播放列表没有数据时显示 -->
            <svg
              class="icon nothing"
              aria-hidden="true"
              v-show="playlist.length === 0"
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
    ></audio>
    <!-- <button @click="up">up</button> -->
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
    }
  },
  created() {
    // this.getSong()
    // this.init()
    // console.log(this.musicUrl)
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

    // 点击播放按钮
    playSong() {
      // this.clickPlayCount++
      this.setPlayingState(true)
      // this.setClickPlayCount()
      // console.log(this.clickPlayCount)
      // 播放与暂停图标的切换
      // this.playIsShow = !this.playIsShow
      this.$refs.audioRef.play()

      // 留声机杠杆的旋转与动画
      this.$store.state.playBarRef.style.transform = 'rotate(5deg)'
      this.$store.state.playBarRef.style.transition = 'all 0.5s ease'
    },

    // 点击暂停按钮
    pauseSong() {
      this.setPlayingState(false)
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
      // console.log(e)
      this.setCurrentTime(this.$refs.audioRef.currentTime)
      // console.log(this.currentTime)

      this.sliderSong = Math.round((this.currentTime / this.duration) * 700)
      // console.log(currentTime / this.duration)
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

    // 点击左下图片 控制plyer的显示与隐藏
    isPlayerShow() {
      // console.log(this.playing)
      // this.$store.state.playing = !this.$store.state.playing
      this.setIsPlayerShow()
    },
    // 前往歌手页面
    toPlayer() {
      // console.log('1')
      this.$router.push({
        path: '/player',
        query: {
          item,
        },
      })
    },
    // 点击删除 清空歌单列表所有数据
    clearPlaylist() {
      this.setPlaylist([])
      this.toggleCover(false)
    },
    //双击播放音乐
    playMusic(song) {
      this.setCurrentSong(song)
      // this.currentSong = song
      // console.log(this.currentSong)
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
      // console.log(111)
      if (this.playlist.length === 0) return

      if (this.currentSong.index === 1) {
        this.playMusic(this.playlist[this.playlist.length])
        return
      }
      this.playMusic(this.playlist[this.currentSong.index - 2])
    },
    // 下一首
    nextSong() {
      if (this.playlist.length === 0) return
      if (this.currentSong.index === this.playlist.length) {
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
      }
      .selected {
        background-color: #bbbbbb;
        color: #ffffff;
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
