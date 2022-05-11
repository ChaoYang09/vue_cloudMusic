<template>
  <el-container>
    <el-container>
      <!-- 左侧内容区域 -->
      <el-aside width="210px">
        <!-- <div class="musicIcon">NetEase</div> -->
        <header>
          <!-- 个人头像区 -->
          <Login></Login>
          <!-- 搜索框区域 -->
          <Search></Search>
        </header>

        <!-- 左侧功能栏 -->
        <div class="func-wrap">
          <ul class="func-content">
            <li class="func">
              <router-link to="/discovery/recommend">发现音乐</router-link>
            </li>
            <li class="func">
              <router-link to="/discovery/playlist">歌单</router-link>
            </li>
            <li class="func">
              <router-link to="/discovery/artist">歌手</router-link>
            </li>
            <li class="func"><router-link to="/video">视频</router-link></li>
            <!-- 我的音乐 -->
            <div>
              <div class="ml-10 mt-20 mb-10 default gray">我的音乐</div>
              <li class="user">
                <router-link to="/collect"
                  ><svg class="icon font-11 mr-10" aria-hidden="true">
                    <use xlink:href="#icon-106collect"></use></svg
                  >我的收藏</router-link
                >
              </li>
              <!-- 我的电台 -->
              <li class="user">
                <router-link to="/myDj"
                  ><svg
                    class="icon font-12 mr-10 position"
                    style="top: 3px"
                    aria-hidden="true"
                  >
                    <use
                      xlink:href="#icon-antenna_radiowaves_left_right"
                    ></use></svg
                  ><span>我的电台</span></router-link
                >
              </li>
              <li class="user">
                <router-link class="align-center" to="/userInfo/297835213"
                  >用户界面</router-link
                >
              </li>
              <li class="user">
                <router-link class="align-center" to="/test">TEST</router-link>
              </li>
              <li class="user">
                <router-link to="/dailySongs"
                  ><svg
                    class="icon font-11 mr-10 position"
                    style="top: 1px"
                    aria-hidden="true"
                  >
                    <use xlink:href="#icon-calendar"></use></svg
                  >每日推荐</router-link
                >
              </li>
            </div>

            <!-- 创建的歌单 -->
            <div>
              <div class="ml-10 mt-20 mb-10 default gray">创建的歌单</div>
              <li class="user" v-for="(item, i) in createdList" :key="i">
                <router-link :to="`/songLists/${item.id}`"
                  ><svg
                    class="icon font-11 mr-10 position"
                    style="top: 2px"
                    aria-hidden="true"
                    v-if="i === 0"
                  >
                    <use xlink:href="#icon-love1"></use></svg
                  ><svg class="icon font-11 mr-10" aria-hidden="true" v-else>
                    <use xlink:href="#icon-Playlist"></use></svg
                  >{{ item.name }}</router-link
                >
              </li>
            </div>
            <!-- 创建的歌单 -->
            <div>
              <div class="ml-10 mt-20 mb-10 default gray">收藏的歌单</div>

              <li class="user hidden-1" v-for="(item, i) in playlist" :key="i">
                <router-link class="align-center" :to="`/songLists/${item.id}`"
                  ><svg class="icon font-11 mr-10 mt-2" aria-hidden="true">
                    <use xlink:href="#icon-Playlist"></use></svg
                  >{{ item.name }}</router-link
                >
              </li>
            </div>
          </ul>
        </div>
      </el-aside>

      <!-- 右侧内容区域 -->
      <el-container class="right-box">
        <!-- <transition name="el-fade-in-linear"> -->
        <router-view></router-view>
        <!-- </transition> -->
        <el-backtop :bottom="80" :right="20"></el-backtop>
      </el-container>
    </el-container>

    <!-- 歌词页面 -->

    <transition name="slide-fade">
      <Player v-show="$store.state.isPlayerShow"></Player>
    </transition>

    <!-- 底部导航栏 -->
    <Nav class="nav"></Nav>
  </el-container>
</template>

<script>
import {
  getUserDetail,
  getAccountInfo,
  getUserInfo,
  getUserPlaylist,
} from '@/api/user'
import Scroll from '@/components/Scroll.vue'
// import BScroll from 'better-scroll'
import Search from '@/components/search/Search.vue'
import Nav from '../components/Nav.vue'
import Player from '../components/Player.vue'
import Login from '@/components/login/Login.vue'
export default {
  data() {
    return {
      nickName: '长草的颜文君',
      uid: 297835213,
      limit: 20,
      offset: 0,
      createdList: [],
      playlist: [],
      count: 0,
    }
  },

  created() {
    this.getPlaylist()
  },
  methods: {
    async getPlaylist() {
      // console.log(this.uid)
      const res = await getUserPlaylist({
        uid: this.uid,
        limit: this.limit,
        offset: 0,
      })
      // console.log(res)
      res.playlist.forEach((item) => {
        if (item.creator.userId == this.uid) this.count++
      })
      this.createdList = res.playlist.splice(0, this.count)
      // this.createdList[0].name = this.createdList[0].name.replace(
      //   this.nickName,
      //   '我'
      // )
      // console.log(this.createdList)
      this.playlist = res.playlist
    },
  },

  components: { Nav, Player, Scroll, Search, Login },
}
</script>

<style lang="less" scoped>
.right-box {
  // height: 100%;
  margin-bottom: 70px;
}

.nav {
  padding: 0 20px;
  // margin-right: 5px;
  background-color: #f6f6f8;
  position: fixed;
  z-index: 12;
  bottom: 0;
  width: 100%;
  height: 60px;
}

.el-aside {
  background-color: #ffffff;
  border-right: 1px rgb(221, 220, 220) solid;
  color: #1c1c1c;
  padding: 20px;
}
::-webkit-scrollbar {
  width: 0 !important;
}
.func-wrap {
  .func-content {
    margin-top: 110px;
    margin-bottom: 60px;
    // width: 210px;
    height: calc(100% - 190px);
    overflow-y: auto;
    position: fixed;
    li {
      padding-left: 10px;
      width: 170px;
      margin: 4px 0;
      height: 35px;
      line-height: 40px;
      font-size: 15px;
    }
  }
  ul li:hover {
    background-color: #f6f6f7;
    border-radius: 5px;
  }
}

header {
  position: fixed;
  // z-index: 12;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(600px);
  opacity: 0;
}
.func {
  a {
    display: block;
    width: 170px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .router-link-active {
    font-size: 17px;
    line-height: 35px;
    font-weight: 600;
    margin-left: -10px;
    padding-left: 10px;
    background-color: #f6f6f7;
    border-radius: 5px;
  }
}
.user {
  a {
    font-size: 14px;
    display: block;
    width: 170px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .router-link-active {
    line-height: 35px;
    margin-left: -10px;
    padding-left: 10px;
    background-color: #f6f6f7;
    border-radius: 5px;
  }
}
</style>
