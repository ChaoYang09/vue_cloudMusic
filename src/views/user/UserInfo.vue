<template>
  <div class="user-wrap px-20 py-30">
    <header>
      <!-- 顶部左侧区域 -->
      <div class="left">
        <img :src="userInfo.profile.avatarUrl" alt="" />
      </div>

      <!-- 顶部右侧区域 -->
      <div class="right">
        <div class="font-20 bold default">{{ userInfo.profile.nickname }}</div>
        <div class="levelBox">
          <div>
            <span class="level">Lv{{ userInfo.level }}</span>
            <Gender :gender="userInfo.profile.gender"></Gender>
          </div>
          <span
            class="btn border"
            @click="$router.push('/editUserInfo')"
            v-if="id == $store.state.uid"
            >编辑个人信息</span
          >
        </div>

        <div class="info-wrap default">
          <div class="info-content">
            <div>
              <span class="font-18">{{ userInfo.profile.eventCount }}</span
              ><span class="deep-gray pointer">动态</span>
            </div>
            <div class="second">
              <span class="font-18">{{ userInfo.profile.follows }}</span
              ><span class="deep-gray pointer">关注</span>
            </div>
            <div>
              <span class="font-18">{{ userInfo.profile.followeds }}</span
              ><span class="deep-gray pointer">粉丝</span>
            </div>
          </div>
          <div>所在地区 : <span class="deeper-gray">河南省 郑州市</span></div>
          <div class="my-10">
            社交网络 : <span class="deeper-gray">未绑定</span>
          </div>
          <div v-if="userInfo.profile.signature ? true : false">
            个人介绍 :
            <span class="deeper-gray">{{ userInfo.profile.signature }}</span>
          </div>
        </div>
      </div>
    </header>

    <footer>
      <!-- 我创建的歌单 -->
      <div>
        <span class="font-16 bold">我创建的歌单</span
        ><span class="gray"> ({{ createdList.length }})</span>

        <div class="cover-wrap">
          <Cover
            class="cover"
            v-for="(item, i) in createdList"
            :key="i"
            :count="item.playCount"
            :url="`${
              item.picUrl ? item.picUrl : item.coverImgUrl
            }?param=400y400`"
            :name="item.name"
            :i="i"
            @click.native="common.toSongsList(item.id)"
          >
            <span class="gray block">{{ item.trackCount }}首</span>
          </Cover>
        </div>
      </div>
      <!-- 收藏的歌单 -->
      <div class="mt-20">
        <span class="font-16 bold">收藏</span
        ><span class="gray"> ({{ playlist.length }})</span>

        <div class="cover-wrap">
          <Cover
            class="cover"
            v-for="(item, i) in playlist"
            :key="i"
            :count="item.playCount"
            :url="item.picUrl ? item.picUrl : item.coverImgUrl"
            :name="item.name"
            :i="i"
            @click.native="common.toSongsList(item.id)"
          >
            <span class="gray block">{{ item.trackCount }}首</span>
          </Cover>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import {
  getUserDetail,
  getAccountInfo,
  getUserInfo,
  getUserPlaylist,
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
      userInfo: {
        profile: {},
      }, // 用户信息
      createdList: [], //创建的歌单
      playlist: [], // 收藏的歌单
      playShow: null,
      count: 0,
      id: this.$route.params.id,
      limit: 999,
      offset: 0,
    }
  },
  created() {
    this.getUserDetail()
    // this.getAccountInfo()
    // this.getUserInfo()
    this.getPlaylist()
    // console.log(this.id == this.$store.state.uid)
  },
  methods: {
    async getUserDetail() {
      const res = await getUserDetail(this.id)
      this.userInfo = res
      // console.log(this.userInfo)
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
      const res = await getUserPlaylist({
        uid: this.id,
        limit: this.limit,
        offset: 0,
      })
      // console.log(res)
      res.playlist.forEach((item) => {
        if (item.creator.userId == this.id) this.count++
      })
      this.createdList = res.playlist.splice(0, this.count)
      this.playlist = res.playlist
    },
    // 分页的钩子
    // handleCurrentChange(val) {
    //   this.currentPage = val
    //   this.newInfo.offset = (val - 1) * 20
    //   this.getNewComment()
    // },
    // toEditUserInfo() {
    //   console.log(this.userInfo)
    //   this.$router.push({
    //     path: '/editUserInfo',
    //     query: {
    //       userInfo: this.userInfo.profile,
    //     },
    //   })
    // },
  },
}
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: flex-start;
  .left {
    width: 180px;
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
      .level {
        cursor: default;
        margin-top: 10px;
        display: inline-block;
        font-size: 12px;
        padding: 2px 10px;
        border-radius: 10px;
        background-color: #f0f0f0;
      }
    }
  }
}
.info-wrap {
  margin-top: 10px;
  border-top: 1px #eee solid;
  .info-content {
    text-align: center;
    display: flex;
    margin: 10px 0;
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

footer {
  margin: 30px 0;
  .cover-wrap {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    .cover {
      margin-right: 2%;
      width: 18%;
    }
  }
}
</style>
