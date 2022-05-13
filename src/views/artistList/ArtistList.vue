<template>
  <div class="artist-wrap">
    <header>
      <img :src="artistDetail.artist.cover" alt="" />

      <div class="right">
        <h2>{{ artistDetail.artist.name }}</h2>
        <div class="btn-wrap my-10 align-center">
          <!-- 收藏按钮 -->
          <Collect-Button
            :id="$route.query.id"
            :type="'artist'"
          ></Collect-Button>
          <Button
            @click.native="common.toUser(artistDetail.user.userId)"
          ></Button>
        </div>

        <div>
          <span>单曲数 : {{ artistDetail.artist.musicSize }}</span
          ><span>专辑数 : {{ artistDetail.artist.albumSize }}</span
          ><span>MV数 : {{ artistDetail.artist.mvSize }}</span>
        </div>
      </div>
    </header>
    <!-- tab栏区域 -->
    <main>
      <div class="tab-wrap">
        <el-tabs v-model="activeName">
          <!-- 专辑区域 -->
          <el-tab-pane label="专辑" name="album">
            <div class="album-wrap">
              <img src="@/assets/images/top50.png" alt="" />
              <el-table
                :data="topSongs"
                stripe
                size="mini"
                :show-header="false"
                highlight-current-row
                @row-dblclick="common.playMusic"
              >
                <!-- 序号 -->
                <el-table-column
                  align="center"
                  width="45"
                  class-name="color-gray"
                >
                  <template v-slot="scope">
                    <List-index
                      :offset="$store.offset"
                      :scope="scope"
                    ></List-index>
                  </template>
                </el-table-column>

                <!-- 收藏爱心 -->
                <el-table-column width="20">
                  <template v-slot="scope">
                    <List-love :scope="scope.row"></List-love>
                  </template>
                </el-table-column>

                <!-- 标题 -->
                <el-table-column min-width="500" show-overflow-tooltip>
                  <template v-slot="scope">
                    <List-title :scope="scope"></List-title>
                  </template>
                </el-table-column>

                <!-- 时长 -->
                <el-table-column class-name="color-gray ">
                  <template v-slot="scope">
                    <List-duration :scope="scope"></List-duration>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <!-- Mv区域 -->
          <el-tab-pane label="MV" name="mv">
            <div class="video-wrap" v-if="activeName === 'mv'">
              <Video
                class="video"
                v-for="(item, i) in mvs"
                :key="i"
                :count="item.playCount"
                :url="item.imgurl16v9"
                :name="item.name"
                :duration="item.duration"
                @click.native="common.toVideoPlayer(item.id)"
              >
              </Video>
            </div>
          </el-tab-pane>
          <!-- 歌手详情 -->
          <el-tab-pane label="歌手详情" name="artistDetail">
            <div class="detail-wrap" v-for="(item, i) in introduction" :key="i">
              <span class="block bold"> {{ item.ti }}简介</span>
              <div class="pre" v-for="(t, i) in item.txt" :key="i">
                <p class="deeper-gray">
                  {{ t }}
                </p>
              </div>
            </div>
          </el-tab-pane>
          <!-- 相似歌手 -->
          <el-tab-pane label="相似歌手" name="simi">
            <div class="simi-wrap">
              <div
                class="simi-content pointer"
                style="width: 18%; margin: 0 2% 3% 0"
                v-for="(item, i) in artists"
                :key="i"
                @click="common.toArtist(item.id)"
              >
                <img
                  class="rounded-5 block"
                  style="border: 0.01rem solid #ddd"
                  :src="item.img1v1Url"
                  alt=""
                />
                <span class="block mt-5 deep-gray">{{ item.name }}</span>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </main>
  </div>
</template>

