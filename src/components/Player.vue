<template>
  <div class="player-wrap">
    <div class="player-content">
      <div class="left">
        <div class="cover-wrap">
          <!-- playBarSupport -->
          <img
            src="../assets/images/play-bar-support.png"
            alt=""
            class="play-bar-support"
          />
          <!-- playBar -->

          <img
            src="../assets/images/play-bar.png"
            alt=""
            class="play-bar"
            ref="playBarRef"
          />

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
      </div>

      <div class="right" v-if="music.djId === 0">
        <header>
          <div class="title hidden-1">{{ music.name }}</div>
          <div class="mt-10 mb-20 flex" style="height: 40px; width: 100%">
            <!-- 专辑 -->
            <span class="gray hidden-1" style="margin-right: 30px; width: 50%"
              ><span class="default">专辑 :</span>
              <span class="link" @click="common.toAlbumList(music.album.id)">
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
        <div class="lyric" v-if="music.djId === 0">
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

      <!-- 电台 -->
      <div class="right" v-else>
        <header style="border-bottom: 1px solid #ddd">
          <div class="title hidden-1">{{ music.name }}</div>
          <div
            class="font-16 my-20 black pointer"
            @click="common.toArtistOrDj(music.artists[0].id)"
          >
            {{ music.artists[0].name }}
          </div>
        </header>
        <footer>
          <div class="sub-wrap font-12">
            <!-- 主播 -->
            <div class="sub-content">
              <span>主播: &nbsp;</span>
              <span class="link" @click="common.toUser(music.dj.user.userId)">
                {{ music.dj.user.nickname }}</span
              >
            </div>
            <!-- 来源 -->
            <div class="sub-content hidden-1">
              <span>来源: &nbsp;</span>
              <span
                class="pointer link"
                @click="common.toArtistOrDj(music.artists[0].id)"
                >{{ music.artists[0].name }}</span
              >
            </div>

            <!-- 创建时间 -->
            <div class="sub-content">
              <span>创建时间: &nbsp;</span>
              <span> {{ music.dj.createTime | dateFormat }}</span>
            </div>
            <!-- 已播放 -->
            <div class="sub-content">
              <span>已播放: &nbsp;</span>
              <span> {{ music.dj.listenerCount | playCountFormat }}次</span>
            </div>
          </div>
          <!-- 电台描述 -->
          <div class="describe-wrap">
            <p>{{ music.dj.description }}</p>
          </div>
        </footer>
      </div>
    </div>
    <div class="comment">
      <div class="mb-30">
        <span class="font-15 bold">评论</span
        ><span class="font-12 gray"> (已有{{ commentCount }}条评论)</span>
      </div>
      <Comment
        v-if="JSON.stringify(music) !== '{}'"
        :id="music.djId === 0 ? music.id : music.djId"
        :type="music.djId === 0 ? 0 : 4"
        @getCommentCount="getCommentCount"
      ></Comment>
    </div>
    <!-- <el-backtop :bottom="80" :right="20"></el-backtop> -->
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
      currentLyric: {},
      currentLineNum: 0,
      commentCount: 0, //评论数量
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
      'isProgram',
    ]),
  },
  mounted() {
    // 将playBarRef ref对象存入vuex中
    this.$store.state.playBarRef = this.$refs.playBarRef

    this.$store.state.coverRef = this.$refs.coverRef
  },
  created() {
    // this.lrc = this.lyric
    console.log(this.music)
    if (this.music.djId == 0) this.getLyric()
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
    getCommentCount(res) {
      // console.log(res)
      this.commentCount = res
    },
  },
  watch: {
    lyric() {
      if (this.currentLyric && this.music.djId == 0) {
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
      if (this.currentLyric && this.music.djId == 0) {
        this.currentLyric.togglePlay()
      }
    },
    // 歌曲进度条改变时 对应的歌词滚动也会改变
    progress() {
      if (this.currentLyric && this.music.djId == 0) {
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
.player-wrap {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  // padding: 0 20px;
  position: fixed;
  z-index: 11;
  width: 100%;
  // overflow: auto;
  overflow-y: auto;

  height: 100%;
  background-color: #ffffff;
}
.comment {
  width: calc(100vw - 80px);
  // margin: 0 60px;
  margin-bottom: 70px;
}
.player-content {
  width: 800px;
  height: 100%;
  display: flex;
  // justify-content: center;
  // background-color: rgba(172, 231, 185, 0.959);s
}
.left {
  width: 50%;
  display: flex;
  justify-content: center;
  // margin-right: -100px;
  .cover-wrap {
    position: relative;
  }
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
  width: 50%;
  header {
    .title {
      font-size: 23px;
      margin-top: 40px;
    }
  }
  footer {
    color: #7e7d7d;
    .sub-wrap {
      display: flex;
      flex-wrap: wrap;
      .sub-content {
        margin-top: 13px;
        width: 50%;
      }
    }
    .describe-wrap {
      margin-top: 25px;
      p {
        color: #7e7d7d;
        white-space: pre-line;
        height: calc(100vh - 340px);
        overflow-y: auto;
        // line-height: 25px;
        font-size: 14px;
      }
    }
  }
  .lyric {
    width: 100%;

    .lyric-wrap {
      width: 100%;
      height: 350px;
      // background-color: burlywood;
      // position: relative;
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
