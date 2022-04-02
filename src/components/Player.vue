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
            <img src="../assets/images/coverTest.jpg" alt="" />
          </div>
        </div>
      </div>

      <div class="right">
        <header>
          <span class="tittle">形容</span>
          <span class="name gray">歌手: 沈以诚</span>
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
      lrc: '[00:00.000] 作词 : 沈以诚\n[00:01.000] 作曲 : 沈以诚\n[00:02.000] 编曲 : 李星宇\n[00:03.000] 制作人 : 李星宇\n[00:04.000] 企划 : 小粉\n[00:05.000] 统筹 : 黄鲲\n[00:06.000] 监制 : moonik蛛蛛\n[00:07.000] 吉他 : 陈卉\n[00:08.000] 鼓 : 刘星星\n[00:09.000] 和声编写 : 李星宇\n[00:10.000] 和声 : 沈以诚/李星宇\n[00:11.000] 吉他录音 : 刘晶晶（TTL）\n[00:12.000] 鼓录音 : 李马科（RC）\n[00:13.000] 人声录音 : 大伟（上声）\n[00:14.000] 混音/母带 : 李马科（RC）\n[00:15.000] 封面设计 : 武中奇\n[00:25.639]就像是那 灰色天空中的小雨\n[00:31.638]下下停停 不动声色淋湿土地\n[00:36.140]尽管总是阴晴不定\n[00:38.887]但偶尔也会闪出星星\n[00:42.137]这都是形容你的眼睛\n[00:48.888]就像是那 古老城堡里的油画\n[00:54.638]突然抬头 定格在黄昏的晚霞\n[00:59.386]远看一片苍苍蒹葭\n[01:02.387]近处抚摸软似棉花\n[01:05.138]这都是形容你的长发\n[01:11.388]原谅我不可自拔\n[01:13.388]可能不经意看你一眼\n[01:15.890]百米冲刺都会停下\n[01:17.888]只恨科技不够发达\n[01:19.888]逆着时光回去陪你从小长大\n[01:23.637]风里还没有细沙\n[01:28.637]不切实际的想法\n[01:34.637]\n[01:58.137]就像是那 错综复杂的小枝丫\n[02:04.138]过去未来 冥冥中对悠长宿命微妙地潜移默化\n[02:09.888]很细腻 不年轻\n[02:12.637]想轻轻把它抚平\n[02:15.638]这是形容你的手掌心\n[02:20.638]原谅我不可自拔\n[02:22.884]可能不经意看你一眼\n[02:25.137]心里石头都会落下\n[02:27.134]只恨科技不够发达\n[02:29.384]逆着时光回去陪你从小长大\n[02:33.138]风里还没有细沙\n[02:38.138]地球还没有老化\n[02:43.887]原谅我不可自拔\n[02:45.887]可能不经意看你一眼\n[02:48.385]心里石头都会落下\n[02:50.389]只恨科技不够发达\n[02:52.389]逆着时光回去陪你从小长大\n[02:56.139]风里还没有细沙\n[03:01.139]不切实际的想法\n[03:07.137]原谅我不可自拔\n[03:09.137]可能不经意看你一眼\n[03:11.637]百米冲刺都会停下\n[03:13.388]只恨科技不够发达\n[03:15.638]逆着时光回去陪你从小长大\n[03:19.137]风里还没有细沙\n[03:24.389]地球还没有老化\n[03:30.388]不切实际的想法\n[98:59.710]本歌曲来自〖网易音乐人〗\n[98:59.720]10亿现金激励，千亿流量扶持！\n[98:59.729]合作：st399@vip.163.com\n',
      currentLyric: {},
      currentLineNum: 0,
    }
  },
  computed: {
    ...mapState(['playing', 'currentTime', 'progress', 'isPlayerShow']),
  },
  mounted() {
    // 将playBarRef ref对象存入vuex中
    this.$store.state.playBarRef = this.$refs.playBarRef

    this.$store.state.coverRef = this.$refs.coverRef
    this.getLyric()
  },
  created() {},
  methods: {
    // 监听歌词变化
    getLyric() {
      this.currentLyric = new Lyric(this.lrc, this.handleLyric)
      // console.log('1')

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
    // 歌词的滚动与暂停切换
    playing() {
      if (this.currentLyric) {
        // console.log(this.currentLyric)
        // if (this.playing) {
        this.currentLyric.togglePlay()
        // } else {
        //   this.currentLyric.stop()
        // }
      }
    },
    // 歌曲进度条改变时 对应的歌词滚动也会改变
    progress() {
      if (this.currentLyric) {
        this.currentLyric.seek(Math.round(this.progress * 1000))
        // console.log(Math.round(this.progress * 1000))
        // if (!this.playing) {
        //   this.currentLyric.togglePlay()
        // }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.playerBox {
  display: flex;
  justify-content: center;
  // padding: 0 20px;
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 300%;
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
      box-sizing: border-box;
      border: 5px solid #010202;
      width: 205px;
      height: 205px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
.right {
  width: 300px;
  header {
    span {
      display: block;
    }
    .tittle {
      font-size: 30px;
      margin-top: 40px;
    }
    .name {
      margin: 10px 0 30px 0;
    }
  }

  .lyric {
    width: 100%;
    // height: 2000px;
    // background-color: cadetblue;
    .lyric-wrap {
      width: 100%;
      height: 380px;
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
          font-size: 15px;
        }
        .current {
          color: #000000;
          font-weight: 600;
          font-size: 17px;
        }
      }
    }
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
