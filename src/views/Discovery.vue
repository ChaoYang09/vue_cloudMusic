<template>
  <el-container>
    <el-main>
      <!-- 轮播图 -->
      <el-carousel :interval="400000" type="card" height="230px">
        <el-carousel-item v-for="(item, i) in banners" :key="i">
          <img class="bannerImg" :src="item.pic" alt="" />
        </el-carousel-item>
      </el-carousel>

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
          <span class="playCount"
            ><i class="el-icon-caret-right"></i>{{ item.playCount }}</span
          >
          <transition name="fade">
            <span class="play" v-show="playShow === i"
              ><i class="el-icon-video-play"></i
            ></span>
          </transition>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      banners: [],
      playlist: [],
      playShow: null,
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
      console.log(res)
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
.el-carousel {
  margin: 0 auto;
  width: 1000px;
}
.el-carousel-item {
  border-radius: 5px;
  width: 800px;
  height: 270px;
}

.bannerImg {
  width: 100%;
  height: 100%;
  object-fit: inherit;
  // background-size: contain;
}
.playListBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 1000px;
  // height: 600px;
}
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

  .play {
    // display: none;
    position: absolute;
    font-size: 40px;
    right: 8px;
    top: 110px;
    color: #fff;
  }
  .playCount {
    position: absolute;
    color: #fff;
    top: 5px;
    right: 8px;
    font-size: 14px;
  }
}
.playlist:nth-child(5n + 1) {
  margin-left: 0;
}
.playlist:nth-child(5n) {
  margin-right: 0;
}
</style>
