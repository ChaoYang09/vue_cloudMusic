<template>
  <div class="album-wrap">
    <header>
      <img
        v-if="albumInfo.blurPicUrl"
        class="rounded-5 border-line"
        style="width: 180px; height: 180px"
        v-lazy="albumInfo.blurPicUrl"
        alt=""
      />

      <div class="ml-20" style="width: calc(100% - 200px)">
        <div class="align-center hidden-1">
          <Label :large="true" class="mr-10 default">专辑</Label>
          <span class="font-23 bold"
            >{{ albumInfo.name
            }}<span style="color: #9f9f9f" v-if="albumInfo.alias.length !== 0">
              ({{ albumInfo.alias[0] }})</span
            ></span
          >
        </div>

        <!-- 按钮区域 -->
        <div class="my-10 align-center">
          <!-- 播放全部 -->
          <Play-Button
            class="mr-20"
            ref="playBtnRef"
            @click.native="PlayAllSongs"
          ></Play-Button>
          <!-- 收藏 -->
          <Collect-Button
            :subCount="subCount"
            :id="id"
            :type="'album'"
          ></Collect-Button>
        </div>
        <!-- 标签区域 -->
        <div class="tags-box">
          <span style="display: block"
            >歌手 :<span
              class="deep-link"
              v-if="albumInfo.artist"
              @click="common.toArtist(albumInfo.artist.id)"
            >
              {{ albumInfo.artist.name }}</span
            >
          </span>
        </div>
        <div class="my-10">
          <span
            >时间 :
            <span class="deeper-gray default">{{
              albumInfo.publishTime | dateFormat
            }}</span>
          </span>
        </div>
      </div>
    </header>

    <div class="tab-wrap">
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌曲列表" name="songList">
          <Music-List :songs="playlists">
            <!-- 热度 -->
            <el-table-column label="热度">
              <template v-slot="scope">
                <el-progress
                  :percentage="scope.row.pop"
                  :color="'#c8c8c8'"
                  :show-text="false"
                ></el-progress>
              </template> </el-table-column
          ></Music-List>
        </el-tab-pane>
        <el-tab-pane :label="`评论(${commentCount})`" name="comment">
          <Comment
            style="padding: 0 30px"
            :id="id"
            :type="3"
            @getCommentCount="getCommentCount"
          ></Comment>
        </el-tab-pane>
        <el-tab-pane label="专辑详情" name="detail">
          <p class="deeper-gray des">
            {{ albumInfo.description }}
          </p>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getAlbumDetail, getAlbumDetailDynamic } from '@/api/album'
import MusicList from '@/components/musicList/MusicList.vue'
import Label from '@/components/label/Label.vue'
import PlayButton from '@/components/button/Play-Button.vue'

export default {
  components: {
    MusicList,
    Label,
    PlayButton,
  },
  data() {
    return {
      activeName: 'songList',
      albumInfo: {
        alias: [],
      },
      playlists: [],
      subCount: '',
      id: this.$route.params.id,
      commentCount: 0, //评论数量
    }
  },
  watch: {
    $route() {
      // console.log(1)
      this.id = this.$route.params.id
      this.getAlbumDetail()
    },
    '$store.state.likeIds'() {
      this.playlists.forEach((item) => {
        item.like = this.$store.state.likeIds.includes(item.id)
      })
    },
  },
  computed: {},
  created() {
    this.getAlbumDetail()
    // this.getPlaylists()
    this.getAlbumDetailDynamic()
  },
  methods: {
    // 获取专辑详情
    async getAlbumDetail() {
      const res = await getAlbumDetail(this.id)
      if (res.code !== 200) return

      res.songs.forEach((item) => {
        item.like = this.$store.state.likeIds.includes(item.id)
      })
      this.albumInfo = res.album
      this.playlists = res.songs
    },

    // 获取专辑详情
    async getAlbumDetailDynamic() {
      const res = await getAlbumDetailDynamic(this.id)
      if (res.code !== 200) return

      // console.log(res)
      this.subCount = res.subCount
    },
    PlayAllSongs() {
      this.$refs.playBtnRef.PlayFirstSong(this.playlists)
    },
    getCommentCount(res) {
      // console.log(res)
      this.commentCount = res
    },
  },
}
</script>

<style lang="less" scoped>
header {
  padding: 20px 30px;
  display: flex;
  // width: 800px;
}
.album-wrap {
  width: 100%;
  .des {
    white-space: pre-line;
    padding: 0 30px;
    line-height: 25px;
  }
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
/deep/.el-tabs__item {
  font-size: 14px;
  color: #373737;
}

/deep/.el-tabs__item.is-active {
  color: #373737;
  font-size: 15px;
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
  background-color: #fff;
  width: 100%;
  height: 40px;
  margin-left: 30px;
}
/deep/.el-tabs__active-bar {
  bottom: 6px;
}
</style>
