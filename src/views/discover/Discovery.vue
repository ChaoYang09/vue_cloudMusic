<template>
  <div class="main-Box">
    <el-tabs v-model="activeName">
      <!-- 个性推荐 -->
      <el-tab-pane label="个性推荐" name="first">
        <!-- 轮播图 -->
        <el-carousel :interval="3000" type="card" height="201px">
          <el-carousel-item v-for="(item, i) in banners" :key="i">
            <img class="bannerImg" :src="item.imageUrl" alt="" />
          </el-carousel-item>
        </el-carousel>
        <div class="tittle-little pointer" @click="toIndependent">
          推荐歌单
          <span class="gray">
            <svg class="icon icon-arrow" aria-hidden="true">
              <use xlink:href="#icon-arrowright"></use></svg
          ></span>
        </div>

        <!-- 推荐歌单 -->
        <div class="cover-wrap">
          <Cover
            class="cover"
            v-for="(item, i) in recommend"
            :key="i"
            :count="item.playcount"
            :url="item.picUrl ? item.picUrl : item.coverImgUrl"
            :name="item.name"
            :i="i"
            @click.native="common.toSongsList(item.id)"
          >
            <!-- <span class="gray block">{{ item.trackCount }}首</span> -->
          </Cover>
        </div>
      </el-tab-pane>

      <!-- 歌单区域 -->
      <el-tab-pane label="歌单" name="playlist">
        <div class="playlist-box">
          <!-- 头部区域 -->
          <header v-if="isCoverShow">
            <div class="img-box">
              <div class="img1">
                <img :src="cover.coverImgUrl" alt="" />
              </div>
              <div class="content">
                <img :src="cover.coverImgUrl" alt="" class="img2" />
                <div class="right">
                  <span class="high-playlist">
                    <svg class="icon icon-crown" aria-hidden="true">
                      <use xlink:href="#icon-crown"></use></svg
                    >精品歌单</span
                  >
                  <p>{{ cover.name }}</p>
                </div>
              </div>
            </div>
          </header>
          <!-- 中间区域 -->
          <main>
            <el-popover
              placement="right"
              width="800"
              trigger="click"
              popper-class="tag-popover"
              ref="popoverRef"
            >
              <!-- 按钮 -->
              <span class="type-btn" slot="reference">
                <span v-show="tag === ''">全部歌单</span> {{ tag }}
                <svg class="icon icon-arrow" aria-hidden="true">
                  <use xlink:href="#icon-arrowright"></use>
                </svg>
              </span>

              <div style="border-bottom: 1px solid #ccc; margin-bottom: 25px">
                <span
                  :class="{ 'all-playlist': true, selected: tag === '' }"
                  @click="tag = ''"
                  >全部歌单</span
                >
              </div>
              <div class="all-box">
                <!-- 语种 -->
                <div class="language">
                  <div class="aside light-gray">
                    <svg class="icon icon-aside" aria-hidden="true">
                      <use xlink:href="#icon-theearth2diqiu"></use>
                    </svg>
                    语种
                  </div>
                  <div class="tag">
                    <div
                      class="span-box"
                      v-for="(item, i) in language"
                      :key="i"
                    >
                      <span
                        :class="{ selected: tag === item.name }"
                        @click="tag = item.name"
                        >{{ item.name
                        }}<span class="hot" v-if="item.hot">HOT</span></span
                      >
                    </div>
                  </div>
                </div>
                <!-- 风格 -->
                <div class="language">
                  <div class="aside light-gray">
                    <svg class="icon icon-aside" aria-hidden="true">
                      <use xlink:href="#icon-iconfonticon-xitong"></use></svg
                    >风格
                  </div>
                  <div class="tag">
                    <div class="span-box" v-for="(item, i) in style" :key="i">
                      <span
                        :class="{ selected: tag === item.name }"
                        @click="tag = item.name"
                        >{{ item.name
                        }}<span class="hot" v-if="item.hot">HOT</span></span
                      >
                    </div>
                  </div>
                </div>
                <div class="language">
                  <div class="aside light-gray">
                    <svg class="icon icon-aside" aria-hidden="true">
                      <use xlink:href="#icon-icon-test"></use></svg
                    >场景
                  </div>
                  <div class="tag">
                    <div class="span-box" v-for="(item, i) in scene" :key="i">
                      <span
                        :class="{ selected: tag === item.name }"
                        @click="tag = item.name"
                        >{{ item.name
                        }}<span class="hot" v-if="item.hot">HOT</span></span
                      >
                    </div>
                  </div>
                </div>
                <!-- 情感 -->
                <div class="language">
                  <div class="aside light-gray">
                    <svg class="icon icon-aside" aria-hidden="true">
                      <use xlink:href="#icon-pa_happy"></use></svg
                    >情感
                  </div>
                  <div class="tag">
                    <div class="span-box" v-for="(item, i) in feeling" :key="i">
                      <span
                        :class="{ selected: tag === item.name }"
                        @click="tag = item.name"
                        >{{ item.name
                        }}<span class="hot" v-if="item.hot">HOT</span>
                      </span>
                    </div>
                  </div>
                </div>
                <!-- 主题 -->
                <div class="language">
                  <div class="aside light-gray">
                    <svg class="icon icon-aside" aria-hidden="true">
                      <use xlink:href="#icon-041siyecao"></use></svg
                    >主题
                  </div>
                  <div class="tag">
                    <div class="span-box" v-for="(item, i) in theme" :key="i">
                      <span
                        :class="{ selected: tag === item.name }"
                        @click="tag = item.name"
                        >{{ item.name
                        }}<span class="hot" v-if="item.hot">HOT</span></span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </el-popover>

            <div class="type-box gray">
              <span :class="{ selected: tag === '华语' }" @click="tag = '华语'"
                >华语</span
              >
              <span :class="{ selected: tag === '流行' }" @click="tag = '流行'"
                >流行</span
              >
              <span :class="{ selected: tag === '摇滚' }" @click="tag = '摇滚'"
                >摇滚</span
              >
              <span :class="{ selected: tag === '民谣' }" @click="tag = '民谣'"
                >民谣</span
              >
              <span :class="{ selected: tag === '电子' }" @click="tag = '电子'"
                >电子</span
              >
              <span
                :class="{ selected: tag === '另类/独立' }"
                @click="tag = '另类/独立'"
                >另类/独立</span
              >
              <span
                :class="{ selected: tag === '轻音乐' }"
                @click="tag = '轻音乐'"
                >轻音乐</span
              >
              <span :class="{ selected: tag === '综艺' }" @click="tag = '综艺'"
                >综艺</span
              >
              <span
                :class="{ selected: tag === '影视原声' }"
                @click="tag = '影视原声'"
                >影视原声</span
              >
              <span :class="{ selected: tag === 'ACG' }" @click="tag = 'ACG'"
                >ACG</span
              >
            </div>
          </main>
          <!-- 底部区域 -->
          <footer>
            <div class="cover-wrap">
              <Cover
                class="cover"
                v-for="(item, i) in topPlayList"
                :key="i"
                :count="item.playCount"
                :url="item.picUrl ? item.picUrl : item.coverImgUrl"
                :name="item.name"
                :i="i"
                @click.native="common.toSongsList(item.id)"
              >
              </Cover>
            </div>
          </footer>
        </div>
      </el-tab-pane>

      <!-- 歌手区域 -->
      <el-tab-pane label="歌手" name="artist">
        <div class="artist-box">
          <!-- 语种 -->
          <div class="area-box gray">
            <span class="total">语种：</span>
            <span :class="{ selected: area === -1 }" @click="area = -1"
              >全部</span
            ><i>|</i
            ><span :class="{ selected: area === 7 }" @click="area = 7"
              >华语</span
            ><i>|</i
            ><span :class="{ selected: area === 96 }" @click="area = 96"
              >欧美</span
            ><i>|</i
            ><span :class="{ selected: area === 8 }" @click="area = 8"
              >日本</span
            ><i>|</i
            ><span :class="{ selected: area === 16 }" @click="area = 16"
              >韩国</span
            ><i>|</i
            ><span :class="{ selected: area === 0 }" @click="area = 0"
              >其他</span
            >
          </div>
          <!-- 分类 -->
          <div class="area-box gray">
            <span class="total">分类：</span>
            <span :class="{ selected: type === -1 }" @click="type = -1"
              >全部</span
            ><i>|</i
            ><span :class="{ selected: type === 1 }" @click="type = 1"
              >男歌手</span
            ><i>|</i
            ><span :class="{ selected: type === 2 }" @click="type = 2"
              >女歌手</span
            ><i>|</i
            ><span :class="{ selected: type === 3 }" @click="type = 3"
              >乐队组合</span
            >
          </div>
          <!-- 筛选 -->
          <div class="area-box screen-box gray">
            <span class="total">筛选：</span>
            <span :class="{ selected: initial === -1 }" @click="initial = -1"
              >热门</span
            ><i>|</i
            ><span :class="{ selected: initial === 'a' }" @click="initial = 'a'"
              >A</span
            ><i>|</i
            ><span :class="{ selected: initial === 'b' }" @click="initial = 'b'"
              >B</span
            ><i>|</i
            ><span :class="{ selected: initial === 'c' }" @click="initial = 'c'"
              >C</span
            ><i>|</i
            ><span :class="{ selected: initial === 'd' }" @click="initial = 'd'"
              >D</span
            ><i>|</i
            ><span :class="{ selected: initial === 'e' }" @click="initial = 'e'"
              >E</span
            ><i>|</i
            ><span :class="{ selected: initial === 'f' }" @click="initial = 'f'"
              >F</span
            ><i>|</i
            ><span :class="{ selected: initial === 'g' }" @click="initial = 'g'"
              >G</span
            ><i>|</i
            ><span :class="{ selected: initial === 'h' }" @click="initial = 'h'"
              >H</span
            ><i>|</i
            ><span :class="{ selected: initial === 'i' }" @click="initial = 'i'"
              >I</span
            ><i>|</i
            ><span :class="{ selected: initial === 'j' }" @click="initial = 'j'"
              >J</span
            ><i>|</i
            ><span :class="{ selected: initial === 'k' }" @click="initial = 'k'"
              >K</span
            ><i>|</i
            ><span :class="{ selected: initial === 'l' }" @click="initial = 'l'"
              >L</span
            ><i>|</i
            ><span :class="{ selected: initial === 'm' }" @click="initial = 'm'"
              >M</span
            ><i>|</i>
            <span :class="{ selected: initial === 'n' }" @click="initial = 'n'"
              >N</span
            ><i>|</i
            ><span :class="{ selected: initial === 'o' }" @click="initial = 'o'"
              >O</span
            ><i>|</i
            ><span :class="{ selected: initial === 'p' }" @click="initial = 'p'"
              >P</span
            ><i>|</i
            ><span :class="{ selected: initial === 'q' }" @click="initial = 'q'"
              >Q</span
            ><i>|</i
            ><span :class="{ selected: initial === 'r' }" @click="initial = 'r'"
              >R</span
            ><i>|</i
            ><span :class="{ selected: initial === 's' }" @click="initial = 's'"
              >S</span
            ><i>|</i
            ><span :class="{ selected: initial === 't' }" @click="initial = 't'"
              >T</span
            ><i>|</i
            ><span :class="{ selected: initial === 'u' }" @click="initial = 'u'"
              >U</span
            ><i>|</i
            ><span :class="{ select: initial === 'v' }" @click="initial = 'v'"
              >V</span
            ><i>|</i
            ><span :class="{ select: initial === 'x' }" @click="initial = 'x'"
              >X</span
            ><i>|</i
            ><span :class="{ select: initial === 'y' }" @click="initial = 'y'"
              >Y</span
            ><i>|</i
            ><span :class="{ select: initial === 'z' }" @click="initial = 'z'"
              >Z</span
            ><i>|</i
            ><span :class="{ select: initial === 0 }" @click="initial = 0"
              >#</span
            >
          </div>
        </div>
        <div class="pic-box">
          <div
            class="pic"
            v-for="(item, i) in artistList"
            :key="i"
            @click="common.toArtist(item.id)"
          >
            <img class="border-line" v-lazy="item.img1v1Url" alt="" />
            <span>{{ item.name }}</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Cover from '@/components/cover/Cover.vue'
