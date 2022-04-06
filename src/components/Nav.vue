<template>
  <div class="box">
    <div class="left">
      <img
        class="pointer"
        src="../assets/images/2.jpg"
        alt=""
        @mouseenter="expandShow"
        @mouseleave="expandHidden"
        ref="imgFilter"
        @click="isPlayerShow"
      />
      <!-- <svg class="icon icon-open_in_full" aria-hidden="true" ref="expand">
        <use xlink:href="#icon-open_in_full"></use>
      </svg> -->
      <img
        src="../assets/images/expand.png"
        alt=""
        class="expand"
        ref="expand"
      />
      <div><span>[沈以诚]</span><span>沈以诚合唱合集</span></div>
    </div>

    <!-- 播放控件 -->
    <div class="middle">
      <svg class="icon red" aria-hidden="true">
        <use xlink:href="#icon-iov-pre"></use>
      </svg>

      <!-- 播放控件 -->
      <span class="playBox">
        <svg
          class="icon play"
          aria-hidden="true"
          v-show="playIsShow"
          @click="playSong"
        >
          <use xlink:href="#icon-play"></use>
        </svg>

        <!-- 暂停控件 -->
        <svg
          class="icon pause"
          aria-hidden="true"
          v-show="!playIsShow"
          @click="pauseSong"
        >
          <use xlink:href="#icon-pause"></use>
        </svg>
      </span>

      <svg class="icon red" aria-hidden="true">
        <use xlink:href="#icon-iov-next"></use>
      </svg>
    </div>

    <!-- 右侧控件 -->
    <div class="right">
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
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhankaimulu"></use>
      </svg>
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
      src="https://music.163.com/song/media/outer/url?id=1336856864.mp3 "
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
      playIsShow: true, //播放和暂停svg的切换
      duration: 0,
    }
  },
  created() {
    // this.getSong()
    // this.init()
  },

  computed: {
    ...mapState(['playing', 'currentTime', 'progress']),
  },
  methods: {
    ...mapMutations([
      'setPlayingState',
      'setCurrentTime',
      'setIsPlayerShow',
      'setProgress',
    ]),
    init() {
      this.duration = this.$refs.audioRef.duration
      // console.log()
      // this.sliderVolume = this.$refs.audioRef.volume * 100
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
      this.setPlayingState()
      // this.setClickPlayCount()
      // console.log(this.clickPlayCount)
      // 播放与暂停图标的切换
      this.playIsShow = !this.playIsShow
      this.$refs.audioRef.play()

      // 留声机杠杆的旋转与动画
      this.$store.state.playBarRef.style.transform = 'rotate(5deg)'
      this.$store.state.playBarRef.style.transition = 'all 0.5s ease'
    },

    // 点击暂停按钮
    pauseSong() {
      this.setPlayingState()
      this.playIsShow = !this.playIsShow
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
  },
}
</script>

<style lang="less" scoped>
.box {
  // position: relative;

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
