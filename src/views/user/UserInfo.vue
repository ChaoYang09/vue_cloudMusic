<template>
  <el-container>
    <el-main>
      <header>
        <!-- 顶部左侧区域 -->

        <div class="left">
          <img :src="accountInfo.avatarUrl" alt="" />
        </div>

        <!-- 顶部右侧区域 -->
        <div class="right">
          <h2>{{ accountInfo.nickname }}</h2>
          <div class="levelBox">
            <div>
              <span class="level">Lv7</span>
              <i v-if="accountInfo.gender === 1" class="el-icon-male"></i>
              <i v-if="accountInfo.gender === 2" class="el-icon-female"></i>
            </div>

            <el-button round size="small" @click="to_EditUserInfo"
              ><i class="el-icon-edit"></i> 编辑个人信息</el-button
            >
          </div>

          <div class="infoBox">
            <div class="info_header">
              <div>
                <span class="fontLarge">{{ userInfo.programCount }}</span
                ><span class="gray">动态</span>
              </div>
              <div class="second">
                <span class="fontLarge">{{ userInfo.artistCount }}</span
                ><span class="gray">关注</span>
              </div>
              <div>
                <span class="fontLarge">{{
                  userInfo.createdPlaylistCount
                }}</span
                ><span class="gray">粉丝</span>
              </div>
            </div>

            <div>所在地区: <span class="gray">河南省 郑州市</span></div>
            <div class="social">社交网络: <i class="el-icon-eleme"></i></div>
            <div>
              个人介绍: <span class="gray">{{ accountInfo.signature }}</span>
            </div>
          </div>
        </div>
      </header>

      <!-- 我创建的歌单 -->
      <footer>
        <div>
          <span class="main">我创建的歌单</span
          ><span class="gray"> ({{ playList.length }})</span>
        </div>
        <div class="footerBox">
          <div class="position">
            <img
              src="@/assets/images/listenRank.png"
              alt=""
              @mouseenter="playShow = -1"
              @mouseleave="playShow = null"
            />
            <span class="tittle">我的听歌排行</span>
            <span class="count gray">累计听歌2550首</span>
            <transition name="fade">
              <span class="play" v-show="playShow === -1"
                ><i class="el-icon-video-play"></i
              ></span>
            </transition>
          </div>

          <div v-for="(item, i) in playList" :key="i" class="position">
            <img
              :src="item.coverImgUrl"
              alt=""
              @mouseenter="playShow = i"
              @mouseleave="playShow = null"
            />
            <span class="tittle">{{ item.name }}</span>
            <span class="count gray">{{ item.trackCount }}首</span>
            <transition name="fade">
              <span class="play" v-show="playShow === i"
                ><i class="el-icon-video-play"></i
              ></span>
            </transition>
            <span class="playCount"
              ><i class="el-icon-caret-right"></i
              >{{ item.playCount | playCountFormat }}</span
            >
          </div>
        </div>
      </footer>
    </el-main>
    <!-- <audio
      src="https://music.163.com/song/media/outer/url?id=1900923198.mp3 "
      autoplay
    ></audio> -->
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 账户信息
      accountInfo: {},
      //用户uid
      uid: 0,
      // 用户信息
      userInfo: {},
      // 歌单
      playList: [],
      playShow: null,
    }
  },
  created() {
    this.getAccountInfo()
    this.getUserInfo()
    this.getPlayList()
  },
  methods: {
    async getAccountInfo() {
      const { data: res } = await this.$http.get('/user/account')
      this.accountInfo = res.profile
      this.uid = res.profile.userId
      // console.log(this.uid)
    },
    async getUserInfo() {
      const { data: res } = await this.$http.get('/user/subcount')
      this.userInfo = res
      // console.log(res)
    },
    async getPlayList() {
      const { data: res } = await this.$http.get('/user/playlist', {
        params: {
          uid: this.uid,
        },
      })
      this.playList = res.playlist
      // console.log(this.playList)
    },
    to_EditUserInfo() {
      this.$router.push({
        path: '/editUserInfo',
        query: {
          accountInfo: this.accountInfo,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: start;
  .left {
    img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .right {
    margin-left: 25px;
    width: 120vh;
    min-width: 300px;
    .levelBox {
      display: flex;
      justify-content: space-between;
      // width: 50rem;
      .level {
        // box-sizing: border-box;
        margin-top: 10px;
        display: inline-block;
        font-size: 14px;
        padding: 2px 10px;
        border-radius: 10px;
        background-color: #f0f0f0;
      }
      .el-icon-male {
        // font-size: 10px;
        box-sizing: border-box;
        margin: 10px 0 0 10px;
        padding: 2px;
        border-radius: 50%;
        background-color: #c0f3ff;
        color: #57b1db;
      }
      .el-icon-female {
        // font-size: 10px;
        box-sizing: border-box;
        margin: 10px 0 0 10px;
        padding: 2px;
        border-radius: 50%;
        background-color: #fbc6fd;
        color: #d861c8;
      }
    }
  }
}

.infoBox {
  // height: 100px;
  margin-top: 10px;
  border-top: 1px #eee solid;
  .info_header {
    text-align: center;
    display: flex;
    margin: 10px 0;
    justify-content: start;
    .second {
      padding: 0 30px;
      margin: 0 30px;
      border-left: 1px solid #eee;
      border-right: 1px solid #eee;
    }
    span {
      display: block;
    }
  }
}
.social {
  margin: 10px 0;
}
.el-icon-eleme {
  padding: 2px;
  border-radius: 50%;
  color: #fff;
  background-color: #bcbcc2;
}
.fontLarge {
  font-size: 18px;
  // font-weight: 500;
}
footer {
  margin: 30px 0;
  min-width: 750px;
  .main {
    font-size: 16px;
    font-weight: bold;
    // color: #373737;
  }
  .footerBox {
    // position: relative;

    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    // width: 1000px;
    // height: 600px;
    div {
      margin: 20px 35px 0 0;

      width: 210px;
      height: 250px;
      img {
        // display: block;
        border-radius: 5px;
        width: 210px;
        height: 210px;
        object-fit: cover;
      }
    }
    .play {
      // display: none;
      position: absolute;
      font-size: 55px;
      right: 5px;
      bottom: 40px;
      color: #fff;
    }
  }
}
.playCount {
  position: absolute;
  color: #fff;
  top: 5px;
  right: 5px;
  font-size: 14px;
}
.tittle {
  display: block;
  // height: 60px;
  margin: 4px 0;
  height: 20px;
}
.count {
  display: block;
  font-size: 12px;
  height: 20px;
  // margin-bottom: 20px;
}
</style>
