<template>
  <div class="search-wrap">
    <header>
      <div class="font-15 bold">
        找到 {{ count }} {{ measure[type] }}{{ tag[type] }}
      </div>
    </header>
    <main>
      <ul class="tag-wrap">
        <li :class="{ selected: type === 1 }" @click="type = 1">单曲</li>
        <li :class="{ selected: type === 100 }" @click="type = 100">歌手</li>
        <li :class="{ selected: type === 10 }" @click="type = 10">专辑</li>
        <li :class="{ selected: type === 1014 }" @click="type = 1014">视频</li>
        <li :class="{ selected: type === 1000 }" @click="type = 1000">歌单</li>
        <li :class="{ selected: type === 1009 }" @click="type = 1009">
          主播电台
        </li>
      </ul>
    </main>
    <footer>
      <!-- 单曲 -->
      <section v-if="type === 1">
        <Music-List
          :songs="songs"
          :count="count"
          :offset="offset"
          ref="musicList"
        >
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
        <div class="flex-center mt-20">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="count"
            :page-size="30"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            v-if="songs.length !== 0"
            ref="paginationRef"
          ></el-pagination>
        </div>
      </section>

      <!-- 歌手 -->
      <section v-show="type === 100">
        <Table :tableData="artists" :count="count" :type="type"> </Table>
      </section>

      <!-- 专辑 -->
      <section v-show="type === 10">
        <Table :tableData="albums" :count="count" :type="type">
          <!-- <template #album> </template> -->
        </Table>
      </section>
      <!-- 视频 -->
      <section v-show="type === 1014">
        <div class="video-wrap">
          <Video
            class="video"
            v-for="(item, i) in videos"
            :key="i"
            :count="item.playTime"
            :duration="item.durationms"
            :url="item.coverUrl"
            :name="item.title"
            @click.native="common.toVideoPlayer(item.vid)"
          >
            <Label v-if="item.type === 0 ? true : false" :small="true"
              >MV</Label
            >
            <template #author>
              <div class="hidden-1">
                <span
                  class="artist-list"
                  v-for="(v, i) in item.creator"
                  :key="i"
                >
                  <span
                    class="pointer deep-gray"
                    @click.stop="common.toArtist(v.userId)"
                    >{{ v.userName }}</span
                  >
                </span>
              </div>
            </template>
          </Video>
        </div>
      </section>
      <!-- 歌单 -->
      <section v-show="type === 1000">
        <Table :tableData="playlists" :count="count" :type="type"> </Table>
      </section>
      <!-- 主播电台 -->
      <section v-show="type === 1009">
        <Table :tableData="djRadios" :count="count" :type="type"> </Table>
      </section>
    </footer>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import MusicList from '@/components/musicList/MusicList.vue'
import Table from '@/components/table/Table.vue'
import Video from '@/components/video/Video.vue'
import Label from '@/components/label/Label.vue'
import { getCloudSearch } from '@/api/search'
export default {
  components: {
    MusicList,
    Table,
    Video,
    Label,
  },
  data() {
    return {
      songs: [], //单曲
      artists: [], //歌手
      albums: [], //专辑
      videos: [], //视频
      playlists: [], //歌单
      djRadios: [], //电台
      count: 0, //单曲数量
      type: 1,
      likeList: [], //喜欢音乐的id
      currentPage: 1,
      offset: 0,
      tag: {
        1: '单曲',
        100: '歌手',
        10: '专辑',
        1014: '视频',
        1000: '歌单',
        1009: '电台',
      },
      measure: {
        1: '首',
        100: '位',
        10: '张',
        1014: '个',
        1000: '个',
        1009: '个',
      },
      keywords: this.$route.params.keywords,
    }
  },
  computed: {
    ...mapState(['likeIds']),
  },
  mounted() {
    this.$store.state.paginationRef = this.$refs.paginationRef
  },
  created() {
    this.getSongsLists()
  },
  watch: {
    type() {
      switch (this.type) {
        case 1:
          this.getSongsLists()
          break
        case 10:
          this.getAlbums()
          break
        case 100:
          this.getArtists()
          break
        case 1000:
          this.getPlaylists()
          break
        case 1002:
          this.getUsers()
          break
        case 1009:
          this.getDjRadios()
          break
        case 1014:
          this.getVideos()
          break
      }
    },
    $route() {
      this.keywords = this.$route.params.keywords
      this.getSongsLists()
    },
    likeIds() {
      this.songs.forEach((item) => {
        item.like = this.likeIds.includes(item.id)
      })
    },
  },
  methods: {
    ...mapMutations(['upDataLikeState']),
    // 获取单曲
    async getSongsLists() {
      // await getLikeList(297835213).then((res) => {
      //   this.likeList = res.ids
      // })
      // console.log(this.$store.state.likeIds)
      await getCloudSearch({
        keywords: this.keywords,
        limit: 30,
        offset: this.offset,
        type: this.type,
      }).then((res) => {
        if (res.code !== 200) return
        this.count = res.result.songCount
        res.result.songs.forEach((item) => {
          item.like = this.likeIds.includes(item.id)
        })
        this.songs = res.result.songs
      })
    },
    // 获取歌手
    async getArtists() {
      const res = await getCloudSearch({
        keywords: this.keywords,
        limit: 30,
        offset: this.offset,
        type: this.type,
      })
      if (res.code !== 200) return
      this.artists = res.result.artists
      this.count = res.result.artistCount
    },
    // 获取专辑
    async getAlbums() {
      const res = await getCloudSearch({
        keywords: this.keywords,
        limit: 30,
        offset: this.offset,
        type: this.type,
      })
      if (res.code !== 200) return
      this.albums = res.result.albums
      this.count = res.result.albumCount
      // console.log(this.albums)
    },
    // 获取视频
    async getVideos() {
      const res = await getCloudSearch({
        keywords: this.keywords,
        limit: 30,
        offset: this.offset,
        type: this.type,
      })
      if (res.code !== 200) return
      this.videos = res.result.videos
      console.log(this.videos)
      this.count = res.result.videoCount
    },
    // 获取歌单
    async getPlaylists() {
      const res = await getCloudSearch({
        keywords: this.keywords,
        limit: 30,
        offset: this.offset,
        type: this.type,
      })
      if (res.code !== 200) return
      this.playlists = res.result.playlists
      this.count = res.result.playlistCount
    },
    // 获取电台
    async getDjRadios() {
      const res = await getCloudSearch({
        keywords: this.keywords,
        limit: 30,
        offset: this.offset,
        type: this.type,
      })
      if (res.code !== 200) return
      this.djRadios = res.result.djRadios
      this.count = res.result.djRadiosCount
    },

    // 分页的回调函数
    handleCurrentChange(val) {
      this.currentPage = val
      this.offset = (val - 1) * 30
      this.getSongsLists()
      this.$store.commit('setPageNum', val)
      // this.$store.commit('setTitleId', +new Date())

      // this.getSongsList()
    },
  },
}
</script>

<style lang="less" scoped>
header {
  padding: 20px 30px 0 30px;
}

.search-wrap {
  width: 100%;
  min-width: 700px;
}
main {
  padding: 20px 30px 10px 30px;
  border-bottom: 1px solid #ddd;
  .tag-wrap {
    display: flex;
    li {
      cursor: pointer;
      margin-right: 30px;
    }
    li:hover {
      color: #000;
    }
  }
}
.selected {
  font-weight: bold;
}
.video-wrap {
  padding-left: 20px;
  // padding-left: 20px;
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  .video {
    width: 22%;
    margin-right: 3%;
  }
}
</style>
