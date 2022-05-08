<template>
  <div class="playerBox">
    <div class="playBoxMain">
      <div class="left">
        <!-- playBarSupport -->
        <img
          src="../assets/images/play-bar-support.png"
          alt=""
          class="play-bar-support"
        />
        <!-- playBar -->
        <transition name="rotate">
          <img
            src="../assets/images/play-bar.png"
            alt=""
            class="play-bar"
            ref="playBarRef"
          />
        </transition>

        <!-- <div :class="['coverBox', $store.state.playing ? 'ani' : 'pause']"> -->
        <div
          :class="{
            coverBox: true,
            ani: true,
            pause: !playing,
            run: playing,
          }"
        >
          <div class="cover">
            <img :src="music.picUrl" alt="" />
          </div>
        </div>
      </div>

      <div class="right">
        <header>
          <div class="title hidden-1">{{ music.name }}</div>
          <div class="mt-10 mb-20 flex">
            <!-- 专辑 -->
            <span class="gray" style="margin-right: 40px; width: 40%"
              ><span class="default">专辑 :</span
              ><span class="link" @click="common.toAlbumList(music.album.id)">
                {{ music.album.name }}</span
              >
            </span>
            <!-- 歌手 -->
            <span class="gray hidden-1"
              ><span class="default">歌手 :</span>
              <span
                class="artist-list pointer font-12"
                v-for="(item, i) in music.artists"
                :key="i"
              >
                <span class="pointer link" @click="common.toArtist(item.id)">{{
                  item.name
                }}</span>
              </span>
            </span>
          </div>

          <!-- {{ lrc }} -->
        </header>

        <!-- 歌词部分 -->
        <div class="lyric">
          <Scroll class="lyric-wrap" ref="lyricList" :data="currentLyric">
            <div class="content">
              <p
                v-for="(line, index) in currentLyric.lines"
                :key="index"
                ref="lyricLine"
                class="text gray"
                :class="{ current: currentLineNum === index }"
              >
                {{ line.txt }}
              </p>
            </div>
          </Scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lyric from 'lyric-parser'
import { mapState } from 'vuex'
import Scroll from './Scroll.vue'
export default {
  components: { Scroll },
  data() {
    return {
      // lrc: '',
      currentLyric: {},
      currentLineNum: 0,
    }
  },
  computed: {
    ...mapState([
      'playing',
      'currentTime',
      'progress',
      'isPlayerShow',
      'music',
      'lyric',
      'loopPlay',
    ]),
  },
  mounted() {
    // 将playBarRef ref对象存入vuex中
    this.$store.state.playBarRef = this.$refs.playBarRef

    this.$store.state.coverRef = this.$refs.coverRef
  },
  created() {
    // this.lrc = this.lyric
    this.getLyric()
  },
  methods: {
    // 监听歌词变化
    getLyric() {
      this.currentLyric = new Lyric(this.lyric, this.handleLyric)
      // console.log(this.currentLyric)
    },
    // currentLyric的回调函数
    handleLyric({ lineNum, txt }) {
      // console.log(lineNum + txt)
      this.currentLineNum = lineNum
      // 若当前行大于5,开始滚动,以保歌词显示于中间位置
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        // 结合better-scroll，滚动歌词
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
    },
  },
  watch: {
    lyric() {
      if (this.currentLyric) {
        this.currentLyric.stop()
      }
      this.$nextTick(() => {
        this.getLyric()
        this.currentLyric.play()
      })
    },
    // 歌词的滚动与暂停切换
    playing() {
      // console.log('0000')
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    // 歌曲进度条改变时 对应的歌词滚动也会改变
    progress() {
      if (this.currentLyric) {
        this.currentLyric.seek(Math.round(this.progress * 1000))
      }
    },
    // 循环播放时重置歌词
    loopPlay() {
      if (this.currentLyric) {
        this.currentLyric.stop()
      }
      this.$nextTick(() => {
        this.getLyric()
        this.currentLyric.play()
      })
    },
  },
}
</script>

<style lang="less" scoped>
.playerBox {
  display: flex;
  justify-content: center;
  // padding: 0 20px;
  position: fixed;
  z-index: 11;
  width: 100%;
  overflow: auto;

  height: 100%;
  // margin-top: 200px;
  background-color: #ffffff;
}
.playBoxMain {
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: center;
  // background-color: rgba(172, 231, 185, 0.959);s
}
.left {
  position: relative;
  width: 300px;
  .ani {
    animation: turn 35s linear infinite;
  }
  .pause {
    animation-play-state: paused;
  }
  .run {
    animation-play-state: running;
  }
  .play-bar-support {
    position: absolute;
    width: 30px;
    height: 30px;
    object-fit: cover;
    margin-top: -15px;
    z-index: 11;
  }
  .play-bar {
    position: absolute;
    left: 10px;
    width: 100px;
    height: 150px;
    transform: rotate(-30deg);
    transform-origin: 0 0;
    z-index: 10;
  }
  .coverBox {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 300px;
    height: 300px;
    border: 10px solid #efefef;
    border-radius: 50%;
    background-color: bisque;
    margin: 80px 0 0 -150px;
    background-color: #2d2d2f;
    .cover {
      // display: flex;
      // justify-content: center;
      // align-items: center;
      box-sizing: border-box;
      border: 5px solid #313636;
      width: 205px;
      height: 205px;
      border-radius: 50%;

      overflow: hidden;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        // transform: translate(-3%, -3%);
        object-fit: cover;
      }
    }
  }
}
.right {
  width: 300px;
  header {
    .title {
      font-size: 30px;
      margin-top: 40px;
    }
  }

  .lyric {
    width: 100%;

    .lyric-wrap {
      width: 100%;
      height: 350px;
      // background-color: burlywood;
      position: relative;
      mask-image: linear-gradient(
        180deg,
        hsla(0, 0%, 100%, 0) 0,
        hsla(0, 0%, 100%, 0.6) 15%,
        #fff 25%,
        #fff 75%,
        hsla(0, 0%, 100%, 0.6) 85%,
        hsla(0, 0%, 100%, 0)
      );
      overflow: hidden;
      .content {
        .text {
          // color: #666666;
          // display: inline-block;
          margin-bottom: 15px;
          font-size: 14px;
        }
        .current {
          color: #000000;
          font-weight: 600;
          font-size: 16px;
        }
      }
    }
  }
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
/*
      turn : 定义的动画名称
      1s : 动画时间
      linear : 动画以何种运行轨迹完成一个周期
      infinite :规定动画应该无限次播放
     */
@keyframes turn {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