export default {
  components: {
    Cover,
  },
  data() {
    return {
      banners: [],
      playlist: [],
      recommend: [], //每日推荐歌单
      playShow: null,
      activeName: 'first',
      artistList: [],
      type: -1, //分类
      area: -1, //语种
      initial: -1, //字母索引
      // loading: true,
      tag: '',
      topPlayList: [],
      cover: {},
      isCoverShow: true,
      highPlayList: [],
      language: [], //语种
      scene: [], //场景
      style: [], //风格
      feeling: [], //情感
      theme: [], //主题
    }
  },
  computed: {},
  created() {
    if (this.$route.query.tag !== undefined) {
      // console.log(this.$route.query.tag)
      this.activeName = 'playlist'
      this.tag = this.$route.query.tag
    }
    this.getBanners()
    this.getCatList()
    this.getArtistList()
    this.getTopPlayList()
    this.getHighPlayList()
    this.getTags()
    this.getRecommendPlaylist()
  },
  watch: {
    area() {
      this.getArtistList()
    },
    type() {
      this.getArtistList()
    },
    initial() {
      this.getArtistList()
    },
    tag() {
      this.getTopPlayList()
      this.getHighPlayList()
    },
  },
  methods: {
    async getBanners() {
      const { data: res } = await this.$http.get('/banner')
      // console.log(res)
      this.banners = res.banners
      // console.log(this.banners)
    },
    async getCatList() {
      const { data: res } = await this.$http.get('/top/playlist')
      this.playlist = res.playlists
      // console.log(this.playlist)
    },
    // 获取精选歌单
    async getRecommendPlaylist() {
      const { data: res } = await this.$http.get('/recommend/resource')
      this.recommend = res.recommend
      this.recommend.splice(15)
      // console.log()
    },
    // 获取精选歌单
    async getTopPlayList() {
      const { data: res } = await this.$http.get('/top/playlist', {
        params: {
          cat: this.tag,
        },
      })
      this.topPlayList = res.playlists
    },
    // 获取精品歌单
    async getHighPlayList() {
      const { data: res } = await this.$http.get('/top/playlist/highquality', {
        params: {
          cat: this.tag,
        },
      })
      this.$refs.popoverRef.doClose()
      if (res.playlists.length === 0) {
        this.isCoverShow = false
      } else {
        this.isCoverShow = true
        this.cover = res.playlists[0]
      }
    },
    // 获取歌单tag
    async getTags() {
      const { data: res } = await this.$http.get('/playlist/catlist')
      const tags = res.sub
      tags.forEach((item) => {
        if (item.category === 0) this.language.push(item)
        if (item.category === 1) this.style.push(item)
        if (item.category === 2) this.scene.push(item)
        if (item.category === 3) this.feeling.push(item)
        if (item.category === 4) this.theme.push(item)
      })
      // console.log(this.style)
      // this.topPlayList = res.playlists
    },

    // 获取歌手封面信息
    async getArtistList() {
      const { data: res } = await this.$http.get('/artist/list', {
        params: {
          limit: 100,
          area: this.area,
          type: this.type,
          initial: this.initial,
        },
      })
      this.artistList = res.artists
      // this.$nextTick(() => {
      //   this.loading = false
      // })
      // console.log(this.playlist)
    },

    toIndependent() {
      this.activeName = 'playlist'
      this.tag = '华语'
    },
  },
}
</script>
<style>
.tag-popover {
  top: 283px !important;
  left: 228px !important;
  z-index: 9 !important;
  font-size: 13px !important;
}
</style>
<style lang="less" scoped>
.hot {
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
  color: #ec4141;
  position: relative;
  left: -3px;
  top: -2px;
  padding: 0 !important;
  transform: scale(0.7);
}
.all-playlist {
  cursor: pointer;
  display: block;
  padding-left: 20px;
  margin-bottom: 10px;
  width: 78px;
  // height: 30px;
}

