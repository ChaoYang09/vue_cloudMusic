<template>
  <div class="musicList-wrap">
    <el-table
      :data="songs"
      stripe
      size="mini"
      highlight-current-row
      @row-dblclick="common.playMusic"
    >
      <!-- 序号 -->
      <el-table-column align="center" width="45" class-name="color-gray">
        <template v-slot="scope">
          <List-index :offset="offset" :scope="scope"></List-index>
        </template>
      </el-table-column>

      <!-- 收藏爱心 -->
      <el-table-column width="20">
        <template v-slot="scope">
          <List-love :scope="scope"></List-love>
        </template>
      </el-table-column>

      <!-- 标题 -->
      <el-table-column min-width="400" label="音乐标题" show-overflow-tooltip>
        <template v-slot="scope">
          <List-title :scope="scope"></List-title>
        </template>
      </el-table-column>

      <!-- 歌手 -->
      <el-table-column min-width="180" label="歌手" show-overflow-tooltip>
        <template v-slot="scope">
          <List-Artist :scope="scope"></List-Artist>
        </template>
      </el-table-column>

      <!-- 专辑 -->
      <el-table-column min-width="160" label="专辑" show-overflow-tooltip>
        <template v-slot="scope">
          <span class="deep-gray pointer">{{ scope.row.al.name }}</span>
        </template>
      </el-table-column>
      <!-- 时长 -->
      <el-table-column label="时长" min-width="60" class-name="color-gray ">
        <template v-slot="scope">
          <List-duration :scope="scope"></List-duration>
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
  </div>
</template>

<script>
import { likeMusic } from '@/api/music'
import ListIndex from '@/components/musicList/List-index'
import ListLove from '@/components/musicList/List-love.vue'
import ListTitle from '@/components/musicList/List-title.vue'
import ListArtist from '@/components/musicList/List-artist.vue'
import ListDuration from '@/components/musicList/List-duration.vue'
export default {
  components: {
    ListIndex,
    ListLove,
    ListTitle,
    ListArtist,
    ListDuration,
  },
  props: {
    songs: {
      type: Array,
      default: () => {},
      require: true,
    },
    count: {
      type: Number,
    },
    offset: {
      type: [Number, String],
    },
  },
  data() {
    return {
      limit: 30,
    }
  },
  created() {},
  computed: {},

  methods: {
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
  },
}
</script>

<style lang="less" scoped></style>
