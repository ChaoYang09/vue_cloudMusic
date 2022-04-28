<template>
  <el-table
    :data="songs"
    stripe
    size="mini"
    highlight-current-row
    @row-dblclick="playMusic"
  >
    <!-- 序号 -->
    <el-table-column align="center" width="45" class-name="color-gray">
      <template v-slot="scope">
        <img src="" alt="" />
      </template>
    </el-table-column>
    <el-table-column> </el-table-column>
  </el-table>
</template>

<script>
import { getLikeList, likeMusic } from '@/api/music'
import { mapMutations } from 'vuex'
import Label from '@/components/label/Label.vue'
export default {
  components: {
    Label,
  },
  props: {
    songs: {
      type: Boolean,
      default: false,
      require: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      limit: 30,
      offset: 0,
      currentPage: 1,
      likeList: [], //我喜欢的音乐id
    }
  },
  created() {
    this.getLikeList()
  },
  methods: {
    ...mapMutations(['setMusicInfo', 'setPlayingState']),
    // 分页的回调函数
    handleCurrentChange(val) {
      this.currentPage = val
      this.offset = (val - 1) * 30
      this.getSongsList()
    },
    // 获取我的喜欢歌曲id
    async getLikeList() {
      const res = await getLikeList(297835213)
      this.likeList = res.ids
    },
    // 收藏音乐
    async likeMusic(row, index) {
      // console.log(index)
      // let isLike = this.likeList.includes(row.id)
      const res = await likeMusic({
        id: row.id,
        like: !row.like,
      })
      if (res.code !== 200) return this.$message.error('收藏失败')
      if (!row.like) {
        row.like = true
        this.$set(this.songs, index, row)
        this.$message.success('已添加到我喜欢的音乐')
      } else {
        row.like = false
        this.$set(this.songs, index, row)
        this.$message('取消喜欢成功')
      }
    },
    // 双击歌曲行会触发
    playMusic(song) {
      this.$store.commit('setCurrentSong', song)
      // this.toList()

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
      console.log(this.$store.state.music)
    },
  },
}
</script>

<style lang="less" scoped>
.icon-triangle {
  position: absolute;
  right: 1px;
  top: 2px;
  font-size: 5px;
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
</style>
