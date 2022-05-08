<template>
  <div class="main-box">
    <el-tabs v-model="activeName">
      <!-- 个性推荐 -->
      <el-tab-pane label="视频" name="first">
        <main>
          <el-popover
            placement="bottom"
            width="700"
            trigger="click"
            popper-class="video-popover"
            ref="popoverRef"
          >
            <!-- 按钮 -->
            <span class="type-btn" slot="reference">
              <span v-show="tag === ''">全部视频</span>
              {{ tag }}
              <svg class="icon icon-arrow" aria-hidden="true">
                <use xlink:href="#icon-arrowright"></use>
              </svg>
            </span>

            <div style="border-bottom: 1px solid #ccc; margin-bottom: 25px">
              <span
                :class="{ 'all-playlist': true, selected: tag === '' }"
                @click="getAllVideos"
                >全部视频</span
              >
            </div>

            <!-- group -->
            <div class="group-box">
              <div class="tag">
                <div class="span-box" v-for="(item, i) in group" :key="i">
                  <span
                    :class="{ selected: id === item.id }"
                    @click="videoId(item)"
                    >{{ item.name }}</span
                  >
                </div>
                <div class="slot-div"></div>
              </div>
            </div>
          </el-popover>
          <!-- category区域 -->
          <div class="type-box gray">
            <span
              v-for="(item, i) in category"
              :key="i"
              :class="{ selected: id === item.id }"
              @click="videoId(item)"
              >{{ item.name }}</span
            >
          </div>
        </main>
        <!-- Video区域 -->
        <footer>
          <div class="video-wrap">
            <Video
              class="video"
              v-for="(item, i) in videos"
              :key="i"
              :count="item.data.playTime"
              :duration="item.data.durationms"
              :url="item.data.coverUrl"
              :name="item.data.title"
              @click.native="common.toVideoPlayer(item.data.vid)"
            >
              <template #author>
                <div class="hidden-1">
                  <span class="pointer deep-gray">{{
                    item.data.creator.nickname
                  }}</span>
                </div>
              </template>
            </Video>
          </div>
        </footer>
      </el-tab-pane>
      <!-- MV区域 -->
      <el-tab-pane label="MV" name="second">
        <div class="tittle-box">
          <!-- 头部区域 -->
          <header>
            <div class="pointer tittle-little">
              最新MV
              <span>
                <svg class="icon icon-arrow" aria-hidden="true">
                  <use xlink:href="#icon-arrowright"></use></svg
              ></span>
            </div>
            <div class="area-box gray">
              <span
                @click="areaSelected(1, '内地')"
                :class="{ selected: areaIndex === 1 }"
                :v-model="area"
                >内地</span
              ><span
                @click="areaSelected(2, '港台')"
                :class="{ selected: areaIndex === 2 }"
                >港台</span
              ><span
                @click="areaSelected(3, '欧美')"
                :class="{ selected: areaIndex === 3 }"
                >欧美</span
              ><span
                @click="areaSelected(4, '日本')"
                :class="{ selected: areaIndex === 4 }"
                >日本</span
              ><span
                @click="areaSelected(5, '韩国')"
                :class="{ selected: areaIndex === 5 }"
                >韩国</span
              >
            </div>
          </header>

          <!-- MV区域 -->

          <footer>
            <div class="video-wrap">
              <Video
                class="video"
                v-for="(item, i) in mv.slice(1, mv.length)"
                :key="i"
                :count="item.playCount"
                :url="item.cover"
                :name="item.name"
                @click.native="common.toMvPlayer(item.id)"
              >
                <template #author>
                  <div class="hidden-1">
                    <span
                      class="artist-list"
                      v-for="(item, i) in item.artists"
                      :key="i"
                    >
                      <span
                        class="pointer deep-gray"
                        @click.stop="common.toArtist(item.id)"
                        >{{ item.name }}</span
                      >
                    </span>
                  </div>
                </template>
              </Video>
            </div>
          </footer>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Video from '@/components/video/Video.vue'
