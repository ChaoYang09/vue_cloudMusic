<template>
  <div class="mainBox">
    <header>
      <h2>找到 {{ songCount }} 首单曲</h2>
    </header>
    <main>
      <Music-List :songs="songs" :count="songCount">
        <!-- 热度 -->
        <el-table-column label="热度">
          <template v-slot="scope">
            <el-progress
              :percentage="scope.row.pop"
              :color="'#c8c8c8'"
              :show-text="false"
            ></el-progress>
          </template>
        </el-table-column>
      </Music-List>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import MusicList from '@/components/musicList/MusicList.vue'
export default {
  components: {
    MusicList,
  },
  data() {
    return {
      songs: [], //单曲
      songCount: null, //单曲数量
    }
  },
  computed: {},
  created() {
    this.$store.dispatch('getLikeList', 297835213).then(this.getSongsList)
  },
  methods: {
    async getSongsList() {
      let likeList = this.$store.state.likeList
      const { data: res } = await this.$http.get('/cloudsearch', {
        params: {
          keywords: this.$route.params.keywords,
          limit: 30,
          offset: this.$store.state.offset,
        },
      })
      let songs = res.result.songs
      this.songCount = res.result.songCount
      songs.forEach((item) => {
        item.like = likeList.includes(item.id)
      })
      this.songs = songs
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
  },
}
</script>

<style lang="less" scoped>
header {
  padding: 20px 30px 30px 30px;
}

.mainBox {
  width: 100%;
}
// /deep/.color-gray {
//   color: #c3c3c4;
// }
// /deep/.color-gray-deeper {
//   color: #7c7c7c;
//   cursor: pointer;
// }
// /deep/.color-gray-deeper:hover {
//   color: #000000;
// }
</style>
