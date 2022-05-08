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
          <List-love :scope="scope.row"></List-love>
        </template>
      </el-table-column>

      <!-- 标题 -->
      <el-table-column min-width="350" label="音乐标题" show-overflow-tooltip>
        <template v-slot="scope">
          <List-title :scope="scope"></List-title>
        </template>
      </el-table-column>

      <!-- 歌手 -->
      <el-table-column min-width="160" label="歌手" show-overflow-tooltip>
        <template v-slot="scope">
          <List-Artist :scope="scope"></List-Artist>
        </template>
      </el-table-column>

      <!-- 专辑 -->
      <el-table-column min-width="200" label="专辑" show-overflow-tooltip>
        <template v-slot="scope">
          <span
            class="deep-gray pointer"
            @click="common.toAlbumList(scope.row.al.id)"
            >{{ scope.row.al.name }}</span
          >
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
    // 双击歌曲行会触发
  },
}
</script>

<style lang="less" scoped></style>
