<template>
  <div class="playlist-wrap">
    <header>
      <img
        class="rounded-5 border-line"
        style="width: 180px; height: 180px"
        v-lazy="playListInfo.coverImgUrl"
        alt=""
      />

      <div class="ml-20" style="width: calc(100% - 200px)">
        <div class="align-center">
          <Label :large="true" class="mr-10 default">歌单</Label>
          <span class="font-23 bold hidden-1">{{ playListInfo.name }}</span>
        </div>
        <!-- 创作者区域 -->
        <div
          class="align-center mt-5"
          @click="common.toUser(playListInfo.creator.userId)"
        >
          <img
            class="rounded-50 mr-10"
            style="width: 25px"
            :src="playListInfo.creator.avatarUrl"
            alt=""
          />
          <span class="deep-link mr-10">{{
            playListInfo.creator.nickname
          }}</span>
          <span class="deeper-gray default font-12"
            >{{ playListInfo.createTime | dateFormat }} 创建</span
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
            :subCount="playListInfo.subscribedCount"
            :id="id"
            :type="'playlist'"
          ></Collect-Button>
        </div>
        <!-- 标签区域 -->
        <div class="tags-box">
          <span style="display: block" v-if="tags.length !== 0"
            >标签 :
            <span class="artist-list" v-for="(item, i) in tags" :key="i">
              <span class="pointer deep-gray link" @click="toPlaylist(item)">{{
                item
              }}</span>
            </span>
          </span>
          <div class="my-10">
            <span
              >歌曲 :<span class="deeper-gray"> {{ length }}</span>
            </span>
            <span class="ml-20"
              >播放 :
              <span class="deeper-gray">{{
                playListInfo.playCount | playCountFormat
              }}</span>
            </span>
          </div>

          <div class="hidden-2" v-if="playListInfo.description ? true : false">
            简介 :
            <span class="deeper-gray">{{ playListInfo.description }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- <div class="clear"></div> -->
    <footer class="position">
      <div class="tab-wrap">
        <el-tabs v-model="activeName">
          <el-tab-pane label="歌曲列表" name="playlist">
            <Music-List :songs="playlists"> </Music-List>
          </el-tab-pane>
          <el-tab-pane :label="`评论(${commentCount})`" name="comment">
            <Comment
              style="padding: 0 30px"
              :id="id"
              :type="2"
              @getCommentCount="getCommentCount"
            ></Comment>
          </el-tab-pane>
          <el-tab-pane label="收藏者" name="subUser">
            <Subscribers
              style="padding: 0 30px"
              :id="id"
              :type="'playlist'"
            ></Subscribers>
          </el-tab-pane>
        </el-tabs>
      </div>
      <Search-list
        class="search-list"
        v-show="activeName === 'playlist'"
        :lists="playlists"
        @getNewLists="getNewLists"
        @initLists="initLists"
      ></Search-list>
    </footer>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getPlaylists, getPlaylistDetail } from '@/api/playlist'
// import Comment from '@/components/comment/Comment.vue'
import Subscribers from '@/components/subscribers/Subscribers.vue'
import PlayButton from '@/components/button/Play-Button.vue'
import MusicList from '@/components/musicList/MusicList.vue'
import Label from '@/components/label/Label.vue'
import SearchList from '@/components/search/SearchList.vue'
export default {
  inject: ['reload'],
  components: {
    Subscribers,
    PlayButton,
    MusicList,
    Label,
    SearchList,
  },
  data() {
    return {
      activeName: 'playlist',
      playListInfo: {
        creator: {},
      },
      playlists: [],
      subPlaylists: [],
      subCount: '',
      tags: [],
      id: this.$route.params.id,
      length: 0,
      commentCount: 0, //评论数量
    }
  },
  computed: {
    ...mapState(['likeIds', 'isLogin']),
  },
  watch: {
    $route() {
      this.id = this.$route.params.id
      this.getPlaylistDetail()
      this.getPlaylists()
      this.activeName = 'playlist'
      // this.reload()
    },

    likeIds() {
      this.getPlaylists()
      this.playlists.forEach((item) => {
        item.like = this.likeIds.includes(item.id)
      })
    },
    isLogin(newVal) {
      if (newVal == true) this.getPlaylists()
    },
  },
  created() {
    this.getPlaylistDetail()
    this.getPlaylists()
  },
  methods: {
    ...mapMutations(['upDataLikeState']),

    // 获取歌单详情
    async getPlaylistDetail() {
      const res = await getPlaylistDetail(this.id)
      if (res.code !== 200) return

      this.playListInfo = res.playlist
      this.tags = res.playlist.tags
    },
    // 获取歌曲列表
    async getPlaylists() {
      const res = await getPlaylists(this.id)
      if (res.code !== 200) return

      res.songs.forEach((item) => {
        item.like = this.likeIds.includes(item.id)
      })

      this.playlists = res.songs
      this.subPlaylists = res.songs
      this.length = res.songs.length

      // console.log(this.playlists)
    },
    getNewLists(res) {
      // console.log(res)
      this.playlists = res
    },
    initLists() {
      this.playlists = this.subPlaylists
    },

    PlayAllSongs() {
      this.$refs.playBtnRef.PlayFirstSong(this.playlists)
    },

    toPlaylist(item) {
      this.$router.push({
        path: '/discovery',
        query: {
          tag: item,
        },
      })
    },
    getCommentCount(res) {
      // console.log(res)
      this.commentCount = res
    },
  },
}
</script>

<style lang="less" scoped>
.playlist-wrap {
  width: 100%;
}
header {
  padding: 20px 30px;
  display: flex;
  // width: 800px;
}
.search-list {
  position: absolute;
  top: 10px;
  right: 30px;
}
.tab-wrap {
  // margin: 0 30px;
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
  // overflow: hidden;
  // z-index: 9;
  background-color: #fff;
  width: 100%;
  height: 40px;
  margin-left: 30px;
}
/deep/.el-tabs__active-bar {
  bottom: 6px;
}
</style>
