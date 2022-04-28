<template>
  <div class="musicList-wrap">
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
          <span v-if="scope.row.id === $store.state.music.id">
            <svg
              class="icon netEase-red align-center center"
              aria-hidden="true"
              v-if="$store.state.playing"
            >
              <use xlink:href="#icon-volume-up-fill" />
            </svg>
            <svg
              class="icon netEase-red align-center center font-14"
              aria-hidden="true"
              v-else
            >
              <use xlink:href="#icon-md-volume-mute"></use>
            </svg>
          </span>
          <span class="light-gray" v-else>
            {{
              scope.$index + 1 + offset &lt; 10
                ? '0' + (scope.$index + 1 + offset)
                : scope.$index + 1 + offset
            }}
          </span>
        </template>
      </el-table-column>

      <!-- 收藏爱心 -->
      <el-table-column width="40">
        <template v-slot="scope">
          <svg
            :class="{
              icon: true,
              'icon-love': true,
              'align-center': true,
              'like-love': scope.row.like,
            }"
            aria-hidden="true"
            @click="likeMusic(scope.row, scope.$index)"
          >
            <use xlink:href="#icon-icon_love_hover" />
          </svg>
        </template>
      </el-table-column>

      <!-- 标题 -->
      <el-table-column min-width="300" label="音乐标题">
        <template v-slot="scope">
          <span class="default">{{ scope.row.name }}</span>

          <span class="gray default" v-if="scope.row.alia.length !== 0">
            &nbsp;({{ scope.row.alia[0] }})</span
          >
          <!-- VIP -->
          <span
            style="position: relative; top: 1px"
            class="ml-5 default"
            v-if="scope.row.fee === 1"
            ><Label :small="true" :color="'#fe672e'">VIP</Label></span
          >
          <!-- SQ -->
          <span
            style="position: relative; top: 1px"
            class="ml-5 default"
            v-if="scope.row.sq !== null"
            ><Label :small="true">SQ</Label></span
          >
          <!-- mv -->
          <span
            style="position: relative; top: 1px"
            class="ml-5 pointer position"
            v-if="scope.row.mv !== 0"
            ><Label :small="true"
              >MV &nbsp;
              <svg class="icon icon-triangle" aria-hidden="true">
                <use xlink:href="#icon-triangle1-copy" /></svg></Label
          ></span>
        </template>
      </el-table-column>

      <!-- 歌手 -->
      <el-table-column min-width="180" label="歌手" show-overflow-tooltip>
        <template v-slot="scope">
          <span class="artist-list" v-for="(item, i) in scope.row.ar" :key="i">
            <span class="pointer deep-gray">{{ item.name }}</span>
          </span>
        </template>
      </el-table-column>

      <!-- 专辑 -->
      <el-table-column min-width="200" label="专辑" show-overflow-tooltip>
        <template v-slot="scope">
          <span class="deep-gray pointer">{{ scope.row.al.name }}</span>
        </template>
      </el-table-column>
      <!-- 时长 -->
      <el-table-column label="时长" class-name="color-gray ">
        <template v-slot="scope"
          ><span class="gray default">{{
            scope.row.dt | timeFormat
          }}</span></template
        >
      </el-table-column>
      <slot></slot>
    </el-table>
    <div class="flex-center mt-20">
      <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="count"
        :page-size="30"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { likeMusic } from '@/api/music'
import { mapMutations, mapState } from 'vuex'
import Label from '@/components/label/Label.vue'
export default {
  components: {
    Label,
  },
  props: {
    songs: {
      type: Array,
      default: () => {},
      require: true,
    },
    count: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      limit: 30,
      currentPage: 1,
    }
  },
  created() {
    // console.log(this.songList)
    // this.getLikeList()
  },
  computed: {
    ...mapState(['offset']),
  },

  methods: {
    ...mapMutations(['setMusicInfo', 'setPlayingState', 'setOffset']),
    // 分页的回调函数
    handleCurrentChange(val) {
      this.currentPage = val
      this.setOffset((val - 1) * 30)
      this.$parent.getSongsList()
      // this.getSongsList()
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
.icon-love {
  color: #c2c1c1;
  cursor: pointer;
}

.like-love {
  color: #ec4141;
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
