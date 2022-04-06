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
        <div class="tittle">推荐歌单 <span class="gray">></span></div>

        <!-- 推荐歌单 -->
        <div class="playListBox">
          <div
            class="playlist"
            v-for="(item, i) in playlist"
            :key="i"
            @mouseenter="playShow = i"
            @mouseleave="playShow = null"
            @click="toSongsList(item)"
          >
            <img :src="item.coverImgUrl" alt="" />
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
      <el-tab-pane label="歌单" name="second"></el-tab-pane>
      <el-tab-pane label="歌手" name="third"></el-tab-pane>
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
      activeName: 'first',
    }
  },
  computed: {},
  created() {
    this.getDisCovery()
    this.getCatList()
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
      // console.log(res)
    },
    toSongsList(item) {
      this.$router.push({
        path: '/songLists',
        query: {
          item,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.main-Box {
  padding: 20px;
}
.playlist-tittle {
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
      object-fit: cover;
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
</style>
