<template>
  <div class="main-box">
    <main>
      <div class="left">
        <div class="tittle-little pointer" @click="$router.back()">
          <span>
            <svg class="icon icon-arrow" aria-hidden="true">
              <use xlink:href="#icon-arrowleft1"></use></svg
          ></span>
          MV详情
        </div>
        <video
          autoplay
          :poster="detail.cover"
          :src="url"
          controls="controls"
          ref="videoRef"
          @play="play"
        ></video>
        <!-- 创作者区域 -->
        <div
          v-if="detail.artists"
          class="align-center mt-10"
          @click="common.toArtist(detail.artists[0].id)"
        >
          <img
            class="rounded-50 mr-10 pointer"
            style="width: 50px; height: 50px"
            :src="detail.artists[0].img1v1Url"
            alt=""
          />
          <span class="deep-gray pointer mr-10 font-13">{{
            detail.artists[0].name
          }}</span>
        </div>

        <div class="function-box">
          <div class="desc-box">
            <!-- 标题区 -->
            <div class="tittle pointer">
              <span class="tittle-max">{{ detail.name }}</span>
              <svg
                class="icon icon-down-up"
                aria-hidden="true"
                v-show="hidden"
                @click="hidden = false"
              >
                <use xlink:href="#icon-triangledownfill"></use>
              </svg>
              <svg
                class="icon icon-down-up"
                aria-hidden="true"
                v-show="!hidden"
                @click="hidden = true"
              >
                <use xlink:href="#icon-triangleupfill"></use>
              </svg>
            </div>

            <!-- detail -->
            <div>
              <!-- 发布日期 -->
              <span class="play light-gray">
                发布： {{ detail.publishTime | dateFormat }}
              </span>
              <!-- 播放数量 -->
              <span class="play light-gray">
                播放： {{ detail.playCount | playCountFormat }}
              </span>
            </div>

            <!-- 歌曲介绍 -->
            <p class="hidden-1-more desc" v-show="!hidden">
              {{ detail.desc }}
            </p>

            <Collect-Button
              :subCount="subCount"
              :id="mvid"
              :type="'mv'"
            ></Collect-Button>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="tittle-little">相关推荐</div>
        <div class="mv-recommend">
          <div
            class="mv-box"
            v-for="(item, i) in mv"
            :key="i"
            @click="mvid = item.id"
          >
            <img :src="item.cover" alt="" />
            <div>
              <span
                style="
                  overflow: hidden;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                  display: -webkit-box;
                "
                >{{ item.name }}</span
              >
              <span class="hidden-1 mt-20 block font-12"
                ><span class="gray">by </span
                ><span
                  class="deep-gray"
                  @click="common.toUser(item.artists[0].id)"
                  >{{ item.artistName }}</span
                >
              </span>
            </div>
            <span class="playCount">
              <svg class="icon icon-right-triangle" aria-hidden="true">
                <use xlink:href="#icon-right-triangle"></use></svg
              >{{ item.playCount | playCountFormat }}</span
            >
            <span class="durations">{{ item.duration | timeFormat }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { getMvDetail, getSimiMv, getMvUrl } from '@/api/mv'
export default {
  data() {
    return {
      mv: [],
      detail: {},
      url: '',
      hidden: true,
      subCount: null, //收藏数量
      mvName: '', //mv名字
      mvid: this.$route.params.id,
      reg: /^[0-9]*$/,
    }
  },
  watch: {
    mvid() {
      this.getSimiMv()
      this.getDetailMv()
      this.getMvUrl()
    },
    '$store.state.playing'(newVal) {
      if (newVal) this.$refs.videoRef.pause()
    },
  },
  created() {
    console.log(this.reg.test(this.mvid))

    this.getSimiMv()
    this.getDetailMv()
    this.getMvUrl()
  },
  mounted() {
    // this.$refs.collect.getIsCollect()
  },
  methods: {
    async getSimiMv() {
      const res = await getSimiMv(this.mvid)
      this.mv = res.mvs
    },
    async getDetailMv() {
      const res = await getMvDetail(this.mvid)
      this.detail = res.data
      this.subCount = res.data.subCount
      this.mvName = res.data.name

      // console.log(this.mvName)
    },
    async getMvUrl() {
      const res = await getMvUrl(this.mvid)
      this.url = res.data.url
    },
    // video播放时会触发这个函数
    play() {
      if (!this.$store.state.playing) return
      this.$store.commit('setPlayingState', false)
    },
  },
}
</script>

<style lang="less" scoped>
.main-box {
  // width: 100%;
  padding: 20px 30px 0 30px;
}
.tag-box {
  span {
    display: inline-block;
    background-color: #f7f7f7;
    padding: 5px 10px;
    border-radius: 20px;
    margin: 0 10px 20px 0;
    cursor: pointer;
  }
}
main {
  // width: 100%;
  display: flex;
  justify-content: flex-start;
  .left {
    width: 580px;
    margin-right: 5%;
    video {
      width: 100%;
      margin-top: 20px;
      // width: 580px;
    }
    .function-box {
      margin-top: 20px;
      .desc-box {
        .tittle {
          .icon-down-up {
            margin-left: 10px;
            font-size: 11px;
          }
        }
        .play {
          display: inline-block;
          margin: 10px 30px 10px 0;
        }
        p {
          margin: 0 0 15px 0;
          letter-spacing: 1px;
          font-size: 12px;
        }
      }
    }
  }
  .right {
    .mv-recommend {
      margin-top: 20px;
      width: 300px;
      .mv-box {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        img {
          margin-right: 10px;
          border-radius: 5px;
          width: 150px;
        }
      }
    }
  }
}
.playCount {
  position: absolute;
  color: #fff;
  top: 3px;
  right: 155px;
  font-size: 12px;
  .icon-right-triangle {
    font-size: 8px;
  }
}
.durations {
  font-size: 12px;
  color: #fff;
  position: absolute;
  bottom: 5px;
  left: 110px;
}
</style>
