<template>
  <div class="main-Box">
    <el-tabs v-model="activeName">
      <!-- 个性推荐 -->
      <el-tab-pane label="个性推荐" name="first">
        <!-- 轮播图 -->
        <el-carousel :interval="400000" type="card" height="230px">
          <el-carousel-item v-for="(item, i) in banners" :key="i">
            <img class="bannerImg" :src="item.pic" alt="" />
          </el-carousel-item>
        </el-carousel>
        <div class="tittle-little">
          推荐歌单
          <span class="gray">
            <svg class="icon icon-arrow" aria-hidden="true">
              <use xlink:href="#icon-arrowright"></use></svg
          ></span>
        </div>

        <!-- 推荐歌单 -->
        <div class="playListBox">
          <div
            class="playlist"
            v-for="(item, i) in playlist"
            :key="i"
            @mouseenter="playShow = i"
            @mouseleave="playShow = null"
            @click="toSongsList(item.id)"
          >
            <img v-lazy="item.coverImgUrl" alt="" />
            <span class="playName">{{ item.name }}</span>
            <span class="playCount">
              <svg class="icon icon-right-triangle" aria-hidden="true">
                <use xlink:href="#icon-right-triangle"></use></svg
              >{{ item.playCount | playCountFormat }}</span
            >
            <transition name="fade">
              <span class="play-svg" v-show="playShow === i">
                <svg class="icon icon-play" aria-hidden="true">
                  <use xlink:href="#icon-play"></use></svg
              ></span>
            </transition>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="second">222</el-tab-pane>
      <el-tab-pane label="歌手" name="third">
        <div class="artist-box">
          <!-- 语种 -->
          <div class="area-box gray">
            <span class="total">语种：</span>
            <span :class="{ select: area === -1 }" @click="area = -1">全部</span
            ><i>|</i
            ><span :class="{ select: area === 7 }" @click="area = 7">华语</span
            ><i>|</i
            ><span :class="{ select: area === 96 }" @click="area = 96"
              >欧美</span
            ><i>|</i
            ><span :class="{ select: area === 8 }" @click="area = 8">日本</span
            ><i>|</i
            ><span :class="{ select: area === 16 }" @click="area = 16"
              >韩国</span
            ><i>|</i
            ><span :class="{ select: area === 0 }" @click="area = 0">其他</span>
          </div>
          <!-- 分类 -->
          <div class="area-box gray">
            <span class="total">分类：</span>
            <span :class="{ select: type === -1 }" @click="type = -1">全部</span
            ><i>|</i
            ><span :class="{ select: type === 1 }" @click="type = 1"
              >男歌手</span
            ><i>|</i
            ><span :class="{ select: type === 2 }" @click="type = 2"
              >女歌手</span
            ><i>|</i
            ><span :class="{ select: type === 3 }" @click="type = 3"
              >乐队组合</span
            >
          </div>
          <!-- 筛选 -->
          <div class="area-box screen-box gray">
            <span class="total">筛选：</span>
            <span :class="{ select: initial === -1 }" @click="initial = -1"
              >热门</span
            ><i>|</i
            ><span :class="{ select: initial === 'a' }" @click="initial = 'a'"
              >A</span
            ><i>|</i
            ><span :class="{ select: initial === 'b' }" @click="initial = 'b'"
              >B</span
            ><i>|</i
            ><span :class="{ select: initial === 'c' }" @click="initial = 'c'"
              >C</span
            ><i>|</i
            ><span :class="{ select: initial === 'd' }" @click="initial = 'd'"
              >D</span
            ><i>|</i
            ><span :class="{ select: initial === 'e' }" @click="initial = 'e'"
              >E</span
            ><i>|</i
            ><span :class="{ select: initial === 'f' }" @click="initial = 'f'"
              >F</span
            ><i>|</i
            ><span :class="{ select: initial === 'g' }" @click="initial = 'g'"
              >G</span
            ><i>|</i
            ><span :class="{ select: initial === 'h' }" @click="initial = 'h'"
              >H</span
            ><i>|</i
            ><span :class="{ select: initial === 'i' }" @click="initial = 'i'"
              >I</span
            ><i>|</i
            ><span :class="{ select: initial === 'j' }" @click="initial = 'j'"
              >J</span
            ><i>|</i
            ><span :class="{ select: initial === 'k' }" @click="initial = 'k'"
              >K</span
            ><i>|</i
            ><span :class="{ select: initial === 'l' }" @click="initial = 'l'"
              >L</span
            ><i>|</i
            ><span :class="{ select: initial === 'm' }" @click="initial = 'm'"
              >M</span
            ><i>|</i>
            <span :class="{ select: initial === 'n' }" @click="initial = 'n'"
              >N</span
            ><i>|</i
            ><span :class="{ select: initial === 'o' }" @click="initial = 'o'"
              >O</span
            ><i>|</i
            ><span :class="{ select: initial === 'p' }" @click="initial = 'p'"
              >P</span
            ><i>|</i
            ><span :class="{ select: initial === 'q' }" @click="initial = 'q'"
              >Q</span
            ><span :class="{ select: initial === 'r' }" @click="initial = 'r'"
              >R</span
            ><i>|</i
            ><span :class="{ select: initial === 's' }" @click="initial = 's'"
              >S</span
            ><i>|</i
            ><span :class="{ select: initial === 't' }" @click="initial = 't'"
              >T</span
            ><i>|</i
            ><span :class="{ select: initial === 'u' }" @click="initial = 'u'"
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
            @click="toArtist(item.id)"
          >
            <img v-lazy="item.img1v1Url" alt="" />
            <span>{{ item.name }}</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: [],
      playlist: [],
      playShow: null,
      activeName: 'third',
      artistList: [],
      type: -1, //分类
      area: -1, //语种
      initial: -1, //字母索引
      // loading: true,
    }
  },
  computed: {},
  created() {
    this.getDisCovery()
    this.getCatList()
    this.getArtistList()
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
  },
  methods: {
    async getDisCovery() {
      const { data: res } = await this.$http.get('/homepage/block/page')
      // console.log(res)
      this.banners = res.data.blocks[0].extInfo.banners
      // console.log(this.banners)
    },
    async getCatList() {
      const { data: res } = await this.$http.get('/top/playlist')
      this.playlist = res.playlists
      // console.log(this.playlist)
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
    toSongsList(id) {
      this.$router.push({
        path: `/songLists/${id}`,
      })
    },
    // 前往歌手页面
    toArtist(id) {
      this.$router.push({
        path: '/artist',
        query: {
          id,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.artist-box {
  margin-top: 40px;
  .area-box {
    // margin-bottom: 15px;
    span {
      line-height: 20px;
      text-align: center;
      display: inline-block;
      width: 55px;
      height: 22px;
      // padding: 3px 13px;
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

  .select {
    border-radius: 15px;
    color: #ec4141;
    background-color: #fdf5f5;
  }
  .select:hover {
    color: #ec4141 !important;
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
    width: 18%;
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
  position: relative;
  padding: 15px 30px 0 30px;
}
.playlist-tittle {
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
  height: 87%;
}
.playListBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 1000px;

  // height: 600px;
  .playlist {
    position: relative;
    margin: 15px;
    width: 160px;
    height: 200px;
    cursor: pointer;
    // background-color: antiquewhite;
    img {
      border-radius: 5px;
      // overflow: hidden;
      display: block;
      width: 160px;
      height: 160px;
    }
    .playName {
      margin-top: 7px;
      display: block;
      font-size: 14px;
      width: 160px;
      height: 40px;
    }

    .play-svg {
      // display: none;
      position: absolute;
      font-size: 11px;
      right: 8px;
      top: 110px;
      color: #ec4141;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #ebebed;
      .icon-play {
        margin-left: 3px;
      }
    }
    .playCount {
      position: absolute;
      color: #fff;
      top: 5px;
      right: 8px;
      font-size: 14px;
      .icon-right-triangle {
        // position: absolute;
        // left: 20px;
        // margin-right: 30px;
        font-size: 10px;
      }
    }
  }
}
.playlist:nth-child(5n + 1) {
  margin-left: 0;
}
.playlist:nth-child(5n) {
  margin-right: 0;
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
