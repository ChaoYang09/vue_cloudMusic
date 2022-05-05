<template>
  <div class="table-wrap">
    <el-table
      width="100%"
      :data="tableData"
      stripe
      :show-header="false"
      :row-style="rowStyle"
      @row-click="togoPage"
    >
      <!-- 封面区域 -->
      <el-table-column width="100px">
        <template v-slot="scope">
          <img
            :src="scope.row.picUrl ? scope.row.picUrl : scope.row.coverImgUrl"
            class="rounded-5 block ml-20"
            style="width: 55px; height: 55px"
            alt=""
          />
        </template>
      </el-table-column>
      <!-- name -->
      <el-table-column prop="name" min-width="300"> </el-table-column>
      <!-- 专辑 -->

      <el-table-column min-width="200" v-if="type === 10">
        <template v-slot="scope">
          <span
            class="deep-gray"
            v-if="scope.row.artist"
            @click="common.toArtist(scope.row.artist.id)"
            >{{ scope.row.artist.name }}</span
          >
        </template>
      </el-table-column>
      <!-- 主播电台 -->
      <el-table-column min-width="200" v-if="type === 1009">
        <template v-slot="scope">
          <span class="deep-gray" v-if="scope.row.dj"
            ><span class="light-gray">by </span
            ><span @click="common.toUser(scope.row.dj.userId)">{{
              scope.row.dj.nickname
            }}</span></span
          >
        </template>
      </el-table-column>
      <!-- 歌单 -->
      <el-table-column min-width="150" v-if="type === 1000">
        <template v-slot="scope">
          <span class="gray">{{ scope.row.trackCount }}首</span>
        </template>
      </el-table-column>
      <el-table-column min-width="250" v-if="type === 1000">
        <template v-slot="scope">
          <span class="deep-gray" v-if="scope.row.creator"
            ><span class="light-gray">by </span
            ><span @click="common.toUser(scope.row.creator.userId)">{{
              scope.row.creator.nickname
            }}</span></span
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="flex-center mt-10">
      <!-- 分页 -->
      <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="count"
        :page-size="30"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        v-if="pagination"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    tableData: {
      type: Array,
      default: () => {},
      require: true,
    },
    count: {
      type: Number,
    },
    type: {
      type: [Number, String],
    },
    pagination: {
      type: Boolean,
    },
  },
  data() {
    return {
      currentPage: 1,
    }
  },
  methods: {
    ...mapMutations(['setOffset']),

    handleCurrentChange(val) {
      this.currentPage = val
      this.setOffset((val - 1) * 30)
      switch (this.type) {
        case 10:
          this.$parent.getAlbums()
          break
        case 100:
          this.$parent.getArtists()
          break
        case 1000:
          this.$parent.getPlaylists()
          break
        case 1002:
          this.$parent.getUsers()
          break
        case 1009:
          this.$parent.getDjRadios()
          break
        case 1014:
          this.$parent.getVideos()
          break
      }

      // this.getSongsList()
    },
    togoPage(row) {
      // console.log(row)
      switch (this.type) {
        case 10:
          this.common.toAlbumList(row.id)
          break
        case 100:
          this.common.toArtist(row.id)
          break
        case 1000:
          this.common.toSongsList(row.id)
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
    rowStyle() {
      return `cursor: pointer `
    },
  },
}
</script>

<style lang="less" scoped>
.block {
  cursor: pointer;
}
</style>
