<template>
  <div class="main-box">
    <main>
      <div class="left">
        <div class="font-18 bold pointer" @click="$router.back()">
          <span>
            <svg class="icon icon-arrow" aria-hidden="true">
              <use xlink:href="#icon-arrowleft1"></use>
            </svg>
          </span>
          <span v-if="mv">MV</span><span v-else>视频</span>详情
        </div>
        <video
          autoplay
          :poster="detail.coverUrl ? detail.coverUrl : detail.cover"
          :src="url"
          controls="controls"
          ref="videoRef"
          @play="play"
        ></video>
        <!-- 创作者区域 -->
        <!-- mv作者 -->
        <div v-if="mv" class="align-center mt-10">
          <img
            class="rounded-50 mr-10 pointer"
            style="width: 50px; height: 50px"
            v-lazy="detail.artists[0].img1v1Url"
            alt=""
            @click="common.toArtist(detail.artists[0].id)"
          />
          <span
            class="deep-gray pointer mr-10 font-13"
            @click="common.toArtist(detail.artists[0].id)"
            >{{ detail.artists[0].name }}</span
          >
        </div>
        <!-- video创作者 -->
        <div class="align-center mt-10" v-else>
          <img
            class="rounded-50 mr-10 pointer"
            style="width: 50px; height: 50px"
            v-lazy="detail.creator.avatarUrl"
            alt=""
            @click="common.toUser(detail.creator.userId)"
          />
          <span
            class="deep-gray pointer mr-10 font-13"
            @click="common.toUser(detail.creator.userId)"
            >{{ detail.creator.nickname }}</span
          >
        </div>
        <div class="function-box">
          <div class="desc-box">
            <!-- 标题区 -->
            <div class="title pointer">
              <span class="font-22 bold">{{
                mv ? detail.name : detail.title
              }}</span>
              <!-- up down toggle按钮 -->
              <span v-if="detail.desc || detail.description">
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
              </span>
            </div>
            <!-- detail -->
            <div class="my-5 play light-gray font-12">
              <!-- 发布日期 -->
              <span class="mr-20">
                发布： {{ detail.publishTime | dateFormat }}
              </span>
              <!-- 播放数量 -->
              <span>
                播放：
                {{ mv ? detail.playCount : detail.playTime | playCountFormat }}
              </span>
            </div>
            <!-- 标签 -->
            <div class="tag-box" v-if="!mv">
              <span v-for="(item, i) in tags" :key="i" @click="toVideo(item)">{{
                item.name
              }}</span>
            </div>
            <!-- 介绍 -->
            <p class="hidden-3 desc" v-show="!hidden">
              {{ mv ? detail.desc : detail.description }}
            </p>
            <!-- 按钮区域 -->
            <div class="mt-5">
              <Collect-Button
                :subCount="subCount"
                :id="id"
                :type="mv ? 'mv' : 'video'"
              ></Collect-Button>
            </div>
            <!-- 评论区域 -->
            <div style="margin-top: 40px">
              <div>
                <span class="font-22 bold">评论</span
                ><span>({{ commentCount }})</span>
              </div>
              <Comment
                class="mt-10"
                :id="id"
                :type="mv ? 1 : 5"
                @getCommentCount="getCommentCount"
              ></Comment>
            </div>
          </div>
        </div>
      </div>

      <!-- 右边区域 -->
      <div class="right">
        <div class="font-18 bold">相关推荐</div>
        <div class="mv-recommend">
          <div
            class="mv-box"
            v-for="(item, i) in relatedVideo"
            :key="i"
            @click="id = mv ? item.id : item.vid"
          >
            <div class="img-box">
              <img v-lazy="mv ? item.cover : item.coverUrl" alt="" />
            </div>

            <div>
              <span class="hidden-2">{{ mv ? item.name : item.title }}</span>
              <span class="hidden-1 mt-20 block font-12"
                ><span class="gray">by </span>
                <!-- 作者 -->
                <span
                  v-if="mv"
                  class="deep-gray"
                  @click="common.toUser(item.artists[0].id)"
                  >{{ item.artistName }}</span
                >
                <span
                  v-else
                  class="deep-gray"
                  @click="common.toUser(item.creator[0].userId)"
                  >{{ item.creator[0].userName }}</span
                >
              </span>
            </div>
            <!-- 播放数量 -->
            <span class="playCount">
              <svg class="icon icon-right-triangle" aria-hidden="true">
                <use xlink:href="#icon-triangle"></use>
              </svg>
              {{ mv ? item.playCount : item.playTime | playCountFormat }}</span
            >
            <!-- 播放时间 -->
            <span class="durations">{{
              mv ? item.duration : item.durationms | timeFormat
            }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { getVideoDetail, getRelatedVideo, getVideoUrl } from '@/api/video'
import { getMvDetail, getSimiMv, getMvUrl } from '@/api/mv'

export default {
  data() {
    return {
      relatedVideo: [],
      detail: {
        creator: {},
        artists: [
          {
            img1v1Url: '',
          },
        ],
      },
      url: '',
      hidden: true,
      subCount: null, //收藏数量
      mediaName: '', //视频名字
      id: this.$route.params.id,
      tags: [],
      reg: /^[0-9]*$/,
      mv: null,
      commentCount: 0, //评论数量
    }
  },
  created() {
    this.mv = this.reg.test(this.id)
    this.judgeId()
  },
  mounted() {
    // this.$refs.collect.getIsCollect()
  },
  watch: {
    id(newVal) {
      this.id = newVal
      console.log(this.id)
      this.judgeId()
    },
    '$store.state.playing'(newVal) {
      if (newVal) this.$refs.videoRef.pause()
    },
  },
  methods: {
    // 判断id是Mv还是video
    judgeId() {
      if (this.mv) {
        console.log('mv.....')
        this.getSimiMv()
        this.getDetailMv()
        this.getMvUrl()
      } else {
        console.log('video.....')
        this.getRelatedVideo()
        this.getVideoDetail()
        this.getVideoUrl()
      }
    },
    // 获取推荐video
    async getRelatedVideo() {
      const res = await getRelatedVideo(this.id)
      if (res.code !== 200) return

      this.relatedVideo = res.data
    },
    // 获取video详情信息
    async getVideoDetail() {
      const res = await getVideoDetail(this.id)
      if (res.code !== 200) return

      this.detail = res.data
      this.subCount = res.data.subscribeCount
      this.mediaName = res.data.tittle
      this.tags = res.data.videoGroup
    },
    // 获取video播放地址
    async getVideoUrl() {
      const res = await getVideoUrl(this.id)
      if (res.code !== 200) return
      console.log(res)
      this.url = res.urls[0].url
      // console.log(this.url)
    },

    // video播放时会触发这个函数
    play() {
      if (!this.$store.state.playing) return
      this.$store.commit('setPlayingState', false)
    },
    toVideo(item) {
      this.$router.push({
        path: '/video',
        query: {
          id: item.id,
          tag: item.name,
        },
      })
    },

    async getSimiMv() {
      const res = await getSimiMv(this.id)
      if (res.code !== 200) return

      this.relatedVideo = res.mvs
    },
    async getDetailMv() {
      const res = await getMvDetail(this.id)
      if (res.code !== 200) return

      this.detail = res.data
      this.subCount = res.data.subCount
      this.mediaName = res.data.name

      // console.log(this.mvName)
    },
    async getMvUrl() {
      const res = await getMvUrl(this.id)
      if (res.code !== 200) return

      this.url = res.data.url
      // console.log(res)
    },
    getCommentCount(res) {
      // console.log(res)
      this.commentCount = res
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
    font-size: 12px;
    background-color: #f7f7f7;
    padding: 3px 7px;
    border-radius: 20px;
    margin: 0 10px 10px 0;
    cursor: pointer;
  }
}
main {
  // width: 100%;
  display: flex;
  justify-content: flex-start;
  .left {
    width: 650px;
    margin-right: 5%;
    video {
      width: 100%;
      height: 320px;
      // object-fit: cover;
      margin-top: 20px;
      // width: 580px;
    }
    .function-box {
      margin-top: 20px;
      .desc-box {
        .title {
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