import { getNewMv } from '@/api/mv'
export default {
  components: {
    Video,
  },
  data() {
    return {
      activeName: 'first',
      areaIndex: 1,
      mv: [],
      area: '',
      group: [], //视频标签
      category: [], //视频分类
      id: '',
      tag: '',
      videos: [],
    }
  },
  created() {
    // this.id =
    this.getNewMv()
    this.getVideoGroup()
    this.getVideoCategory()
    this.getAllVideos()
    if (this.$route.query.id !== undefined) {
      this.id = Number(this.$route.query.id)
      this.tag = this.$route.query.tag
      // console.log(this.$route.query.tag)
    }
  },
  mounted() {},
  watch: {
    id() {
      this.getVideos()
    },
  },
  methods: {
    // 获取视频标签
    async getVideoGroup() {
      const { data: res } = await this.$http.get('/video/group/list')
      this.group = res.data
      // console.log(this.group)
    },
    // 获取视频分类
    async getVideoCategory() {
      const { data: res } = await this.$http.get('/video/category/list')
      this.category = res.data
      // console.log(this.category)
    },
    // 获取视频
    async getVideos() {
      const { data: res } = await this.$http.get('/video/group', {
        params: {
          id: this.id,
        },
      })
      this.videos = res.datas
      // console.log(this.videos)
      this.$refs.popoverRef.doClose()
      // console.log(this.category)
    },
    // 将video的id和name储存到状态中
    videoId(item) {
      this.id = item.id
      this.tag = item.name
    },
    // 获取全部视频
    async getAllVideos() {
      const { data: res } = await this.$http.get('/video/timeline/all')
      this.videos = res.datas
      if (this.$route.query.id === undefined) this.tag = ''
      this.$refs.popoverRef.doClose()
      // console.log(this.category)
    },
    // 获取Mv
    async getNewMv() {
      const res = await getNewMv({
        limit: 31,
        area: this.area,
      })
      this.mv = res.data
    },
    // 点击对应的低于获取不同地区的MV
    areaSelected(index, area) {
      // console.log(area)
      this.areaIndex = index
      this.area = area
      this.getNewMv()
    },
  },
}
</script>

<style>
.video-popover {
  font-size: 13px !important;
  overflow: auto;
  /* height: 500px; */
  top: 105px !important;
  left: 240px !important;
  z-index: 9 !important;
}
</style>
<style lang="less" scoped>
.all-playlist {
  cursor: pointer;
  display: block;
  padding-left: 20px;
  margin-bottom: 10px;
  width: 78px;
  // height: 30px;
}

.group-box {
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  .tag {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .span-box {
      display: inline-block;
      width: 102px;
      margin: 0 6px 25px 0;
      span {
        padding: 3px 10px;
        cursor: pointer;
      }
      span:hover {
        color: #ec4141;
      }
    }
    .slot-div {
      display: inline-block;
      width: 102px;
      margin: 0 6px 25px 0;
    }
  }
}

main {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  .type-btn {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100px;
    border-radius: 20px;
    height: 30px;
    border: 1px solid #bbb;
    .icon-arrow {
      margin-left: 5px;
      font-size: 9px;
    }
  }
  .type-btn:hover {
    background-color: #f2f2f2;
  }
  .type-box {
    display: flex;
    align-items: center;
    span {
      padding: 3px 10px;
      cursor: pointer;
      margin: 0 3px;
    }
    span:hover {
      color: #373737;
    }
  }
}
.main-box {
  min-width: 900px;
  padding: 20px 30px 0 30px;
  width: 100%;
}
.tittle-box {
  margin-top: 50px;
}
.selected {
  border-radius: 15px;
  padding: 3px 10px;
  background-color: #fdf5f5;
  color: #ec4141;
}
.selected:hover {
  background-color: #fdeded;
  color: #ec4141 !important;
}
header {
  display: flex;
  justify-content: space-between;
  .area-box {
    span {
      padding: 3px 13px;
      margin: 0 5px 0 5px;
      cursor: pointer;
    }
    span:hover {
      color: #373737;
    }
  }
}
footer {
  .video-wrap {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    .video {
      width: 32%;
      margin-right: 1%;
    }
  }
}

/deep/.el-tabs__item {
  font-size: 18px;
  color: #373737;
}

/deep/.el-tabs__item.is-active {
  color: #373737;
  font-size: 20px;
  font-weight: 600;
}
/deep/.el-tabs__item:hover {
  color: black;
}
/deep/.el-tabs__nav-wrap::after {
  height: 0;
}
/deep/.el-tabs__active-bar {
  background-color: #ec4141;

  height: 4px;
  border-radius: 2px;
}
/deep/.el-tabs__nav-scroll {
  overflow: hidden;
  position: fixed;
  z-index: 11;
  background-color: #fff;
  width: 100%;
  height: 60px;
  margin-top: -20px;
  padding-top: 15px;
}
</style>
