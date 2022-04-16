<template>
  <div class="main-Box">
    <div class="header">
      <div class="left">
        <img :src="playListInfo.coverImgUrl" alt="" />
      </div>
      <div class="right">
        <div class="tittle-max">{{ playListInfo.name }}</div>

        <!-- 按钮区域 -->
        <div class="button" @click="PlayFirstSong">
          <span class="button-play">
            <svg class="icon icon-play" aria-hidden="true">
              <use xlink:href="#icon-play"></use>
            </svg>
            <el-button round size="small">播放全部</el-button>
          </span>
          <span class="button-collect">
            <svg class="icon icon-collect" aria-hidden="true">
              <use xlink:href="#icon-Collections"></use>
            </svg>
            <el-button round size="small">收藏</el-button>
          </span>
        </div>
        <!-- 标签区域 -->
        <div class="tags">
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
    <div class="bottom">
      <el-table
        :data="songsList"
        stripe
        width="100"
        size="small"
        @row-dblclick="playMusic"
      >
        <el-table-column type="index" label="#" align="center">
        </el-table-column>

        <el-table-column prop="name" label="音乐标题" width="400px">
        </el-table-column>
        <el-table-column prop="ar[0].name" label="歌手">
          <template v-slot="scope">
            <router-link
              class="router-link-active"
              :to="{
                path: '/player',
                query: {
                  id: scope.row.ar[0].id,
                },
              }"
              >{{ scope.row.ar[0].name }}</router-link
            >
          </template>
        </el-table-column>
        <el-table-column prop="name" label="专辑" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="" label="时长">
          <template v-slot="scope">
            {{ scope.row.dt | timeFormat }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playListInfo: {},
      songsList: [],
    }
  },
  computed: {
    tags() {
      return this.playListInfo.tags
    },
  },
  created() {
    this.getDetail()
    // this.playListInfo = this.$route.query.item
    this.getSongsList()
    // console.log(this.playMusic)
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
  },
}
</script>

<style lang="less" scoped>
.main-Box {
}
.header {
  padding: 20px 30px;
  display: flex;
  width: 100%;

  .left {
    width: 220px;
    height: 220px;
    img {
      border-radius: 5px;
      width: 100%;
    }
  }
  .right {
    margin-left: 20px;
    width: 750px;
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
    .tags {
      span {
        margin: 10px 5px;
        font-size: 14px;
        color: rgb(99, 97, 97);
      }
    }
  }
}

// .router-link-active {
//   text-decoration: none;
//   color: #606266;
// }
</style>