.all-box {
  // font-size: 13px;
  .language {
    width: 100%;
    margin-bottom: 30px;
    display: flex;
    justify-content: left;
    // align-items: center;
    align-items: flex-start;
    .aside {
      width: 10%;
      display: flex;
      // justify-content: center;
      align-items: center;
      margin-right: 50px;
      .icon-aside {
        margin-right: 10px;
      }
    }
    .tag {
      width: 90%;
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      .span-box {
        display: inline-block;
        width: 102px;
        margin: 0 6px 25px 0;
        span {
          padding: 3px 10px;
          cursor: pointer;
        }
        span:hover {
          color: #ec4141;
        }
      }
    }
  }
}

.selected {
  border-radius: 15px;
  padding: 3px 10px;
  background-color: #fdf5f5;
  color: #ec4141;
}
.selected:hover {
  background-color: #fdeded;
  color: #ec4141 !important;
}
.playlist-box {
  width: 100%;
  margin-top: 40px;
  header {
    cursor: pointer;
    width: 100%;
    .img-box {
      position: relative;
      .img1 {
        height: 160px;
        border-radius: 5px;
        overflow: hidden;
        img {
          width: 100%;
          filter: blur(40px);
          height: 120%;
          object-fit: none;
        }
      }
      .content {
        position: absolute;
        left: 15px;
        top: 15px;
        display: flex;
        justify-content: left;
        .img2 {
          border-radius: 3px;
          width: 130px;
          height: 130px;
          // position: absolute;
        }
        .right {
          margin-left: 15px;
          .high-playlist {
            margin-top: 20px;
            display: block;
            // text-align: center;
            // line-height: 30px;
            border: 1px solid #dca55a;
            border-radius: 20px;
            width: 110px;
            height: 30px;
            color: #dca55a;
            display: flex;
            justify-content: center;
            align-items: center;
            .icon-crown {
              margin-right: 5px;
            }
          }
          p {
            margin-top: 20px;
            color: #ffffff;
            font-size: 16px;
          }
        }
      }
    }
  }
  main {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    .type-btn {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      // display: inline-block;
      text-align: center;
      width: 100px;
      border-radius: 20px;
      height: 30px;
      border: 1px solid #bbb;
      .icon-arrow {
        margin-left: 5px;
        font-size: 9px;
      }
    }
    .type-btn:hover {
      background-color: #f2f2f2;
    }
    .type-box {
      display: flex;
      align-items: center;
      span {
        padding: 3px 10px;
        cursor: pointer;
        margin: 0 3px;
      }
      span:hover {
        color: #373737;
      }
    }
  }
}

