<template>
  <div class="main-Box">
    <div class="header">
      <div class="left">
        <img :src="playListInfo.coverImgUrl" alt="" />
      </div>
      <div class="right">
        <div class="align-center">
          <span class="label">歌单</span>
          <span class="tittle-max">{{ playListInfo.name }}</span>
        </div>

        <!-- 按钮区域 -->
        <div class="button">
          <!-- 播放全部 -->
          <Play-Button @click="PlayFirstSong"></Play-Button>
          <!-- 收藏 -->
          <Collect-Button
            @click.native="handleCollect"
            ref="collect"
            :subCount="playListInfo.subscribedCount"
            :id="$route.params.id"
            :type="'playlist'"
          ></Collect-Button>
        </div>
        <!-- 标签区域 -->
        <div class="tags-box">
          <span style="display: block"
            >歌单 :
            <span
              class="tags"
              v-for="(item, i) in tags"
              :key="i"
              @click="toPlaylist(item)"
              >{{ item }}<span> /</span></span
            ></span
          >
          <span>歌曲 : {{ songsList.length }}</span>
          <span>播放 : {{ playListInfo.playCount | playCountFormat }}</span>
          <span
            class="description"
            style="
              overflow: hidden;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              display: -webkit-box;
            "
            >简介 : {{ playListInfo.description }}</span
          >
        </div>
      </div>
      <!-- <div class="clear"></div> -->
    </div>
    <div class="tab-wrap">
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌曲列表" name="playlist">
          <div class="bottom">
            <el-table
              :data="songsList"
              stripe
              size="small"
              @row-dblclick="playMusic"
            >
              <el-table-column type="index" label="#" align="center">
              </el-table-column>

              <el-table-column prop="name" label="音乐标题" min-width="400">
              </el-table-column>
              <el-table-column prop="ar[0].name" min-width="180" label="歌手">
                <template v-slot="scope">
                  <router-link
                    class="router-link-active"
                    :to="{
                      path: '/artist',
                      query: {
                        id: scope.row.ar[0].id,
                      },
                    }"
                    >{{ scope.row.ar[0].name }}</router-link
                  >
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="专辑"
                min-width="200"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column prop="" label="时长">
                <template v-slot="scope">
                  {{ scope.row.dt | timeFormat }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="评论" name="comment">
          <Comment></Comment>
        </el-tab-pane>
        <el-tab-pane label="收藏者" name="subUser">
          <Subscribers></Subscribers>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Comment from '@/components/comment/Comment.vue'
import Subscribers from '@/components/subscribers/Subscribers.vue'
import PlayButton from '@/components/button/Play-Button.vue'
export default {
  components: {
    Comment,
    Subscribers,
    PlayButton,
  },
  data() {
    return {
      activeName: 'comment',
      playListInfo: {},
      songsList: [],
      subCount: '',
      tags: [],
    }
  },
  computed: {},
  created() {
    this.getDetail()
    this.getSongsList()
  },
  methods: {
    // 获取歌单详情
    async getDetail() {
      const { data: res } = await this.$http.get('/playlist/detail', {
        params: {
          id: this.$route.params.id,
        },
      })
      this.playListInfo = res.playlist
      this.tags = res.playlist.tags
      // console.log(this.songsList)
    },
    // 获取歌曲列表
    async getSongsList() {
      const { data: res } = await this.$http.get('/playlist/track/all', {
        params: {
          id: this.$route.params.id,
        },
      })
      this.songsList = res.songs
      // console.log(this.songsList)
    },
    handleCollect() {
      this.$refs.collect.handleCollect()
    },
    // 点击播放全部 将数据渲染到playlist上面
    PlayFirstSong() {
      this.playMusic(this.songsList[0])
      this.toList()
    },
    // 点击播放全部 将数据渲染到playlist上面
    toList() {
      this.songsList.forEach((item, i) => {
        item.index = i
      })
      this.$store.commit('setPlaylist', this.songsList)
    },
    toPlayer() {
      // console.log('1')
      this.$router.push({
        path: '/player',
        query: {
          item,
        },
      })
    },
    playMusic(song) {
      this.$store.commit('setCurrentSong', song)
      this.toList()
      // console.log(song)
      const musicObj = {
        id: song.id, //歌曲id
        name: song.name, //歌曲名字
        arName: song.ar[0].name, //歌手名字
        picUrl: song.al.picUrl, //歌曲封面
      }
      this.$store.commit('setMusicInfo', musicObj)
      this.$store.dispatch('getLyric', song.id)
      this.$store.commit('setPlayingState', true)
      this.$store.commit('toggleCover', true)
      this.$nextTick(() => {
        this.$store.state.audioRef.play()
      })
    },

    toPlaylist(item) {
      this.$router.push({
        path: '/discovery',
        query: {
          tag: item,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.label {
  display: inline-block;
  color: #ec4141;
  width: 40px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  border: 1px solid #ec4141;
  border-radius: 3px;
  margin-right: 10px;
}
.main-Box {
}
.header {
  padding: 20px 30px;
  display: flex;
  width: 100%;
  height: 260px;
  .left {
    width: 180px;
    // height: 300px;
    img {
      border-radius: 5px;
      width: 100%;
    }
  }
  .right {
    margin-left: 20px;
    // width: 600px;
    height: 200px;
    .button {
      margin: 10px 0 20px 0;
      span {
        margin-right: 15px;
        display: inline-block;
      }
      .button-play {
        position: relative;
        .icon-play {
          color: #fff;
          font-size: 10px;
          position: absolute;
          top: 20px;
          left: 25px;
        }
        .el-button {
          color: #fff;
          font-size: 15px;
          padding-left: 45px;
          background-color: #ec4141;
          margin: 11px 5px;
        }
        .el-button:hover {
          color: rgb(219, 219, 219) !important;
          background-color: #cc3232 !important;
        }
      }
      .button-collect {
        position: relative;
        .icon-collect {
          position: absolute;
          top: 6px;
          left: 15px;
        }
        .el-button {
          font-size: 15px;
          padding-left: 40px;
          padding-right: 30px;
        }
      }
    }
    .tags-box {
      .tags {
        cursor: pointer;
        color: #507daf;
        // display: block;
      }
      .tags:hover {
        color: #0b58b0;
      }
      span {
        margin: 10px 0px;
        color: rgb(99, 97, 97);
      }
    }
  }
}
.tab-wrap {
  margin: 0 30px;
}

/deep/.el-tabs__item {
  font-size: 13px;
  color: #373737;
}

/deep/.el-tabs__item.is-active {
  color: #373737;
  font-size: 14px;
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
  // overflow: hidden;
  // z-index: 9;
  background-color: #fff;
  width: 100%;
  height: 40px;
}
/deep/.el-tabs__active-bar {
  bottom: 6px;
}
</style>
