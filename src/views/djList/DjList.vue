<template>
  <div class="dj-wrap">
    <header>
      <img
        v-if="djInfo.picUrl"
        class="rounded-5 border-line"
        style="width: 185px; height: 185px"
        v-lazy="djInfo.picUrl"
        alt=""
      />

      <!-- 右侧区域 -->
      <div class="ml-20">
        <div class="align-center">
          <Label :large="true" class="mr-10 default">电台</Label>
          <span class="font-23 bold">{{ djInfo.name }}</span>
        </div>
        <!-- 创作者区域 -->
        <div class="align-center mt-10">
          <img
            class="rounded-50 mr-10"
            style="width: 22px"
            :src="djInfo.dj.avatarUrl"
            alt=""
            @click="common.toUser(djInfo.dj.userId)"
          />
          <span
            class="deep-link mr-10"
            @click="common.toUser(djInfo.dj.userId)"
            >{{ djInfo.dj.nickname }}</span
          >
        </div>
        <!-- 按钮区域 -->
        <div class="my-10 align-center">
          <!-- 播放全部 -->
          <Play-Button
            class="mr-20"
            ref="playBtnRef"
            @click.native="PlayAllSongs"
          ></Play-Button>
          <!-- 收藏 -->
          <Collect-Button
            :subCount="djInfo.subCount"
            :id="djQuery.rid"
            :type="'dj'"
          ></Collect-Button>
        </div>

        <!-- desc -->
        <div v-if="djInfo.desc" style="width: 800px" class="mt-20 hidden-1">
          {{ djInfo.desc }}
        </div>
      </div>
    </header>

    <div class="tab-wrap">
      <el-tabs v-model="activeName">
        <el-tab-pane :label="`节目(${count})`" name="program">
          <!-- 排序方式 -->
          <div class="sort-box">
            <span>共{{ count }}期</span>
            <span class="sort-wrap">
              <span class="gray mr-10 default">排序</span>
              <div class="sort-content">
                <div
                  :class="{ sort: true, selected: !djQuery.asc }"
                  @click="descList"
                >
                  <svg class="icon" aria-hidden="true" style="font-size: 10px">
                    <use xlink:href="#icon-sort-desc"></use>
                  </svg>
                </div>
                <div
                  :class="{ sort: true, selected: djQuery.asc }"
                  @click="ascList"
                >
                  <svg class="icon" aria-hidden="true" style="font-size: 10px">
                    <use xlink:href="#icon-sort-asc"></use>
                  </svg>
                </div>
              </div>
            </span>
          </div>

          <el-table
            width="100%"
            :data="djLists"
            stripe
            :show-header="false"
            :row-style="rowStyle"
            @row-dblclick="playMusic"
          >
            <!-- 序号 -->
            <el-table-column min-width="50">
              <template v-slot="scope">
                <span class="gray flex-center font-12"
                  >{{ scope.row.serialNum }}
                </span>
              </template>
            </el-table-column>

            <!-- 封面区域 -->
            <el-table-column width="80">
              <template v-slot="scope">
                <span class="pointer" @click="playMusic(scope.row)">
                  <img
                    :src="scope.row.al.picUrl"
                    class="rounded-5 block"
                    style="width: 60px; height: 60px"
                    alt=""
                  />
                  <span class="play-svg">
                    <svg class="icon icon-play" aria-hidden="true">
                      <use xlink:href="#icon-play"></use></svg
                  ></span>
                </span>
              </template>
            </el-table-column>
            <!-- name -->
            <el-table-column prop="name" min-width="400"> </el-table-column>

            <!-- 播放量 -->
            <el-table-column min-width="100">
              <template v-slot="scope">
                <span class="gray align-center font-12">
                  <svg
                    class="icon position"
                    aria-hidden="true"
                    style="bottom: 1.5px"
                  >
                    <use xlink:href="#icon-play2"></use></svg
                  ><span class="ml-3">{{
                    scope.row.listenerCount | playCountFormat
                  }}</span></span
                >
              </template>
            </el-table-column>
            <!-- 点赞 -->
            <el-table-column min-width="100">
              <template v-slot="scope">
                <span class="gray font-12">
                  <svg
                    class="icon position"
                    aria-hidden="true"
                    style="font-size: 10px; top: 1px"
                  >
                    <use xlink:href="#icon-dianzan2"></use></svg
                  ><span class="ml-3">{{ scope.row.likedCount }}</span></span
                >
              </template>
            </el-table-column>
            <!-- 创建时间 -->

            <el-table-column min-width="150">
              <template v-slot="scope">
                <span class="gray font-12">{{
                  scope.row.createTime | dateFormat
                }}</span>
              </template>
            </el-table-column>
            <!-- 播放时间 -->
            <el-table-column min-width="100">
              <template v-slot="scope">
                <span class="gray font-12">{{
                  scope.row.duration | timeFormat
                }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="订阅者" name="subUser">
          <Subscribers style="padding: 0 30px" :id="794458417" :type="'dj'">
          </Subscribers>
        </el-tab-pane>
      </el-tabs>
      <!-- 分页 -->
      <!-- <div class="flex-center mt-10">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="count"
          :page-size="djQuery.limit"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div> -->
    </div>
  </div>
</template>

<script>
import { getDjDetail, getDjLists } from '@/api/dj'
import Label from '@/components/label/Label.vue'
import Subscribers from '@/components/subscribers/Subscribers.vue'
import PlayButton from '@/components/button/Play-Button.vue'
export default {
  components: {
    Label,
    Subscribers,
    PlayButton,
  },
  data() {
    return {
      activeName: 'program',
      djInfo: {
        dj: [],
      },
      djLists: [],
      subCount: '',
      currentPage: 1,
      djQuery: {
        rid: this.$route.params.id,
        limit: 50,
        offset: 0,
        asc: false, //排序方式
      },

      count: null,
    }
  },
  watch: {
    $route() {
      // console.log(1)
      this.djQuery.rid = this.$route.params.id
      this.getDjDetail()
      this.getDjLists()
    },
  },
  computed: {},
  created() {
    this.$store.commit('setIsProgram', true)
    this.getDjDetail()
    this.getDjLists()
  },
  methods: {
    // 获取电台详情
    async getDjDetail() {
      const res = await getDjDetail(this.djQuery.rid)
      if (res.code !== 200) return

      this.djInfo = res.data
    },
    // 获取电台节目
    async getDjLists() {
      const res = await getDjLists(this.djQuery)
      // console.log(res)
      if (res.code !== 200) return

      this.djLists = res.programs
      this.count = res.count
      this.djLists.forEach((item, i, arr) => {
        arr[i] = this.common.programFactory(item)
        // console.log(item)
      })
      // console.log(this.djLists)
    },
    // 降序
    descList() {
      this.djQuery.asc = false
      this.getDjLists()
    },
    // 升序
    ascList() {
      this.djQuery.asc = true
      this.getDjLists()
    },

    // 点击全部播放
    PlayAllSongs() {
      this.$refs.playBtnRef.PlayFirstSong(this.djLists)
    },
    // 双击歌曲行会触发
    playMusic(song) {
      // console.log(song)
      this.common.playMusic(song)
      // 将数据渲染到playlist上面
      this.djLists.forEach((item, i) => {
        item.index = i
      })
      this.$store.commit('setPlaylist', this.djLists)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.djQuery.offset = (val - 1) * this.djQuery.limit
      this.getDjLists(this.djQuery)
    },
    rowStyle() {
      return `cursor: default `
    },
  },
}
</script>

<style lang="less" scoped>
header {
  padding: 20px 30px;
  display: flex;
  width: 800px;
}
.dj-wrap {
  width: 100%;
  .des {
    white-space: pre-line;
    padding: 0 30px;
    line-height: 25px;
  }
}
.play-svg {
  position: absolute;
  font-size: 11px;
  right: 27px;
  bottom: 27px;
  color: #ec4141;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  opacity: 0.9;
  background-color: #ffffff;
  .icon-play {
    font-size: 7px;
    margin-left: 3px;
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
.sort-box {
  padding: 0 30px 10px 30px;
  display: flex;
  justify-content: space-between;
}
.sort-wrap {
  display: flex;
  align-items: baseline;
}
.sort-content {
  display: flex;
  border-radius: 3px;
  width: 50px;
  height: 20px;
  color: #919191;
  background-color: #f2f2f2;
  overflow: hidden;
  .sort {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sort:hover {
    background-color: #e7e7e7;
  }
}
.selected {
  display: inline-block;
  width: 50%;
  color: #ffffff;
  background-color: #bfbfbf;
  height: 100%;
  pointer-events: none;
}
/deep/.el-tabs__item {
  font-size: 14px;
  color: #373737;
}

/deep/.el-tabs__item.is-active {
  color: #373737;
  font-size: 15px;
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

  height: 3px;
  border-radius: 2px;
}
/deep/.el-tabs__nav-scroll {
  background-color: #fff;
  width: 100%;
  height: 40px;
  margin-left: 30px;
}
/deep/.el-tabs__active-bar {
  bottom: 6px;
}
</style>
