<template>
  <div class="user-wrap px-20 py-30">
    <header>
      <!-- 顶部左侧区域 -->
      <div class="left">
        <img :src="userInfo.profile.avatarUrl" alt="" />
      </div>

      <!-- 顶部右侧区域 -->
      <div class="right">
        <div class="font-20 bold">{{ userInfo.profile.nickname }}</div>
        <div class="levelBox">
          <div>
            <span class="level">Lv{{ userInfo.level }}</span>
            <Gender :gender="userInfo.profile.gender"></Gender>
          </div>
          <el-button round size="small" @click="to_EditUserInfo"
            ><i class="el-icon-edit"></i> 编辑个人信息</el-button
          >
        </div>

        <div class="infoBox">
          <div class="info_header">
            <div>
              <span class="font-18">{{ userInfo.profile.eventCount }}</span
              ><span class="gray">动态</span>
            </div>
            <div class="second">
              <span class="font-18">{{ userInfo.profile.follows }}</span
              ><span class="gray">关注</span>
            </div>
            <div>
              <span class="font-18">{{ userInfo.profile.followeds }}</span
              ><span class="gray">粉丝</span>
            </div>
          </div>
          <div>所在地区: <span class="gray">河南省 郑州市</span></div>
          <div class="my-10">社交网络: <i class="el-icon-eleme"></i></div>
          <div>
            个人介绍: <span class="gray">{{ userInfo.profile.signature }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- 我创建的歌单 -->
    <footer>
      <div>
        <span class="font-16 bold">我创建的歌单</span
        ><span class="gray"> ({{ playlist.length }})</span>
      </div>

      <div class="cover-wrap">
        <Cover
          class="cover"
          v-for="(item, i) in playlist"
          :key="i"
          :count="item.playCount"
          :url="`${item.picUrl ? item.picUrl : item.coverImgUrl}?param=300y300`"
          :name="item.name"
          :i="i"
        >
          <span class="gray block">{{ item.trackCount }}首</span>
        </Cover>
      </div>
    </footer>
  </div>
</template>

<script>
import {
  getUserDetail,
  getAccountInfo,
  getUserInfo,
  getPlaylist,
} from '@/api/user'
import Cover from '@/components/cover/Cover.vue'
import Gender from '@/components/gender/Gender.vue'
export default {
  components: {
    Cover,
    Gender,
  },
  data() {
    return {
      accountInfo: {}, // 账户信息
      uid: 0, //用户uid
      userInfo: {}, // 用户信息
      playlist: [], // 歌单
      playShow: null,
    }
  },
  created() {
    this.getUserDetail()
    // this.getAccountInfo()
    // this.getUserInfo()
    this.getPlaylist()
  },
  methods: {
    async getUserDetail() {
      const res = await getUserDetail(3268026640)
      this.userInfo = res
      console.log(this.userInfo)
    },
    async getAccountInfo() {
      const res = await getAccountInfo()
      this.accountInfo = res.profile
      this.uid = res.profile.userId
      // console.log(this.uid)
    },
    async getUserInfo() {
      const res = await getUserInfo()
      this.userInfo = res
      // console.log(res)
    },
    async getPlaylist() {
      // console.log(this.uid)
      const res = await getPlaylist(3268026640)
      this.playlist = res.playlist
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
    width: 200px;
    img {
      width: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .right {
    margin-left: 25px;
    width: 120vh;
    // min-width: 300px;
    .levelBox {
      display: flex;
      justify-content: space-between;
      // width: 50rem;
      .level {
        margin-top: 10px;
        display: inline-block;
        font-size: 14px;
        padding: 2px 10px;
        border-radius: 10px;
        background-color: #f0f0f0;
      }
    }
  }
}
.infoBox {
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

.el-icon-eleme {
  padding: 2px;
  border-radius: 50%;
  color: #fff;
  background-color: #bcbcc2;
}

footer {
  margin: 30px 0;
  .cover-wrap {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .cover {
      // margin: 20px 35px 0 0;
      width: 23%;
    }
  }
}
</style>
