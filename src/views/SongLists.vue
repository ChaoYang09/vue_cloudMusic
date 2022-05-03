<template>
  <div class="playlist-wrap">
    <header>
      <img
        class="rounded-5 border-line"
        style="width: 180px; height: 180px"
        :src="playListInfo.coverImgUrl"
        alt=""
      />

      <div class="ml-20" style="width: 700px">
        <div class="align-center">
          <Label :large="true" class="mr-10 default">歌单</Label>
          <span class="font-20 bold">{{ playListInfo.name }}</span>
        </div>
        <!-- 创作者区域 -->
        <div
          class="align-center mt-5"
          @click="common.toUser(playListInfo.creator.userId)"
        >
          <img
            class="rounded-50 mr-10"
            style="width: 22px"
            :src="playListInfo.creator.avatarUrl"
            alt=""
          />
          <span class="deep-link mr-10">{{
            playListInfo.creator.nickname
          }}</span>
          <span class="deeper-gray default"
            >{{ playListInfo.createTime | dateFormat }} 创建</span
          >
        </div>
        <!-- 按钮区域 -->
        <div class="mb-10 mt-5">
          <!-- 播放全部 -->
          <Play-Button class="mr-20" @click="PlayFirstSong"></Play-Button>
          <!-- 收藏 -->
          <Collect-Button
            @click.native="handleCollect"
            ref="collect"
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
              >歌曲 :<span class="deeper-gray"> {{ playlists.length }}</span>
            </span>
            <span class="ml-20"
              >播放 :
              <span class="deeper-gray">{{
                playListInfo.playCount | playCountFormat
              }}</span>
            </span>
          </div>

          <div
            class="overHidden"
            v-if="playListInfo.description ? true : false"
          >
            简介 :
            <span class="deeper-gray">{{ playListInfo.description }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- <div class="clear"></div> -->

    <div class="tab-wrap">
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌曲列表" name="playlist">
          <Music-List :songs="playlists"> </Music-List>
          <!-- <div class="bottom">
            <el-table
              :data="playlists"
              stripe
              size="small"
              @row-dblclick="playMusic"
            >
              <el-table-column type="index" label="#" align="center">
              </el-table-column>

              <el-table-column prop="name" label="音乐标题" min-width="400">
              </el-table-column>
              <el-table-column prop="ar[0].name" min-width="180" label="歌手">
                <template v-slot="scope">
                  <router-link
                    class="router-link-active"
                    :to="{
                      path: '/artist',
                      query: {
                        id: scope.row.ar[0].id,
                      },
                    }"
                    >{{ scope.row.ar[0].name }}</router-link
                  >
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="专辑"
                min-width="200"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column prop="" label="时长">
                <template v-slot="scope">
                  {{ scope.row.dt | timeFormat }}
                </template>
              </el-table-column>
            </el-table>
          </div> -->
        </el-tab-pane>
        <el-tab-pane label="评论" name="comment">
          <Comment style="padding: 0 30px" :id="id" :type="2"></Comment>
        </el-tab-pane>
        <el-tab-pane label="收藏者" name="subUser">
          <Subscribers style="padding: 0 30px" :id="id"></Subscribers>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getPlaylists } from '@/api/playlist'
import Comment from '@/components/comment/Comment.vue'
import Subscribers from '@/components/subscribers/Subscribers.vue'
import PlayButton from '@/components/button/Play-Button.vue'
import MusicList from '@/components/musicList/MusicList.vue'
import Label from '@/components/label/Label.vue'
export default {
  components: {
    Comment,
    Subscribers,
    PlayButton,
    MusicList,
    Label,
  },
  data() {
    return {
      activeName: 'playlist',
      playListInfo: {
        creator: {},
      },
      playlists: [],
      subCount: '',
      tags: [],
      id: this.$route.params.id,
    }
  },
  computed: {},
  created() {
    this.getDetail()
    this.getPlaylists()
  },
  methods: {
    // 获取歌单详情
    async getDetail() {
      const { data: res } = await this.$http.get('/playlist/detail', {
        params: {
          id: this.$route.params.id,
        },
      })
      this.playListInfo = res.playlist
      this.tags = res.playlist.tags
      // console.log(this.playlists)
    },
    // 获取歌曲列表
    async getPlaylists() {
      const res = await getPlaylists(this.id)
      this.playlists = res.songs
      // console.log(this.playlists)
    },
    handleCollect() {
      this.$refs.collect.handleCollect()
    },
    // 点击播放全部 将数据渲染到playlist上面
    PlayFirstSong() {
      this.playMusic(this.playlists[0])
      this.toList()
    },
    // 点击播放全部 将数据渲染到playlist上面
    toList() {
      this.playlists.forEach((item, i) => {
        item.index = i
      })
      this.$store.commit('setPlaylist', this.playlists)
    },
    toPlayer() {
      // console.log('1')
      this.$router.push({
        path: '/player',
        query: {
          item,
        },
      })
    },
    playMusic(song) {
      this.$store.commit('setCurrentSong', song)
      this.toList()
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

    toPlaylist(item) {
      this.$router.push({
        path: '/discovery',
        query: {
          tag: item,
        },
      })
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
  width: 800px;
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
  font-size: 13px;
  color: #373737;
}

/deep/.el-tabs__item.is-active {
  color: #373737;
  font-size: 14px;
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