<script>
import {
  getArtistMv,
  getArtistDetail,
  getSimiArtists,
  getTopSongs,
  getArtistDesc,
} from '@/api/artist'
import { getLikeList } from '@/api/music'
import Button from '@/components/button/Base-Button.vue'
import Video from '@/components/video/Video.vue'
import Collect from '@/components/button/Collect-Button.vue'
import ListIndex from '@/components/musicList/List-index.vue'
import ListLove from '@/components/musicList/List-love.vue'
import ListTitle from '@/components/musicList/List-title.vue'
// import ListArtist from '@/components/musicList/List-artist.vue'
import ListDuration from '@/components/musicList/List-duration.vue'
export default {
  components: {
    Collect,
    Video,
    ListIndex,
    ListLove,
    ListTitle,
    ListDuration,
    Button,
  },
  data() {
    return {
      activeName: 'album',
      artistDetail: {
        artist: {
          cover: '',
        },
      },
      // subCount: 100,
      topSongs: [],
      id: this.$route.query.id, //歌手id
      mvs: [],
      artists: [], //相似歌手
      likeList: [],
      introduction: [],
    }
  },
  watch: {
    activeName() {
      switch (this.activeName) {
        case 'mv':
          this.getArtistMv()
          break
        case 'simi':
          this.getSimiArtists()
          break
        case 'artistDetail':
          this.getArtistDesc()
          break
      }
    },
    '$store.state.likeIds'() {
      this.topSongs.forEach((item) => {
        item.like = this.$store.state.likeIds.includes(item.id)
      })
    },
  },
  created() {
    this.getArtistDetail().then(() => {
      this.getArtistDesc()
    })
    this.getTopSongs()
  },
  methods: {
    //获取歌手详细信息
    async getArtistDetail() {
      const res = await getArtistDetail(this.id)
      this.artistDetail = res.data
    },
    //获取歌手详细信息
    async getSimiArtists() {
      const res = await getSimiArtists(this.id)
      this.artists = res.artists
    },
    // 获取歌手mv
    async getArtistMv() {
      const res = await getArtistMv(this.id)
      // console.log(res)
      this.mvs = res.mvs
    },
    // 获取歌手50首热歌
    async getTopSongs() {
      const res = await getTopSongs(this.id)
      // console.log(res)
      res.songs.forEach((item) => {
        item.like = this.$store.state.likeIds.includes(item.id)
      })
      this.topSongs = res.songs
      // console.log(this.topSongs)
      // console.log(res)
    },
    //获取歌手详细描述
    async getArtistDesc() {
      const res = await getArtistDesc(this.id)
      if (res.briefDesc) {
        const base = {
          ti: `${this.artistDetail.artist.name}`,
          txt: `${res.briefDesc}`,
        }
        // console.log(base)
        res.introduction.unshift(base)
      }
      res.introduction.forEach((item) => {
        item.txt = item.txt.split('\n')
      })

      this.introduction = res.introduction
    },
  },
}
</script>

<style lang="less" scoped>
.artist-wrap {
  padding: 25px;
}
header {
  display: flex;

  img {
    display: block;
    width: 170px;
    height: 170px;
    border-radius: 5px;
    margin-right: 30px;
  }

  .right {
    min-width: 330px;
    height: 200px;
    span {
      margin-right: 30px;
    }
  }
}
main {
  .album-wrap {
    display: flex;
    img {
      width: 130px;
      height: 130px;
      border-radius: 5px;
      margin-right: 40px;
    }
  }
  .video-wrap {
    display: flex;
    flex-wrap: wrap;
    .video {
      width: 31%;
      margin-right: 2%;
    }
  }
  .simi-wrap {
    display: flex;
    flex-wrap: wrap;
  }
  .detail-wrap {
    margin-bottom: 40px;
    .pre {
      text-indent: 2em;
      line-height: 2;
      width: 100%;
    }
    p {
      // white-space: pre-wrap;
      // padding-left: 24px;
      // line-height: 2;
      // text-indent: 24px;
      // margin: 10px 0 50px 0;
    }
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
}
/deep/.el-tabs__active-bar {
  bottom: 6px;
}
</style>