.artist-box {
  margin-top: 40px;
  .area-box {
    // margin-bottom: 15px;
    span {
      padding: 3px 10px;
      display: inline-block;
      margin: 0 5px 10px 5px;
      cursor: pointer;
    }
    span:hover {
      color: #373737;
    }
    .total {
      color: #373737;
      margin-left: 0;
      margin-right: 0;
    }
    i {
      color: #eee;
      margin: 0 5px;
    }
  }
}
.pic-box {
  z-index: 1;
  // width: 100%;
  // height: 100%;
  display: flex;
  flex-wrap: wrap;
  .pic {
    cursor: pointer;
    width: 14.6%;
    margin-right: 2%;
    margin-bottom: 2%;
    img {
      width: 100%;
      // height: 100%;
      // object-fit: cover;
      border-radius: 5px;
    }
    span {
      display: inline-block;
      margin-top: 5px;
    }
    span:hover {
      color: black;
    }
  }
}
.main-Box {
  min-width: 770px;

  width: 100%;
  position: relative;
  padding: 15px 30px 0 30px;
}

.el-carousel {
  margin-top: 40px;
}
.el-carousel-item {
  border-radius: 5px;
  width: 800px;
  height: 270px;
}

.bannerImg {
  border-radius: 10px;
  width: 100%;
  height: 90%;
}

.cover-wrap {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  .cover {
    margin-right: 2%;
    width: 18%;
  }
}
/deep/.el-tabs__item {
  font-size: 18px;
  color: #373737;
}

/deep/.el-tabs__item.is-active {
  color: #373737;
  font-size: 20px;
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

  height: 4px;
  border-radius: 2px;
}
/deep/.el-tabs__nav-scroll {
  overflow: hidden;
  position: fixed;
  z-index: 9;
  background-color: #fff;
  width: 100%;
  height: 60px;
  margin-top: -15px;
  padding-top: 15px;
}
</style>
