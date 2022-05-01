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
        <video :poster="detail.cover" :src="url" controls="controls"></video>
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
            <p class="overHidden-more desc" v-show="!hidden">
              {{ detail.desc }}
            </p>

            <Collect-Button
              @click.native="handleCollect"
              ref="collect"
              :subCount="subCount"
              :id="$route.params.id"
              :type="'mv'"
            ></Collect-Button>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="tittle-little">相关推荐</div>
        <div class="mv-recommend">
          <div class="mv-box" v-for="(item, i) in mv" :key="i">
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
              <span class="overHidden mt-20 block font-12"
                ><span class="gray">by </span
                ><span class="deep-gray">{{ item.artistName }}</span>
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
export default {
  data() {
    return {
      mv: [],
      detail: {},
      url: '',
      hidden: true,
      subCount: null, //收藏数量
      mvName: '', //mv名字
      mvid: '',
    }
  },
  created() {
    this.getSimiMv()
    this.getDetailMv()
    this.getMvUrl()
  },
  mounted() {
    // this.$refs.collect.getIsCollect()
  },
  methods: {
    async getSimiMv() {
      const { data: res } = await this.$http.get('/simi/mv', {
        params: {
          mvid: this.$route.params.id,
        },
      })
      this.mv = res.mvs
      // console.log(this.mv)
    },
    async getDetailMv() {
      const { data: res } = await this.$http.get('/mv/detail', {
        params: {
          mvid: this.$route.params.id,
        },
      })
      this.detail = res.data
      this.subCount = res.data.subCount
      this.mvName = res.data.name
      this.mvid = this.$route.params.id
      // console.log(this.mvName)
    },
    async getMvUrl() {
      const { data: res } = await this.$http.get('/mv/url', {
        params: {
          id: this.$route.params.id,
        },
      })
      this.url = res.data.url
    },

    handleCollect() {
      // console.log(1111)
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
