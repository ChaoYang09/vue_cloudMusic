<template>
  <div class="mainBox">
    <header>
      <h2>找到 {{ songCount }} 首单曲</h2>
    </header>
    <main>
      <el-table :data="songs" stripe size="mini" @row-dblclick="playMusic">
        <!-- 序号 -->
        <el-table-column
          align="center"
          type="index"
          width="40"
          class-name="color-gray"
        >
        </el-table-column>

        <!-- 收藏爱心 -->
        <el-table-column width="40">
          <template v-slot="scope"
            ><svg
              :class="{
                icon: true,
                'icon-love': true,
                'like-love': like && scope.row.id === id,
              }"
              aria-hidden="true"
              @click="likeMusic(scope.row.id)"
            >
              <use xlink:href="#icon-icon_love_hover"></use>
            </svg> </template
        ></el-table-column>

        <!-- 标题 -->
        <el-table-column min-width="350" label="音乐标题" prop="name">
        </el-table-column>

        <!-- 歌手 -->
        <el-table-column
          min-width="150"
          label="歌手"
          class-name="color-gray-deeper "
        >
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

        <!-- 专辑 -->
        <el-table-column
          min-width="200"
          label="专辑"
          prop="al.name"
          show-overflow-tooltip
          class-name="color-gray-deeper "
        ></el-table-column>
        <el-table-column label="时长" class-name="color-gray ">
          <template v-slot="scope">
            {{ scope.row.dt | timeFormat }}
          </template>
        </el-table-column>
        <el-table-column label="热度">
          <template v-slot="scope">
            <el-progress
              :percentage="scope.row.pop"
              :color="'#c8c8c8'"
              :show-text="false"
            ></el-progress>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <footer>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="songCount"
        :page-size="30"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </footer>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      songs: [], //单曲
      songCount: null, //单曲数量
      keywords: '',
      limit: 30,
      offset: 0,
      like: false,
      id: 0,
    }
  },
  computed: {},
  created() {
    this.getSongsList()
  },
  methods: {
    ...mapMutations(['setMusicInfo', 'setPlayingState']),
    async getSongsList() {
      const { data: res } = await this.$http.get('/cloudsearch', {
        params: {
          keywords: this.$route.params.keywords,
          limit: 30,
          offset: this.offset,
        },
      })
      this.songs = res.result.songs
      this.songCount = res.result.songCount
    },
    handleCurrentChange(val) {
      // console.log(val)
      this.offset = (val - 1) * 30
      // console.log(this.offset)
      this.getSongsList()
    },
    playMusic(song) {
      this.$store.commit('setCurrentSong', song)
      // this.toList()
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
    toPlayer() {
      // console.log('1')
      this.$router.push({
        path: '/artist',
        query: {
          item,
        },
      })
    },
    async likeMusic(id) {
      // console.log(id)
      const { data: res } = await this.$http.get('/like', {
        params: {
          id,
        },
      })
      if (res.code === 200) {
        this.like = true
        this.id = id
      }
      // console.log(res)
      // this.songs = res.result.songs
      // this.songCount = res.result.songCount
    },
  },
}
</script>

<style lang="less" scoped>
header {
  padding: 20px 30px 30px 30px;
}
main {
  // width: 100%;
  .icon-love {
    color: #c2c1c1;
    margin-top: 5px;
    font-size: 12px;
    cursor: pointer;
  }
  .icon-love:hover {
    color: #ec4141;
  }
  .like-love {
    color: #ec4141;
  }
}
footer {
  display: flex;
  justify-content: center;
  margin: 20px 0 30px;
}
.mainBox {
  width: 100%;
}
/deep/.color-gray {
  color: #c3c3c4;
}
/deep/.color-gray-deeper {
  color: #7c7c7c;
  cursor: pointer;
}
/deep/.color-gray-deeper:hover {
  color: #000000;
}
</style>
