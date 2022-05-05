<template>
  <div class="main-box">
    <main>
      <div class="left">
        <div class="tittle-little pointer" @click="$router.back()">
          <span>
            <svg class="icon icon-arrow" aria-hidden="true">
              <use xlink:href="#icon-arrowleft1"></use></svg
          ></span>
          视频详情
        </div>
        <video :poster="detail.coverUrl" :src="url" controls="controls"></video>
        <!-- 创作者区域 -->
        <div
          class="align-center mt-10"
          @click="common.toUser(detail.creator.userId)"
        >
          <img
            class="rounded-50 mr-10 pointer"
            style="width: 50px; height: 50px"
            :src="detail.creator.avatarUrl"
            alt=""
          />
          <span class="deep-gray pointer mr-10 font-13">{{
            detail.creator.nickname
          }}</span>
        </div>
        <div class="function-box">
          <div class="desc-box">
            <!-- 标题区 -->
            <div class="tittle pointer">
              <span class="tittle-max">{{ detail.title }}</span>
              <!-- up down toggle按钮 -->
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
                播放： {{ detail.playTime | playCountFormat }}
              </span>
            </div>
            <!-- 标签 -->
            <div class="tag-box">
              <span v-for="(item, i) in tags" :key="i" @click="toVideo(item)">{{
                item.name
              }}</span>
            </div>
            <!-- 介绍 -->
            <p class="overHidden-more desc" v-show="!hidden">
              {{ detail.title }}
            </p>
            <Collect-Button
              @click.native="handleCollect"
              ref="collect"
              :subCount="subCount"
              :id="$route.params.id"
              :type="'video'"
            ></Collect-Button>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="tittle-little">相关推荐</div>
        <div class="mv-recommend">
          <div
            class="mv-box"
            v-for="(item, i) in relatedVideo"
            :key="i"
            @click="playVideo(item)"
          >
            <div class="img-box"><img :src="item.coverUrl" alt="" /></div>

            <div>
              <span
                style="
                  overflow: hidden;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                  display: -webkit-box;
                "
                >{{ item.title }}</span
              >
              <span class="overHidden mt-20 block font-12"
                ><span class="gray">by </span
                ><span
                  class="deep-gray"
                  @click="common.toUser(item.creator[0].userId)"
                  >{{ item.creator[0].userName }}</span
                >
              </span>
            </div>
            <span class="playCount">
              <svg class="icon icon-right-triangle" aria-hidden="true">
                <use xlink:href="#icon-triangle"></use></svg
              >{{ item.playTime | playCountFormat }}</span
            >
            <span class="durations">{{ item.durationms | timeFormat }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { getVideoDetail, getRelatedVideo, getVideoUrl } from '@/api/video'
export default {
  data() {
    return {
      relatedVideo: [],
      detail: {},
      url: '',
      hidden: true,
      subCount: null, //收藏数量
      videoName: '', //视频名字
      id: this.$route.params.id,
      tags: [],
    }
  },
  created() {
    this.getRelatedVideo()
    this.getVideoDetail()
    this.getVideoUrl()
  },
  mounted() {
    // this.$refs.collect.getIsCollect()
  },
  watch: {
    id() {
      this.getRelatedVideo()
      this.getVideoDetail()
      this.getVideoUrl()
    },
  },
  methods: {
    // 获取推荐video
    async getRelatedVideo() {
      const res = await getRelatedVideo(this.id)
      this.relatedVideo = res.data
    },
    // 获取video详情信息
    async getVideoDetail() {
      const res = await getVideoDetail(this.id)
      this.detail = res.data
      this.subCount = res.data.subscribeCount
      this.videoName = res.data.tittle
      this.tags = res.data.videoGroup
    },
    // 获取video播放地址
    async getVideoUrl() {
      const res = await getVideoUrl(this.id)
      this.url = res.urls[0].url
      // console.log(this.url)
    },
    playVideo(item) {
      console.log(item)
      this.id = item.vid
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
    handleCollect() {
      // console.log('1')
      this.$refs.collect.handleCollect()
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
    margin: 0 10px 10px 0;
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
      height: 320px;
      // object-fit: cover;
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
